import { Repo } from './repo.interface';
import { itemStructure } from '../models/itemType';
import { ItemModel } from './shop.mongo.repoo';

export class ShopMongoRepo implements Repo<itemStructure> {
  async read(): Promise<itemStructure[]> {
    const data: itemStructure[] = await ItemModel.find();
    return data;
  }

  async write(data: Partial<itemStructure>): Promise<itemStructure> {
    const info = await ItemModel.create(data);
    return info;
  }

  async edit(
    data: Partial<itemStructure>,
    newData: Partial<itemStructure>
  ): Promise<itemStructure> {
    const info = await ItemModel.findByIdAndUpdate(data.id, newData);
    return info as itemStructure;
  }

  async delete(id: string): Promise<void> {
    const data = await ItemModel.findByIdAndDelete(id);
  }
}
