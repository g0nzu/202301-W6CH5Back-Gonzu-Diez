import { Repo } from './repo.interface';
import { itemStructure } from '../models/itemType.js';
import { ItemModel } from './shop.mongo.models';
import { CustomError, HTTPError } from '../errors/error';

export class ShopMongoRepo implements Repo<itemStructure> {
  edit(
    _data: Partial<itemStructure>,
    _newData: Partial<itemStructure>
  ): Promise<itemStructure> {
    throw new Error('Method not implemented.');
  }

  async read(): Promise<itemStructure[]> {
    const data: itemStructure[] = await ItemModel.find();
    return data;
  }

  async write(data: Partial<itemStructure>): Promise<itemStructure> {
    const info = await ItemModel.create(data);
    return info;
  }

  async update(info: Partial<itemStructure>): Promise<itemStructure> {
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
export { ItemModel };
