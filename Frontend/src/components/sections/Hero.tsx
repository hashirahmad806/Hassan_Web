import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { BadgeCheck, Cog, Heart, Star } from 'lucide-react';
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
import profileImg from '@/assets/images/real/profile.png';

const trustIcons = {
  verified: BadgeCheck,
  precision: Cog,
  heart: Heart,
} as const;

/**
 * Hero section with video background and doctor profile card.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  // Check if we need to delay the Hero entrance for the preloader
  const hasSeenIntro = usePreloaderStore((state) => state.hasSeenIntro);
  const delay = hasSeenIntro ? 0 : 2.25;

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
      className={`${styles.hero} relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-24`}
      aria-label="Hero"
    >
      {/* Video Background */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-60 mix-blend-overlay"
          src={heroVideo}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface/80 via-surface/60 to-transparent" />
      </div>

      <div className="container-main relative z-10 flex flex-col items-center justify-between gap-12 md:flex-row">
        <div className="max-w-2xl flex-1">
          <span
            data-hero-label
            className="mb-4 block font-label-caps text-label-caps uppercase tracking-widest text-primary"
          >
            {heroContent.label}
          </span>
          <h1
            data-hero-heading
            className="mb-6 font-display-lg text-headline-lg-mobile text-charcoal-text md:text-display-lg"
          >
            {heroContent.heading}
            <br />
            <span className="italic text-primary">{heroContent.headingAccent}</span>
          </h1>
          <p
            data-hero-description
            className="mb-8 max-w-lg font-body-lg text-body-lg text-on-surface-variant"
          >
            {heroContent.description}
          </p>
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
        </div>

        <div data-hero-card className="relative mt-8 flex-1 md:mt-0">
          <div className="glass-panel ambient-shadow relative z-10 ml-auto mr-4 max-w-sm rounded-xl p-6 md:mr-0">
            <div className="mb-4 flex items-start gap-4">
              <img
                src={profileImg}
                alt={doctorProfile.imageAlt}
                className="h-20 w-20 rounded-full border-2 border-surface-container object-cover"
              />
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <h3 className="font-headline-md text-xl text-charcoal-text">{doctorProfile.name}</h3>
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" aria-hidden="true" />
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
            <div className="border-t border-outline-variant/30 pt-4">
              <p className="font-body-md text-sm italic text-on-surface-variant">{doctorProfile.quote}</p>
            </div>
          </div>
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary-container/10 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-gold-accent/10 blur-3xl" aria-hidden="true" />
        </div>
      </div>

      <HeroScene hasSeenIntro={hasSeenIntro} />

      <div className="absolute bottom-0 z-20 hidden w-full border-t border-outline-variant/20 bg-surface-container-lowest py-4 md:block">
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
    </section>
  );
}
