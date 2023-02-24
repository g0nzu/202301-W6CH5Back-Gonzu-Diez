import { Router } from "express";
import { ShopController } from "../controllers/shop.controllers";
import { ShopFileRepo } from "../repository/shop.file.repo";

export const shopRouter = Router();
const repo = new ShopFileRepo();
const controller = new ShopController(repo);

shopRouter.get("/", controller.getAll.bind(controller));
shopRouter.get("/:id", controller.getByID.bind(controller));
shopRouter.delete("/:id", controller.toDelete.bind(controller));
