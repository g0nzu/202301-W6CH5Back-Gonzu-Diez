import { Response, Request, NextFunction } from 'express';
import debug from 'debug';
import { User } from '../entities/user.js';
import { Repo } from '../repository/repo.interface.js';
import { HTTPError } from '../errors/error.js';
import { Auth, TokenPayLoad } from '../services/auth.js';

export class UsersController {
  constructor(public repo: Repo<User>) {
    debug('Instantiate');
  }

  async register(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('register:post');
      if (!req.body.email || !req.body.passwd)
        throw new HTTPError(401, 'Unauthorized', 'Invalid Email or password');
      req.body.passwd = await Auth.toHash(req.body.passwd);
      req.body.items = [];
      const data = await this.repo.create(req.body);
      console.log(data);
      resp.status(201);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('login:post');
      if (!req.body.email || !req.body.passwd)
        throw new HTTPError(401, 'Unauthorized', 'Invalid Email or password');
      const data = await this.repo.search({
        key: 'email',
        value: req.body.email,
      });
      if (!data.length)
        throw new HTTPError(401, 'Unauthorized', 'Email not found');
      if (!(await Auth.toUnHash(req.body.passwd, data[0].passwd)))
        throw new HTTPError(401, 'Unauthorized', 'Password not match');
      const payload: TokenPayLoad = {
        id: data[0].id,
        email: data[0].email,
        role: 'admin',
      };
      const token = Auth.createJWT(payload);
      resp.status(202);
      resp.json({
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}
