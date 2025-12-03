import { AwilixContainer, asValue } from 'awilix';

import { createClient, RedisClientType } from 'redis';

export default async (container: AwilixContainer) => {
  const config = container.resolve('config');
  const { url } = config.get('redis');

  const logger = container.resolve('logger');

  let redisClient: RedisClientType;

  const start = async () => {
    redisClient = await createClient({ url });

    await redisClient.connect();

    logger.info('redis connected.');

    return redisClient;
  };

  const stop = async () => await redisClient.quit();

  const register = async () => container.register('RedisClient', asValue(redisClient));

  return {
    start,
    stop,
    register,
  };
};
