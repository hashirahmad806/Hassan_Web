import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui';
import { treatments } from '@/content';
import { createCardsRevealTimeline } from '@/animations/gsap';

import cosmeticImg from '@/assets/images/real/proto_case2.jpg';
import implantsImg from '@/assets/images/real/proto_case4.jpg';
import orthodonticsImg from '@/assets/images/real/service_orthodontics.jpg';
import generalImg from '@/assets/images/real/dr_hassan_clinic_action.jpg';

const treatmentImages: Record<string, string> = {
  cosmetic: cosmeticImg,
  implants: implantsImg,
  orthodontics: orthodonticsImg,
  general: generalImg,
};

/**
 * Premium treatments/services grid section with imagery for the homepage.
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
    <section
      ref={sectionRef}
      id="treatments"
      className="section-padding bg-surface"
      aria-labelledby="treatments-heading"
    >
      <div className="container-main">
        <SectionHeading
          label="Our Services"
          heading="Premium Treatments"
          description="Every treatment is planned with mathematical proportion and artistic intuition to restore both biology and beauty."
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {treatments.map((treatment) => {
            const imgSrc = treatmentImages[treatment.id] || cosmeticImg;

            return (
              <article
                key={treatment.id}
                data-reveal-card
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-outline-variant/40 bg-surface-container-lowest transition-all duration-300 hover:-translate-y-1 hover:border-gold-accent/50 hover:shadow-[0_12px_40px_rgba(208,184,146,0.18)]"
              >
                {/* Visual treatment image showcase */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-container">
                  <img
                    src={imgSrc}
                    alt={treatment.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                    decoding="async"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-charcoal-text/40 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-30"
                  />
                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3 right-3 rounded-full border border-outline-variant/30 bg-surface-container-lowest/90 px-3.5 py-1 backdrop-blur-md">
                    <span className="font-label-caps text-[11px] font-semibold text-primary">
                      {treatment.priceLabel}
                    </span>
                  </div>
                </div>

                {/* Content details */}
                <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-8">
                  <div className="mb-3 flex items-start justify-between">
                    <h3 className="font-headline-md text-2xl text-charcoal-text transition-colors group-hover:text-primary">
                      {treatment.title}
                    </h3>
                    <span className="font-body-md text-xs text-on-surface-variant">
                      {treatment.priceSubtext}
                    </span>
                  </div>

                  <p className="mb-6 flex-1 font-body-md text-sm leading-relaxed text-on-surface-variant">
                    {treatment.description}
                  </p>

                  <div className="flex items-center justify-between border-t border-outline-variant/20 pt-4">
                    <a
                      href="/contact"
                      className="group/link inline-flex items-center gap-2 font-label-caps text-[11px] uppercase tracking-widest text-primary transition-colors hover:text-gold-accent"
                    >
                      <span className="border-b border-current pb-0.5">Book Consultation</span>
                      <ArrowRight
                        size={13}
                        className="transition-transform duration-200 group-hover/link:translate-x-1"
                      />
                    </a>
                    <a
                      href="/services"
                      className="font-label-caps text-[11px] uppercase tracking-widest text-on-surface-variant/70 transition-colors hover:text-primary"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
