import { z } from 'zod';

export const appConfigSchema = z.object({
  PORT: z.number(),
  HOST: z.string(),
  SALT_ROUNDS: z.number(),
  JWT_SECRET: z.string(),
});

export type AppConfig = z.infer<typeof appConfigSchema>;
