import { Router } from 'express';
import type { Request, Response } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { sendEmail } from '../config/mailer.js';
import { env } from '../config/env.js';

const router = Router();

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Please provide more detail in your message'),
});

type ContactData = z.infer<typeof contactSchema>;

/** POST /api/contact — Send a general inquiry */
router.post('/', validate(contactSchema), async (req: Request, res: Response) => {
  try {
    const data = req.body as ContactData;

    await sendEmail({
      to: env.CLINIC_EMAIL,
      replyTo: data.email,
      subject: `[Website Inquiry] ${data.subject} — from ${data.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #6e5c3c;">New Website Inquiry</h2>
          <p><strong>From:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <hr/>
          <p>${data.message}</p>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: 'Your message has been sent. We will respond within 24 hours.',
    });
  } catch (err) {
    console.error('[contact] Error:', err);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
});

export default router;
