import { Router } from 'express';
import ListController from '../controllers/ListController';

const listRouter = Router();

listRouter.get('/user/:user', ListController.getAll);
listRouter.get('/:id', ListController.getById);
listRouter.post('/', ListController.save);
listRouter.put('/', ListController.update);
listRouter.delete('/:id', ListController.delete);
export default listRouter;
