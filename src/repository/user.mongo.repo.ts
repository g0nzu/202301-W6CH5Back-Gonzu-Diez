import { Repo } from './repo.interface';
import { UserModel } from './user.mongo.model.js';
import { CustomError, HTTPError } from '../errors/error.js';
import { User } from '../entities/user.js';
import debug from 'debug';

export class UserMongoRepo implements Repo<User> {
  async read(): Promise<User[]> {
    const data = await UserModel.find();
    return data;
  }

  async create(info: Partial<User>): Promise<User> {
    const data = await UserModel.create(info);
    return data;
  }

  async edit(info: Partial<User>): Promise<User> {
    const data = await UserModel.findByIdAndUpdate(info.id, info, {
      new: true,
    });
    if (!data) throw new HTTPError(404, 'Not Found', 'Id not found in update');
    return data;
  }

  async delete(id: string): Promise<void> {
    const data = await UserModel.findByIdAndDelete(id);
  }

  async search(query: { key: string; value: unknown }) {
    debug('search');
    const data = await UserModel.find({ [query.key]: query.value });
    return data;
  }

  async queryId(id: string): Promise<User> {
    debug('queryId');
    const data = await UserModel.findById(id);
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in queryId');
    return data;
  }
}
