import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { BadgeCheck, Cog, Heart, Star, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui';
import {
  doctorProfile,
  heroContent,
  trustBadges,
} from '@/content';
import { createHeroTimeline } from '@/animations/gsap';
import { HeroScene } from '@/three/scenes/HeroScene';
import { usePreloaderStore } from '@/store/preloaderStore';
import styles from './Hero.module.css';

import heroVideo from '@/assets/images/real/hero_video.mp4';
import profileImg from '@/assets/images/real/dr_hassan_headshot.jpg';

const trustIcons = {
  verified:  BadgeCheck,
  precision: Cog,
  heart:     Heart,
} as const;

/** Easing for entrance animations */
const EASE = [0.22, 1, 0.36, 1] as const;

/** Stat items shown below doctor card */
const STATS = [
  { value: '20+', label: 'Years' },
  { value: '10k+', label: 'Smiles' },
  { value: '5.0', label: 'Rating' },
] as const;

/** Decorative floating orbs */
const ORBS = [
  { w: 320, h: 320, t: '-6%',  l: '-8%',  color: 'rgba(208,184,146,0.12)', blur: 80, dur: 8  },
  { w: 260, h: 260, t: '40%',  l: '55%',  color: 'rgba(110,92,60,0.07)',   blur: 70, dur: 11 },
  { w: 180, h: 180, t: '70%',  l: '10%',  color: 'rgba(208,184,146,0.09)', blur: 60, dur: 9  },
] as const;

/**
 * Hero section with video background, doctor profile card, and rich entrance animations.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasSeenIntro = usePreloaderStore((state) => state.hasSeenIntro);
  const delay = hasSeenIntro ? 0 : 0.8;

  useGSAP(
    () => {
      if (!sectionRef.current) return undefined;
      const tl = createHeroTimeline({ container: sectionRef.current, delay });
      return () => tl.kill();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className={`${styles.hero} relative flex min-h-screen items-center justify-center overflow-hidden pt-24 pb-16`}
      aria-label="Hero"
    >
      {/* ---- Video Background ------------------------------------------- */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover object-center scale-[1.02] opacity-45 sm:opacity-50 md:opacity-60 transition-opacity duration-1000"
          src={heroVideo}
        />

        {/* Mobile vertical gradient: ensures text readability on portrait devices */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface/95 via-surface/80 to-surface/95 md:hidden" />

        {/* Desktop / Tablet horizontal gradient: keeps copy legible on the left while revealing the video on the right */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/75 to-surface/35" />
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface/60" />

        {/* Subtle warm ambient vignette overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,248,243,0)_40%,_rgba(255,248,243,0.7)_100%)] pointer-events-none" />
      </div>

      {/* ---- Floating background orbs ----------------------------------- */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className={styles.floatOrb}
          style={{
            position:    'absolute',
            width:       orb.w,
            height:      orb.h,
            top:         orb.t,
            left:        orb.l,
            borderRadius: '50%',
            background:  orb.color,
            filter:      `blur(${orb.blur}px)`,
            pointerEvents: 'none',
            zIndex:      0,
            '--dur':     `${orb.dur}s`,
          } as React.CSSProperties}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, delay: delay + 0.3 + i * 0.2 }}
        />
      ))}

      {/* ---- Decorative grid lines -------------------------------------- */}
      <div className={styles.gridLines} aria-hidden="true" />

      {/* ================================================================
           MAIN CONTENT GRID
      ================================================================ */}
      <div className="container-main relative z-10 flex flex-col items-center justify-between gap-12 md:flex-row">

        {/* ---- LEFT COPY ------------------------------------------------ */}
        <div className="max-w-2xl flex-1">

          {/* Label pill */}
          <motion.div
            data-hero-label
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay }}
            className="mb-5 inline-flex items-center gap-2"
          >
            <span className={`${styles.labelPill} font-label-caps text-label-caps uppercase tracking-widest text-primary`}>
              {heroContent.label}
            </span>
          </motion.div>

          {/* Headline */}
          <h1
            data-hero-heading
            className="mb-6 font-display-lg text-headline-lg-mobile text-charcoal-text md:text-display-lg drop-shadow-sm"
          >
            {heroContent.heading}
            <br />
            <span className="italic text-primary">{heroContent.headingAccent}</span>
          </h1>

          {/* Description */}
          <p
            data-hero-description
            className="mb-8 max-w-lg font-body-lg text-body-lg text-on-surface-variant"
          >
            {heroContent.description}
          </p>

          {/* CTA Buttons */}
          <div data-hero-actions className="flex flex-col gap-4 sm:flex-row">
            <Link to="/contact">
              <Button variant="primary" size="lg">
                {heroContent.primaryCta}
              </Button>
            </Link>
            <Link to="/#treatments">
              <Button variant="secondary" size="lg">
                {heroContent.secondaryCta}
              </Button>
            </Link>
          </div>

          {/* ---- Mini stats row ----------------------------------------- */}
          <motion.div
            className="mt-10 flex items-center gap-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: delay + 0.55 }}
          >
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col items-start">
                <span
                  className="font-display-lg text-2xl font-semibold text-primary"
                  style={{ lineHeight: 1, letterSpacing: '-0.02em' }}
                >
                  {stat.value}
                </span>
                <span className="mt-0.5 font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">
                  {stat.label}
                </span>
              </div>
            ))}
            <div className="h-8 w-px bg-outline-variant/40" />
            <span className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant opacity-70">
              Award Winning Care
            </span>
          </motion.div>

        </div>

        {/* ---- RIGHT CARD ---------------------------------------------- */}
        <div data-hero-card className="relative mt-8 flex-1 md:mt-0">

          {/* Decorative blobs behind card */}
          <div className={`${styles.cardBlob} absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary-container/10 blur-3xl`} aria-hidden="true" />
          <div className={`${styles.cardBlob} absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-gold-accent/10 blur-3xl`} aria-hidden="true" />

          {/* Glass card */}
          <motion.div
            className="glass-panel ambient-shadow relative z-10 ml-auto mr-4 max-w-sm rounded-2xl p-6 md:mr-0 border border-gold-accent/30 bg-surface-container-lowest/75 backdrop-blur-2xl shadow-[0_8px_32px_rgba(208,184,146,0.15)]"
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
          >
            {/* Doctor profile header */}
            <div className="mb-4 flex items-start gap-4">
              <div className="relative">
                <img
                  src={profileImg}
                  alt={doctorProfile.imageAlt}
                  className="h-20 w-20 rounded-full border-2 border-surface-container object-cover"
                />
                {/* Online indicator */}
                <span
                  className="absolute bottom-0.5 right-0.5 h-3 w-3 animate-pulse rounded-full border-2 border-surface bg-green-500"
                  aria-hidden="true"
                />
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <h3 className="font-headline-md text-xl text-charcoal-text">{doctorProfile.name}</h3>
                </div>
                <p className="font-body-md text-sm text-on-surface-variant">{doctorProfile.title}</p>
                <div className="mt-2 flex items-center gap-1">
                  <div className="flex text-gold-accent" aria-label={`${doctorProfile.rating} star rating`}>
                    {Array.from({ length: doctorProfile.rating }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span className="ml-2 font-label-caps text-[10px] text-on-surface-variant">
                    {doctorProfile.ratingLabel}
                  </span>
                </div>
                <p className="mt-1 font-label-caps text-[10px] text-primary">
                  {doctorProfile.experienceLabel}
                </p>
              </div>
            </div>

            {/* Quote */}
            <div className="border-t border-outline-variant/30 pt-4">
              <p className="font-body-md text-sm italic text-on-surface-variant">{doctorProfile.quote}</p>
            </div>

            {/* Booking CTA inside card */}
            <Link to="/contact" className="mt-5 block">
              <button
                type="button"
                className="w-full rounded-xl bg-gold-accent/90 px-4 py-3 text-sm font-semibold tracking-wide text-charcoal-text transition-all duration-300 hover:bg-gold-accent hover:shadow-[0_4px_12px_rgba(208,184,146,0.3)] hover:-translate-y-0.5"
              >
                Book a Consultation
              </button>
            </Link>
          </motion.div>

          {/* Floating mini-badge: Available Today */}
          <motion.div
            className={`${styles.availBadge} absolute -left-4 top-8 z-20 hidden md:flex items-center gap-2 rounded-full border border-outline-variant/30 bg-surface/90 px-3 py-1.5 shadow-sm backdrop-blur-md`}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: delay + 0.8 }}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" aria-hidden="true" />
            <span className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">
              Available Today
            </span>
          </motion.div>

        </div>
      </div>

      {/* ---- 3D Scene --------------------------------------------------- */}
      <HeroScene hasSeenIntro={hasSeenIntro} />

      {/* ---- Trust badges bar ------------------------------------------ */}
      <div className="absolute bottom-0 z-20 hidden w-full border-t border-outline-variant/20 bg-surface-container-lowest/80 py-4 backdrop-blur-sm md:block">
        <div className="container-main flex items-center justify-between">
          {trustBadges.map((badge) => {
            const Icon = trustIcons[badge.icon as keyof typeof trustIcons] ?? BadgeCheck;
            return (
              <div key={badge.label} className="flex items-center gap-3">
                <Icon className="text-primary" size={20} aria-hidden="true" />
                <span className="font-label-button text-sm text-on-surface-variant">{badge.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---- Scroll indicator ------------------------------------------ */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 md:bottom-16 hidden md:flex flex-col items-center gap-1 z-20"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: delay + 1.2 }}
      >
        <span className="font-label-caps text-[9px] uppercase tracking-widest text-on-surface-variant">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity }}
        >
          <ChevronDown size={16} className="text-on-surface-variant" />
        </motion.div>
      </motion.div>

    </section>
  );
}
