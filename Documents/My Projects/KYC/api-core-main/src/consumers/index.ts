import { QUEUES } from '../constants';
import BulkIdentityConsumer from './bulkIdentityConsumer';
import BulkAddressConsumer from './bulkAddressConsumer';
import BroadcastAddressConsumer from './broadcastAddressConsumer';
import ExportAddressVerificationConsumer from './exportAddressVerificationConsumer';
import ExportAdminVerificationConsumer from './adminVerificationExportConsumer';

export default {
  [QUEUES.BULK_IDENTITY_UPLOAD]: BulkIdentityConsumer,
  [QUEUES.BULK_ADDRESS_UPLOAD]: BulkAddressConsumer,
  [QUEUES.BROADCAST_ADDRESS]: BroadcastAddressConsumer,
  [QUEUES.EXPORT_ADDRESS]: ExportAddressVerificationConsumer,
  [QUEUES.ADMIN_VERIFICATION]: ExportAdminVerificationConsumer,
};
