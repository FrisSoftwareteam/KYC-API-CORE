import * as awilix from 'awilix';
import * as Sentry from '@sentry/node';
import { formatCapitalizedWithAppend } from './utils';
import { config } from '../config';
import logger from '../core/Logger';
import catcher from '../logger/catcher';
import NotificationProvider from '../providers/notifications/index.notification';
import GoogleClientProvider from '../providers/address/google.provider';
import { GoogleClientInterface } from '../providers/address/types/google.type';
import PaystackProvider from '../providers/payments/paystack.provider';
import EventEmitterBroker from '../events';
import { sendAgentNotificationToAbly } from '../events/notifications/sendNotificationToAgentEvent';
import IdentityProvider from '../providers/identity/identity.provider';
import CloudinaryUploader from '../providers/uploader/cloudinary.uploader';
import MicrosoftBlobUploader from '../providers/uploader/microsoft.uploader';
import Payarena from '../providers/bank/payarena.provider';
// import ServiceCaller from '../utils/service-caller';

// create container
const container = awilix.createContainer();

// register config
container.register('Sentry', awilix.asValue(Sentry));

// register config
container.register('config', awilix.asValue(config));

// register logger
container.register('logger', awilix.asValue(logger));

// register NotificationProvider
container.register('NotificationProvider', awilix.asClass(NotificationProvider));

// register EventEmitterBroker
container.register('EventEmitterBroker', awilix.asValue(EventEmitterBroker));

// register IdentityProvider
container.register('IdentityProvider', awilix.asClass(IdentityProvider));

// register PaystackProvider
container.register('PaystackProvider', awilix.asClass(PaystackProvider));

// register CloudinaryUploader
container.register('CloudinaryUploader', awilix.asClass(CloudinaryUploader));

// register MicrosoftBlobUploader
container.register('MicrosoftBlobUploader', awilix.asClass(MicrosoftBlobUploader));

// register MicrosoftBlobUploader
container.register('Payarena', awilix.asClass(Payarena));

// register sendAgentNotificationToAbly
container.register('sendAgentNotificationToAbly', awilix.asValue(sendAgentNotificationToAbly));

// register notification provider
container.register<GoogleClientInterface>(
  'GoogleClientProvider',
  awilix.asClass(GoogleClientProvider),
);

// register logger
// container.register('ServiceCaller', awilix.asClass(ServiceCaller));

// register capture exception
container.register('catcher', awilix.asFunction(catcher));

if (!container.resolve('config').get('db').url) {
  container.resolve('logger').error('Database URI must be specified in environment variable');
  process.exit(0);
}

// register data source
// container.register('Datasource', awilix.asValue(Datasource));

// load all files in entities
container.loadModules(['../models/**/*{.ts,.js}'], {
  cwd: __dirname,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatName: formatCapitalizedWithAppend('Model') as any,
});

// load all files in services
container.loadModules(['../data-access/*{.ts,.js}'], {
  cwd: __dirname,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatName: formatCapitalizedWithAppend('DataAccess') as any,
});

// load all files in services
container.loadModules(['../services/*{.ts,.js}'], {
  cwd: __dirname,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatName: formatCapitalizedWithAppend('Service') as any,
});

// load service callers
container.loadModules(['../service-callers/*{.ts,.js}'], {
  cwd: __dirname,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatName: formatCapitalizedWithAppend('ServiceCaller') as any,
  resolverOptions: {
    lifetime: awilix.Lifetime.SINGLETON,
  },
});

export default container;
