import { HTTPError } from '../errors/error';
import Auth, { TokenPayLoad } from '../services/auth';
import { Logged, RequestPlus } from './logged';
import { NextFunction, Request, Response } from 'express';

jest.mock('../services/auth');

describe('Logged middleware', () => {
  const nextFunction: NextFunction = jest.fn();
  const response: Response = {} as Response;
  const request: RequestPlus = {
    get: jest.fn().mockReturnValue('Bearer token'),
  } as unknown as RequestPlus;
  const payload: TokenPayLoad = {
    userId: 'user-id',
    id: '',
    email: '',
    role: '',
  };

  beforeEach(() => {
    (Auth.verifyJWT as jest.Mock).mockReturnValue(payload);
  });

  test('should call next function when a valid token is provided', () => {
    Logged(request, response, nextFunction);
    expect(request.info).toEqual(payload);
    expect(nextFunction).toHaveBeenCalledTimes(1);
  });

  test('should throw an HTTPError when no Authorization header is provided', () => {
    request.get = jest.fn().mockReturnValue(null);
    expect(() => Logged(request, response, nextFunction)).toThrow(
      new HTTPError(498, 'Invalid LogIn Token', 'Not value in auth header')
    );
    expect(request.info).toBeUndefined();
    expect(nextFunction).toHaveBeenCalledTimes(0);
  });

  test('should throw an HTTPError when Authorization header does not start with "Bearer"', () => {
    request.get = jest.fn().mockReturnValue('invalid-token');
    expect(() => Logged(request, response, nextFunction)).toThrow(
      new HTTPError(498, 'Invalid LogIn Token', 'Not value in auth header')
    );
    expect(request.info).toBeUndefined();
    expect(nextFunction).toHaveBeenCalledTimes(0);
  });

  test('should throw an HTTPError when an invalid token is provided', () => {
    (Auth.verifyJWT as jest.Mock).mockImplementationOnce(() => {
      throw new Error();
    });
    expect(() => Logged(request, response, nextFunction)).toThrow(
      new HTTPError(498, 'Invalid LogIn Token', 'Invalid token')
    );
    expect(request.info).toBeUndefined();
    expect(nextFunction).toHaveBeenCalledTimes(0);
  });
});
