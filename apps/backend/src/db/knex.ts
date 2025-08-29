import knex from 'knex';
import baseConfig from './knexconfig';
const nodeEnv = process.env.NODE_ENV || 'development';
const db = knex(baseConfig[nodeEnv as keyof typeof baseConfig]);
export default db;
