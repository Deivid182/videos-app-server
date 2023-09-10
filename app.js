import express from 'express'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js'
import videosRouter from './routes/videos.routes.js'
import userRouter from './routes/users.routes.js'
import cors from 'cors'
import { FRONTEND_URL } from './config/index.js'

const app = express()

app.use(cors({
  credentials: true,
  origin: FRONTEND_URL
}))

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/api/videos', videosRouter)
app.use('/api/users', userRouter)

export default app