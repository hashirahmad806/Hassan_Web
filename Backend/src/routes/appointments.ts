import { Router } from 'express';
import type { Request, Response } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { sendEmail } from '../config/mailer.js';
import { env } from '../config/env.js';

const router = Router();

export const appointmentSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone number required'),
  service: z.string().min(1, 'Service is required'),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  message: z.string().optional(),
});

type AppointmentData = z.infer<typeof appointmentSchema>;

/** POST /api/appointments — Submit a booking request */
router.post('/', validate(appointmentSchema), async (req: Request, res: Response) => {
  try {
    const data = req.body as AppointmentData;
    const id = `APT-${Date.now()}`;

    // Send notification email to clinic
    await sendEmail({
      to: env.CLINIC_EMAIL,
      replyTo: data.email,
      subject: `New Appointment Request — ${data.service} — ${data.firstName} ${data.lastName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #6e5c3c;">New Appointment Request</h2>
          <p><strong>Reference:</strong> ${id}</p>
          <hr/>
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Service:</strong> ${data.service}</p>
          <p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
          ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
        </div>
      `,
    });

    // Send confirmation email to patient
    await sendEmail({
      to: data.email,
      replyTo: env.CLINIC_EMAIL,
      subject: 'Appointment Request Received — Dr. Hassan Salman',
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #6e5c3c;">Thank You, ${data.firstName}!</h2>
          <p>Your appointment request has been received. We will confirm your consultation within <strong>24 hours</strong>.</p>
          <p><strong>Reference:</strong> ${id}</p>
          <p><strong>Requested Service:</strong> ${data.service}</p>
          <p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
          <hr/>
          <p style="font-size: 13px; color: #888;">Dr. Hassan Salman | Excellence in Aesthetic Care</p>
        </div>
      `,
    });

    res.status(201).json({
      success: true,
      data: { id },
      message: 'Appointment request received. We will confirm within 24 hours.',
    });
  } catch (err) {
    console.error('[appointments] Error:', err);
    res.status(500).json({ success: false, message: 'Failed to process appointment request.' });
  }
});

export default router;
