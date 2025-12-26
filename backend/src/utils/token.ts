import { TokenPayload } from '../types/global';
import jwt, { SignOptions } from 'jsonwebtoken';

export const signinToken = (
  payload: TokenPayload | string,
  expiresIn: string | number = '1h'
): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is missing in environment variables');
  }
  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions['expiresIn'],
  };
  const finalPayload = typeof payload === 'string' ? { id: payload } : payload;
  return jwt.sign(finalPayload, secret, options);
};

export const verifyToken = (token: string) => {
  const verifiedToken = jwt.verify(token, String(process.env.JWT_SECRET));
  return verifiedToken;
};
