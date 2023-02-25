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
      if (!findID) {
        resp.status(404).json({ message: "Elemento no encontrado" });
      }
    });
  }

  async toDelete(req: Request, resp: Response) {
    await this.repo.delete(req.params.id);
    resp.send("Delete was sucessful");
  }

  async toCreate(req: Request, resp: Response) {
    const { name, price } = req.body;
    const newItem = { name, price, id: file.length + 1 };
    await this.repo.write([newItem]);
    resp.status(201).json(newItem);
  }

  async toEdit(req: Request, resp: Response) {
    const id = req.params.id;
    const newData = req.body;
    await this.repo.edit(id, newData);
    resp.send("Edit was successful");
  }
}
