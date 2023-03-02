import { Response, Request, NextFunction } from 'express';
import { itemStructure } from '../entities/itemType.js';
import { User } from '../entities/user.js';
import { HTTPError } from '../errors/error.js';
import { RequestPlus } from '../interceptors/logged.js';
import { Repo } from '../repository/repo.interface.js';

export const file = 'data/data.json';

export class ShopController {
  constructor(public repo: Repo<itemStructure>, public repoUsers: Repo<User>) {
    this.repo = repo;
    this.repoUsers = repoUsers;
  }

  async read(req: Request, resp: Response, next: NextFunction) {
    try {
      const data = await this.repo.read();
      resp.json({
        result: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async queryId(req: Request, res: Response, next: NextFunction) {
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

  async delete(req: Request, resp: Response, next: NextFunction) {
    try {
      await this.repo.delete(req.params.id);
      resp.json({
        results: [],
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req: RequestPlus, resp: Response, next: NextFunction) {
    try {
      const userId = req.info?.id;

      if (!userId) throw new HTTPError(404, 'Not found', 'User ID not found');
      const actualUser = await this.repoUsers.queryId(userId);

      req.body.owner = userId;
      const newThing = await this.repo.create(req.body);

      actualUser.items.push(newThing);
      this.repoUsers.edit(actualUser);

      resp.json({
        results: [newThing],
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
