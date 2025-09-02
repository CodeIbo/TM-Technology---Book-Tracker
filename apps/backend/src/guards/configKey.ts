import baseConfig from '@/db/knexconfig';
import { ConfigKeys } from '@/types/knex-config';

export function isKnexConfigKey(env: string): env is ConfigKeys {
  return env in baseConfig;
}
