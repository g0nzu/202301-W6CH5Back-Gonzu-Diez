import { Response, Request, NextFunction } from 'express';
import { ShopFileRepo } from '../repository/shop.file.repo';
import { ShopController } from './shop.controllers';
import { UserMongoRepo } from '../repository/user.mongo.repo';

describe('Given ShopController', () => {
  const repo: ShopFileRepo = {
    create: jest.fn(),
    read: jest.fn(),
    queryId: jest.fn(),
    edit: jest.fn(),
    delete: jest.fn(),
    search: jest.fn(),
  };

  const userRepo = {
    create: jest.fn(),
    read: jest.fn(),
    queryId: jest.fn(),
    edit: jest.fn(),
    delete: jest.fn(),
    search: jest.fn(),
  } as UserMongoRepo;

  const req = {
    body: {},
    params: { id: '' },
  } as unknown as Request;
  const resp = {
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  const controller = new ShopController(repo, userRepo);

  describe('when we use getAll', () => {
    test('Then it should ... if there ara NOT errors', async () => {
      await controller.read(req, resp, next);
      expect(repo.read).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then it should ... if there are errors', async () => {
      (repo.read as jest.Mock).mockRejectedValue(new Error());
      await controller.read(req, resp, next);
      expect(repo.read).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('when we use get', () => {
    test('Then it should ... if there ara NOT errors', async () => {
      await controller.queryId(req, resp, next);
      expect(repo.queryId).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then it should ... if there are errors', async () => {
      (repo.queryId as jest.Mock).mockRejectedValue(new Error());
      await controller.queryId(req, resp, next);
      expect(repo.queryId).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('when we use post', () => {
    test('When i dont have an id it should throw and error', async () => {
      const req = {
        info: {
          email: 'test',
          role: 'user',
        },
      } as unknown as Request;
      await controller.create(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
    test('If everything is ok it should create', async () => {
      const newID = '2';

      const req = {
        body: { owner: '2' },
        info: {
          id: newID,
        },
      } as unknown as Request;
      await controller.create(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
    });
  });

  describe('when we use patch', () => {
    test('Then it should ... if there ara NOT errors', async () => {
      await controller.edit(req, resp, next);
      expect(repo.edit).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then it should ... if there are errors', async () => {
      (repo.edit as jest.Mock).mockRejectedValue(new Error());
      await controller.edit(req, resp, next);
      expect(repo.edit).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
  describe('when we use delete', () => {
    test('Then it should ... if there ara NOT errors', async () => {
      controller.delete(req, resp, next);
      expect(repo.delete).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then it should ... if there are errors', async () => {
      (repo.delete as jest.Mock).mockRejectedValue(new Error());
      expect(repo.delete).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});
