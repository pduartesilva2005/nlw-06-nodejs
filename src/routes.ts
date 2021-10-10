import { Router } from 'express';

import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController';
import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { ListTagsController } from './controllers/ListTagsController';
import { ListUsersController } from './controllers/ListUsersController';

export const routes = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUsersReceiveComplimentsController =
  new ListUserSendComplimentsController();
const listUsersSendComplimentsController =
  new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

routes.get('/users', ensureAuthenticated, listUsersController.handle)
routes.post('/users', createUserController.handle);
routes.post('/sessions', authenticateUserController.handle);

routes.post(
  '/tags',
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
);

routes.get('/tags', ensureAuthenticated, listTagsController.handle);

routes.post(
  '/compliments',
  ensureAuthenticated,
  createComplimentController.handle
);

routes.get(
  '/users/compliments/send',
  ensureAuthenticated,
  listUsersSendComplimentsController.handle
);

routes.get(
  '/users/compliments/receive',
  ensureAuthenticated,
  listUsersReceiveComplimentsController.handle
);
