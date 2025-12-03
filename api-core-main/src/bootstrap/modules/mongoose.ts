import * as awilix from 'awilix';
import * as mongoose from 'mongoose';

interface MongooseConnectionInterface {
  url: string;
  minPoolSize: number;
  maxPoolSize: number;
  serverSelectionTimeoutMS: number;
}

export default async (container: awilix.AwilixContainer) => {
  const config = container.resolve('config');
  const logger = container.resolve('logger');

  const { url, minPoolSize, maxPoolSize, serverSelectionTimeoutMS }: MongooseConnectionInterface =
    config.get('db');

  let mongooseConnection: mongoose.Connection;

  const start = async () => {
    mongooseConnection = await mongoose.createConnection(url, {
      serverSelectionTimeoutMS,
      autoIndex: true,
      minPoolSize,
      maxPoolSize,
    });

    const addUpdatedAt = (schema: mongoose.Schema) => {
      schema.pre('findOneAndUpdate', function addUpdatedAtPreFindOneAndUpdate(next) {
        this.findOneAndUpdate({}, { $set: { updatedAt: new Date() } });
        next();
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      schema.pre('update' as any, function addUpdatedAtPreUpdate(next) {
        this.update({}, { $set: { updatedAt: new Date() } });
        next();
      });
    };

    mongoose.plugin(addUpdatedAt);

    logger.info('mongoose connected.');

    return mongooseConnection;
  };

  const stop = async () => mongooseConnection.close();

  const register = async () =>
    container.register('mongooseConnection', awilix.asValue(mongooseConnection));

  return {
    start,
    stop,
    register,
  };
};
