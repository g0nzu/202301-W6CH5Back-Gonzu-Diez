import { Response, Request, NextFunction } from 'express';
import { itemStructure } from '../entities/itemType.js';
import { Repo } from '../repository/repo.interface.js';

export const file = 'data/data.json';

export class ShopController {
  constructor(public repo: Repo<itemStructure>) {
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
        res.json(findID);
      } else {
        res.status(404).json({ message: 'Elemento no encontrado' });
      }
    } catch (error) {
      next(error);
    }
  }

  async toDelete(req: Request, resp: Response, next: NextFunction) {
    try {
      await this.repo.delete(req.params.id);
      resp.json({
        results: [],
      });
    } catch (error) {
      next(error);
    }
  }

  async write(req: Request, resp: Response, next: NextFunction) {
    try {
      const data = await this.repo.create(req.body);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async edit(req: Request, resp: Response, next: NextFunction) {
    try {
      req.body.id = req.params.id ? req.params.id : req.body.id;
      const data = await this.repo.edit(req.body);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }
}
