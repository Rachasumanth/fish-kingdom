import { redis } from '@devvit/web/server';

export const SUPPORT_SKU = 'support-app';
const SUPPORT_COUNT_KEY = 'support:count';

export const recordSupport = async (): Promise<number> => {
  return await redis.incrBy(SUPPORT_COUNT_KEY, 1);
};
