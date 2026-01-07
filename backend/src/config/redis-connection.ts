import Redis from 'ioredis';
import { REDIS_URL } from './conf';

declare global {
  var redis: Redis;
}

if (!redis) {
  redis = new Redis({
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  });
}

if (process.env.NODE_ENV !== 'production') {
  global.redis == global.redis || redis;
}

export { redis };
