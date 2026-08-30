import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { aboutContent } from '@/content';
import { createSectionRevealTimeline } from '@/animations/gsap';

/**
 * About/introduction section with stats overlay.
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
        <div className="relative" data-reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-container">
            <div
              className="h-full w-full bg-gradient-to-br from-surface-container to-primary-container/20"
              role="img"
              aria-label={aboutContent.imageAlt}
            />
            {aboutContent.stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`absolute ${index === 0 ? 'bottom-6 left-6' : 'right-6 top-6'} rounded-lg bg-surface-container-lowest/90 px-6 py-4 shadow-sm backdrop-blur`}
              >
                <span className="block font-headline-md text-2xl text-primary">{stat.value}</span>
                <span className="font-label-caps text-xs text-on-surface-variant">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal>
          <span className="mb-4 block font-label-caps text-label-caps uppercase tracking-widest text-primary">
            {aboutContent.label}
          </span>
          <h2
            id="about-heading"
            className="mb-6 font-headline-lg text-headline-lg-mobile text-charcoal-text md:text-headline-lg"
          >
            {aboutContent.heading}
            <br />
            <span className="font-light italic">{aboutContent.headingAccent}</span>
          </h2>
          <p className="mb-6 font-body-lg text-body-lg text-on-surface-variant">
            {aboutContent.paragraph1}
          </p>
          <p className="mb-8 font-body-md text-body-md text-on-surface-variant">
            {aboutContent.paragraph2}
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 border-b border-primary pb-1 font-button text-button text-primary transition-colors hover:text-on-primary-fixed-variant"
          >
            {aboutContent.ctaLabel}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
