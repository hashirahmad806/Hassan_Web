import { ArrowRight, Star } from 'lucide-react';
import { caseStudies, galleryCategories, testimonials } from '@/content';
import { useGalleryStore } from '@/store';

import transform1 from '@/assets/images/real/case1.jpg';
import protoCase1 from '@/assets/images/real/proto_case1.jpg';
import protoCase2 from '@/assets/images/real/proto_case2.jpg';
import protoCase3 from '@/assets/images/real/proto_case3.jpg';
import protoCase4 from '@/assets/images/real/proto_case4.jpg';

const caseImageMap: Record<string, string> = {
  'case-021': protoCase1,
  'case-042': protoCase2,
  'case-089': transform1,
  'case-112': protoCase3,
  'case-135': protoCase4,
};

/**
 * Filterable gallery grid for clinical case studies matching design specifications.
 */
export function GalleryGrid() {
  const { activeCategory, setActiveCategory } = useGalleryStore();

  const filtered =
    activeCategory === 'All Cases' || activeCategory === 'All'
      ? caseStudies
      : caseStudies.filter((item) => item.category === activeCategory);

  return (
    <section className="bg-surface py-section-padding-mobile md:py-section-padding-desktop">
      {/* Hero Intro Header */}
      <div className="container-main mb-16 border-b border-outline-variant/30 pb-16 text-center">
        <h1 className="mb-6 font-headline-lg text-headline-lg-mobile text-charcoal-text md:text-headline-lg">
          Clinical Case Studies
        </h1>
        <p className="mx-auto max-w-2xl font-body-lg text-secondary">
          An archive of clinical excellence. Explore detailed accounts of complex oral rehabilitations, where meticulous scientific planning meets refined aesthetic execution.
        </p>

        {/* Filter Buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-4" role="tablist" aria-label="Case study categories">
          {galleryCategories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              className={[
                'rounded-full border px-6 py-2 font-label-caps text-label-caps uppercase tracking-widest transition-colors duration-300',
                activeCategory === category
                  ? 'border-gold-accent bg-gold-accent text-on-primary'
                  : 'border-outline text-secondary hover:border-gold-accent hover:text-primary',
              ].join(' ')}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Clinical Approach Banner */}
      <div className="border-b border-outline-variant/30 bg-surface-container-low py-16">
        <div className="container-main mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-headline-md text-charcoal-text">The Clinical Approach</h2>
          <p className="font-body-lg text-secondary">
            Every case presented here is a testament to our core philosophy: balancing form and function. By utilizing state-of-the-art diagnostic imaging and conservative, biomimetic principles, we achieve outcomes that are structurally sound and visually imperceptible from natural dentition.
          </p>
        </div>
      </div>

      {/* Case Studies List */}
      <div className="container-main space-y-24 py-16 md:py-24">
        {filtered.map((item, index) => {
          const isEven = index % 2 === 0;
          const imgSrc = caseImageMap[item.id] || transform1;
          return (
            <article
              key={item.id}
              className="group grid grid-cols-1 items-center gap-12 lg:grid-cols-12"
            >
              <div className={`lg:col-span-7 ${isEven ? '' : 'lg:order-2'}`}>
                <div className="museum-frame relative overflow-hidden border border-outline-variant bg-white p-3 shadow-sm transition-transform duration-700 hover:scale-[1.01]">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-surface-container">
                    <img
                      src={imgSrc}
                      alt={item.afterAlt}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute bottom-3 right-3 rounded-full bg-charcoal-text/75 px-3 py-1 font-label-caps text-[10px] uppercase tracking-widest text-white backdrop-blur-sm">
                      Case Preview
                    </div>
                  </div>
                </div>
              </div>

              <div className={`space-y-6 lg:col-span-5 ${isEven ? '' : 'lg:order-1'}`}>
                <div className="flex items-center gap-4">
                  <span className="font-label-caps text-label-caps uppercase tracking-widest text-gold-accent">
                    {item.caseNumber}
                  </span>
                  <span className="h-px w-12 bg-outline-variant" aria-hidden="true" />
                  <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary">
                    {item.category}
                  </span>
                </div>

                <h3 className="font-headline-lg text-2xl text-charcoal-text md:text-3xl">
                  {item.title}
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="mb-1 font-label-caps text-label-caps uppercase tracking-widest text-charcoal-text font-semibold">
                      Challenge
                    </h4>
                    <p className="font-body-md text-sm text-secondary">{item.challenge}</p>
                  </div>
                  <div>
                    <h4 className="mb-1 font-label-caps text-label-caps uppercase tracking-widest text-charcoal-text font-semibold">
                      Solution
                    </h4>
                    <p className="font-body-md text-sm text-secondary">{item.solution}</p>
                  </div>
                  <div>
                    <h4 className="mb-1 font-label-caps text-label-caps uppercase tracking-widest text-charcoal-text font-semibold">
                      Result
                    </h4>
                    <p className="font-body-md text-sm text-secondary">{item.result}</p>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="mt-4 inline-flex items-center gap-2 font-label-caps text-xs uppercase tracking-widest text-primary transition-colors hover:text-gold-accent"
                >
                  <span className="border-b border-current pb-1">Inquire About Similar Case</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* Voices of Transformation Testimonials */}
      <div className="border-t border-outline-variant/30 bg-surface-container-low py-16 md:py-24">
        <div className="container-main mx-auto max-w-4xl text-center">
          <h2 className="mb-12 font-headline-md text-charcoal-text">
            Voices of Transformation
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {testimonials.map((t) => (
              <div
                key={t.author}
                className="museum-frame border border-outline-variant bg-surface-container-lowest p-8 text-left shadow-sm"
              >
                <div className="mb-4 flex text-gold-accent">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="mb-6 font-body-lg text-sm italic text-secondary">
                  {t.quote}
                </p>
                <div className="font-label-caps text-xs uppercase tracking-widest text-charcoal-text">
                  {t.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
