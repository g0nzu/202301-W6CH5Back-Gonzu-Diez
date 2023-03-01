import { Response, Request, NextFunction } from 'express';
import { ShopController } from './shop.controllers';
import { ShopFileRepo } from '../repository/shop.file.repo';

describe('Given ShopController', () => {
  const repo: ShopFileRepo = {
    read: jest.fn(),
    create: jest.fn(),
    edit: jest.fn(),
    delete: jest.fn(),
    search: jest.fn(),
  };

  const req = {
    body: {},
    params: { id: '' },
  } as unknown as Request;

  const resp = {
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  const controller = new ShopController(repo);

  describe('When we try to use the getAll method', () => {
    test('Then, it should load data without errors', async () => {
      (repo.read as jest.Mock).mockRejectedValue(new Error());
      await controller.getAll(req, resp, next);
      expect(repo.read).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });

    test('Then, it should call next with an error when read method fails', async () => {
      const error = new Error('Read error');
      (repo.read as jest.Mock).mockRejectedValue(error);
      await controller.getAll(req, resp, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('When we try to use the toDelete method', () => {
    test('Then, it should delete the data', async () => {
      await controller.toDelete(req, resp, next);
      expect(repo.delete).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then, it should call next with an error when delete method fails', async () => {
      const error = new Error('Delete error');
      (repo.delete as jest.Mock).mockRejectedValue(error);
      await controller.toDelete(req, resp, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('When we try to use the toCreate method', () => {
    test('Then, it should create a new one', async () => {
      await controller.write(req, resp, next);
      expect(repo.create).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then, it should call next with an error when write method fails', async () => {
      const error = new Error('Write error');
      (repo.create as jest.Mock).mockRejectedValue(error);
      await controller.write(req, resp, next);
      expect(next).toHaveBeenCalledWith(error as Error);
    });
  });

  describe('When we try to use the toEdit method', () => {
    test('Then, it should edit without errors', async () => {
      await controller.edit(req, resp, next);
      expect(repo.edit).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then, it should call next with an error when edit method fails', async () => {
      const error = new Error('Edit error');
      (repo.edit as jest.Mock).mockRejectedValue(error);
      await controller.edit(req, resp, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
