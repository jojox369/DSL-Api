import { Router } from 'express';
import listRouter from './list.routes';
import productRouter from './product.routes';
import userRouter from './user.routes';
import UserController from '../controllers/UserController';

const routes = Router();

routes.use('/list', listRouter);
routes.use('/product', productRouter);
routes.use('/user', userRouter);
routes.post('/auth', UserController.auth);

export default routes;
