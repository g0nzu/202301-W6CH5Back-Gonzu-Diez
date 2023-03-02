import { ShopFileRepo } from './shop.file.repo.js';
import fs from 'fs/promises';
import { itemStructure } from '../entities/itemType.js';
import { file } from '../controllers/shop.controllers.js';
import { ItemModel } from './shop.mongo.models.js';
jest.mock('fs/promises');

jest.mock('./shop.mongo.models');

describe('Given ShopFileRepo', () => {
  const repo = new ShopFileRepo();
  describe('When we are instancing the repo methods ', () => {
    test('Then it could be instantiated', () => {
      expect(repo).toBeInstanceOf(ShopFileRepo);
    });
  });

  describe('When we use Read', () => {
    test('Then, it should return the data', async () => {
      (ItemModel.find as jest.Mock).mockResolvedValue([]);
      const result = await repo.read();

      expect(ItemModel.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When we use the search method', () => {
    test('Then, it should return an array of the search', async () => {
      (ItemModel.find as jest.Mock).mockResolvedValue([
        {
          key: 'some',
          value: 'some2',
        },
      ]);
      const result = await repo.search({ key: 'some', value: 'some2' });
      expect(ItemModel.find).toHaveBeenCalled();
      expect(result).toEqual([
        {
          key: 'some',
          value: 'some2',
        },
      ]);
    });
  });

  describe('When we use the Write method', () => {
    test('Then it should return the new item if successfully written', async () => {
      const newItem: itemStructure = {
        id: 2,
        name: 'eggs',
        price: 1.5,
        owner: {
          id: '',
          email: '',
          passwd: '',
          items: [],
        },
      };
      (fs.readFile as jest.Mock).mockResolvedValue('[]');

      const result = await repo.create(newItem);

      expect(fs.readFile).toHaveBeenCalled();

      expect(result).toStrictEqual(newItem);
    });

    describe('When we use the Edit method', () => {
      test('Then it should return the original object if the id is not found', async () => {
        (fs.readFile as jest.Mock).mockResolvedValue(
          '[{ "id": 2, "name": "milk", "price": 2}]'
        );
        const result = await repo.edit({
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
      const id = '1';
      const result = await repo.delete(id);
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });
});
