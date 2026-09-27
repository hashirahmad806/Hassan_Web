import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowDown, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/content';
import { formatWhatsAppLink } from '@/utils';
import heroVideo from '@/assets/images/real/hero_video.mp4';
import styles from './ContactHero.module.css';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE = [0.22, 1, 0.36, 1] as const;

/** Word-by-word curtain reveal */
function MaskedWords({
  text,
  className,
  baseDelay = 0,
  stagger = 0.08,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10px' });

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span key={i} className={styles.wordClip}>
          <motion.span
            className={styles.wordInner}
            initial={{ y: '108%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : undefined}
            transition={{ duration: 0.72, ease: EASE_OUT, delay: baseDelay + i * stagger }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Blur-fade reveal for paragraphs & blocks */
function FadeReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16, filter: 'blur(5px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const CREDIBILITY_ITEMS = [
  { value: '24h', label: 'Response Protocol', sub: 'Direct surgeon evaluation' },
  { value: '5.0★', label: 'Patient Rating', sub: 'Uncompromising distinction' },
  { value: '10k+', label: 'Smiles Sculpted', sub: 'Precision biomimetic artistry' },
  { value: '100%', label: 'Discretion & Privacy', sub: 'Confidential surgical intake' },
] as const;

export function ContactHero() {
  const scrollToBooking = () => {
    const el = document.getElementById('booking-suite');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={styles.hero} aria-label="Consultation Booking Entry">
      {/* ── Background Layer with Ambient Video & Orbs ──────── */}
      <div className={styles.bgLayer} aria-hidden="true">
        <div className={styles.bgBase} />
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={styles.bgVideo}
          src={heroVideo}
        />
        <div className={styles.bgVeil} />
        <div className={styles.bgGrain} />
      </div>

      <div className={styles.diagonalLine} aria-hidden="true" />

      {/* ── Main Content ─────────────────────────────────────── */}
      <div className={styles.heroContent}>
        {/* Live Telemetry Pill */}
        <div className={styles.liveBadge}>
          <span className={styles.pulseDot} aria-hidden="true">
            <span className={styles.pulsePing} />
            <span className={styles.pulseCore} />
          </span>
          <span className={styles.badgeText}>
            DIRECT ADMISSION • PRIVATE SURGICAL CONSULTATIONS
          </span>
        </div>

        {/* Editorial Headline */}
        <h1 className={styles.headline}>
          <MaskedWords text="Curating Bespoke" baseDelay={0.05} />
          <br />
          <span className={styles.accentWord}>
            <MaskedWords text="Smiles & Confidence" baseDelay={0.25} />
          </span>
        </h1>

        {/* Context Subtitle */}
        <FadeReveal delay={0.4} className={styles.subtitle}>
          Step into an atmosphere of quiet discretion and bespoke surgical mastery. Schedule your
          private clinical evaluation directly with Dr. Hassan Salman at our GS Tower surgical
          operatory in Peshawar.
        </FadeReveal>

        {/* Action Controls */}
        <FadeReveal delay={0.55} className={styles.ctaRow}>
          <button
            type="button"
            onClick={scrollToBooking}
            className={styles.primaryBtn}
            aria-label="Scroll down to consultation form"
          >
            <span>Reserve Consultation Suite</span>
            <ArrowDown size={14} />
          </button>

          <a
            href={formatWhatsAppLink(siteConfig.whatsapp, siteConfig.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryBtn}
            aria-label="Direct WhatsApp Concierge"
          >
            <MessageCircle size={15} className="text-emerald-400" />
            <span>WhatsApp Concierge</span>
          </a>
        </FadeReveal>
      </div>

      {/* ── Bottom Credibility Dock ──────────────────────────── */}
      <div className={styles.credBar} aria-label="Clinical Credentials">
        <div className={styles.credInner}>
          {CREDIBILITY_ITEMS.map((item) => (
            <div key={item.label} className={styles.credItem}>
              <span className={styles.credValue}>{item.value}</span>
              <div className={styles.credLabelGroup}>
                <span className={styles.credLabel}>{item.label}</span>
                <span className={styles.credSub}>{item.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

export default ContactHero;
