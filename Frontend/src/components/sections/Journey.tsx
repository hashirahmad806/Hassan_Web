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
            className="absolute left-[10%] right-[10%] top-8 hidden h-px bg-gradient-to-r from-transparent via-gold-accent/50 to-transparent md:block"
            aria-hidden="true"
          />
          {journeyContent.steps.map((step) => (
            <article key={step.step} data-reveal-card className="group relative text-center">
              <div className="relative z-10 mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold-accent/30 bg-surface-container-lowest font-headline-md text-xl text-primary transition-all duration-500 group-hover:scale-110 group-hover:border-gold-accent group-hover:bg-gold-accent/10 group-hover:shadow-[0_0_20px_rgba(208,184,146,0.3)]">
                {step.step}
              </div>
              <h3 className="mb-3 font-headline-md text-xl text-charcoal-text transition-colors group-hover:text-primary">{step.title}</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
