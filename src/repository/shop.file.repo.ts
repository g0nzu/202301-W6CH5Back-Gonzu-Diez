import debug from 'debug';
import fs from 'fs/promises';
import { itemStructure } from '../entities/itemType';
import { Repo } from './repo.interface';
import { ItemModel } from './shop.mongo.models';
const file = 'data/data.json';

export class ShopFileRepo implements Repo<itemStructure> {
  async read(): Promise<itemStructure[]> {
    const data = await ItemModel.find();
    return data;
  }

  async create(info: Partial<itemStructure>): Promise<itemStructure> {
    const initalData: string = await fs.readFile(file, { encoding: 'utf-8' });
    const data: itemStructure[] = JSON.parse(initalData);
    const finalData = [...data, info];
    await fs.writeFile(file, JSON.stringify(finalData), 'utf-8');
    return info as itemStructure;
  }

  async edit(info: Partial<itemStructure>): Promise<itemStructure> {
    if (!info.id) throw new Error('Not valid data');
    const initalData: string = await fs.readFile(file, { encoding: 'utf-8' });
    const data: itemStructure[] = JSON.parse(initalData);
    let updateItem: itemStructure = {} as itemStructure;
    const finalData = data.map((item) => {
      if (item.id === info.id) {
        updateItem = { ...item, ...info };
        return updateItem;
      }

      return item;
    });

    if (!updateItem.id) throw new Error('Id not found');
    await fs.writeFile(file, JSON.stringify(finalData), 'utf-8');
    return updateItem;
  }

  async delete(id: string): Promise<void> {
    const initialData: string = await fs.readFile(file, {
      encoding: 'utf-8',
    });
    const data: itemStructure[] = JSON.parse(initialData);
    const index = data.findIndex((item) => item.id === id);
    if (index < 0) throw new Error('Id not found!');
    data.slice(index, 1);
    fs.writeFile(file, JSON.stringify(data), 'utf-8');
  }

  async search(query: { key: string; value: unknown }) {
    debug('search');
    const data = await ItemModel.find({ [query.key]: query.value });
    return data;
  }
}
