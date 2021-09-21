import { Router } from 'express';

import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { ensureAdmin } from './middlewares/ensureAdmin';

export const routes = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();

routes.post('/users', createUserController.handle);
routes.post('/tags', ensureAdmin, createTagController.handle);
