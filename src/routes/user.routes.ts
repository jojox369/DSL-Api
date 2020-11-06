import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();

userRouter.get('/', UserController.getAll);
userRouter.get('/:id', UserController.getById);
userRouter.post('/', UserController.save);

export default userRouter;
