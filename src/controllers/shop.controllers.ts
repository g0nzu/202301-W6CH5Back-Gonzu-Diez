import { Response, Request } from "express";
import { itemStructure } from "../models/itemType";
import { ShopFileRepo } from "../repository/shop.file.repo";

export const file = "data/data.json";

export class ShopController {
  constructor(public repo: ShopFileRepo) {}

  getAll(req: Request, res: Response) {
    this.repo.read().then((data) => {
      res.send(data);
    });
  }

  getByID(req: Request, res: Response) {
    this.repo.read().then((data) => {
      const id = Number(req.params.id);
      const findID = data.find((item) => item.id === Number(id));
      if (findID) {
        res.send(findID);
      }
      if (!findID) {
        res.status(404).json({ message: "Elemento no encontrado" });
      }
    });
  }

  async toDelete(req: Request, res: Response) {
    await this.repo.delete(req.params.id);
    res.send("Delete was sucessful");
  }

  async toCreate(req: Request, res: Response) {
    const { name, price } = req.body;
    const newItem = { name, price, id: file.length + 1 };
    await this.repo.write([newItem]);
    res.status(201).json(newItem);
  }

  async toEdit(req: Request, res: Response) {
    const id = req.params.id;
    const newData = req.body;
    await this.repo.edit(id, newData);
    res.send("Edit was successful");
  }
}
