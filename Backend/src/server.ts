import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import appointmentsRouter from './routes/appointments.js';
import contactRouter from './routes/contact.js';
import servicesRouter from './routes/services.js';
import galleryRouter from './routes/gallery.js';

const app = express();

// ─── Security middleware ────────────────────────────────────────────────────
app.use(helmet());

// ─── CORS configuration ───────────────────────────────────────────────────
const allowedOrigins = [
  'https://www.hassanbds.info',
  'https://hassanbds.info',
  'http://localhost:5173',
  'http://localhost:3000',
  ...(env.CORS_ORIGIN ? env.CORS_ORIGIN.split(',').map((o) => o.trim()) : []),
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.hassanbds.info') ||
        origin.endsWith('.vercel.app')
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Global rate limiter — 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});
app.use(limiter);

// Stricter limiter for form submissions
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { success: false, message: 'Too many submissions. Please try again in an hour.' },
});

// ─── Body parsing ───────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ─── Health & Root check ───────────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Dr. Hassan Dental Surgery REST API is active',
    environment: env.NODE_ENV,
    endpoints: {
      health: '/api/health',
      appointments: '/api/appointments',
      contact: '/api/contact',
      services: '/api/services',
      gallery: '/api/gallery',
    },
  });
});

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    status: 'ok',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ─── Routes ─────────────────────────────────────────────────────────────────
app.use('/api/appointments', formLimiter, appointmentsRouter);
app.use('/api/contact', formLimiter, contactRouter);
app.use('/api/services', servicesRouter);
app.use('/api/gallery', galleryRouter);

// ─── 404 handler ────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Error handler ──────────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start server (Standalone / Local dev only, bypassed on Vercel) ─────────
if (!process.env['VERCEL']) {
  app.listen(env.PORT, () => {
    console.log(`\n🦷  Dr. Hassan Salman Backend`);
    console.log(`   Server running on http://localhost:${env.PORT}`);
    console.log(`   Environment: ${env.NODE_ENV}`);
    console.log(`   CORS origins: ${allowedOrigins.join(', ')}`);
    console.log(`   SMTP: ${env.SMTP_HOST ? env.SMTP_HOST : 'not configured (stub mode)'}\n`);
  });
}

export default app;
