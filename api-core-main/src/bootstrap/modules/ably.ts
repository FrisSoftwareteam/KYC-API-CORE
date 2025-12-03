import { AwilixContainer, asValue } from 'awilix';

import * as Ably from 'ably';

export default async (container: AwilixContainer) => {
  const config = container.resolve('config');
  const { apiKey } = config.get('ably');

  const logger = container.resolve('logger');

  let ablyClient: Ably.RealtimeClient;

  const options: Ably.ClientOptions = {
    key: apiKey,
  };

  const start = async () => {
    ablyClient = new Ably.Realtime(options);

    ablyClient.connection.once('connected', () => {
      logger.info('ably connected.');
    });

    return ablyClient;
  };

  const stop = async () => await ablyClient.close();

  const register = async () => container.register('AblyClient', asValue(ablyClient));

  return {
    start,
    stop,
    register,
  };
};
