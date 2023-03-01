import { Repo } from './repo.interface';
import { itemStructure } from '../entities/itemType.js';
import { ItemModel } from './shop.mongo.models.js';
import { CustomError, HTTPError } from '../errors/error.js';
import debug from 'debug';

export class ShopMongoRepo implements Repo<itemStructure> {
  async search(query: { key: string; value: unknown }) {
    debug('search');
    const data = ItemModel.find({ [query.key]: query.value });
    return data;
  }

  async read(): Promise<itemStructure[]> {
    const data = await ItemModel.find();
    return data;
  }

  async create(data: Partial<itemStructure>): Promise<itemStructure> {
    const info = await ItemModel.create(data);
    return info;
  }

  async edit(info: Partial<itemStructure>): Promise<itemStructure> {
    const data = await ItemModel.findByIdAndUpdate(info.id, info, {
      new: true,
    });
    if (!data) throw new HTTPError(404, 'Not Found', 'Id not found in update');
    return data;
  }

  async delete(id: string): Promise<void> {
    const data = await ItemModel.findByIdAndDelete(id);
  }
}
