import { Router } from 'express';
import ProductController from '../controllers/ProductController';
const ProductRouter = Router();

ProductRouter.get('/', ProductController.getAll);
ProductRouter.get('/:id', ProductController.getById);
ProductRouter.post('/', ProductController.save);

export default ProductRouter;
