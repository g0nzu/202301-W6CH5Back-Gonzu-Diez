import { NextFunction } from 'express';
import { Request, Response } from 'express';
import { HTTPError } from '../errors/error';
import Auth, { TokenPayLoad } from '../services/auth';

export interface RequestPlus extends Request {
  info?: TokenPayLoad;
}

export function Logged(req: RequestPlus, resp: Response, next: NextFunction) {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer'))
      throw new HTTPError(
        498,
        'Invalid LogIn Token',
        'Not value in auth header'
      );
    const token = authHeader.slice(7);
    const payload = Auth.verifyJWT(token);
    next();
    req.info = payload;
  } catch (error) {
    next(error);
  }
}
