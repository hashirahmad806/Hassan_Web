import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { Button } from '@/components/ui';
import { ctaContent } from '@/content';
import { createSectionRevealTimeline } from '@/animations/gsap';

/**
 * Dark call-to-action banner section.
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
      className="bg-inverse-surface py-24 text-center text-inverse-on-surface"
      aria-labelledby="cta-heading"
    >
      <div className="container-main mx-auto max-w-3xl">
        <div data-reveal>
          <h2
            id="cta-heading"
            className="mb-6 font-headline-lg text-headline-lg-mobile md:text-headline-lg"
          >
            {ctaContent.heading}
          </h2>
          <p className="mb-10 font-body-lg text-body-lg text-inverse-on-surface/80">
            {ctaContent.description}
          </p>
          <Link to="/contact">
            <Button variant="gold" size="lg">
              {ctaContent.buttonLabel}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
