import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import { JWT_SECRET } from '../config/index.js'

const checkAuth = async (req, res, next) => {
  let token

  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){
    try {
      token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, JWT_SECRET) 
      //console.log(decoded)
      req.user = await User.findById(decoded._id).select("_id username email")
      return next()
    } catch (error) {
      return res.status(404).json({msg: "Something went wrong"})
    }
  }

  if(!token){
    const error = new Error("No token provided")
    return res.status(401).json({msg: error.message})
  }

  next()
}

export default checkAuth