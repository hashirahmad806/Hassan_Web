import 'dotenv/config';

export const env = {
  PORT: parseInt(process.env['PORT'] ?? '5000', 10),
  NODE_ENV: process.env['NODE_ENV'] ?? 'development',
  CORS_ORIGIN: process.env['CORS_ORIGIN'] ?? 'http://localhost:5173',
  SMTP_HOST: process.env['SMTP_HOST'] ?? '',
  SMTP_PORT: parseInt(process.env['SMTP_PORT'] ?? '587', 10),
  SMTP_USER: process.env['SMTP_USER'] ?? '',
  SMTP_PASS: process.env['SMTP_PASS'] ?? '',
  CLINIC_EMAIL: process.env['CLINIC_EMAIL'] ?? 'hello@drhassansalman.com',
  FROM_EMAIL: process.env['FROM_EMAIL'] ?? 'noreply@drhassansalman.com',
} as const;
