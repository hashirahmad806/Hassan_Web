import { Brush, Award, ShieldCheck, Sparkles, HeartPulse } from 'lucide-react';
import { accreditations, auraStandard } from '@/content';

const iconMap = {
  brush: Brush,
  verified: ShieldCheck,
  spa: Sparkles,
  nature: HeartPulse,
};

/**
 * The Aura Standard philosophy section & professional accreditations bar.
 */
export function AuraStandard() {
  return (
    <section className="relative overflow-hidden bg-surface py-section-padding-mobile md:py-section-padding-desktop">
      <div className="container-main">
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block font-label-caps text-label-caps uppercase tracking-[0.2em] text-gold-accent">
            Our Philosophy
          </span>
          <h2 className="mx-auto max-w-3xl font-display-lg text-headline-lg-mobile text-primary md:text-headline-lg">
            The Aura Standard
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-2 lg:grid-cols-4">
          {auraStandard.map((item) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap] ?? Award;
            return (
              <div key={item.title} className="group">
                <div className="mb-6 flex justify-center text-gold-accent transition-transform duration-300 group-hover:scale-110">
                  <IconComponent size={36} strokeWidth={1.5} />
                </div>
                <h3 className="mb-4 font-display-lg text-xl text-primary">{item.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-24 border-t border-outline-variant/30 pt-12 text-center">
          <p className="mb-8 font-label-caps text-label-caps uppercase tracking-[0.2em] text-outline">
            Professional Accreditations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-70 grayscale transition-all duration-500 hover:grayscale-0 md:gap-16">
            {accreditations.map((badge) => (
              <div key={badge} className="font-display-lg text-xl font-semibold text-primary">
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
