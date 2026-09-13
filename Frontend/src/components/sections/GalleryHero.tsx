import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { ArrowRight, Play, Sparkles, Star } from 'lucide-react';
import styles from './GalleryHero.module.css';

import galleryVideo from '@/assets/images/real/gallery_video.mp4';
import protoCase1 from '@/assets/images/real/proto_case1.jpg';
import protoCase2 from '@/assets/images/real/proto_case2.jpg';
import protoCase3 from '@/assets/images/real/proto_case3.jpg';
import protoCase4 from '@/assets/images/real/proto_case4.jpg';

/* ── Animation helpers ───────────────────────────────────── */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE     = [0.22, 1, 0.36, 1] as const;

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
  const ref    = useRef<HTMLSpanElement>(null);
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

/** Blur-fade reveal for paragraphs */
function FadeReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref    = useRef<HTMLDivElement>(null);
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

/* ── Preview thumbnail strip ─────────────────────────────── */
const PREVIEW_IMAGES = [
  { src: protoCase1, label: 'Veneers'           },
  { src: protoCase2, label: 'Orthodontics'      },
  { src: protoCase3, label: 'Full Rehab'        },
  { src: protoCase4, label: 'Smile Makeover'    },
];

const GALLERY_STATS = [
  { value: '50+',  label: 'Cases Documented' },
  { value: '100%', label: 'Patient Satisfaction' },
  { value: '4',    label: 'Specialisms'      },
];

/* ── Component ───────────────────────────────────────────── */
export function GalleryHero() {
  return (
    <header className={styles.hero}>

      {/* ── Background video ─────────────────────── */}
      <div className={styles.bgLayer} aria-hidden="true">
        <div className={styles.bgBase} />
        <video
          autoPlay loop muted playsInline preload="auto"
          className={styles.bgVideo}
          src={galleryVideo}
        />
        <div className={styles.bgVeil} />
        <div className={styles.bgGrain} />
      </div>

      {/* Decorative column lines */}
      <div className={styles.colLine1} aria-hidden="true" />
      <div className={styles.colLine2} aria-hidden="true" />

      {/* ── Content ──────────────────────────────── */}
      <div className={styles.inner}>

        {/* Label tag */}
        <FadeReveal delay={0.1}>
          <div className={styles.labelTag}>
            <Sparkles size={11} className={styles.labelIcon} />
            <span>Clinical Portfolio · Dr. Hassan Aesthetics</span>
          </div>
        </FadeReveal>

        {/* Headline */}
        <h1 className={styles.headline}>
          <MaskedWords text="Where Art" baseDelay={0.18} stagger={0.1} />
          <br aria-hidden="true" />
          <MaskedWords text="Meets Dentistry" baseDelay={0.34} stagger={0.09}
            className={styles.headlineAccent}
          />
        </h1>

        {/* Subheading */}
        <FadeReveal delay={0.56}>
          <p className={styles.subtitle}>
            An archive of clinical excellence — complex oral rehabilitations,
            bespoke porcelain veneers, and full-arch restorations, each
            meticulously documented from first consultation to final reveal.
          </p>
        </FadeReveal>

        {/* CTAs */}
        <FadeReveal delay={0.68} className={styles.ctaRow}>
          <Link to="/contact" className={styles.ctaPrimary}>
            <span>Book a Consultation</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <a href="#cases" className={styles.ctaGhost}>
            <Play size={13} className={styles.playIcon} aria-hidden="true" />
            <span>Browse Cases</span>
          </a>
        </FadeReveal>

        {/* Stats row */}
        <FadeReveal delay={0.78} className={styles.statsRow}>
          {GALLERY_STATS.map((s, i) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
              {i < GALLERY_STATS.length - 1 && (
                <span className={styles.statDivider} aria-hidden="true" />
              )}
            </div>
          ))}
        </FadeReveal>
      </div>

      {/* ── Floating preview thumbnails ───────────── */}
      <motion.div
        className={styles.thumbStrip}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0  }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
        aria-label="Preview of case studies"
      >
        {PREVIEW_IMAGES.map((img, i) => (
          <motion.div
            key={img.label}
            className={styles.thumbItem}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.3 + i * 0.1 }}
          >
            <div className={styles.thumbImgWrap}>
              <img
                src={img.src}
                alt={`${img.label} case preview`}
                className={styles.thumbImg}
              />
              {/* Gold corner ornaments */}
              <div className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
              <div className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />
            </div>
            <span className={styles.thumbLabel}>{img.label}</span>
          </motion.div>
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

      {/* Scroll indicator */}
      <motion.a
        href="#cases"
        className={styles.scrollCue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        aria-label="Scroll to cases"
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
