import { ShopController } from '../controllers/shop.controllers.js';
import { ShopMongoRepo } from '../repository/shop.mongo.repo.js';
import { Logged } from '../interceptors/logged.js';
import { Authorized } from '../interceptors/authorized.js';
import { UserMongoRepo } from '../repository/user.mongo.repo.js';
import { Router } from 'express';

export const shopRouter = Router();
const repo = new ShopMongoRepo();
const repoUsers = new UserMongoRepo();
const controller = new ShopController(repo, repoUsers);

shopRouter.get('/', controller.getAll.bind(controller));
shopRouter.get('/:id', controller.getByID.bind(controller));
shopRouter.delete(
  '/:id',
  Logged,
  Authorized,
  controller.toDelete.bind(controller)
);
shopRouter.patch('/:id', Logged, controller.edit.bind(controller));
shopRouter.post('/', Logged, Authorized, controller.write.bind(controller));
