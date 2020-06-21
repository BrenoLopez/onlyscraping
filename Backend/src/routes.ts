import { Router } from 'express';
import ProductsController from './Controllers/ProductsController';

const routes = Router();

routes.post('/products',ProductsController.store);

export default routes;