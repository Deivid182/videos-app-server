import jwt  from 'jsonwebtoken'
import { JWT_SECRET } from '../config/index.js'

export const createJwt = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}