import knex from 'knex';
import { isKnexConfigKey } from '@/guards/configKey';
import baseConfig from './knexconfig';

const nodeEnv = process.env.NODE_ENV?.toLowerCase() ?? '';

const resolvedEnv: keyof typeof baseConfig = isKnexConfigKey(nodeEnv) ? nodeEnv : 'development';

const db = knex(baseConfig[resolvedEnv]);
export default db;
