import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { CalendarCheck, ChevronRight, Star, BadgeCheck, Phone } from 'lucide-react';
import { heroContent, doctorProfile, siteConfig, trustBadges } from '@/content';
import { usePreloaderStore } from '@/store/preloaderStore';
import styles from './Hero.module.css';

import profileImg from '@/assets/images/real/dr_hassan_clinic_portrait.jpg';
import heroVideo from '@/assets/images/real/hero_video.mp4';

/* ── Constants ──────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { value: '3+', label: 'Years', sub: 'Clinical Legacy' },
  { value: '100+', label: 'Smiles', sub: 'Bespoke Smiles' },
  { value: '5.0', label: 'Rating', sub: 'Patient Distinction' },
  { value: 'AACD', label: 'Accreditation', sub: 'Certified Master' },
] as const;

const ACCREDITATIONS = ['BDS', 'AACD Member', 'FRACDS'];

/* ── Word-mask animated text component ─────────────────────── */
/**
 * Splits text into words and reveals each word by clipping it upward.
 * Classic luxury-brand "curtain reveal" effect.
 */
function MaskedWords({
  text,
  className,
  baseDelay = 0,
  stagger = 0.09,
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
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : undefined}
            transition={{
              duration: 0.75,
              ease: EASE_OUT,
              delay: baseDelay + i * stagger,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Simple character blur-in for subtitles */
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
      initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── Hero component ─────────────────────────────────────────── */
export function Hero() {
  const hasSeenIntro = usePreloaderStore((s) => s.hasSeenIntro);
  const d = hasSeenIntro ? 0 : 0.7;

  return (
    <section className={styles.hero} aria-label="Hero">

      {/* ── Background ─────────────────────────────────── */}
      <div className={styles.bgLayer} aria-hidden="true">
        <div className={styles.bgBase} />
        <video
          autoPlay loop muted playsInline preload="auto"
          className={styles.bgVideo}
          src={heroVideo}
        />
        <div className={styles.bgVeil} />
        <div className={styles.bgPortraitReveal} />
        <div className={styles.bgGrain} />
      </div>

      <div className={styles.diagonalLine} aria-hidden="true" />

      {/* Header spacer */}
      <div className="h-[72px] shrink-0" />

      {/* ── Main split grid ─────────────────────────── */}
      <div className={styles.splitGrid}>

        {/* LEFT column */}
        <div className={styles.leftCol}>

          {/* Availability tag */}
          <FadeReveal delay={d + 0.05}>
            <div className={styles.availTag}>
              <span
                data-testid="availability-badge"
                className={styles.availDot}
                aria-label="Available"
              />
              <span className={styles.availText}>Accepting New Patients</span>
              <span className={styles.availCity}>· Karachi, Pakistan</span>
            </div>
          </FadeReveal>

          {/* ── ANIMATED HEADLINE ── */}
          <div className={styles.headlineWrap}>
            <motion.div
              className={styles.headlineRule}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: d + 0.1 }}
              style={{ originY: 0 }}
              aria-hidden="true"
            />
            <div>
              {/* Line 1 — mask-reveal word by word */}
              <h1 className={styles.headline}>
                <MaskedWords
                  text={heroContent.heading}
                  baseDelay={d + 0.15}
                  stagger={0.1}
                />
              </h1>
              {/* Line 2 — gold italic, slightly offset stagger */}
              <div className={styles.headlineAccentWrap}>
                <MaskedWords
                  text={heroContent.headingAccent}
                  className={styles.headlineAccent}
                  baseDelay={d + 0.32}
                  stagger={0.1}
                />
              </div>
            </div>
          </div>

          {/* Subtitle with blur-fade */}
          <FadeReveal delay={d + 0.55} className={styles.subtitleWrap}>
            <p className={styles.subtitle}>{heroContent.description}</p>
          </FadeReveal>

          {/* CTAs */}
          <FadeReveal delay={d + 0.68} className={styles.ctaRow}>
            <Link to="/contact" className={styles.ctaPrimary}>
              <span>{heroContent.primaryCta}</span>
              <ChevronRight size={17} aria-hidden="true" />
            </Link>
            <Link to={`tel:${siteConfig.phone}`} className={styles.ctaGhost}>
              <Phone size={14} aria-hidden="true" />
              <span>{heroContent.secondaryCta}</span>
            </Link>
          </FadeReveal>

          {/* Accreditation pills */}
          <FadeReveal delay={d + 0.78} className={styles.accredRow}>
            {ACCREDITATIONS.map((a) => (
              <span key={a} className={styles.accredPill}>
                <BadgeCheck size={11} className={styles.accredIcon} aria-hidden="true" />
                {a}
              </span>
            ))}
          </FadeReveal>

          {/* Trust row */}
          <FadeReveal delay={d + 0.85} className={styles.trustRow}>
            {trustBadges.map((b) => (
              <span key={b.label} className={styles.trustItem}>
                <span className={styles.trustDash} aria-hidden="true" />
                {b.label}
              </span>
            ))}
          </FadeReveal>
        </div>

        {/* RIGHT column — portrait showcase */}
        <motion.div
          className={styles.rightCol}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: d + 0.2 }}
        >
          <div className={styles.portraitWrap}>
            <div className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
            <div className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />

            <img src={profileImg} alt={doctorProfile.imageAlt} className={styles.portraitImg} />

            <div className={styles.portraitBadge}>
              <BadgeCheck size={11} className={styles.portraitBadgeIcon} aria-hidden="true" />
              <span>Accredited AACD</span>
            </div>

            <div className={styles.clinicChip}>
              <span className={styles.clinicDot} aria-hidden="true" />
              <span>In Clinic Today</span>
            </div>

            <div className={styles.portraitOverlay}>
              <div>
                <p className={styles.portraitName}>{doctorProfile.name}</p>
                <p className={styles.portraitTitle}>{doctorProfile.title}</p>
              </div>
              <div className={styles.portraitRating} aria-label={doctorProfile.ratingLabel}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={10} className={styles.portraitStar} fill="currentColor" />
                ))}
                <span className={styles.portraitRatingText}>5.0</span>
              </div>
            </div>
          </div>

        </motion.div>

      </div>

      {/* ── STATS BAR — BOTTOM ──────────────────────── */}
      <FadeReveal delay={d + 0.9} className={styles.credBar}>
        <div className={styles.credBarInner}>
          {STATS.map((s, i) => (
            <div key={s.label} className={styles.credStat}>
              <span className={styles.credStatSub}>{s.sub}</span>
              <div className={styles.credStatRow}>
                <span className={styles.credStatValue}>{s.value}</span>
                {i === 2 && (
                  <Star size={12} className={styles.credStarIcon} fill="currentColor" />
                )}
              </div>
              <span className={styles.credStatLabel}>{s.label}</span>
            </div>
          ))}
          <Link to="/contact" className={styles.credBook} aria-label="Book consultation">
            <CalendarCheck size={15} />
            <span>Book Today</span>
          </Link>
        </div>
      </FadeReveal>

      {/* Scroll cue */}
      <motion.div
        className={styles.scrollCue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: d + 1.4 }}
        aria-hidden="true"
      >
        <motion.span
          className={styles.scrollLine}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
        />
        <span className={styles.scrollLabel}>Scroll</span>
      </motion.div>

    </section>
  );
}
