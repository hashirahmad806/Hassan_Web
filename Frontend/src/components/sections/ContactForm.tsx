import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  Lock,
  Sparkles,
  ShieldCheck,
  Layers,
  Smile,
  Calendar,
  Clock,
  ArrowRight,
  MessageCircle,
  X,
} from 'lucide-react';
import { siteConfig, serviceOptions } from '@/content';
import { submitAppointment } from '@/services';
import { formatWhatsAppLink } from '@/utils';
import type { AppointmentFormData } from '@/types';
import styles from './ContactForm.module.css';

const appointmentSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  service: z.string().min(1, 'Please select an aesthetic service'),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  message: z.string().optional(),
});

interface ProcedureOption {
  id: string;
  label: string;
  category: string;
}

const FEATURED_PROCEDURES: ProcedureOption[] = [
  { id: 'Cosmetic Dentistry', label: 'Smile Design & Veneers', category: 'Aesthetic' },
  { id: 'Dental Implants', label: 'Dental Implants', category: 'Restorative' },
  { id: 'Orthodontics', label: 'Clear Aligners / Invisalign', category: 'Orthodontic' },
  { id: 'Professional Whitening', label: 'Laser Teeth Whitening', category: 'Aesthetic' },
  { id: 'Oral Surgery', label: 'Full Rehabilitation & Surgery', category: 'Surgical' },
  { id: 'General Consultation', label: 'Comprehensive Evaluation', category: 'Diagnostic' },
];

/**
 * Ultra-Luxury Architectural Consultation Form
 * Conforms to the Aura Medical Aesthetic design system (champagne gold, Playfair Display, Inter).
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
      return `Hello Dr. Hassan, I would like to inquire about a consultation for a treatment similar to ${
        caseId ? caseId + ': ' : ''
      }${caseTitle}${caseCategory ? ' (' + caseCategory + ')' : ''}.`;
    }
    return '';
  }, [caseId, caseTitle, caseCategory]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      service: matchedService || FEATURED_PROCEDURES[0].id,
      message: defaultMsg,
    },
  });

  const selectedService = watch('service');

  useEffect(() => {
    if (matchedService) setValue('service', matchedService);
    if (defaultMsg) setValue('message', defaultMsg);
  }, [matchedService, defaultMsg, setValue]);

  // Today's date in YYYY-MM-DD format for min-date constraint
  const todayDateString = useMemo(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }, []);

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

  const renderProcedureIcon = (category: string) => {
    switch (category) {
      case 'Aesthetic':
        return <Sparkles size={16} className={styles.chipIcon} />;
      case 'Restorative':
        return <Layers size={16} className={styles.chipIcon} />;
      case 'Orthodontic':
        return <Smile size={16} className={styles.chipIcon} />;
      case 'Surgical':
        return <ShieldCheck size={16} className={styles.chipIcon} />;
      default:
        return <Calendar size={16} className={styles.chipIcon} />;
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className={styles.successCard}>
        <div className={styles.successMedal}>
          <CheckCircle size={36} strokeWidth={1.75} />
        </div>
        <span className="mb-2 font-label-caps text-[11px] uppercase tracking-[0.2em] text-gold-accent">
          Admission Request Received
        </span>
        <h3 className="mb-3 font-display-lg text-2xl text-charcoal-text md:text-3xl">
          Thank You for Your Trust
        </h3>
        <p className="mb-8 max-w-md font-body-md text-sm leading-relaxed text-on-surface-variant">
          Your private consultation request has been lodged directly with Dr. Hassan Salman&apos;s surgical
          coordinator. We will contact you within 24 hours to finalize your appointment time.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={formatWhatsAppLink(siteConfig.whatsapp, 'Hello Dr. Hassan, I recently submitted a consultation request.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-6 py-3 font-label-button text-xs uppercase tracking-wider text-emerald-800 transition-colors hover:bg-emerald-100"
          >
            <MessageCircle size={16} className="text-emerald-600" />
            <span>Instant WhatsApp Confirmation</span>
          </a>
          <button
            type="button"
            onClick={() => setSubmitStatus('idle')}
            className="rounded-full border border-outline-variant/60 px-6 py-3 font-label-caps text-[11px] uppercase tracking-widest text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
          >
            Book Another Slot
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      id="booking-suite"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.formCard}
      noValidate
      aria-label="Private Consultation Booking Form"
    >
      {/* Corner Brackets */}
      <div className={styles.cornerTL} aria-hidden="true" />
      <div className={styles.cornerTR} aria-hidden="true" />
      <div className={styles.cornerBL} aria-hidden="true" />
      <div className={styles.cornerBR} aria-hidden="true" />

      {/* Card Header Banner */}
      <div className={styles.cardHeader}>
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-[11px] uppercase tracking-[0.2em] text-gold-accent">
            CONFIDENTIAL INTAKE PROTOCOL
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-silver">
            <Lock size={12} className="text-gold-accent" />
            Strict Medical Discretion
          </span>
        </div>
        <h2 className="mt-2 font-display-lg text-2xl text-charcoal-text md:text-3xl">
          Reserve Your <span className="italic text-primary font-normal">Private Consultation</span>
        </h2>
        <p className="mt-1.5 font-body-md text-sm text-on-surface-variant">
          Complete the intake blueprint below. Dr. Hassan&apos;s team will confirm your confidential session within 24 hours.
        </p>
      </div>

      <div className={styles.formBody}>
        {/* Case Study Reference Callout */}
        {caseTitle && (
          <div className="mb-8 flex items-start justify-between rounded-xl border border-gold-accent/40 bg-gold-accent/10 p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-label-caps text-[10px] font-bold uppercase tracking-widest text-primary">
                  Inquiring About Documented Case {caseId && `• ${caseId}`}
                </p>
                <p className="mt-0.5 font-headline-sm text-base font-semibold text-charcoal-text">
                  {caseTitle}
                </p>
                {caseCategory && (
                  <span className="mt-1.5 inline-block rounded-full border border-gold-accent/30 bg-surface-container-lowest px-2.5 py-0.5 font-label-caps text-[10px] uppercase tracking-wider text-primary">
                    {caseCategory}
                  </span>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setSearchParams({});
                setValue('message', '');
                setValue('service', FEATURED_PROCEDURES[0].id);
              }}
              title="Clear case inquiry"
              aria-label="Clear case inquiry"
              className="p-1 text-on-surface-variant/60 transition-colors hover:text-charcoal-text"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="space-y-8">
          {/* ── STEP 1: PERSONAL CREDENTIALS ────────────────────── */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className={styles.stepBadge}>1</span>
              <h3 className="font-label-caps text-xs uppercase tracking-[0.18em] text-charcoal-text">
                Personal Identification &amp; Contact
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-1.5 block font-body-sm text-xs font-medium text-on-surface-variant">
                  First Name <span className="text-error">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="e.g. Sarah"
                  className={styles.inputField}
                  {...register('firstName')}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-error">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="mb-1.5 block font-body-sm text-xs font-medium text-on-surface-variant">
                  Last Name <span className="text-error">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="e.g. Ahmed"
                  className={styles.inputField}
                  {...register('lastName')}
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-error">{errors.lastName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block font-body-sm text-xs font-medium text-on-surface-variant">
                  Email Address <span className="text-error">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="sarah.ahmed@example.com"
                  className={styles.inputField}
                  {...register('email')}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-error">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="mb-1.5 block font-body-sm text-xs font-medium text-on-surface-variant">
                  Phone / WhatsApp Number <span className="text-error">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+92 300 1234567"
                  className={styles.inputField}
                  {...register('phone')}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-error">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-accent/30 to-transparent" aria-hidden="true" />

          {/* ── STEP 2: TREATMENT FOCUS & SCHEDULE ─────────────────── */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={styles.stepBadge}>2</span>
                <h3 className="font-label-caps text-xs uppercase tracking-[0.18em] text-charcoal-text">
                  Aesthetic Treatment Focus &amp; Preferred Time
                </h3>
              </div>
              <span className="text-[11px] text-muted-silver">Select Primary Focus</span>
            </div>

            {/* Visual Procedure Selector Pills */}
            <div className={`mb-5 ${styles.procedureGrid}`}>
              {FEATURED_PROCEDURES.map((proc) => {
                const isSelected = selectedService === proc.id;
                return (
                  <button
                    key={proc.id}
                    type="button"
                    onClick={() => setValue('service', proc.id, { shouldValidate: true })}
                    className={`${styles.procedureChip} ${
                      isSelected ? styles.procedureChipActive : ''
                    }`}
                  >
                    {renderProcedureIcon(proc.category)}
                    <span className="flex-1">{proc.label}</span>
                    {isSelected && (
                      <CheckCircle size={14} className="text-gold-accent shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Hidden native input to satisfy react-hook-form */}
            <input type="hidden" {...register('service')} />
            {errors.service && (
              <p className="mb-4 text-xs text-error">{errors.service.message}</p>
            )}

            {/* Preferred Date & Consultation Window */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="preferredDate" className="mb-1.5 block font-body-sm text-xs font-medium text-on-surface-variant">
                  Preferred Date <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <input
                    id="preferredDate"
                    type="date"
                    min={todayDateString}
                    className={styles.inputField}
                    {...register('preferredDate')}
                  />
                </div>
                {errors.preferredDate && (
                  <p className="mt-1 text-xs text-error">{errors.preferredDate.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="fallbackSelect" className="mb-1.5 block font-body-sm text-xs font-medium text-on-surface-variant">
                  Specific Procedure Directory
                </label>
                <select
                  id="fallbackSelect"
                  className={styles.inputField}
                  value={selectedService}
                  onChange={(e) => setValue('service', e.target.value, { shouldValidate: true })}
                >
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-accent/30 to-transparent" aria-hidden="true" />

          {/* ── STEP 3: AESTHETIC NOTES & OBJECTIVES ─────────────── */}
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className={styles.stepBadge}>3</span>
              <h3 className="font-label-caps text-xs uppercase tracking-[0.18em] text-charcoal-text">
                Aesthetic Aspirations &amp; Clinical Goals{' '}
                <span className="font-normal lowercase tracking-normal text-muted-silver">
                  (optional)
                </span>
              </h3>
            </div>
            <textarea
              id="message"
              rows={4}
              placeholder="Describe your ideal smile aspirations, previous dental restorations, or any questions for Dr. Hassan Salman..."
              className={styles.inputField}
              {...register('message')}
            />
          </div>

          {/* ── SUBMISSION ACTIONS & PRIVACY ─────────────────────── */}
          <div className="space-y-4 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitBtn}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                  <span>Submitting Confidential Request...</span>
                </>
              ) : (
                <>
                  <span>Request Private Consultation</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            {submitStatus === 'error' && (
              <div
                className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-900"
                role="alert"
              >
                <AlertCircle size={18} className="shrink-0 text-red-600" />
                <p className="text-xs">
                  We were unable to submit your request at this moment. Please reach out via WhatsApp or call us directly.
                </p>
              </div>
            )}

            {/* Strict Doctor-Patient Privilege Seal */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-center text-xs text-on-surface-variant/75 pt-2">
              <span className="inline-flex items-center gap-1.5 font-label-caps text-[10px] uppercase tracking-wider text-muted-silver">
                <Lock size={12} className="text-gold-accent" />
                100% Medical Confidentiality
              </span>
              <span className="hidden sm:inline text-gold-accent/40">•</span>
              <span className="inline-flex items-center gap-1.5 font-label-caps text-[10px] uppercase tracking-wider text-muted-silver">
                <ShieldCheck size={12} className="text-gold-accent" />
                Direct Surgeon Blueprint
              </span>
              <span className="hidden sm:inline text-gold-accent/40">•</span>
              <span className="inline-flex items-center gap-1.5 font-label-caps text-[10px] uppercase tracking-wider text-muted-silver">
                <Clock size={12} className="text-gold-accent" />
                24-Hour Confirmation
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ContactForm;
