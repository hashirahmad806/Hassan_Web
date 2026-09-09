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
              <div key={item.title} className="group rounded-2xl p-6 transition-all duration-300 hover:bg-surface-container-lowest hover:shadow-[0_8px_30px_rgba(208,184,146,0.12)]">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold-accent/10 text-gold-accent transition-all duration-500 group-hover:scale-110 group-hover:bg-gold-accent group-hover:text-surface-container-lowest group-hover:shadow-[0_0_20px_rgba(208,184,146,0.4)]">
                  <IconComponent size={36} strokeWidth={1.5} />
                </div>
                <h3 className="mb-4 font-display-lg text-xl text-primary">{item.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
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
