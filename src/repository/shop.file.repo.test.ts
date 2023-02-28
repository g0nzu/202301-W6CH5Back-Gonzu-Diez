import { ShopFileRepo } from './shop.file.repo.js';
import fs from 'fs/promises';
import { itemStructure } from '../models/itemType.js';
import { file } from '../controllers/shop.controllers.js';
jest.mock('fs/promises');

describe('Given ShopFileRepo', () => {
  const repo = new ShopFileRepo();
  describe('When we are instancing the repo methods ', () => {
    test('Then it could be instantiated', () => {
      expect(repo).toBeInstanceOf(ShopFileRepo);
    });
  });

  describe('When we use the Read method', () => {
    test('Then, it should return the data', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[]');
      const result = await repo.read();
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When we use the Write method', () => {
    test('Then it should return the new item if successfully written', async () => {
      const newItem: itemStructure = {
        id: 2,
        name: 'eggs',
        price: 1.5,
      };
      (fs.readFile as jest.Mock).mockResolvedValue('[]');

      const result = await repo.write([newItem]);

      expect(fs.readFile).toHaveBeenCalled();

      expect(result).toStrictEqual([newItem]);
    });

    describe('When we use the Edit method', () => {
      test('Then it should return the original object if the id is not found', async () => {
        (fs.readFile as jest.Mock).mockResolvedValue(
          '[{ "id": 2, "name": "milk", "price": 2}]'
        );
        const result = await repo.edit(2, {
          id: 2,
          name: 'test',
          price: 2,
        });
        expect(fs.readFile).toHaveBeenCalled();
        expect(result).toStrictEqual({
          id: 2,
          name: 'test',
          price: 2,
        });
      });
    });
  });

  describe('When we use the Delete method', () => {
    test('It should return a void value or empty array of the deleted array', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{"id": "1"}]');
      const id = 1;
      const result = await repo.delete(id);
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });
});
