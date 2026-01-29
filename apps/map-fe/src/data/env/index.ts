import { z } from 'zod';
const envSchema = z.object({
  VITE_BASE_URL: z.string().url(),
  VITE_BASE_SOCKET_URL: z.string(),
  VITE_PORT: z.string().optional().default('5173'),
});
export const env = envSchema.parse(import.meta.env);
