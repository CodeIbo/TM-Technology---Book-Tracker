import { ALLOWED_ENVS } from '@/const/app-state';
import { EnvMode } from '@/types/app-state';

function isEnvMode(value: string): value is EnvMode {
  return (ALLOWED_ENVS as readonly string[]).includes(value);
}

export default isEnvMode;
