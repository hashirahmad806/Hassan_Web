import { useRef } from 'react';
import { Skeleton } from 'boneyard-js/react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Globe,
  GraduationCap,
  Zap,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Header, Footer, MobileStickyActions, PageWrapper } from '@/components/layout';
import { aboutDetailed } from '@/content';

import drHassanFounderImg from '@/assets/images/real/dr_hassan_founder_real.jpg';
import philosophyOrchidImg from '@/assets/images/real/philosophy_orchid.jpg';
import profileImg from '@/assets/images/real/dr_hassan_headshot.jpg';

gsap.registerPlugin(ScrollTrigger);

const distinctionIcons = {
  verified: CheckCircle2,
  workspace_premium: Award,
  psychiatry: Zap,
  public: Globe,
};

/**
 * Full About Page — Dr. Hassan Salman Expert Profile & Achievements.
 */
export default function AboutPage() {
  const { hero, distinctions, timeline, education, memberships, philosophy } = aboutDetailed;
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray('.animate-section') as HTMLElement[];

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      const staggers = gsap.utils.toArray('.animate-stagger-container') as HTMLElement[];
      staggers.forEach((container) => {
        const items = container.querySelectorAll('.animate-stagger-item');
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <Skeleton name="about" loading={false}>
      <PageWrapper>
        <Header />
        <main className="w-full pt-24" ref={containerRef}>
          {/* Hero Section */}
          <section className="container-main py-16 md:py-24 animate-section">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
              <div className="z-10 md:col-span-5">
                <span className="mb-4 inline-block font-label-caps text-xs uppercase tracking-[0.2em] text-gold-accent">
                  Meet the Founder
                </span>
                <h1 className="mb-6 font-display-lg text-headline-lg-mobile text-primary md:text-display-lg">
                  {hero.heading}
                </h1>
                <p className="mb-6 font-body-lg text-body-lg text-on-surface-variant">
                  {hero.paragraph1}
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {hero.paragraph2}
                </p>
              </div>
              <div className="relative h-[450px] overflow-hidden rounded-2xl border border-outline-variant/30 shadow-xl md:col-span-7 md:h-[600px]">
                <img
                  src={drHassanFounderImg || profileImg}
                  alt="Dr. Hassan Salman in modern clinic"
                  className="h-full w-full object-cover object-center transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </section>

          {/* Distinctions Section */}
          <section className="container-main py-16 md:py-24 animate-section">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-headline-lg text-headline-lg-mobile tracking-tight text-primary md:text-headline-lg">
                Professional Distinctions
              </h2>
              <div className="mx-auto h-[2px] w-16 bg-gold-accent" />
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 animate-stagger-container">
              {distinctions.map((item) => {
                const Icon =
                  distinctionIcons[item.icon as keyof typeof distinctionIcons] ?? Award;
                return (
                  <div
                    key={item.title}
                    className="animate-stagger-item rounded-xl border border-outline-variant/30 bg-surface-container-low p-8 text-center shadow-sm transition-transform duration-500 hover:-translate-y-2 hover:shadow-md hover:border-gold-accent/50"
                  >
                    <div className="mb-4 flex justify-center text-gold-accent">
                      <Icon size={36} />
                    </div>
                    <h3 className="mb-2 font-headline-md text-lg text-on-surface font-semibold">
                      {item.title}
                    </h3>
                    <p className="font-body-md text-sm text-on-surface-variant">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 20-Year Timeline Section */}
          <section className="bg-surface-container-low py-16 md:py-24 animate-section">
            <div className="container-main">
              <div className="mb-16 text-center">
                <h2 className="mb-4 font-headline-lg text-headline-lg-mobile tracking-tight text-primary md:text-headline-lg">
                  A 20-Year Journey
                </h2>
                <p className="mx-auto max-w-2xl font-body-md text-on-surface-variant">
                  A timeline of dedication, innovation, and clinical mastery.
                </p>
              </div>
              <div className="relative mx-auto max-w-4xl">
                <div className="absolute left-1/2 hidden h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-gold-accent/20 via-gold-accent to-gold-accent/20 md:block" />
                <div className="space-y-12 animate-stagger-container">
                  {timeline.map((event, idx) => {
                    const isEven = idx % 2 === 0;
                    return (
                      <div
                        key={event.year}
                        className="animate-stagger-item group flex flex-col items-center justify-between w-full md:flex-row"
                      >
                        <div
                          className={`w-full md:w-5/12 text-center ${isEven
                            ? 'md:text-right md:pr-8 mb-4 md:mb-0'
                            : 'hidden md:block'
                            }`}
                        >
                          {isEven && (
                            <>
                              <h4 className="font-display-lg text-2xl font-semibold text-gold-accent">
                                {event.year}
                              </h4>
                              <h5 className="mt-1 font-headline-md text-lg text-on-surface">
                                {event.title}
                              </h5>
                              <p className="mt-2 font-body-md text-sm text-on-surface-variant">
                                {event.description}
                              </p>
                            </>
                          )}
                        </div>

                        <div className="z-10 hidden h-4 w-4 rounded-full border-4 border-surface-container-low bg-gold-accent transition-transform duration-300 group-hover:scale-125 md:block" />

                        <div
                          className={`w-full md:w-5/12 text-center ${!isEven
                            ? 'md:text-left md:pl-8 mt-4 md:mt-0'
                            : 'hidden md:block'
                            }`}
                        >
                          {!isEven && (
                            <>
                              <h4 className="font-display-lg text-2xl font-semibold text-gold-accent">
                                {event.year}
                              </h4>
                              <h5 className="mt-1 font-headline-md text-lg text-on-surface">
                                {event.title}
                              </h5>
                              <p className="mt-2 font-body-md text-sm text-on-surface-variant">
                                {event.description}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Credentials Section */}
          <section className="container-main py-16 md:py-24 animate-section">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 animate-stagger-container">
              <div className="animate-stagger-item rounded-2xl border border-outline-variant/30 bg-surface-container-highest p-8 md:p-12 transition-colors duration-500 hover:border-gold-accent/30">
                <h3 className="mb-6 flex items-center gap-3 font-display-lg text-2xl text-primary">
                  <GraduationCap className="text-gold-accent" size={28} />
                  Education &amp; Training
                </h3>
                <ul className="space-y-6">
                  {education.map((item) => (
                    <li key={item.title} className="flex items-start gap-4">
                      <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold-accent" />
                      <div>
                        <h4 className="font-headline-md text-base font-medium text-on-surface">
                          {item.title}
                        </h4>
                        <p className="mt-1 font-body-md text-sm text-on-surface-variant">
                          {item.institution}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="animate-stagger-item rounded-2xl border border-outline-variant/30 bg-surface-container-highest p-8 md:p-12 transition-colors duration-500 hover:border-gold-accent/30">
                <h3 className="mb-6 flex items-center gap-3 font-display-lg text-2xl text-primary">
                  <BookOpen className="text-gold-accent" size={28} />
                  Professional Memberships
                </h3>
                <ul className="space-y-6">
                  {memberships.map((item) => (
                    <li key={item.title} className="flex items-start gap-4">
                      <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold-accent" />
                      <div>
                        <h4 className="font-headline-md text-base font-medium text-on-surface">
                          {item.title}
                        </h4>
                        <p className="mt-1 font-body-md text-sm text-on-surface-variant">
                          {item.role}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Philosophy Section */}
          <section className="bg-inverse-surface py-16 text-inverse-on-surface md:py-24 animate-section">
            <div className="container-main grid grid-cols-1 items-center gap-16 md:grid-cols-2">
              <div className="space-y-6">
                <span className="inline-block rounded-full border border-gold-accent/50 px-4 py-1 font-label-caps text-xs tracking-widest text-gold-accent">
                  PHILOSOPHY
                </span>
                <h2 className="font-display-lg text-headline-lg-mobile tracking-tight text-on-primary md:text-headline-lg">
                  {philosophy.heading}
                </h2>
                <p className="font-body-lg text-body-lg font-light leading-relaxed text-inverse-on-surface/80">
                  {philosophy.paragraph1}
                </p>
                <p className="font-body-md text-body-md font-light leading-relaxed text-inverse-on-surface/80">
                  {philosophy.paragraph2}
                </p>
                <div className="pt-4 font-display-lg text-3xl text-gold-accent/80 italic">
                  Dr. Hassan Salman
                </div>
              </div>
              <div className="relative h-[350px] overflow-hidden rounded-xl md:h-[450px]">
                <img
                  src={philosophyOrchidImg || profileImg}
                  alt="Dr. Hassan Salman philosophy"
                  className="h-full w-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface to-transparent" />
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <MobileStickyActions />
      </PageWrapper>
    </Skeleton>
  );
}
