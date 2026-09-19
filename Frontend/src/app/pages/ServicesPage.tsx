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
import { ServicesHero } from '@/components/sections';
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

const clinicalAssurances = [
  {
    number: '01',
    title: 'Biomimetic Philosophy',
    description:
      'Conservative micro-dentistry preserving natural tooth vitality and structural integrity.',
  },
  {
    number: '02',
    title: 'Digital Smile Blueprint',
    description:
      'High-resolution 3D photogrammetry and facial simulation prior to any tooth preparation.',
  },
  {
    number: '03',
    title: 'Master Ceramist Artistry',
    description:
      'Custom hand-layered ceramic restorations matched to natural optical enamel translucency.',
  },
  {
    number: '04',
    title: 'Hospital-Grade Asepsis',
    description:
      'Strict Class-B vacuum autoclave protocols and sterile operatory environments.',
  },
];

/**
 * Services directory page — complete portfolio matching luxury design.
 */
export default function ServicesPage() {
  const { clinicalExcellence, categories } = servicesDetailedDirectory;

  return (
    <Skeleton name="services" loading={false}>
      <PageWrapper>
        <Header />
        <main className="min-h-screen">
          {/* Cinematic Services Hero with Ambient Video */}
          <ServicesHero />

          {/* Clinical Excellence Section */}
          <section
            id="clinical-excellence"
            className="border-y border-outline-variant/30 bg-surface-container-low py-16 md:py-24"
          >
            <div className="container-main">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
                <div className="lg:col-span-1">
                  <span className="mb-3 inline-flex items-center gap-1.5 font-label-caps text-xs uppercase tracking-widest text-gold-accent font-semibold">
                    <Sparkles size={12} />
                    <span>Scientific Standards</span>
                  </span>
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
                      <div
                        key={item.title}
                        className="space-y-3 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm transition-all duration-300 hover:border-gold-accent/40"
                      >
                        <div className="flex items-center gap-3 text-gold-accent">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold-accent/30 bg-gold-accent/10">
                            <Icon size={20} />
                          </div>
                          <h3 className="font-headline-md text-xl text-primary">
                            {item.title}
                          </h3>
                        </div>
                        <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Four Pillars of Clinical Precision (Replaces redundant metrics band) */}
          <section className="border-b border-outline-variant/30 bg-[#161310] py-14 text-[#f0e8d8]">
            <div className="container-main">
              <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end border-b border-white/10 pb-6">
                <div>
                  <span className="font-label-caps text-xs uppercase tracking-widest text-gold-accent font-bold">
                    Aesthetic Standard of Care
                  </span>
                  <h3 className="mt-1 font-display-lg text-2xl md:text-3xl text-[#f0e8d8]">
                    Four Pillars of Clinical Precision
                  </h3>
                </div>
                <p className="max-w-md font-body-md text-xs text-[#f0e8d8]/60 leading-relaxed">
                  Every treatment at Dr. Hassan's clinic adheres to uncompromising biological, structural, and aesthetic benchmarks.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {clinicalAssurances.map((item) => (
                  <div
                    key={item.number}
                    className="relative space-y-2 border-l border-gold-accent/30 pl-5"
                  >
                    <span className="font-label-caps text-[11px] font-bold text-gold-accent tracking-widest">
                      {item.number}
                    </span>
                    <h4 className="font-headline-md text-lg text-[#f0e8d8]">{item.title}</h4>
                    <p className="font-body-md text-xs leading-relaxed text-[#f0e8d8]/60">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Categories Directory */}
          <div id="treatment-directory" className="space-y-24 py-16 md:py-24">
            {categories.map((cat) => (
              <section
                key={cat.id}
                id={cat.id}
                className="container-main border-b border-outline-variant/30 pb-20 last:border-b-0"
              >
                <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
                  <div className="top-32 self-start lg:w-1/3 lg:sticky">
                    <span className="mb-4 block font-label-caps text-xs uppercase tracking-widest text-primary/60 font-semibold">
                      {cat.number} · Specialized Discipline
                    </span>
                    <h2 className="mb-4 font-display-lg text-headline-lg text-primary">
                      {cat.title}
                    </h2>
                    <p className="mb-6 font-body-md text-on-surface-variant leading-relaxed">
                      {cat.subtitle}
                    </p>

                    {/* Elevated Clinical Indications Card */}
                    <div className="relative overflow-hidden rounded-xl border border-gold-accent/25 bg-surface-container-low p-6 shadow-sm">
                      <div className="absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2 border-gold-accent/30 pointer-events-none rounded-tr-xl" />
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-accent/20 bg-gold-accent/10 px-3 py-1 font-label-caps text-[10px] font-bold uppercase tracking-wider text-primary">
                        <Sparkles size={11} className="text-gold-accent" />
                        <span>Clinical Indications</span>
                      </div>
                      <ul className="space-y-2.5 text-sm text-on-surface-variant">
                        {cat.indications.map((ind) => (
                          <li key={ind} className="flex items-start gap-2.5">
                            <span className="mt-1 text-gold-accent font-bold text-xs select-none">✦</span>
                            <span className="leading-snug">{ind}</span>
                          </li>
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
                          className="glass-panel flex flex-col justify-between rounded-xl border border-outline-variant/30 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-accent/60 hover:shadow-md"
                        >
                          <div>
                            <div className="mb-6 flex items-center justify-between">
                              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/10 bg-surface-container-low text-primary shadow-xs">
                                <Icon size={22} />
                              </div>
                              <span className="rounded-full border border-gold-accent/25 bg-gold-accent/5 px-2.5 py-0.5 font-label-caps text-[9px] uppercase tracking-wider text-primary font-bold">
                                Bespoke Care
                              </span>
                            </div>
                            <h3 className="mb-3 font-headline-md text-2xl text-primary">
                              {card.title}
                            </h3>
                            <p className="mb-5 font-body-md text-sm text-on-surface-variant leading-relaxed">
                              {card.description}
                            </p>
                            <div className="mb-6 rounded-lg border border-gold-accent/20 bg-gold-accent/5 p-3.5">
                              <span className="font-label-caps text-[10px] font-bold uppercase tracking-wider text-primary block mb-0.5">
                                Clinical Benefit:
                              </span>
                              <p className="font-body-md text-xs text-on-surface-variant leading-snug">
                                {card.benefit}
                              </p>
                            </div>
                          </div>
                          <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 font-label-caps text-xs uppercase tracking-widest text-primary font-bold transition-all duration-200 hover:text-gold-accent hover:gap-3"
                          >
                            <span>Schedule Treatment</span>
                            <ArrowRight size={14} />
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
