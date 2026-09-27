import { Skeleton } from 'boneyard-js/react';
import {
  Phone,
  Mail,
  Star,
  MessageCircle,
  Award,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Header, Footer, MobileStickyActions, PageWrapper } from '@/components/layout';
import { ContactHero, ContactForm, LocationSection } from '@/components/sections';
import { siteConfig, doctorProfile } from '@/content';
import { formatPhoneLink, formatWhatsAppLink } from '@/utils';
import drHassanFounderImg from '@/assets/images/real/dr_hassan_founder_real.jpg';

const CONSULTATION_STEPS = [
  {
    step: '01',
    title: 'Facial & Smile Digital Mapping',
    desc: 'Ultra-high-definition photographic protocol & facial symmetry scan to analyze your unique anatomical proportions.',
  },
  {
    step: '02',
    title: '3D Biomimetic Smile Simulation',
    desc: 'Preview and fine-tune your potential veneer or restorative smile design before any clinical procedure commences.',
  },
  {
    step: '03',
    title: 'Bespoke Surgical Blueprint',
    desc: 'Comprehensive treatment plan, transparent investment breakdown, and unhurried consultation directly with Dr. Hassan.',
  },
];

const CLINICAL_ASSURANCES = [
  'Discreet VIP Admissions',
  'Class-100 Sterile Surgical Suite',
  'Swiss Leica Micro-Optics',
  'Dedicated Valet & Private Lift',
];

/**
 * Ultra-Luxury Contact & Private Consultation Page
 * Harmonized with the Aura Medical Aesthetic design system (cinematic obsidian, champagne gold, warm ivory).
 */
export default function ContactPage() {
  return (
    <Skeleton name="contact" loading={false}>
      <PageWrapper>
        <Header />

        <main>
          {/* ── 1. CINEMATIC HERO VIEWPORT ───────────────────────────── */}
          <ContactHero />

          {/* ── 2. MAIN CONSULTATION SUITE & CONCIERGE DOCK ─────────── */}
          <section id="booking-suite" className="relative overflow-hidden bg-surface py-16 md:py-24">
            {/* Ambient Background Glows */}
            <div
              className="pointer-events-none absolute -left-24 top-1/4 h-96 w-96 rounded-full blur-3xl"
              style={{ background: 'rgba(208,184,146,0.06)' }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-24 bottom-1/4 h-96 w-96 rounded-full blur-3xl"
              style={{ background: 'rgba(110,92,60,0.05)' }}
              aria-hidden="true"
            />

            <div className="container-main relative z-10">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
                {/* Left Column: Intake Booking Form (7 Cols) */}
                <div className="lg:col-span-7">
                  <ContactForm />
                </div>

                {/* Right Column: VIP Concierge & Clinical Distinction Dock (5 Cols) */}
                <aside className="space-y-6 lg:col-span-5">
                  {/* Card 1: Direct VIP Concierge & Priority Channels */}
                  <div className="rounded-2xl border border-gold-accent/25 bg-surface-container-lowest p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between border-b border-outline-variant/20 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-accent/10 text-primary">
                          <MessageCircle size={20} />
                        </div>
                        <div>
                          <h3 className="font-headline-md text-base text-charcoal-text font-semibold">
                            Direct VIP Concierge
                          </h3>
                          <p className="font-body-sm text-xs text-on-surface-variant">
                            Immediate coordination for private appointments
                          </p>
                        </div>
                      </div>
                      <span className="flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-2.5 py-0.5 font-label-caps text-[9px] font-bold uppercase tracking-wider text-emerald-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      <a
                        href={formatWhatsAppLink(siteConfig.whatsapp, siteConfig.whatsappMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between rounded-xl border border-emerald-200/90 bg-emerald-50/70 p-3.5 transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-50"
                      >
                        <div className="flex items-center gap-3">
                          <MessageCircle size={18} className="text-emerald-600" aria-hidden="true" />
                          <div>
                            <span className="block font-body-md text-sm font-semibold text-emerald-950">
                              WhatsApp Concierge
                            </span>
                            <span className="block font-body-sm text-xs text-emerald-700/90">
                              {siteConfig.whatsapp}
                            </span>
                          </div>
                        </div>
                        <ArrowRight size={14} className="text-emerald-700 transition-transform duration-200 group-hover:translate-x-1" />
                      </a>

                      <a
                        href={formatPhoneLink(siteConfig.phone)}
                        className="group flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-low/40 p-3.5 transition-all duration-200 hover:border-gold-accent/50 hover:bg-gold-accent/5"
                      >
                        <div className="flex items-center gap-3">
                          <Phone size={17} className="text-primary" aria-hidden="true" />
                          <div>
                            <span className="block font-body-md text-sm font-medium text-charcoal-text">
                              Surgery Reception Call
                            </span>
                            <span className="block font-body-sm text-xs text-on-surface-variant">
                              {siteConfig.phone}
                            </span>
                          </div>
                        </div>
                        <ArrowRight size={14} className="text-on-surface-variant transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
                      </a>

                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="group flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-low/40 p-3.5 transition-all duration-200 hover:border-gold-accent/50 hover:bg-gold-accent/5"
                      >
                        <div className="flex items-center gap-3">
                          <Mail size={17} className="text-primary" aria-hidden="true" />
                          <div>
                            <span className="block font-body-md text-sm font-medium text-charcoal-text">
                              Official Correspondence
                            </span>
                            <span className="block font-body-sm text-xs text-on-surface-variant">
                              {siteConfig.email}
                            </span>
                          </div>
                        </div>
                        <ArrowRight size={14} className="text-on-surface-variant transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
                      </a>
                    </div>
                  </div>

                  {/* Card 2: What to Expect at Your Consultation */}
                  <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-sm">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-accent/10 text-primary">
                        <Sparkles size={18} />
                      </div>
                      <div>
                        <span className="font-label-caps text-[10px] uppercase tracking-widest text-gold-accent">
                          CLINICAL PROCESS
                        </span>
                        <h3 className="font-headline-md text-base text-charcoal-text font-semibold">
                          What to Expect at Your Visit
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {CONSULTATION_STEPS.map((s) => (
                        <div key={s.step} className="flex items-start gap-3.5">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold-accent/40 bg-gold-accent/10 font-mono text-[11px] font-semibold text-primary">
                            {s.step}
                          </span>
                          <div>
                            <h4 className="font-headline-md text-sm font-semibold text-charcoal-text">
                              {s.title}
                            </h4>
                            <p className="mt-1 font-body-sm text-xs leading-relaxed text-on-surface-variant">
                              {s.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card 3: Surgeon Distinction & Credibility Card */}
                  <div className="relative overflow-hidden rounded-2xl border border-gold-accent/30 bg-surface-container-lowest p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-gold-accent/40">
                        <img
                          src={drHassanFounderImg}
                          alt={doctorProfile.name}
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                      <div>
                        <h4 className="font-display-lg text-lg text-charcoal-text font-semibold">
                          {doctorProfile.name}
                        </h4>
                        <p className="font-body-sm text-xs text-primary font-medium">
                          {doctorProfile.title}
                        </p>
                        <div className="mt-1 flex items-center gap-1.5 font-label-caps text-[10px] uppercase tracking-wider text-muted-silver">
                          <Award size={12} className="text-gold-accent" />
                          <span>AACD Accredited Protocols</span>
                        </div>
                      </div>
                    </div>
                    <p className="border-t border-outline-variant/20 pt-3.5 font-body-md text-xs italic leading-relaxed text-on-surface-variant">
                      {doctorProfile.quote}
                    </p>
                  </div>

                  {/* Card 4: Verified Patient Review */}
                  <div
                    className="relative overflow-hidden rounded-2xl p-6"
                    style={{ background: 'linear-gradient(135deg, #1d1b18 0%, #33302d 100%)' }}
                  >
                    <div
                      className="absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl"
                      style={{ background: 'rgba(208,184,146,0.12)' }}
                      aria-hidden="true"
                    />
                    <div className="relative z-10">
                      <div className="mb-3 flex text-gold-accent" aria-label="5 star rating">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" />
                        ))}
                      </div>
                      <p className="mb-3 font-body-md text-sm italic leading-relaxed text-inverse-on-surface/85">
                        &ldquo;The consultation was unhurried, meticulous, and Dr. Hassan&apos;s attention to proportion is unmatched. My smile transformation exceeded every expectation.&rdquo;
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-label-caps text-[10px] uppercase tracking-widest text-gold-accent">
                          — Verified Patient Review
                        </span>
                        <span className="font-mono text-[11px] text-inverse-on-surface/50">
                          Peshawar Clinic
                        </span>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>

          {/* ── 3. CLINIC SANCTUARY & LOCATION INTERACTIVE SHOWCASE ──── */}
          <LocationSection id="location" />

          {/* ── 4. CLINICAL ASSURANCE STRIP ─────────────────────────── */}
          <section className="border-t border-gold-accent/20 bg-[#120f0d] py-6 text-surface-bright">
            <div className="container-main flex flex-wrap items-center justify-around gap-6 text-center">
              {CLINICAL_ASSURANCES.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-gold-accent" />
                  <span className="font-label-caps text-[11px] uppercase tracking-wider text-surface-bright/80">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </main>

        <Footer />
        <MobileStickyActions />
      </PageWrapper>
    </Skeleton>
  );
}
