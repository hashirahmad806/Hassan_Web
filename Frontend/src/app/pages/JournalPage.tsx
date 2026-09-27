import { useState } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Header, Footer, MobileStickyActions, PageWrapper } from '@/components/layout';

interface Article {
  id: string;
  category: 'blog' | 'newsletter' | 'perspectives';
  categoryLabel: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
}

const ARTICLES: Article[] = [
  {
    id: '1',
    category: 'blog',
    categoryLabel: 'Aesthetic Dentistry',
    title: 'The Golden Ratio in Contemporary Smile Architecture',
    excerpt: 'Analyzing the mathematical balance between facial symmetry, incisal display, and personalized biological aesthetics.',
    date: 'September 2026',
    readTime: '6 min read',
    author: 'Dr. Hassan',
  },
  {
    id: '2',
    category: 'newsletter',
    categoryLabel: 'Clinical Newsletter #42',
    title: 'Minimal-Prep Ceramic Veneers: Preserving Healthy Enamel',
    excerpt: 'How modern adhesive dentistry and micro-veneers eliminate aggressive reduction while achieving luminous translucency.',
    date: 'September 2026',
    readTime: '4 min read',
    author: 'Dr. Hassan',
  },
  {
    id: '3',
    category: 'perspectives',
    categoryLabel: 'Patient Story',
    title: 'Reclaiming Confidence: A 3-Year Complex Restorative Journey',
    excerpt: 'A first-person account of overcoming dental anxiety and undergoing a full arch rehabilitation at ASH Aesthetics.',
    date: 'August 2026',
    readTime: '8 min read',
    author: 'Patient Narrative',
  },
  {
    id: '4',
    category: 'blog',
    categoryLabel: 'Cosmetic Innovation',
    title: 'Beyond Bleaching: Laser Enamel Lightening vs. Traditional Trays',
    excerpt: 'A comparative analysis of in-office activation protocols, sensitivity mitigation, and long-term chromatic stability.',
    date: 'August 2026',
    readTime: '5 min read',
    author: 'Dr. Hassan',
  },
  {
    id: '5',
    category: 'newsletter',
    categoryLabel: 'Clinical Newsletter #41',
    title: 'Digital Occlusal Mapping: Preventing Veneer Fractures',
    excerpt: 'Utilizing biometric bite force distribution sensors to protect high-end ceramic restorations under dynamic load.',
    date: 'July 2026',
    readTime: '4 min read',
    author: 'Dr. Hassan',
  },
  {
    id: '6',
    category: 'perspectives',
    categoryLabel: 'Patient Story',
    title: 'Bridging Function & Elegance: Correcting Diastemas Seamlessly',
    excerpt: 'How bespoke composite and porcelain design restored natural proportion and effortless speaking confidence.',
    date: 'June 2026',
    readTime: '7 min read',
    author: 'Patient Narrative',
  },
];

export default function JournalPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'blog' | 'newsletter' | 'perspectives'>('all');

  const filteredArticles = activeTab === 'all'
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === activeTab);

  return (
    <PageWrapper>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Luxury Obsidian Hero */}
        <section className="relative overflow-hidden bg-[#0f0d0b] pb-20 pt-36 text-center text-[#f0e8d8] md:pb-28 md:pt-44">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background: 'radial-gradient(ellipse 65% 55% at 50% 30%, rgba(208, 184, 146, 0.15) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="container-main relative z-10 mx-auto max-w-4xl">
            <span className="mb-4 inline-block font-label-caps text-xs uppercase tracking-[0.24em] text-[#D0B892]">
              Dr. Hassan · Clinical Journal
            </span>
            <h1 className="mb-6 font-display-lg text-4xl font-semibold tracking-tight text-[#f0e8d8] md:text-6xl">
              Knowledge, Artistry &amp; <span className="italic text-[#D0B892]">Perspectives</span>
            </h1>
            <p className="mx-auto max-w-2xl font-body-md text-base leading-relaxed text-[#f0e8d8]/70 md:text-lg">
              Delve into surgical methodologies, aesthetic philosophies, and real transformational narratives from our clinical practice.
            </p>

            {/* Filter Tabs */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-2 border-b border-[#D0B892]/20 pb-4">
              {[
                { id: 'all', label: 'All Articles' },
                { id: 'blog', label: 'Blog & Articles' },
                { id: 'newsletter', label: 'Weekly Newsletter' },
                { id: 'perspectives', label: 'Patient Perspectives' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`relative rounded-full px-5 py-2 font-button text-xs font-semibold tracking-wider transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-[#D0B892] text-[#0f0d0b] shadow-[0_0_20px_rgba(208,184,146,0.3)]'
                      : 'text-[#f0e8d8]/65 hover:text-[#D0B892]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="section-padding bg-surface">
          <div className="container-main">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  id={article.category}
                  className="group flex flex-col justify-between rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold-accent/50 hover:shadow-[0_12px_36px_rgba(208,184,146,0.14)]"
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-label-caps text-[10px] font-bold uppercase tracking-widest text-primary">
                        {article.categoryLabel}
                      </span>
                      <span className="font-body-md text-xs text-on-surface-variant">
                        {article.readTime}
                      </span>
                    </div>

                    <h2 className="mb-3 font-headline-md text-xl text-charcoal-text transition-colors group-hover:text-primary">
                      {article.title}
                    </h2>

                    <p className="mb-6 font-body-md text-sm leading-relaxed text-on-surface-variant">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-outline-variant/20 pt-4 text-xs text-on-surface-variant">
                    <span className="flex items-center gap-1.5 font-label-caps text-[11px]">
                      <Calendar size={12} className="text-gold-accent" />
                      {article.date}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1">
                      Read Note <ArrowRight size={13} />
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {/* Newsletter Subscription Box */}
            <div id="newsletter" className="mt-20 overflow-hidden rounded-3xl border border-[#D0B892]/25 bg-[#0f0d0b] p-8 text-center text-[#f0e8d8] shadow-2xl md:p-14">
              <div className="mx-auto max-w-2xl">
                <span className="mb-3 inline-block rounded-full border border-[#D0B892]/30 bg-[#D0B892]/10 px-4 py-1 font-label-caps text-[10px] uppercase tracking-widest text-[#D0B892]">
                  Clinical Digest
                </span>
                <h3 className="mb-4 font-display-lg text-2xl md:text-3xl text-[#f0e8d8]">
                  Subscribe to the Dr. Hassan Newsletter
                </h3>
                <p className="mb-8 font-body-md text-sm leading-relaxed text-[#f0e8d8]/70">
                  Receive curated case breakdowns, clinical insights, and patient care guidance directly in your inbox.
                </p>
                <form onSubmit={(e) => e.preventDefault()} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    aria-label="Email address"
                    className="flex-1 rounded-full border border-[#D0B892]/30 bg-[#1a1410] px-5 py-3 text-xs text-[#f0e8d8] placeholder:text-[#f0e8d8]/40 focus:border-[#D0B892] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-[#D0B892] px-7 py-3 font-button text-xs font-bold uppercase tracking-wider text-[#0f0d0b] transition-all hover:bg-[#e0caa4]"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer hidePreFooter />
      <MobileStickyActions />
    </PageWrapper>
  );
}
