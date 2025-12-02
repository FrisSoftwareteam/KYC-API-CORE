import jwt, { SignOptions } from 'jsonwebtoken';
import logger from './Logger';

export const signJwt = (payload: Record<string, unknown>, key: string, options: SignOptions) => {
  const privateKey = Buffer.from(key, 'base64').toString('ascii');
  return jwt.sign(payload, privateKey, {
    ...options,
    algorithm: 'RS256',
    allowInsecureKeySizes: true,
  });
};

// 👇 Verify Access or Refresh Token
export const verifyJwt = (token: string, key: string) => {
  try {
    const publicKey = Buffer.from(key, 'base64').toString('ascii');
    return jwt.verify(token, publicKey);
  } catch (err) {
    logger.info('JWT_VERIFICATION ERROR', err);
    return null;
  }
};
