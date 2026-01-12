import { redis } from '../config/redis-connection';
import { randomUUID } from 'node:crypto';
import logger from '../utils/logger';
import { REDIS_KEY } from '../utils/utils';

export const createAndStoreHash = async (userId: string) => {
  try {
    const _createToken = randomUUID();
    logger.info(`Token has been generated`);
    const ExpiryLimit = Number(process.env.EXPIRY_LIMIT ?? 300);
    const storeUid = await redis.setex(
      `${REDIS_KEY}${userId}`,
      ExpiryLimit,
      _createToken
    );
    if (storeUid != 'OK') {
      return null;
    }
    logger.info(`Token has been stored to the redis`);
    return _createToken;
  } catch (error) {
    logger.error(`Token creation failed | details=${error} `);
    throw error;
  }
};

export const getToken = async (userId: string) => {
  try {
    const _token = await redis.get(`${REDIS_KEY}${userId}`);

    if (_token == null) {
      return null;
    }
    logger.info('Token has been retrieved from redis');
    return _token;
  } catch (error) {
    logger.error(`Token fetched failed | details=${error} `);
    throw error;
  }
};

// TODO: more roboust
export const isVerifiedToken = async (genHash: string, userHash: string) => {
  try {
    return genHash === userHash;
  } catch (error) {
    logger.error(`Token verification failed | details=${error}`);
    return false;
  }
};

export const delToken = async (userId: string) => {
  try {
    const _del = await redis.del(`${REDIS_KEY}${userId}`);
    logger.info(`Token deletion state details=${_del}`);
  } catch (error) {
    logger.error(`Token deletion failed | details=${error}`);
  }
};
