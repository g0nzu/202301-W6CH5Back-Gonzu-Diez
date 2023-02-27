import { Response, Request, NextFunction } from 'express';
import { itemStructure } from '../models/itemType';
import { ShopFileRepo } from '../repository/shop.file.repo';

export const file = 'data/data.json';

export class ShopController {
  constructor(public repo: ShopFileRepo) {
    this.repo = repo;
  }

  async getAll(req: Request, resp: Response, next: NextFunction) {
    try {
      const data = await this.repo.read();
      resp.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getByID(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.repo.read();
      const id = Number(req.params.id);
      const findID = data.find((item) => item.id === Number(id));
      if (findID) {
        res.send(findID);
      } else {
        res.status(404).json({ message: 'Elemento no encontrado' });
      }
    } catch (error) {
      next(error);
    }
  }

  async toDelete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.repo.delete(Number(req.params.id));
      res.send('Delete was successful');
    } catch (error) {
      next(error);
    }
  }

  async toCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price } = req.body;
      const data = await this.repo.read();
      const newItem = { name, price, id: data.length + 1 };
      await this.repo.write([...data, newItem]);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }

  async toEdit(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const newData = req.body;
      await this.repo.edit(id, newData);
      res.send('Edit was successful');
    } catch (error) {
      next(error);
    }
  }
}
