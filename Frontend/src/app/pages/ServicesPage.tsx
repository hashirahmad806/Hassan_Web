import { Link } from 'react-router-dom';
import { Skeleton } from 'boneyard-js/react';
import {
  ArrowRight,
  Sparkles,
  Sun,
  ShieldCheck,
  CircleDot,
  Combine,
  HeartHandshake,
  Focus,
  Microscope,
} from 'lucide-react';
import { Header, Footer, MobileStickyActions, PageWrapper } from '@/components/layout';
import { Button } from '@/components/ui';
import { servicesDetailedDirectory } from '@/content';

const serviceIcons = {
  trip_origin: CircleDot,
  join_inner: Combine,
  auto_awesome: Sparkles,
  wb_sunny: Sun,
  health_and_safety: ShieldCheck,
  clean_hands: HeartHandshake,
};

const excellenceIcons = {
  center_focus_strong: Focus,
  biotech: Microscope,
};

/**
 * Services directory page — complete portfolio matching design.
 */
export default function ServicesPage() {
  const { hero, clinicalExcellence, metrics, categories } = servicesDetailedDirectory;

  return (
    <Skeleton name="services" loading={false}>
      <PageWrapper>
        <Header />
        <main className="min-h-screen pt-24">
          {/* Editorial Hero Header */}
          <header className="container-main py-16 md:py-24">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <span className="mb-6 inline-block border-b border-primary pb-1 font-label-caps text-xs uppercase tracking-widest text-primary">
                  {hero.label}
                </span>
                <h1 className="mb-6 font-display-lg text-headline-lg-mobile text-primary md:text-display-lg">
                  The Art &amp; Science <br />
                  <span className="italic text-primary/80">of Dentistry</span>
                </h1>
                <p className="max-w-xl font-body-md text-body-lg text-on-surface-variant">
                  {hero.description}
                </p>
              </div>
              <div className="hidden h-[400px] w-full rounded-lg border border-outline-variant/30 bg-surface-container-low p-8 shadow-sm lg:col-span-5 lg:flex lg:flex-col lg:justify-between">
                <div className="space-y-4">
                  <span className="font-label-caps text-xs uppercase tracking-widest text-gold-accent">
                    Luxury Standard
                  </span>
                  <h3 className="font-display-lg text-2xl text-primary">
                    Precision, Innovation &amp; Aesthetic Perfection
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant">
                    Every treatment plan is bespoke, combining advanced digital smile design with biomimetic restorative techniques.
                  </p>
                </div>
                <Link to="/contact">
                  <Button variant="primary" size="md">
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </header>

          {/* Clinical Excellence Section */}
          <section className="border-y border-outline-variant/30 bg-surface-container-low py-16 md:py-24">
            <div className="container-main">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
                <div className="lg:col-span-1">
                  <h2 className="mb-4 font-headline-lg text-headline-lg-mobile text-primary md:text-headline-lg">
                    {clinicalExcellence.title}
                  </h2>
                  <p className="font-body-md text-on-secondary-container">
                    {clinicalExcellence.subtitle}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:col-span-2">
                  {clinicalExcellence.items.map((item) => {
                    const Icon =
                      excellenceIcons[item.icon as keyof typeof excellenceIcons] ?? Focus;
                    return (
                      <div key={item.title} className="space-y-3">
                        <div className="flex items-center gap-3 text-gold-accent">
                          <Icon size={24} />
                          <h3 className="font-headline-md text-xl text-primary">
                            {item.title}
                          </h3>
                        </div>
                        <p className="font-body-md text-sm text-on-surface-variant">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Patient Success Metrics */}
          <section className="bg-primary text-on-primary py-12">
            <div className="container-main flex flex-col items-center justify-around gap-8 text-center md:flex-row md:divide-x md:divide-white/20">
              {metrics.map((metric) => (
                <div key={metric.label} className="w-full px-8 md:w-auto">
                  <div className="font-display-lg text-4xl md:text-5xl">{metric.value}</div>
                  <div className="mt-1 font-label-caps text-xs uppercase tracking-widest text-white/80">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Categories Directory */}
          <div className="space-y-24 py-16 md:py-24">
            {categories.map((cat) => (
              <section
                key={cat.id}
                id={cat.id}
                className="container-main border-b border-outline-variant/30 pb-20 last:border-b-0"
              >
                <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
                  <div className="top-32 self-start lg:w-1/3 lg:sticky">
                    <span className="mb-4 block font-label-caps text-xs uppercase tracking-widest text-primary/60">
                      {cat.number}
                    </span>
                    <h2 className="mb-4 font-display-lg text-headline-lg text-primary">
                      {cat.title}
                    </h2>
                    <p className="mb-6 font-body-md text-on-surface-variant">
                      {cat.subtitle}
                    </p>

                    <div className="border border-outline-variant/30 bg-surface-container-low p-6">
                      <h4 className="mb-3 font-label-caps text-xs uppercase tracking-widest text-primary font-semibold">
                        Indications
                      </h4>
                      <ul className="space-y-2 text-sm text-on-surface-variant list-disc list-inside">
                        {cat.indications.map((ind) => (
                          <li key={ind}>{ind}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:w-2/3">
                    {cat.cards.map((card) => {
                      const Icon = serviceIcons[card.icon as keyof typeof serviceIcons] ?? CircleDot;
                      return (
                        <div
                          key={card.title}
                          className="glass-panel flex flex-col justify-between rounded-xl border border-outline-variant/30 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-accent/50"
                        >
                          <div>
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-primary/10 bg-surface-container-low text-primary">
                              <Icon size={24} />
                            </div>
                            <h3 className="mb-3 font-headline-md text-2xl text-primary">
                              {card.title}
                            </h3>
                            <p className="mb-4 font-body-md text-sm text-on-surface-variant">
                              {card.description}
                            </p>
                            <p className="mb-6 font-body-md text-xs italic text-primary/80">
                              Benefit: {card.benefit}
                            </p>
                          </div>
                          <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 font-label-caps text-xs uppercase tracking-widest text-primary transition-colors hover:text-gold-accent"
                          >
                            Book Treatment <ArrowRight size={14} />
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </main>
        <Footer />
        <MobileStickyActions />
      </PageWrapper>
    </Skeleton>
  );
}
