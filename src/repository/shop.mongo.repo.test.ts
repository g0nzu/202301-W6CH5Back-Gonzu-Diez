import { itemStructure } from '../models/itemType';
import { ItemModel } from './shop.mongo.models';
import { ShopMongoRepo } from './shop.mongo.repo';

jest.mock('./shop.mongo.models.ts');

describe('Given the Mongo repo', () => {
  const repo = new ShopMongoRepo();
  describe('When its called', () => {
    test('It should be instantiated', () => {
      expect(repo).toBeInstanceOf(ShopMongoRepo);
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

  describe('When we use Write', () => {
    test('Then it should return the data', async () => {
      const newItem: itemStructure = {
        id: 2,
        name: 'eggs',
        price: 1.5,
      };
      (ItemModel.create as jest.Mock).mockResolvedValue(newItem);
      const result = await repo.write(newItem as itemStructure);
      expect(ItemModel.create).toHaveBeenCalled();
      expect(result).toStrictEqual(newItem);
    });
  });

  describe('When the update method is used', () => {
    beforeEach(async () => {
      (ItemModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        id: '2',
      });
    });

    test('Then if it has an object to update, it should return the updated object', async () => {
      const itemMock = {
        id: '2',
        name: 'test',
      } as Partial<itemStructure>;

      const result = await repo.update(itemMock);
      expect(ItemModel.find).toHaveBeenCalled();
      expect(result).toEqual({ id: '2' });
    });
  });

  describe('When we use the delete method', () => {
    test('It should return a undefined value that shows that is has been deleted ', async () => {
      (ItemModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
        '[{"id": "1"}]'
      );
      const id = '1';
      const result = await repo.delete(id);
      expect(ItemModel.findByIdAndDelete).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });
});
