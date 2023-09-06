import { Router } from 'express';
import { checkAuth } from '../middleware/check-auth.js';
import { getUserById, toggleFollow } from '../controllers/users.controller.js';

const userRouter = Router();

userRouter.get('/:userId', checkAuth, getUserById)
userRouter.put('/follow/:userId', checkAuth, toggleFollow)

export default userRouter