import ProductsController from '@controllers/ProductsController';
import { Router } from 'express';

const routes = Router();

routes.post('/products',ProductsController.store);

export default routes;