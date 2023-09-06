import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.js';
import User from '../models/user.model.js';

export const checkAuth = async (req, res, next) => {
  let token 
  if(req.cookies.token) {
    try {
    token = req.cookies.token
      const decoded = jwt.verify(token, JWT_SECRET)
      const user = await User.findById(decoded.id).select('email username email')
      if(!user) {
        return res.status(401).json({ message: 'Unauthorized, invalid token' })
      }
      req.user = user
      return next()
    } catch (error) {
      console.log(error)
      return res.status(401).json({ message: 'Unauthorized, invalid token' })
    }
  } 
  if(!token) {
    return res.status(401).json({ message: 'Unauthorized, no token provided' })
  }
  next()
}

