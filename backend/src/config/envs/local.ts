import { defineConfig } from '../defineConfig';

export function createLocalConfig() {
  return defineConfig({
    PORT: Number(process.env.PORT || 3000),
    HOST: process.env.HOST || '0.0.0.0',
    SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
    JWT_SECRET: process.env.JWT_SECRET as string,
  });
}
