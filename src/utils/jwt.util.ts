import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { config } from '../config/default';
import { Token } from '../schema/response';
import { logger } from './logger';
const { accessTokenPrivateKey, accessTokenPublicKey } = config;

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  try {
    return jwt.sign(object, accessTokenPrivateKey, {
      ...(options && options),
      algorithm: 'RS256',
    });
  } catch (error) {
    logger.info(`Error signing JWT:, ${error}`);
    throw error;
  }
}

export function verifyJwt(token: Token) {
  const { accessToken } = token;
  try {
    const decoded = jwt.verify(accessToken, accessTokenPublicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    if (error instanceof TokenExpiredError) {
      return {
        valid: false,
        expired: true,
        decoded: null,
      };
    } else if (error instanceof JsonWebTokenError) {
      logger.info(error.message);
      return {
        valid: false,
        expired: false,
        decoded: null,
      };
    } else {
      throw error;
    }
  }
}
