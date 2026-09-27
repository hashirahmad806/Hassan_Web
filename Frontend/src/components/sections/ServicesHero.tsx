import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { ArrowRight, ChevronDown, Sparkles, Star } from 'lucide-react';
import styles from './ServicesHero.module.css';

import protoCase1 from '@/assets/images/real/proto_case1.jpg';
import protoCase4 from '@/assets/images/real/proto_case4.jpg';
import serviceOrthodontics from '@/assets/images/real/service_orthodontics.jpg';
import serviceGeneralCare from '@/assets/images/real/service_general_care.jpg';

/* ── Animation constants ─────────────────────────────────── */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE = [0.22, 1, 0.36, 1] as const;

/* Publicly hosted video path */
const SERVICES_HERO_VIDEO = "/Services/Dentist_examining_patient's_teeth_1080p_20260914005225.mp4";

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

/* ── Preview service cards ────────────────────────────────── */
const PREVIEW_SERVICES = [
  { src: protoCase1, label: 'Porcelain Veneers', targetId: '#cosmetic' },
  { src: protoCase4, label: 'Dental Implants', targetId: '#restorative' },
  { src: serviceOrthodontics, label: 'Orthodontics', targetId: '#treatment-directory' },
  { src: serviceGeneralCare, label: 'Preventative Care', targetId: '#preventative' },
];

const CLINICAL_STATS = [
  { value: '3+', label: 'Years Expertise' },
  { value: '500+', label: 'Successful Procedures' },

];

/* ── ServicesHero Component ──────────────────────────────── */
export function ServicesHero() {
  return (
    <header className={styles.hero}>
      {/* ── Ambient Background Video Layer ────────────────── */}
      <div className={styles.bgLayer} aria-hidden="true">
        <div className={styles.bgBase} />
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={styles.bgVideo}
          src={SERVICES_HERO_VIDEO}
        />
        <div className={styles.bgVeil} />
        <div className={styles.bgGrain} />
      </div>

      {/* Architectural hairline guides */}
      <div className={styles.colLine1} aria-hidden="true" />
      <div className={styles.colLine2} aria-hidden="true" />

      {/* ── Left Content Column ───────────────────────────── */}
      <div className={styles.inner}>
        {/* Label Tag */}
        <FadeReveal delay={0.1}>
          <div className={styles.labelTag}>
            <Sparkles size={11} className={styles.labelIcon} aria-hidden="true" />
            <span>Treatment Portfolio · Dr. Hassan Salman</span>
          </div>
        </FadeReveal>

        {/* Cinematic Headline */}
        <h1 className={styles.headline}>
          <MaskedWords text="The Craft " baseDelay={0.18} stagger={0.1} />
          <br aria-hidden="true" />
          <MaskedWords
            text="  of Dentistry"
            baseDelay={0.34}
            stagger={0.08}
            className={styles.headlineAccent}
          />
        </h1>

        {/* Editorial Subtitle */}
        <FadeReveal delay={0.56}>
          <p className={styles.subtitle}>
            Curated specialized dental and aesthetic treatments designed to elevate your health and
            confidence in a serene, luxurious environment. Every procedure merges micro-surgical
            precision with biomimetic artistry.
          </p>
        </FadeReveal>

        {/* Action CTAs */}
        <FadeReveal delay={0.68} className={styles.ctaRow}>
          <Link to="/contact" className={styles.ctaPrimary}>
            <span>Schedule Consultation</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <a href="#treatment-directory" className={styles.ctaGhost}>
            <ChevronDown size={14} className={styles.ctaIcon} aria-hidden="true" />
            <span>Explore Treatments</span>
          </a>
        </FadeReveal>

        {/* Clinical Excellence Metrics */}
        <FadeReveal delay={0.78} className={styles.statsRow}>
          {CLINICAL_STATS.map((s, i) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
              {i < CLINICAL_STATS.length - 1 && (
                <span className={styles.statDivider} aria-hidden="true" />
              )}
            </div>
          ))}
        </FadeReveal>
      </div>

      {/* ── Right Floating Preview Cards ──────────────────── */}
      <motion.div
        className={styles.thumbStrip}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
        aria-label="Preview of specialized treatments"
      >
        {PREVIEW_SERVICES.map((item, i) => (
          <motion.a
            key={item.label}
            href={item.targetId}
            className={styles.thumbItem}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.3 + i * 0.1 }}
          >
            <div className={styles.thumbImgWrap}>
              <img
                src={item.src}
                alt={`${item.label} treatment preview`}
                className={styles.thumbImg}
                loading="eager"
              />
              {/* Luxury gold corner accents */}
              <div className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
              <div className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />
            </div>
            <span className={styles.thumbLabel}>{item.label}</span>
          </motion.a>
        ))}

        {/* Five-star trust badge */}
        <motion.div
          className={styles.trustBadge}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.8 }}
        >
          <div className={styles.trustStars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={12} fill="#D0B892" color="#D0B892" />
            ))}
          </div>
          <p className={styles.trustText}>Rated 5.0 by our patients</p>
        </motion.div>
      </motion.div>

      {/* ── Scroll cue anchor ─────────────────────────────── */}
      <motion.a
        href="#clinical-excellence"
        className={styles.scrollCue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        aria-label="Scroll to clinical excellence"
      >
        <motion.span
          className={styles.scrollLine}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
        />
        <span className={styles.scrollLabel}>Explore</span>
      </motion.a>
    </header>
  );
}
