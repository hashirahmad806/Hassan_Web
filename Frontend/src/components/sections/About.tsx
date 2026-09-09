import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { aboutContent } from '@/content';
import { createSectionRevealTimeline } from '@/animations/gsap';

/**
 * About/introduction section with premium stats overlay and glassmorphism cards.
 */
export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return undefined;
      const tl = createSectionRevealTimeline(sectionRef.current);
      return () => tl.kill();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="about" className="section-padding bg-ivory-bg" aria-labelledby="about-heading">
      <div className="container-main grid grid-cols-1 items-center gap-16 md:grid-cols-2">
        {/* Image column */}
        <div className="relative" data-reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface-container shadow-2xl">
            {/* Rich gradient background as placeholder */}
            <div
              className="h-full w-full"
              style={{
                background: 'linear-gradient(135deg, #f3ede8 0%, #d0b892 40%, #6e5c3c 100%)',
              }}
              role="img"
              aria-label={aboutContent.imageAlt}
            />
            {/* Subtle inner vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-text/30 to-transparent" />

            {/* Stat cards */}
            {aboutContent.stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`absolute ${index === 0 ? 'bottom-6 left-6' : index === 1 ? 'right-6 top-6' : 'bottom-6 right-6'} rounded-2xl border border-gold-accent/30 bg-surface-container-lowest/85 px-5 py-4 shadow-lg backdrop-blur-xl`}
              >
                <span className="block font-headline-md text-2xl font-semibold text-primary" style={{ letterSpacing: '-0.02em' }}>{stat.value}</span>
                <span className="mt-0.5 block font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Decorative blob behind the image */}
          <div
            className="pointer-events-none absolute -bottom-8 -left-8 -z-10 h-48 w-48 rounded-full blur-3xl"
            style={{ background: 'rgba(208,184,146,0.15)' }}
            aria-hidden="true"
          />
        </div>

        {/* Text column */}
        <div data-reveal>
          <span className="mb-4 block font-label-caps text-label-caps uppercase tracking-[0.2em] text-gold-accent">
            {aboutContent.label}
          </span>
          <h2
            id="about-heading"
            className="mb-6 font-headline-lg text-headline-lg-mobile text-charcoal-text md:text-headline-lg"
          >
            {aboutContent.heading}
            <br />
            <span className="font-light italic text-primary">{aboutContent.headingAccent}</span>
          </h2>
          <p className="mb-5 font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            {aboutContent.paragraph1}
          </p>
          <p className="mb-10 font-body-md text-body-md text-on-surface-variant leading-relaxed">
            {aboutContent.paragraph2}
          </p>
          <Link
            to="/about"
            className="group inline-flex items-center gap-2 border-b border-primary pb-1 font-button text-button text-primary transition-all duration-300 hover:gap-3 hover:text-on-primary-fixed-variant hover:border-on-primary-fixed-variant"
          >
            {aboutContent.ctaLabel}
            <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
