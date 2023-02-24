import { Response, Request } from "express";
import { itemStructure } from "../models/itemType";
import { ShopFileRepo } from "../repository/shop.file.repo";

export const file = "data/data.json";

export class ShopController {
  constructor(public repo: ShopFileRepo) {}

  getAll(_req: Request, resp: Response) {
    this.repo.read().then((data) => {
      resp.json(data);
    });
  }

  getByID(req: Request, resp: Response) {
    this.repo.read().then((data) => {
      const id = Number(req.params.id);
      const findID = data.find((item) => item.id === Number(id));
      if (findID) {
        resp.json(findID);
      }
    });
  }

  toDelete(req: Request, resp: Response) {
    this.repo.read().then((data) => {
      const id = req.params.id;
      const name = req.params.name;
      let itemIndex = -1;

      if (id) {
        itemIndex = data.findIndex((item) => item.id === Number(id));
      } else if (name) {
        itemIndex = data.findIndex(
          (item) => item.name.toLowerCase() === name.toLowerCase()
        );
      }

      if (itemIndex !== -1) {
        data.splice(itemIndex, 1);
        this.repo.write(data).then(() => {
          resp
            .status(200)
            .json({ message: "Elemento eliminado correctamente" });
        });
      } else {
        resp.status(404).json({ message: "Elemento no encontrado" });
      }
    });
  }
}
