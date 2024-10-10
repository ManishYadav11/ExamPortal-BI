import { Router } from 'express';
import { registerUser, loginUser } from '../controller/userController';
import { asyncMiddleware} from '../middleware/asyncMiddleware';
import { verifyAuthMiddleware , checkAdminMiddleware } from '../middleware/authMiddleware';

const userRouter = Router();

// Register User Route
userRouter.post('/register', asyncMiddleware(registerUser));

// Login User Route
userRouter.post('/login', asyncMiddleware(loginUser));

export { userRouter } ;
