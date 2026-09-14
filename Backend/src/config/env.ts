import 'dotenv/config';

export const env = {
  PORT: parseInt(process.env['PORT'] ?? '5000', 10),
  NODE_ENV: process.env['NODE_ENV'] ?? 'development',
  CORS_ORIGIN: process.env['CORS_ORIGIN'] ?? 'http://localhost:5173',
  RESEND_API_KEY: process.env['RESEND_API_KEY'] ?? '',
  CLINIC_EMAIL: process.env['CLINIC_EMAIL'] ?? 'hassandent18@gmail.com',
  FROM_EMAIL: process.env['FROM_EMAIL'] ?? 'onboarding@resend.dev',
} as const;
