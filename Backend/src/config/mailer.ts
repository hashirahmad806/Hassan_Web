import nodemailer from 'nodemailer';
import { env } from './env.js';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Check if SMTP is properly configured (all three required values present).
 */
function isSmtpConfigured(): boolean {
  return !!(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS);
}

/**
 * Send an email.
 * Falls back to a dev console stub when SMTP is not fully configured.
 */
export async function sendEmail(options: EmailOptions): Promise<void> {
  // ── Dev stub mode ──────────────────────────────────────────────────────────
  if (!isSmtpConfigured()) {
    console.log('\n[mailer stub] 📧 Email would be sent:');
    console.log(`  To:       ${options.to}`);
    if (options.replyTo) {
      console.log(`  Reply-To: ${options.replyTo}`);
    }
    console.log(`  Subject:  ${options.subject}`);
    console.log(`  Preview:  ${options.html.replace(/<[^>]*>/g, '').trim().slice(0, 120)}...\n`);
    return;
  }

  // ── Real SMTP mode ─────────────────────────────────────────────────────────
  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Dr. Hassan Salman Clinic" <${env.FROM_EMAIL}>`,
    to: options.to,
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
  });
}

