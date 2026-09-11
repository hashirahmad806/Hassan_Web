import { Link } from 'react-router-dom';
import { ArrowRight, Star, MessageCircle } from 'lucide-react';
import { caseStudies, galleryCategories, testimonials } from '@/content';
import { useGalleryStore } from '@/store';

import protoCase1 from '@/assets/images/real/proto_case1.jpg';
import protoCase2 from '@/assets/images/real/proto_case2.jpg';
import protoCase3 from '@/assets/images/real/proto_case3.jpg';
import protoCase4 from '@/assets/images/real/proto_case4.jpg';

const caseImageMap: Record<string, string> = {
  'case-021': protoCase1,
  'case-042': protoCase2,
  'case-089': protoCase3,
  'case-112': protoCase4,
  'case-135': protoCase2,
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
          const imgSrc = caseImageMap[item.id] || protoCase1;
          const inquiryUrl = `/contact?case=${encodeURIComponent(item.caseNumber)}&title=${encodeURIComponent(item.title)}&category=${encodeURIComponent(item.category)}`;
          const whatsappInquiryUrl = `https://wa.me/923349295638?text=${encodeURIComponent(`Hello Dr. Hassan, I am viewing ${item.caseNumber}: "${item.title}" (${item.category}) in your gallery and would like to inquire about a similar treatment consultation.`)}`;

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

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    to={inquiryUrl}
                    className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-5 py-2.5 font-label-caps text-xs uppercase tracking-widest text-on-primary transition-all duration-300 hover:bg-gold-accent hover:border-gold-accent hover:text-white"
                  >
                    <span>Inquire About Similar Case</span>
                    <ArrowRight size={14} />
                  </Link>
                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Inquire about ${item.caseNumber} on WhatsApp`}
                    className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-2.5 font-label-caps text-xs uppercase tracking-widest text-[#128C7E] transition-all duration-300 hover:bg-[#25D366] hover:text-white"
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp</span>
                  </a>
                </div>
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

      {/* Consultation Anchor Section for #contact */}
      <section id="contact" className="border-t border-outline-variant/30 bg-surface-container-lowest py-16 md:py-24">
        <div className="container-main mx-auto max-w-3xl text-center">
          <span className="mb-3 block font-label-caps text-[11px] uppercase tracking-[0.2em] text-gold-accent">
            Tailored Consultation
          </span>
          <h2 className="mb-4 font-headline-lg text-headline-lg-mobile text-charcoal-text md:text-headline-md">
            Begin Your Smile Journey
          </h2>
          <p className="mx-auto mb-8 max-w-xl font-body-lg text-secondary">
            Inspired by our clinical case results? Schedule an appointment with Dr. Hassan to explore customized aesthetic and restorative treatment solutions tailored to your unique smile.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-8 py-3.5 font-label-caps text-xs uppercase tracking-widest text-on-primary transition-all duration-300 hover:bg-gold-accent hover:border-gold-accent"
            >
              <span>Book Formal Consultation</span>
              <ArrowRight size={15} />
            </Link>
            <a
              href="https://wa.me/923349295638?text=Hello%20Dr.%20Hassan%2C%20I%20reviewed%20your%20clinical%20cases%20in%20the%20gallery%20and%20would%20like%20to%20schedule%20a%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-outline-variant px-6 py-3.5 font-label-caps text-xs uppercase tracking-widest text-charcoal-text transition-all duration-300 hover:border-[#25D366] hover:text-[#128C7E]"
            >
              <MessageCircle size={15} />
              <span>Direct WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}
