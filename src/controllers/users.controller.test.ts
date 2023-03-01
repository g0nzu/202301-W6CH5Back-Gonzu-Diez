import { Response } from 'express';
import { Request } from 'express';
import { NextFunction } from 'express';
import { UsersController } from './users.controller';
import { UserMongoRepo } from '../repository/user.mongo.repo';
import Auth from '../services/auth';
import { TokenPayLoad } from '../services/auth';

jest.mock('../services/auth');

describe('Given the Users Controller', () => {
  const repo: UserMongoRepo = {
    read: jest.fn(),
    create: jest.fn(),
    edit: jest.fn(),
    delete: jest.fn(),
    search: jest.fn(),
  };

  const AuthMock: Auth = {
    toHash: jest.fn(),
    toUnHash: jest.fn(),
    createJWT: jest.fn(),
  };

  const req = {
    body: {
      email: 'test',
      password: 'test',
    },
  } as unknown as Request;

  const resp = {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as Response;

  const next = jest.fn() as unknown as NextFunction;

  const controller = new UsersController(repo);

  describe('When we use the register method', () => {
    test('It should allow the user to register', async () => {
      await controller.register(req, resp, next);
      expect(repo.create).toHaveBeenCalled();
      expect(resp.status).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });

  describe('When the Login method is called', () => {
    test('Then, if the login credentials are correct, it should return the token', () => {
      const mockPayload: TokenPayLoad = {
        email: 'paco@gmail.com',
        role: 'root',
      };
      const value = 'test';
      const hash = 'test';
      req.body.email = 'test';
      req.body.password = 'test';
      expect(repo.search).toHaveBeenCalled();
      expect(resp.status).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
      expect(Auth.createJWT(mockPayload)).toHaveBeenCalled();
      expect(Auth.toUnHash(value, hash)).toHaveBeenCalled();
    });
  });
});
