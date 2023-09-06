import { Router } from 'express';
import { login, logout, profile, register } from '../controllers/auth.controller.js';
import { checkAuth } from '../middleware/check-auth.js';
import { validateSchema } from '../middleware/validator-schema.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

const authRouter = Router();

authRouter.post('/register', validateSchema(registerSchema), register)
authRouter.post('/login', validateSchema(loginSchema), login)
authRouter.post('/logout', logout)
authRouter.get('/profile', checkAuth, profile)

export default authRouter