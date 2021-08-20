import { Router } from 'express';

import { CreateUserController } from './controllers/CreateUserController';

export const routes = Router();

const createUserController = new CreateUserController();

routes.post('/users', createUserController.handle);
