import { Resend } from 'resend';
import { env } from './env.js';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Check if Resend is properly configured.
 */
function isResendConfigured(): boolean {
  return !!env.RESEND_API_KEY;
}

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

/**
 * Send an email using Resend.
 * Falls back to a dev console stub when RESEND_API_KEY is not configured.
 */
export async function sendEmail(options: EmailOptions): Promise<void> {
  // ── Dev stub mode ──────────────────────────────────────────────────────────
  if (!isResendConfigured() || !resend) {
    console.log('\n[mailer stub] 📧 Email would be sent (Resend Stub):');
    console.log(`  To:       ${options.to}`);
    if (options.replyTo) {
      console.log(`  Reply-To: ${options.replyTo}`);
    }
    console.log(`  Subject:  ${options.subject}`);
    console.log(`  Preview:  ${options.html.replace(/<[^>]*>/g, '').trim().slice(0, 120)}...\n`);
    return;
  }

  // ── Resend API delivery ────────────────────────────────────────────────────
  const fromAddress = env.FROM_EMAIL.includes('<')
    ? env.FROM_EMAIL
    : `"Dr. Hassan Salman Clinic" <${env.FROM_EMAIL}>`;

  const { data, error } = await resend.emails.send({
    from: fromAddress,
    to: options.to,
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
  });

  if (error) {
    console.error('[mailer] Resend error:', error);
    throw new Error(`Resend email delivery failed: ${error.message}`);
  }

  console.log(`[mailer] ✉️  Email sent via Resend (id: ${data?.id ?? 'ok'}) to: ${options.to}`);
}

