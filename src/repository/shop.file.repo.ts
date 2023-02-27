import fs from 'fs/promises';
import { itemStructure } from '../models/itemType';
const file = 'data/data.json';
import { Repo } from './repo.interface';

export class ShopFileRepo {
  read() {
    return fs.readFile(file, { encoding: 'utf-8' }).then((data) => {
      console.log('Data read successfully from file:', data);
      return JSON.parse(data) as any[];
    });
  }

  async write(data: itemStructure[]) {
    const fileData = await fs.readFile(file, 'utf-8');
    const parsedData = JSON.parse(fileData);
    const newData = [...parsedData, ...data];
    const finalFile = JSON.stringify(newData);
    await fs.writeFile(file, finalFile, 'utf-8');
    console.log('Data written successfully to file:', finalFile);
    return data as itemStructure[];
  }

  async edit(id: number, newData: Partial<itemStructure>) {
    const data = await fs.readFile(file, 'utf-8');
    const parseJSON = JSON.parse(data);
    const updatedData = parseJSON.map((item: { id: number }) => {
      if (item.id === id) {
        return { ...item, ...newData };
      }
      return item;
    });
    const finalFile = JSON.stringify(updatedData);
    await fs.writeFile(file, finalFile, 'utf-8');
    console.log('Data edited successfully in file:', finalFile);
    return newData as itemStructure;
  }

  async delete(id: number) {
    const data = await fs.readFile(file, 'utf-8');
    const parseJSON = JSON.parse(data);
    const finalFile = JSON.stringify(
      parseJSON.filter((item: { id: number }) => item.id !== id)
    );
    await fs.writeFile(file, finalFile, 'utf-8');
  }
}
