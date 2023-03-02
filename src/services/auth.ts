import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import bcrypt from 'bcryptjs';
import { HTTPError } from '../errors/error.js';

export interface TokenPayLoad extends jwt.JwtPayload {
  id: string;
  email: string;
  role: string;
}

const salt = 10;

export class Auth {
  static createJWT(payload: TokenPayLoad) {
    return jwt.sign(payload, config.jwtSecret as string);
  }

  static verifyJWT(token: string): TokenPayLoad {
    const result = jwt.verify(token, config.jwtSecret as string);
    if (typeof result === 'string')
      throw new HTTPError(498, 'Invalid payload', result);
    return result as TokenPayLoad;
  }

  static toHash(value: string) {
    return bcrypt.hash(value, salt);
  }
  static toUnHash(value: string, hash: string) {
    return bcrypt.compare(value, hash);
  }
}

export default Auth;
