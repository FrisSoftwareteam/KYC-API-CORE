import convict from 'convict';
import * as R from 'ramda';
import { configData as defaultConfig } from './default';
// import { configData } from './environments/local.environment';

// export const config = convict(R.mergeDeepRight(defaultConfig, configData)).validate({ allowed: 'strict' });

export const config = convict(R.mergeDeepRight(defaultConfig, {})).validate({ allowed: 'strict' });
