import { Router } from 'express';
import * as ProductsController from '../controllers/products.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateToken);
router.get('/', ProductsController.getAll);
router.get('/:id', ProductsController.getOne);
router.post('/create', ProductsController.create);
router.put('/:id', ProductsController.update);
router.delete('/:id', ProductsController.remove);

export default router;
