import { Response } from 'express';
import { Request } from 'express';
import { UsersController } from './users.controller';
import { Repo } from '../repository/repo.interface';
import { User } from '../entities/user';
import Auth from '../services/auth';
import { NextFunction } from 'express';
import { UserMongoRepo } from '../repository/user.mongo.repo';
import { TokenPayLoad } from '../services/auth';

jest.mock('../services/auth');

describe('Given the register method', () => {
  const mockRepo = {
    create: jest.fn(),
    search: jest.fn(),
  } as unknown as Repo<User>;

  const repoUsers = {} as UserMongoRepo;

  const controller = new UsersController(mockRepo);

  const resp = {
    status: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;

  const next = jest.fn();

  describe('When there is no password & email in the body', () => {
    test('Next from express should has been called', async () => {
      const req = {
        body: {},
      } as Request;

      await controller.register(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When there is no password in the body', () => {
    test('Next from express should has been called', async () => {
      const req = {
        body: {
          passwd: 'root',
        },
      } as Request;

      await controller.register(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When there is no email in the body', () => {
    test('Next from express should has been called', async () => {
      const req = {
        body: {
          email: 'paco',
        },
      } as Request;

      await controller.register(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When there are a password in the body', () => {
    const req = {
      body: {
        email: 'test',
        passwd: 'test',
      },
    } as Request;
    test('The data should be returned as JSON', async () => {
      await controller.register(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
    });
  });
});

describe('Given login method from UsersController', () => {
  const mockRepo = {
    create: jest.fn(),
    search: jest.fn(),
  } as unknown as Repo<User>;

  const controller = new UsersController(mockRepo);

  const resp = {
    status: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;

  const req = {
    body: {
      email: 'test',
      passwd: 'test',
    },
  } as Request;

  const next = jest.fn();

  Auth.toUnHash = jest.fn().mockResolvedValue(true);

  describe('When ALL is OK', () => {
    (mockRepo.search as jest.Mock).mockResolvedValue(['test']);
    test('Then json should be called', async () => {
      await controller.login(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
    });
  });
});
