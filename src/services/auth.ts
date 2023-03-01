import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import bcrypt from 'bcryptjs';

export type TokenPayLoad = {
  email: string;
  role: string;
};

const salt = 10;

export class Auth {
  static createJWT(payload: TokenPayLoad) {
    return jwt.sign(payload, config.jwtSecret as string);
  }

  static verifyJWT(token: string) {
    const result = jwt.verify(token, config.jwtSecret as string);
    if (typeof result === 'string') throw new Error('Invalid payload');
    return result;
  }

  static toHash(value: string) {
    return bcrypt.hash(value, salt);
  }
  static toUnHash(value: string, hash: string) {
    return bcrypt.compare(value, hash);
  }
}

export default Auth;
