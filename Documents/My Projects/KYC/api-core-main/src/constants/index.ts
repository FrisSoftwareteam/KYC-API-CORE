export const APP_NAME = 'firstcheck';

export const QUEUES = {
  EXPORT_ADDRESS: 'export-address',
  BROADCAST_ADDRESS: 'broadcast-address',
  ADMIN_VERIFICATION: 'admin-verification',
  BULK_ADDRESS_UPLOAD: 'bulk-address-upload',
  BULK_IDENTITY_UPLOAD: 'bulk-identity-upload',
};

export enum UserType {
  BUSINESS = 'business',
  PARTNER = 'partner',
  AGENT = 'agent',
  ADMINISTRATOR = 'admin',
}

export interface IPhoneNumber {
  countryCode: string;
  number: string;
}

export enum CustomerStatus {
  ACTIVE = 'active',
  BLACKLIST = 'blacklist',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspend',
  WATCHLIST = 'watchlist',
}

export enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female',
}

export interface ICurrency {
  symbol: string;
  codeAlpha: string;
  codeNumeric: number;
  isSymbolFirst: boolean;
}

export interface ICountry {
  code: string;
  name: string;
}

export const COUNTRY_CODES = {
  NG: 'NG',
};

export const COUNTRY_NAMES = {
  NG: 'nigeria',
};

export const COUNTRY_CODES_NAMES_LOOKUP = new Map<string, string>([
  [COUNTRY_CODES.NG, COUNTRY_NAMES.NG],
]);

export const REDIS_LOCATION_KEY = {
  AGENT: 'agent',
  AGENT_ONLINE_STATUS: 'agentOnlineStatus',
  PROVIDER: 'integrationProvider',
  PERMISSION: 'userPermission',
};

export const AGENT_MAXIMUM_DISTANCE_TO_ADDRESS = 4000000; //4,000,000 ~ 4000km meters radius

export const AddressFormatKeys = ['buildingNumber', 'street', 'lga', 'state', 'country'];

export const AgentNotificationPayload = {
  title: 'New Address Verification',
  AblyAddressEventName: 'addressNotificationEvent',
};

export enum IdentityType {
  IDENTITY = 'identity',
  ADDRESS = 'address',
}

export const MAXIMUM_DISTANCE_LOCATION = 200;

export const AGENT_DEFAULT_IMAGE_URL =
  'https://res.cloudinary.com/dizc0hr0q/image/upload/v1715693525/images/agents/pictures/vnswaey5nyxhhzqcxd4w.jpg';

export const GOOGLE_MAP_URL = 'https://www.google.com/maps';

export const ADDRESS_PRICES = {
  AGENT: {
    lagos: 400,
    others: 500,
  },
  PARTNER: {
    lagos: 500,
    others: 600,
  },
};

export const TURNAROUND_TIME = {
  lagos: '24hrs',
  others: '48hrs',
};

export const TIME_ZONE = 'Africa/Lagos';
export const DATE_TIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";

export enum TaskIdentity {
  ADDRESS = 'address',
  IDENTITY = 'identity',
  BANK_STATEMENT = 'bankStatement',
}

export enum CompletedStatus {
  FAILED = 'failed',
  VERIFIED = 'verified',
}

export enum NotificationModelTypeEnum {
  BUSINESS = 'business',
  PARTNER = 'partner',
  ADMIN = 'admin',
}

export const ABLY_ADMIN_EVENT_ID = 'firstcheck.firstregistrars.admin.eventId';
export const ABLY_ADMIN_CHANNEL = 'firstcheck.firstregistrars.admin.channel';

export enum VerificationSlugEnum {
  IDENTITY = 'identity',
  ADDRESS = 'address',
  DOCUMENT = 'documents',
  PROJECT = 'projectVerification',
  BANK_STATEMENT = 'bankStatement',
  ACADEMIC = 'academicDocuments',
  BUSINESS_PARTNERSHIP = 'businessPartnership',
  GUARANTOR = 'guarantorVerification',
  EMPLOYMENT = 'employmentVerification',
  BUSINESS_VERIFICATION = 'businessVerification',
  TENANCY = 'tenancyVerification',
  HOUSEHOLD = 'householdVerification',
}
