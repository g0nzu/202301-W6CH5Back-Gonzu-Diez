import { Router } from 'express';
import { ShopController } from '../controllers/shop.controllers.js';
import { ShopMongoRepo } from '../repository/shop.mongo.repo.js';

export const shopRouter = Router();
const repo = new ShopMongoRepo();
const controller = new ShopController(repo);

shopRouter.get('/', controller.getAll.bind(controller));
shopRouter.get('/:id', controller.getByID.bind(controller));
shopRouter.delete('/:id', controller.toDelete.bind(controller));
shopRouter.patch('/:id', controller.edit.bind(controller));
shopRouter.post('/', controller.write.bind(controller));
