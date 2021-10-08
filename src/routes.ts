import { Router } from 'express';

import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { ensureAdmin } from './middlewares/ensureAdmin';

export const routes = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

routes.post('/users', createUserController.handle);
routes.post('/sessions', authenticateUserController.handle);
routes.post('/tags', ensureAdmin, createTagController.handle);
routes.post('/compliments', createComplimentController.handle);
