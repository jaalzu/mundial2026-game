import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  API_FOOTBALL_KEY: z.string().min(1),
  ADMIN_SECRET: z.string().optional(),
  CRON_SECRET: z.string().optional(),
  NEXT_PUBLIC_API_URL: z.string().optional(),
});

export const env = envSchema.parse(process.env);
