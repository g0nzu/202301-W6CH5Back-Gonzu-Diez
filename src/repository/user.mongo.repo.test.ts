import { UserMongoRepo } from './user.mongo.repo';
import { User } from '../entities/user';
import { UserModel } from './user.mongo.model';

jest.mock('./user.mongo.model.ts');

describe('Given the Mongo repo', () => {
  const repo = new UserMongoRepo();
  describe('When its called', () => {
    test('It should be instantiated', () => {
      expect(repo).toBeInstanceOf(UserMongoRepo);
    });
  });

  describe('When we use Read', () => {
    test('Then, it should return the data', async () => {
      (UserModel.find as jest.Mock).mockResolvedValue([]);
      const result = await repo.read();

      expect(UserModel.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When we use the search method', () => {
    test('Then, it should return an array of the search', async () => {
      (UserModel.find as jest.Mock).mockResolvedValue([
        {
          key: 'some',
          value: 'some2',
        },
      ]);
      const result = await repo.search({ key: 'some', value: 'some2' });
      expect(UserModel.find).toHaveBeenCalled();
      expect(result).toEqual([
        {
          key: 'some',
          value: 'some2',
        },
      ]);
    });
  });

  describe('When we use Write', () => {
    test('Then it should return the data', async () => {
      const newItem: User = {
        id: '2',
        email: 'paco@gmail.com',
        passwd: '22',
      };
      (UserModel.create as jest.Mock).mockResolvedValue(newItem);
      const result = await repo.create(newItem as User);
      expect(UserModel.create).toHaveBeenCalled();
      expect(result).toStrictEqual(newItem);
    });
  });

  describe('When the edit method is used', () => {
    beforeEach(async () => {
      (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        id: '2',
      });
    });

    test('Then if it has an object to edit, it should return the updated object', async () => {
      const itemMock = {
        id: '2',
        name: 'test',
      } as Partial<User>;

      const result = await repo.edit(itemMock);
      expect(UserModel.find).toHaveBeenCalled();
      expect(result).toEqual({ id: '2' });
    });
  });

  describe('When we use the delete method', () => {
    test('It should return a undefined value that shows that is has been deleted ', async () => {
      (UserModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
        '[{"id": "1"}]'
      );
      const id = '1';
      const result = await repo.delete(id);
      expect(UserModel.findByIdAndDelete).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });
});
