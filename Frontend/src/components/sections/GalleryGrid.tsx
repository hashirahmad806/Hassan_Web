import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Star,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Phone,
} from 'lucide-react';
import { caseStudies, galleryCategories, testimonials, siteConfig } from '@/content';
import { useGalleryStore } from '@/store';
import { ClinicalExperiences } from './ClinicalExperiences';
import styles from './GalleryGrid.module.css';

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
      {/* ── 1. Hero Intro Header & Clinical Approach ─────────────── */}
      <div className="container-main mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-accent/40 bg-gold-accent/10 px-4 py-1.5 font-label-caps text-xs uppercase tracking-widest text-gold-accent">
          <Sparkles size={12} aria-hidden="true" />
          <span>Documented Clinical Archive</span>
        </div>
        <h2 className="mb-6 font-headline-lg text-headline-lg-mobile text-charcoal-text md:text-headline-lg">
          Clinical Case Studies
        </h2>
        <p className="mx-auto max-w-2xl font-body-lg text-secondary">
          An archive of clinical excellence. Explore detailed accounts of complex oral rehabilitations, where meticulous scientific planning meets refined aesthetic execution.
        </p>

        {/* The Clinical Approach Philosophy Card */}
        <div className={styles.approachBlock}>
          <h3 className={styles.approachTitle}>The Clinical Approach</h3>
          <p className={styles.approachText}>
            Every case presented here is a testament to our core philosophy: balancing form and function. By utilizing state-of-the-art diagnostic imaging and conservative, biomimetic principles, we achieve outcomes that are structurally sound and visually imperceptible from natural dentition.
          </p>
        </div>

        {/* Filter Buttons Toolbar */}
        <div className={styles.filterNav} role="tablist" aria-label="Case study categories">
          {galleryCategories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              className={[
                styles.filterBtn,
                activeCategory === category ? styles.filterBtnActive : '',
              ].filter(Boolean).join(' ')}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* ── 2. Filtered Case Studies List with Smooth Transitions ──── */}
      <div className="container-main space-y-24 py-8 md:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-24"
          >
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
                    <div className="museum-frame relative overflow-hidden border border-outline-variant/60 bg-white p-3 shadow-sm transition-transform duration-700 hover:scale-[1.01]">
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-surface-container">
                        <img
                          src={imgSrc}
                          alt={item.afterAlt}
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute bottom-3 right-3 rounded-full bg-charcoal-text/80 px-3 py-1 font-label-caps text-[10px] uppercase tracking-widest text-white backdrop-blur-md border border-white/10">
                          Verified Outcome
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`space-y-6 lg:col-span-5 ${isEven ? '' : 'lg:order-1'}`}>
                    <div className="flex items-center gap-4">
                      <span className="font-label-caps text-label-caps uppercase tracking-widest text-gold-accent font-semibold">
                        {item.caseNumber}
                      </span>
                      <span className="h-px w-12 bg-outline-variant" aria-hidden="true" />
                      <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="font-headline-lg text-2xl text-charcoal-text md:text-3xl leading-tight">
                      {item.title}
                    </h3>

                    {/* Structured 3-Part Diagnostic Panel */}
                    <div className={styles.diagnosticGrid}>
                      <div className={styles.diagnosticItem}>
                        <div className={styles.diagnosticHeader}>
                          <span className={styles.diagnosticBadge}>01 · Challenge</span>
                        </div>
                        <p className={styles.diagnosticBody}>{item.challenge}</p>
                      </div>
                      <div className={styles.diagnosticItem}>
                        <div className={styles.diagnosticHeader}>
                          <span className={styles.diagnosticBadge}>02 · Solution</span>
                        </div>
                        <p className={styles.diagnosticBody}>{item.solution}</p>
                      </div>
                      <div className={styles.diagnosticItem}>
                        <div className={styles.diagnosticHeader}>
                          <span className={styles.diagnosticBadge}>03 · Result</span>
                        </div>
                        <p className={styles.diagnosticBody}>{item.result}</p>
                      </div>
                    </div>

                    {/* Architectural Luxury CTAs */}
                    <div className={styles.caseCtaGroup}>
                      <Link to={inquiryUrl} className={styles.casePrimaryBtn}>
                        <span>Inquire About Similar Case</span>
                        <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                      <a
                        href={whatsappInquiryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Inquire about ${item.caseNumber} on WhatsApp`}
                        className={styles.caseWaBtn}
                      >
                        <MessageCircle size={14} aria-hidden="true" />
                        <span>WhatsApp Concierge</span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Clinical Experiences in Motion (ASH Aesthetics + Surgical Mastery) */}
      <ClinicalExperiences />

      {/* Voices of Transformation Testimonials */}
      <section className={styles.testimonialsSection} aria-labelledby="voices-of-transformation-heading">
        <div className={styles.ambientGlow} aria-hidden="true" />

        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.labelTag}>
              <Sparkles size={12} className={styles.labelIcon} aria-hidden="true" />
              <span>Patient Perspectives · Verified Results</span>
            </div>
            <h2 id="voices-of-transformation-heading" className={styles.headline}>
              Voices of Transformation &amp;{' '}
              <span className={styles.headlineAccent}>Lasting Confidence</span>
            </h2>
            <p className={styles.subheading}>
              Direct accounts of restorative precision, aesthetic smile makeovers, and life-changing patient care under the clinical stewardship of Dr. Hassan Salman.
            </p>
          </div>

          <div className={styles.testimonialGrid}>
            {testimonials.map((t, idx) => (
              <article key={t.author || idx} className={styles.testimonialCard}>
                <div className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
                <div className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />
                <div className={styles.quoteWatermark} aria-hidden="true">“</div>

                <div className={styles.ratingRow}>
                  <div className={styles.stars} aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <div className={styles.verifiedBadge}>
                    <span className={styles.verifiedDot} aria-hidden="true" />
                    <span>5.0 · Verified Case</span>
                  </div>
                </div>

                <p className={styles.quoteText}>{t.quote}</p>

                <div className={styles.cardFooter}>
                  <div className={styles.monogramAvatar} aria-hidden="true">
                    {t.initials || t.author.replace(/[^A-Za-z]/g, '').slice(0, 2) || 'PT'}
                  </div>
                  <div className={styles.authorMeta}>
                    <div className={styles.authorName}>{t.author}</div>
                    {t.procedure && <div className={styles.procedureTag}>{t.procedure}</div>}
                    {t.outcome && <div className={styles.outcomeLine}>{t.outcome}</div>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Anchor Section for #contact */}
      <section id="contact" className={styles.consultationSection} aria-labelledby="consultation-heading">
        <div className={styles.consultationPavilion}>
          <div className={styles.consultationGlow} aria-hidden="true" />
          <div className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
          <div className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />

          <div className={styles.consultationContent}>
            <div className={styles.labelTag}>
              <Sparkles size={12} className={styles.labelIcon} aria-hidden="true" />
              <span>Tailored Consultation · GS Tower Peshawar</span>
            </div>

            <h2 id="consultation-heading" className={styles.headline}>
              Begin Your Bespoke{' '}
              <span className={styles.headlineAccent}>Smile Journey</span>
            </h2>

            <p className={styles.subheading} style={{ maxWidth: '680px' }}>
              Inspired by our documented clinical cases? Schedule a private clinical evaluation with Dr. Hassan Salman at ASH Aesthetics, 2nd Floor, GS Tower, Peshawar to formulate your customized aesthetic blueprint.
            </p>

            {/* 3 Trust Pillars */}
            <div className={styles.trustPillarsRow}>
              <div className={styles.trustPillarCard}>
                <div className={styles.pillarIconRow}>
                  <ShieldCheck size={14} aria-hidden="true" />
                  <span>Private Operatory Suite</span>
                </div>
                <p className={styles.pillarDesc}>
                  Dedicated, unhurried one-on-one clinical time with Dr. Hassan in our modern GS Tower surgical operatory.
                </p>
              </div>

              <div className={styles.trustPillarCard}>
                <div className={styles.pillarIconRow}>
                  <Sparkles size={14} aria-hidden="true" />
                  <span>Digital Aesthetic Blueprint</span>
                </div>
                <p className={styles.pillarDesc}>
                  Detailed 3D facial analysis and smile simulation so you visualize your outcome before treatment begins.
                </p>
              </div>

              <div className={styles.trustPillarCard}>
                <div className={styles.pillarIconRow}>
                  <CheckCircle2 size={14} aria-hidden="true" />
                  <span>Biomimetic Preservation</span>
                </div>
                <p className={styles.pillarDesc}>
                  Ultra-conservative micro-dentistry designed to preserve your natural tooth structure with lifelong longevity.
                </p>
              </div>
            </div>

            {/* Action Row */}
            <div className={styles.actionBtnRow}>
              <Link
                to="/contact?category=Consultation"
                className={styles.primaryActionBtn}
              >
                <span>Book Formal Consultation</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>

              <a
                href="https://wa.me/923349295638?text=Hello%20Dr.%20Hassan%2C%20I%20reviewed%20your%20clinical%20cases%20in%20the%20gallery%20and%20would%20like%20to%20schedule%20a%20consultation%20at%20ASH%20Aesthetics%20GS%20Tower."
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappActionBtn}
                aria-label="Direct WhatsApp inquiry with Dr. Hassan"
              >
                <MessageCircle size={14} aria-hidden="true" />
                <span>Direct WhatsApp Inquiry</span>
              </a>

              <a
                href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`}
                className={styles.phoneActionBtn}
                aria-label={`Call clinic desk at ${siteConfig.phone}`}
              >
                <Phone size={13} aria-hidden="true" />
                <span>Desk: {siteConfig.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
