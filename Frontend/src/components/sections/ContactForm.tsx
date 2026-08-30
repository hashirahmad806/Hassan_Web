import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Select } from '@/components/ui';
import { contactContent, serviceOptions } from '@/content';
import { submitAppointment } from '@/services';
import type { AppointmentFormData } from '@/types';

const appointmentSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  service: z.string().min(1, 'Please select a service'),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  message: z.string().optional(),
});

/**
 * Appointment booking form with Zod validation.
 */
export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  const onSubmit = async (data: AppointmentFormData) => {
    try {
      setSubmitStatus('idle');
      await submitAppointment(data);
      setSubmitStatus('success');
      reset();
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="glass-panel ambient-shadow rounded-xl p-8"
      noValidate
    >
      <div className="mb-8">
        <span className="mb-2 block font-label-caps text-label-caps uppercase tracking-widest text-primary">
          {contactContent.label}
        </span>
        <h2 className="font-headline-lg text-headline-lg-mobile text-charcoal-text md:text-headline-md">
          {contactContent.heading}
        </h2>
        <p className="mt-2 font-body-md text-on-surface-variant">{contactContent.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input label="First Name" {...register('firstName')} error={errors.firstName?.message} />
        <Input label="Last Name" {...register('lastName')} error={errors.lastName?.message} />
        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
        <Input label="Phone" type="tel" {...register('phone')} error={errors.phone?.message} />
        <Select
          label="Service"
          options={serviceOptions.map((s) => ({ value: s, label: s }))}
          {...register('service')}
          error={errors.service?.message}
        />
        <Input
          label="Preferred Date"
          type="date"
          {...register('preferredDate')}
          error={errors.preferredDate?.message}
        />
      </div>

      <div className="mt-6">
        <label htmlFor="message" className="mb-2 block font-label-caps text-label-caps text-primary">
          Message (Optional)
        </label>
        <textarea
          id="message"
          rows={4}
          className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 font-body-md text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          {...register('message')}
        />
      </div>

      <div className="mt-8">
        <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Request Appointment'}
        </Button>
      </div>

      {submitStatus === 'success' && (
        <p className="mt-4 text-center text-sm text-primary" role="status">
          Thank you! We&apos;ll confirm your appointment within 24 hours.
        </p>
      )}
      {submitStatus === 'error' && (
        <p className="mt-4 text-center text-sm text-error" role="alert">
          Something went wrong. Please try again or call us directly.
        </p>
      )}
    </form>
  );
}
