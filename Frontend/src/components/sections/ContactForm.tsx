import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, AlertCircle, Loader2, Lock, Sparkles, X } from 'lucide-react';
import { Input, Select, Button } from '@/components/ui';
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
 * Premium appointment booking form harmonized with the clinic's luxury layout, warm tones, and typography.
 */
export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [searchParams, setSearchParams] = useSearchParams();

  const caseId = searchParams.get('case') || '';
  const caseTitle = searchParams.get('title') || '';
  const caseCategory = searchParams.get('category') || '';

  const matchedService = useMemo(() => {
    if (!caseCategory) return '';
    const cat = caseCategory.toLowerCase();
    if (cat.includes('implant')) return 'Dental Implants';
    if (cat.includes('orthodontic') || cat.includes('aligner')) return 'Orthodontics';
    if (cat.includes('whitening')) return 'Professional Whitening';
    if (
      cat.includes('aesthetic') ||
      cat.includes('veneer') ||
      cat.includes('biomimetic') ||
      cat.includes('smile') ||
      cat.includes('rehabilitation')
    ) {
      return 'Cosmetic Dentistry';
    }
    return '';
  }, [caseCategory]);

  const defaultMsg = useMemo(() => {
    if (caseTitle) {
      return `Hello Dr. Hassan, I would like to inquire about a consultation for a treatment similar to ${caseId ? caseId + ': ' : ''}${caseTitle}${caseCategory ? ' (' + caseCategory + ')' : ''}.`;
    }
    return '';
  }, [caseId, caseTitle, caseCategory]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      service: matchedService,
      message: defaultMsg,
    },
  });

  useEffect(() => {
    if (matchedService) setValue('service', matchedService);
    if (defaultMsg) setValue('message', defaultMsg);
  }, [matchedService, defaultMsg, setValue]);

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

  if (submitStatus === 'success') {
    return (
      <div className="flex min-h-[480px] flex-col items-center justify-center rounded-2xl border border-gold-accent/30 bg-surface-container-lowest p-10 text-center shadow-[0_8px_40px_rgba(208,184,146,0.1)]">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold-accent/10 text-primary">
          <CheckCircle size={40} strokeWidth={1.5} />
        </div>
        <span className="mb-3 block font-label-caps text-[11px] uppercase tracking-[0.2em] text-gold-accent">
          Request Received
        </span>
        <h3 className="mb-3 font-headline-md text-2xl text-charcoal-text">Thank You!</h3>
        <p className="mb-8 max-w-sm font-body-md text-sm leading-relaxed text-on-surface-variant">
          Your appointment request has been received. Our team will confirm your consultation
          within 24 hours.
        </p>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setSubmitStatus('idle')}
          className="rounded-full border border-outline-variant/50 px-8 py-3 font-label-caps text-[11px] uppercase tracking-widest text-on-surface-variant transition-all duration-200 hover:border-primary hover:text-primary"
        >
          Book Another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-lowest shadow-[0_8px_40px_rgba(208,184,146,0.08)]"
      noValidate
    >
      <div className="border-b border-outline-variant/20 bg-surface-container-low/30 px-8 py-7">
        <span className="mb-2 block font-label-caps text-[11px] uppercase tracking-[0.2em] text-gold-accent">
          {contactContent.label}
        </span>
        <h2 className="font-headline-lg text-headline-lg-mobile text-charcoal-text md:text-headline-md">
          {contactContent.heading}
        </h2>
        <p className="mt-2 font-body-md text-sm text-on-surface-variant">{contactContent.description}</p>
      </div>

      <div className="space-y-8 p-8">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary font-label-caps text-[10px] font-bold text-on-primary">
              1
            </span>
            <h3 className="font-label-caps text-[11px] uppercase tracking-[0.15em] text-on-surface-variant">
              Personal Information
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Input label="First Name" {...register('firstName')} error={errors.firstName?.message} />
            <Input label="Last Name" {...register('lastName')} error={errors.lastName?.message} />
            <Input label="Email Address" type="email" {...register('email')} error={errors.email?.message} />
            <Input label="Phone Number" type="tel" {...register('phone')} error={errors.phone?.message} />
          </div>
        </div>

        <div className="section-divider" aria-hidden="true" />

        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary font-label-caps text-[10px] font-bold text-on-primary">
              2
            </span>
            <h3 className="font-label-caps text-[11px] uppercase tracking-[0.15em] text-on-surface-variant">
              Appointment Details
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Select
              label="Service Required"
              options={serviceOptions.map((s) => ({ value: s, label: s }))}
              {...register('service')}
              error={errors.service?.message}
            />
            <Input label="Preferred Date" type="date" {...register('preferredDate')} error={errors.preferredDate?.message} />
          </div>
        </div>

        <div className="section-divider" aria-hidden="true" />

        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-accent/30 font-label-caps text-[10px] font-bold text-primary">
              3
            </span>
            <h3 className="font-label-caps text-[11px] uppercase tracking-[0.15em] text-on-surface-variant">
              Additional Notes <span className="normal-case tracking-normal text-outline">(optional)</span>
            </h3>
          </div>
          <label htmlFor="message" className="sr-only">Additional notes</label>
          <textarea
            id="message"
            rows={4}
            placeholder="Share any specific concerns, questions, or preferences for your consultation..."
            className="w-full resize-none rounded-xl border border-outline-variant/40 bg-surface-container-lowest px-4 py-3.5 font-body-md text-sm text-on-surface placeholder:text-outline/60 transition-all duration-200 focus:border-gold-accent/70 focus:outline-none focus:ring-2 focus:ring-gold-accent/20"
            {...register('message')}
          />
        </div>

        <div className="space-y-3">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={isSubmitting}
            className="w-full overflow-hidden rounded-full bg-primary py-4 font-button text-sm font-semibold tracking-wide text-on-primary shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(110,92,60,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                Processing Request...
              </span>
            ) : (
              'Request Appointment'
            )}
          </Button>

          {submitStatus === 'error' && (
            <div className="flex items-center gap-2 rounded-xl border border-error/20 bg-error/5 px-4 py-3" role="alert">
              <AlertCircle size={16} className="shrink-0 text-error" aria-hidden="true" />
              <p className="font-body-md text-sm text-error">Something went wrong. Please try again or call us directly.</p>
            </div>
          )}

          <div className="flex items-center justify-center gap-1.5 pt-1">
            <Lock size={12} className="text-outline" aria-hidden="true" />
            <p className="font-label-caps text-[10px] uppercase tracking-widest text-outline">
              Your information is secure and confidential
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
