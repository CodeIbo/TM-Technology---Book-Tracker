import isEnvMode from '@/guards/envMode';
import { EnvMode } from '@/types/app-state';

export function getEnvMode(): EnvMode {
  const raw = process.env.NODE_ENV ?? '';
  const normalized = raw.toLowerCase();

  return isEnvMode(normalized) ? normalized : 'development';
}
