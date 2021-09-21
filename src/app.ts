import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';

import './database';
import { routes } from './routes';
import { errorHandler } from './errors/handler';

export const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandler);
