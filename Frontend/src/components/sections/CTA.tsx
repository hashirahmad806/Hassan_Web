import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { Phone } from 'lucide-react';
import { ctaContent, siteConfig } from '@/content';
import { createSectionRevealTimeline } from '@/animations/gsap';

/**
 * Premium dark call-to-action banner section with glow effects.
 */
export function CTA() {
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
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-inverse-surface py-28 text-center text-inverse-on-surface"
      aria-labelledby="cta-heading"
    >
      {/* Decorative glow orbs */}
      <div
        className="pointer-events-none absolute left-[-5%] top-[-20%] h-80 w-80 rounded-full blur-3xl"
        style={{ background: 'rgba(208,184,146,0.07)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[-20%] right-[-5%] h-96 w-96 rounded-full blur-3xl"
        style={{ background: 'rgba(208,184,146,0.05)' }}
        aria-hidden="true"
      />

      {/* Gold top line divider */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(208,184,146,0.5), transparent)' }}
        aria-hidden="true"
      />

      <div className="container-main relative z-10 mx-auto max-w-3xl" data-reveal>
        {/* Label */}
        <span className="mb-5 inline-block rounded-full border border-gold-accent/30 bg-gold-accent/10 px-4 py-1.5 font-label-caps text-[11px] uppercase tracking-[0.2em] text-gold-accent">
          Begin Your Journey
        </span>

        <h2
          id="cta-heading"
          className="mb-6 font-headline-lg text-headline-lg-mobile md:text-headline-lg"
        >
          {ctaContent.heading}
        </h2>

        <p className="mb-10 font-body-lg text-body-lg text-inverse-on-surface/75 text-balance">
          {ctaContent.description}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* Primary gold CTA */}
          <Link to="/contact">
            <button
              type="button"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold-accent px-10 py-4 font-semibold tracking-wide text-charcoal-text shadow-[0_0_30px_rgba(208,184,146,0.25)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(208,184,146,0.45)] hover:-translate-y-0.5 hover:bg-gold-accent/90"
            >
              {ctaContent.buttonLabel}
            </button>
          </Link>

          {/* Secondary phone CTA */}
          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex items-center gap-2.5 rounded-full border border-inverse-on-surface/20 px-8 py-4 font-label-button text-label-button text-inverse-on-surface/80 backdrop-blur-sm transition-all duration-300 hover:border-gold-accent/40 hover:text-gold-accent hover:-translate-y-0.5"
          >
            <Phone size={16} aria-hidden="true" />
            {siteConfig.phone}
          </a>
        </div>
      </div>

      {/* Gold bottom line divider */}
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(208,184,146,0.3), transparent)' }}
        aria-hidden="true"
      />
    </section>
  );
}
