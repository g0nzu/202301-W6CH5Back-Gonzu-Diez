import { NextFunction } from 'express';
import { Request, Response } from 'express';
import { RequestPlus } from './logged';

export function Authorized(
  req: RequestPlus,
  resp: Response,
  next: NextFunction
) {
  try {
    next();
  } catch (error) {
    next(error);
  }
}
