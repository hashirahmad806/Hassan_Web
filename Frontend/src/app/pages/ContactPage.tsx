import { MapPin, Clock, Phone, Mail, Star, ArrowRight } from 'lucide-react';
import { Skeleton } from 'boneyard-js/react';
import { Header, Footer, MobileStickyActions, PageWrapper } from '@/components/layout';
import { ContactForm } from '@/components/sections';
import { contactContent, siteConfig } from '@/content';
import { formatPhoneLink } from '@/utils';

const trustItems = [
  { value: '24h', label: 'Response Time' },
  { value: '5★', label: 'Patient Rating' },
  { value: '20+', label: 'Years Experience' },
  { value: '10k+', label: 'Smiles Created' },
];

/**
 * Premium contact and appointment booking page.
 */
export default function ContactPage() {
  return (
    <Skeleton name="contact" loading={false}>
      <PageWrapper>
        <Header />

        <main>
          {/* ── Hero Header ────────────────────────────────────────────── */}
          <div className="relative overflow-hidden bg-inverse-surface pt-32 pb-20 text-center text-inverse-on-surface">
            {/* Decorative orbs */}
            <div
              className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full blur-3xl"
              style={{ background: 'rgba(208,184,146,0.08)' }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-10 bottom-0 h-64 w-64 rounded-full blur-3xl"
              style={{ background: 'rgba(208,184,146,0.06)' }}
              aria-hidden="true"
            />
            {/* Gold top line */}
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(208,184,146,0.5), transparent)' }}
              aria-hidden="true"
            />

            <div className="container-main relative z-10">
              <span className="mb-4 inline-block rounded-full border border-gold-accent/30 bg-gold-accent/10 px-4 py-1.5 font-label-caps text-[11px] uppercase tracking-[0.2em] text-gold-accent">
                Book a Consultation
              </span>
              <h1 className="mb-4 font-display-lg text-headline-lg-mobile text-inverse-on-surface md:text-headline-lg">
                Let&apos;s Create Your{' '}
                <span className="italic text-gold-accent">Perfect Smile</span>
              </h1>
              <p className="mx-auto max-w-xl font-body-lg text-body-lg text-inverse-on-surface/70 text-balance">
                {contactContent.description}
              </p>
            </div>

            {/* Gold bottom line */}
            <div
              className="absolute inset-x-0 bottom-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(208,184,146,0.3), transparent)' }}
              aria-hidden="true"
            />
          </div>

          {/* ── Trust strip ────────────────────────────────────────────── */}
          <div className="border-b border-outline-variant/20 bg-surface-container-lowest py-4">
            <div className="container-main flex flex-wrap items-center justify-center gap-8 md:justify-between">
              {trustItems.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="font-display-lg text-xl font-semibold text-primary" style={{ letterSpacing: '-0.02em' }}>
                    {item.value}
                  </span>
                  <span className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Main Content ───────────────────────────────────────────── */}
          <div className="section-padding bg-surface">
            <div className="container-main grid grid-cols-1 gap-12 lg:grid-cols-5">

              {/* Form — takes 3/5 width */}
              <div className="lg:col-span-3">
                <ContactForm />
              </div>

              {/* Sidebar — takes 2/5 width */}
              <aside className="space-y-5 lg:col-span-2">

                {/* Visit card */}
                <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-accent/10">
                      <MapPin className="text-primary" size={20} aria-hidden="true" />
                    </div>
                    <h3 className="font-headline-md text-lg text-charcoal-text">Visit Our Clinic</h3>
                  </div>
                  <p className="font-body-md text-sm leading-relaxed text-on-surface-variant">
                    {siteConfig.address}
                  </p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-4 inline-flex items-center gap-1.5 font-label-caps text-[11px] uppercase tracking-widest text-primary transition-gap duration-200 hover:gap-2"
                  >
                    Get Directions
                    <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </div>

                {/* Hours card */}
                <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-accent/10">
                      <Clock className="text-primary" size={20} aria-hidden="true" />
                    </div>
                    <h3 className="font-headline-md text-lg text-charcoal-text">Office Hours</h3>
                  </div>
                  <ul className="space-y-3">
                    {contactContent.hours.map((slot) => (
                      <li key={slot.day} className="flex items-center justify-between border-b border-outline-variant/20 pb-2 last:border-0 last:pb-0">
                        <span className="font-label-caps text-[11px] uppercase tracking-widest text-on-surface-variant">
                          {slot.day}
                        </span>
                        <span className={`font-body-md text-sm font-medium ${slot.time === 'Closed' ? 'text-error/70' : 'text-primary'}`}>
                          {slot.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact card */}
                <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-accent/10">
                      <Phone className="text-primary" size={20} aria-hidden="true" />
                    </div>
                    <h3 className="font-headline-md text-lg text-charcoal-text">Reach Us</h3>
                  </div>
                  <div className="space-y-3">
                    <a
                      href={formatPhoneLink(siteConfig.phone)}
                      className="group flex items-center gap-3 rounded-xl border border-outline-variant/30 px-4 py-3 transition-all duration-200 hover:border-gold-accent/40 hover:bg-gold-accent/5"
                    >
                      <Phone size={16} className="text-primary" aria-hidden="true" />
                      <span className="font-body-md text-sm text-on-surface-variant group-hover:text-primary">
                        {siteConfig.phone}
                      </span>
                    </a>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="group flex items-center gap-3 rounded-xl border border-outline-variant/30 px-4 py-3 transition-all duration-200 hover:border-gold-accent/40 hover:bg-gold-accent/5"
                    >
                      <Mail size={16} className="text-primary" aria-hidden="true" />
                      <span className="font-body-md text-sm text-on-surface-variant group-hover:text-primary">
                        {siteConfig.email}
                      </span>
                    </a>
                  </div>
                </div>

                {/* Testimonial mini-card */}
                <div
                  className="relative overflow-hidden rounded-2xl p-6"
                  style={{ background: 'linear-gradient(135deg, #1d1b18 0%, #33302d 100%)' }}
                >
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl" style={{ background: 'rgba(208,184,146,0.12)' }} aria-hidden="true" />
                  <div className="relative z-10">
                    <div className="mb-3 flex text-gold-accent" aria-label="5 star rating">
                      {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
                    </div>
                    <p className="mb-3 font-body-md text-sm italic leading-relaxed text-inverse-on-surface/80">
                      &ldquo;The consultation was thorough and Dr. Salman's attention to detail is unparalleled. I felt completely at ease throughout.&rdquo;
                    </p>
                    <span className="font-label-caps text-[10px] uppercase tracking-widest text-gold-accent">
                      — Verified Patient
                    </span>
                  </div>
                </div>

              </aside>
            </div>
          </div>
        </main>

        <Footer />
        <MobileStickyActions />
      </PageWrapper>
    </Skeleton>
  );
}

