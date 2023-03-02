/* eslint-disable @typescript-eslint/ban-types */
import { Response, Request } from 'express';

import { Document, Types } from 'mongoose';
import { RequestPlus } from '../interceptors/logged';
import { itemStructure } from '../entities/itemType';
import { ShopMongoRepo } from '../repository/shop.mongo.repo';
import { UserMongoRepo } from '../repository/user.mongo.repo';
import { ShopController } from './shop.controllers';

describe('Given ThingsController', () => {
  const repo: ShopMongoRepo = {
    create: jest.fn(),
    read: jest.fn(),
    queryId: jest.fn(),
    edit: jest.fn(),
    delete: jest.fn(),

    search(_query: {
      key: string;
      value: unknown;
    }): Promise<
      (Document<unknown, {}, itemStructure> &
        Omit<itemStructure & { _id: Types.ObjectId }, never>)[]
    > {
      throw new Error('Function not implemented.');
    },
  };

  const repoUsers: UserMongoRepo = {
    create: jest.fn(),
    read: jest.fn(),
    search: jest.fn(),
    queryId: jest.fn(),
    edit: jest.fn(),
    delete: jest.fn(),
  };
  const req = {
    body: {},
    params: { id: '' },
  } as unknown as RequestPlus;
  const resp = {
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  const controller = new ShopController(repo, repoUsers);

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
    describe('When userId has value', () => {
      test('Then if everying is OK', async () => {
        const req = {
          body: {
            id: '1',
          },
          info: { id: '1' },
        } as unknown as Request;

        (repoUsers.queryId as jest.Mock).mockResolvedValue({ Item: [] });

        await controller.create(req, resp, next);
        expect(resp.json).toHaveBeenCalled();
      });
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
      (repo.delete as jest.Mock).mockRejectedValue(undefined);
      expect(repo.delete).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});
