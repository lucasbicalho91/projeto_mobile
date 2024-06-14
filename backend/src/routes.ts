import { Router } from 'express';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { LIstCategoriesController } from './controllers/category/ListCategoriesController';

import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

// Rotas de Usuário
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/detail', isAuthenticated, new DetailUserController().handle);

// Rotas de Categoria
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/category', isAuthenticated, new LIstCategoriesController().handle)


export { router };