import ProductsController from '@controllers/ProductsController';
import { Router } from 'express';

const routes = Router();

routes.post('/products',ProductsController.store);
routes.get('/products',ProductsController.index);
export default routes;