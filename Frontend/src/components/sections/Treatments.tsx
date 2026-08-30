import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { SectionHeading } from '@/components/ui';
import { treatments } from '@/content';
import { createCardsRevealTimeline } from '@/animations/gsap';

/**
 * Premium treatments/services grid section.
 */
export function Treatments() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return undefined;
      const tl = createCardsRevealTimeline(sectionRef.current);
      return () => tl.kill();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="treatments" className="section-padding bg-surface" aria-labelledby="treatments-heading">
      <div className="container-main">
        <SectionHeading
          label="Our Services"
          heading="Premium Treatments"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {treatments.map((treatment) => (
            <article
              key={treatment.id}
              data-reveal-card
              className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-8 transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between">
                <h3 className="font-headline-md text-2xl text-charcoal-text">{treatment.title}</h3>
                <div className="text-right">
                  <span className="mb-1 block font-label-caps text-xs text-primary">
                    {treatment.priceLabel}
                  </span>
                  <span className="block font-body-md text-sm text-on-surface-variant">
                    {treatment.priceSubtext}
                  </span>
                </div>
              </div>
              <p className="font-body-md text-on-surface-variant">{treatment.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
