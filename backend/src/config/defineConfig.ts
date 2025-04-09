import { AppConfig, appConfigSchema } from '../config/types';

export function defineConfig(config: AppConfig) {
  return appConfigSchema.parse(config);
}
