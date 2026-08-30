import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { SectionHeading } from '@/components/ui';
import { journeyContent } from '@/content';
import { createCardsRevealTimeline } from '@/animations/gsap';

/**
 * Four-step patient journey timeline section.
 */
export function Journey() {
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
    <section ref={sectionRef} id="journey" className="section-padding bg-surface" aria-labelledby="journey-heading">
      <div className="container-main">
        <SectionHeading
          label={journeyContent.label}
          heading={journeyContent.heading}
        />

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
          <div
            className="absolute left-[10%] right-[10%] top-6 hidden h-px bg-outline-variant/50 md:block"
            aria-hidden="true"
          />
          {journeyContent.steps.map((step) => (
            <article key={step.step} data-reveal-card className="relative text-center">
              <div className="relative z-10 mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant bg-surface-container-lowest font-headline-md text-primary">
                {step.step}
              </div>
              <h3 className="mb-3 font-headline-md text-xl text-charcoal-text">{step.title}</h3>
              <p className="font-body-md text-on-surface-variant">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
