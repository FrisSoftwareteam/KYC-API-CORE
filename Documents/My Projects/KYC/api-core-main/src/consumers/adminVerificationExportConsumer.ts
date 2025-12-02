import { AwilixContainer } from 'awilix';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (container: AwilixContainer, channel: any, queueName: string) => {
  const catcher = container.resolve('catcher');
  const logger = container.resolve('logger');
  const AdminService = container.resolve('AdminService');

  channel.prefetch(1);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  channel.consume(queueName, async (message: Record<string, any>) => {
    try {
      const payload = message.content.toString();
      const data = JSON.parse(payload);

      await AdminService.exportVerifications(data);

      logger.info('Export Admin Verifications Done.');

      return channel.ack(message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      logger.error(JSON.stringify(err));
      catcher(
        'ExportAdminVerificationConsumerError',
        {
          params: message.content.toString(),
          error: err.message,
        },
        'error',
      );

      return channel.ack(message, false, true);
    }
  });
};
