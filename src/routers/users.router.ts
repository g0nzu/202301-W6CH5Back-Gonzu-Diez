import { Router } from 'express';
import { UsersController } from '../controllers/users.controller.js';
import { UserMongoRepo } from '../repository/user.mongo.repo.js';

export const UsersRouter = Router();
const repo = new UserMongoRepo();
const controller = new UsersController(repo);

UsersRouter.post('/register', controller.register.bind(controller));
UsersRouter.post('/login', controller.login.bind(controller));
