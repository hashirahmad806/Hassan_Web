import { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from 'boneyard-js/react';
import {
  BookOpen,
  FileText,
  Download,
  ExternalLink,
  Copy,
  Check,
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles,
  GraduationCap,
  Medal,
  ShieldCheck,
  ArrowRight,
  Calendar,
  X,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Header, Footer, MobileStickyActions, PageWrapper } from '@/components/layout';
import {
  fallbackScholarlyWorks,
  fallbackAcademicHonors,
  academicStats,
  researchCategories,
  type ScholarlyWorkItem,
  type AcademicHonorItem,
} from '@/content/scholarlyContent';
import {
  fetchSanityScholarlyWorks,
  fetchSanityAcademicHonors,
} from '@/lib/sanity/services';
import { siteConfig } from '@/content/siteContent';

gsap.registerPlugin(ScrollTrigger);

export default function ResearchPage() {
  const [papers, setPapers] = useState<ScholarlyWorkItem[]>(fallbackScholarlyWorks);
  const [honors, setHonors] = useState<AcademicHonorItem[]>(fallbackAcademicHonors);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedAbstracts, setExpandedAbstracts] = useState<Record<string, boolean>>({});
  const [citationModalPaper, setCitationModalPaper] = useState<ScholarlyWorkItem | null>(null);
  const [citationFormat, setCitationFormat] = useState<'apa' | 'bibtex' | 'harvard'>('apa');
  const [copiedState, setCopiedState] = useState(false);
  const [downloadModalPaper, setDownloadModalPaper] = useState<ScholarlyWorkItem | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch from Sanity CMS with fallback resilience
  useEffect(() => {
    async function loadData() {
      try {
        const [worksRes, honorsRes] = await Promise.all([
          fetchSanityScholarlyWorks(),
          fetchSanityAcademicHonors(),
        ]);

        if (worksRes.success && Array.isArray(worksRes.data) && worksRes.data.length > 0) {
          // Normalize Sanity documents or fallback to structured format
          const formatted: ScholarlyWorkItem[] = worksRes.data.map((item: any, idx) => ({
            id: item._id || item.id || `paper-${idx}`,
            title: item.title,
            slug: item.slug?.current || item.slug || `paper-${idx}`,
            journal: item.journal,
            publicationDate: item.publicationDate || item.year,
            year: item.year || (item.publicationDate ? new Date(item.publicationDate).getFullYear().toString() : '2024'),
            category: item.category || 'aesthetic',
            categoryLabel: item.categoryLabel || item.category || 'Aesthetic Dentistry',
            authors: item.authors || ['Dr. Hassan Salman'],
            leadAuthor: item.leadAuthor || (item.authors?.[0] ?? 'Dr. Hassan Salman'),
            abstract: typeof item.abstract === 'string' ? item.abstract : 'Abstract available upon publication request.',
            doi: item.doi,
            doiUrl: item.doiUrl || (item.doi?.startsWith('http') ? item.doi : item.doi ? `https://doi.org/${item.doi}` : undefined),
            pdfUrl: item.pdfUrl || item.pdfFile?.asset?.url || '#',
            citations: item.citations || {
              apa: `${item.authors?.[0] || 'Salman, H.'} (${item.year || '2024'}). ${item.title}. ${item.journal}.`,
              bibtex: `@article{paper_${idx},\n  title={${item.title}},\n  author={${item.authors?.[0] || 'Salman, Hassan'}},\n  journal={${item.journal}},\n  year={${item.year || '2024'}}\n}`,
              harvard: `${item.authors?.[0] || 'Salman, H.'}, ${item.year || '2024'}. ${item.title}. ${item.journal}.`,
            },
            isFeatured: item.isFeatured,
            order: item.order ?? idx,
          }));
          setPapers(formatted);
        }

        if (honorsRes.success && Array.isArray(honorsRes.data) && honorsRes.data.length > 0) {
          const formattedHonors: AcademicHonorItem[] = honorsRes.data.map((h: any, idx) => ({
            id: h._id || h.id || `honor-${idx}`,
            title: h.title,
            awardType: h.awardType || 'degree',
            awardTypeLabel: h.awardTypeLabel || h.awardType || 'Academic Distinction',
            institution: h.institution,
            year: h.year,
            citation: h.citation || '',
            credentialDocUrl: h.credentialDocUrl,
            badge: h.badge || 'Verified Credential',
            order: h.order ?? idx,
          }));
          setHonors(formattedHonors);
        }
      } catch {
        // Retain fallback data gracefully
      }
    }
    loadData();
  }, []);

  // GSAP Entrance Animations
  useGSAP(
    () => {
      const sections = gsap.utils.toArray('.animate-research-section') as HTMLElement[];
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      const staggers = gsap.utils.toArray('.animate-stagger-group') as HTMLElement[];
      staggers.forEach((group) => {
        const items = group.querySelectorAll('.animate-stagger-card');
        gsap.fromTo(
          items,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  // Filtered papers based on search query and category
  const filteredPapers = useMemo(() => {
    return papers.filter((paper) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        paper.category.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        paper.title.toLowerCase().includes(query) ||
        paper.abstract.toLowerCase().includes(query) ||
        paper.journal.toLowerCase().includes(query) ||
        paper.authors.some((author) => author.toLowerCase().includes(query)) ||
        paper.year.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [papers, selectedCategory, searchQuery]);

  const toggleAbstract = (id: string) => {
    setExpandedAbstracts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyCitation = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2400);
  };

  return (
    <Skeleton name="research" loading={false}>
      <PageWrapper>
        <Header />
        <main className="w-full pt-28 pb-20 bg-background" ref={containerRef}>
          {/* ── 1. Hero Section ──────────────────────────────────────── */}
          <section className="container-main py-12 md:py-20 animate-research-section">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-accent/40 bg-surface-container-low px-4 py-1.5 shadow-sm">
                <Sparkles size={14} className="text-gold-accent animate-pulse" />
                <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-primary">
                  Academic Rigor &amp; Clinical Evidence
                </span>
              </div>

              <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary tracking-tight leading-tight">
                Scholarly Inquiries in Contemporary Smile Artistry
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
                Elevating aesthetic dental surgery beyond intuition. Grounded in peer-reviewed clinical research, biomimetic material sciences, and BDS surgical excellence.
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-8 border-t border-outline-variant/30 mt-10">
                {academicStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-xl bg-surface-container-low/80 border border-outline-variant/20 text-center"
                  >
                    <div className="font-display-lg text-2xl md:text-3xl font-semibold text-gold-accent">
                      {stat.value}
                    </div>
                    <div className="font-label-caps text-xs text-on-surface-variant mt-1 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 2. BDS Academic Honors & Distinctions ─────────────────── */}
          <section className="container-main py-12 md:py-16 animate-research-section">
            <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-gold-accent flex items-center gap-1.5 justify-center md:justify-start">
                  <Medal size={14} /> Medical Credentials &amp; Honors
                </span>
                <h2 className="mt-2 font-display-lg text-3xl md:text-4xl text-primary">
                  BDS Achievements &amp; Academic Honors
                </h2>
              </div>
              <p className="font-body-md text-sm text-on-surface-variant max-w-md">
                Formal medical qualifications and academic distinctions awarded by leading dental and health authorities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-stagger-group">
              {honors.map((honor) => (
                <div
                  key={honor.id}
                  className="animate-stagger-card group relative rounded-2xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8 transition-all duration-300 hover:border-gold-accent/50 hover:shadow-lg flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                        <GraduationCap size={13} /> {honor.year}
                      </span>
                      <span className="text-xs uppercase tracking-wider font-semibold text-gold-accent border border-gold-accent/30 rounded-full px-2.5 py-0.5">
                        {honor.badge}
                      </span>
                    </div>

                    <h3 className="font-display-lg text-xl text-on-surface group-hover:text-primary transition-colors">
                      {honor.title}
                    </h3>

                    <p className="font-body-md text-xs uppercase tracking-wider text-primary font-medium">
                      {honor.institution}
                    </p>

                    <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                      {honor.citation}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
                    <span className="inline-flex items-center gap-1 text-gold-accent font-medium">
                      <ShieldCheck size={14} /> {honor.awardTypeLabel}
                    </span>
                    <span className="italic">Verified Record</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 3. Research Publications Repository ──────────────────── */}
          <section className="container-main py-12 md:py-20 animate-research-section" id="publications">
            <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-gold-accent flex items-center gap-1.5 justify-center md:justify-start">
                  <BookOpen size={14} /> Clinical Library
                </span>
                <h2 className="mt-2 font-display-lg text-3xl md:text-4xl text-primary">
                  Peer-Reviewed Papers &amp; Clinical Investigations
                </h2>
              </div>
              <p className="font-body-md text-sm text-on-surface-variant max-w-md">
                Search and download scientific publications, biomimetic case investigations, and clinical protocols.
              </p>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="mb-8 space-y-4 rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 md:p-6 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search Bar */}
                <div className="relative w-full md:w-96">
                  <Search
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, topic, co-author, or journal..."
                    className="w-full rounded-xl border border-outline-variant/40 bg-surface pl-10 pr-10 py-2.5 text-sm text-on-surface focus:border-gold-accent focus:outline-none transition-colors"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                      aria-label="Clear search"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <div className="text-xs text-on-surface-variant font-medium">
                  Showing <span className="font-bold text-primary">{filteredPapers.length}</span> of {papers.length} publications
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-outline-variant/20">
                {researchCategories.map((cat) => {
                  const isActive = selectedCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-primary text-on-primary shadow-sm'
                          : 'bg-surface hover:bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Publication List */}
            {filteredPapers.length === 0 ? (
              <div className="text-center py-16 rounded-2xl border border-dashed border-outline-variant/40 bg-surface-container-low p-8">
                <BookOpen size={36} className="mx-auto text-gold-accent mb-3" />
                <h3 className="font-display-lg text-lg text-primary">No publications found</h3>
                <p className="text-sm text-on-surface-variant mt-1">
                  Try adjusting your search keywords or resetting the category filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-gold-accent hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredPapers.map((paper) => {
                  const isExpanded = !!expandedAbstracts[paper.id];
                  return (
                    <article
                      key={paper.id}
                      className="group rounded-2xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8 transition-all duration-300 hover:border-gold-accent/40 hover:shadow-md"
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="space-y-3 flex-1">
                          {/* Metadata row */}
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1 rounded-md bg-gold-accent/15 px-2.5 py-0.5 font-label-caps text-xs font-semibold text-primary">
                              <Calendar size={12} /> {paper.year}
                            </span>
                            <span className="rounded-md border border-outline-variant/30 bg-surface px-2.5 py-0.5 text-xs text-on-surface-variant">
                              {paper.journal}
                            </span>
                            {paper.isFeatured && (
                              <span className="inline-flex items-center gap-1 rounded-md bg-primary text-on-primary px-2.5 py-0.5 text-xs font-medium">
                                <Sparkles size={11} /> Spotlight Research
                              </span>
                            )}
                          </div>

                          {/* Paper Title */}
                          <h3 className="font-display-lg text-xl md:text-2xl text-on-surface group-hover:text-primary transition-colors leading-snug">
                            {paper.title}
                          </h3>

                          {/* Authors */}
                          <div className="text-sm text-on-surface-variant flex flex-wrap items-center gap-1.5">
                            <span className="font-medium text-on-surface">Authors:</span>
                            {paper.authors.map((author, i) => {
                              const isHassan = author.toLowerCase().includes('hassan');
                              return (
                                <span
                                  key={author}
                                  className={
                                    isHassan
                                      ? 'font-semibold text-primary underline decoration-gold-accent/50 underline-offset-2'
                                      : 'text-on-surface-variant'
                                  }
                                >
                                  {author}
                                  {i < paper.authors.length - 1 ? ',' : ''}
                                </span>
                              );
                            })}
                          </div>

                          {/* Abstract Preview / Accordion */}
                          <div className="pt-2">
                            <p
                              className={`font-body-md text-sm text-on-surface-variant leading-relaxed ${
                                isExpanded ? '' : 'line-clamp-2'
                              }`}
                            >
                              <strong className="text-on-surface font-medium">Abstract: </strong>
                              {paper.abstract}
                            </p>

                            <button
                              type="button"
                              onClick={() => toggleAbstract(paper.id)}
                              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold-accent hover:text-primary transition-colors"
                            >
                              <span>{isExpanded ? 'Collapse Abstract' : 'Read Full Abstract'}</span>
                              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="mt-6 pt-5 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                          {/* PDF Download Button */}
                          {paper.pdfUrl && paper.pdfUrl !== '#' ? (
                            <a
                              href={paper.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-button text-on-primary transition-all hover:bg-gold-accent hover:text-on-surface shadow-sm"
                            >
                              <Download size={14} />
                              <span>Download Paper (PDF)</span>
                            </a>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setDownloadModalPaper(paper)}
                              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-button text-on-primary transition-all hover:bg-gold-accent hover:text-on-surface shadow-sm"
                            >
                              <Download size={14} />
                              <span>Download Paper (PDF)</span>
                            </button>
                          )}

                          {/* DOI Link */}
                          {paper.doiUrl && (
                            <a
                              href={paper.doiUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-xl border border-outline-variant/40 bg-surface px-4 py-2 text-xs font-button text-on-surface transition-colors hover:border-gold-accent hover:text-primary"
                            >
                              <ExternalLink size={13} />
                              <span>View Journal / DOI</span>
                            </a>
                          )}

                          {/* Copy Citation */}
                          <button
                            type="button"
                            onClick={() => {
                              setCitationModalPaper(paper);
                              setCitationFormat('apa');
                            }}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-outline-variant/40 bg-surface px-4 py-2 text-xs font-button text-on-surface transition-colors hover:border-gold-accent hover:text-primary"
                          >
                            <Copy size={13} />
                            <span>Cite Paper</span>
                          </button>
                        </div>

                        {paper.doi && (
                          <div className="text-xs text-on-surface-variant font-mono">
                            DOI: {paper.doi}
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          {/* ── 4. Academic Inquiries & Collaboration CTA ─────────────── */}
          <section className="container-main py-12 md:py-16 animate-research-section">
            <div className="rounded-3xl border border-gold-accent/40 bg-gradient-to-br from-surface-container to-surface-container-highest p-8 md:p-14 text-center md:text-left relative overflow-hidden shadow-md">
              <div className="max-w-2xl space-y-4 relative z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-accent/20 px-3 py-1 font-label-caps text-xs uppercase tracking-widest text-primary font-semibold">
                  <FileText size={13} /> Clinical Research Collaborations
                </span>

                <h2 className="font-display-lg text-2xl md:text-4xl text-primary leading-tight">
                  Request Clinical Reprints or Discuss Academic Inquiries
                </h2>

                <p className="font-body-lg text-sm md:text-base text-on-surface-variant leading-relaxed">
                  Are you a clinician, researcher, or postgraduate resident seeking full datasets, surgical protocols, or lecture symposiums? We welcome academic dialogues and peer collaborations.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-button text-sm text-on-primary transition-all hover:bg-gold-accent hover:text-on-surface shadow-md"
                  >
                    <span>Send Academic Inquiry</span>
                    <ArrowRight size={15} />
                  </Link>

                  <a
                    href={`mailto:${siteConfig.email}?subject=Academic%20Research%20Inquiry%20-%20Dr.%20Hassan`}
                    className="inline-flex items-center gap-2 rounded-full border border-outline-variant/60 bg-surface px-6 py-3 font-button text-sm text-on-surface transition-colors hover:border-gold-accent hover:text-primary"
                  >
                    <span>Direct Email Reprints</span>
                  </a>
                </div>
              </div>

              {/* Decorative Luxury Watermark */}
              <div
                className="absolute right-4 bottom-4 md:right-12 md:bottom-8 opacity-10 pointer-events-none text-primary"
                aria-hidden="true"
              >
                <BookOpen size={240} strokeWidth={1} />
              </div>
            </div>
          </section>
        </main>

        {/* ── Citation Modal ───────────────────────────────────────── */}
        {citationModalPaper && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="citation-dialog-title"
          >
            <div className="w-full max-w-xl rounded-2xl border border-gold-accent/30 bg-surface p-6 md:p-8 shadow-2xl space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-label-caps text-xs uppercase tracking-wider text-gold-accent">
                    Citation Tool
                  </span>
                  <h3 id="citation-dialog-title" className="font-display-lg text-lg md:text-xl text-primary mt-1">
                    Cite This Research Paper
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCitationModalPaper(null)}
                  className="rounded-lg p-1.5 text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Format selection tabs */}
              <div className="flex border-b border-outline-variant/30 pb-2 gap-4 text-xs font-semibold uppercase tracking-wider">
                {(['apa', 'bibtex', 'harvard'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setCitationFormat(fmt)}
                    className={`pb-2 transition-colors relative ${
                      citationFormat === fmt
                        ? 'text-primary border-b-2 border-gold-accent font-bold'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {fmt.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Citation Content Box */}
              <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-4 font-mono text-xs text-on-surface whitespace-pre-wrap select-all leading-relaxed max-h-56 overflow-y-auto">
                {citationModalPaper.citations[citationFormat]}
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                <span className="text-xs text-on-surface-variant">
                  {copiedState ? '✓ Citation copied to clipboard!' : 'Click copy to copy formatted text.'}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyCitation(citationModalPaper.citations[citationFormat])}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-button text-xs text-on-primary transition-all hover:bg-gold-accent hover:text-on-surface shadow-sm"
                >
                  {copiedState ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedState ? 'Copied!' : 'Copy to Clipboard'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Download / Document Viewer Modal ─────────────────────── */}
        {downloadModalPaper && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="download-dialog-title"
          >
            <div className="w-full max-w-2xl rounded-2xl border border-gold-accent/30 bg-surface p-6 md:p-8 shadow-2xl space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-label-caps text-xs uppercase tracking-wider text-gold-accent">
                    Document Access &amp; Reprints
                  </span>
                  <h3 id="download-dialog-title" className="font-display-lg text-lg md:text-xl text-primary mt-1">
                    {downloadModalPaper.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1">
                    {downloadModalPaper.journal} ({downloadModalPaper.year})
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setDownloadModalPaper(null)}
                  className="rounded-lg p-1.5 text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <FileText size={16} className="text-gold-accent" />
                  <span>Clinical Reprint Notice</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  The complete peer-reviewed PDF manuscript, clinical methodology figures, and high-resolution clinical photography are provided under educational fair-use for healthcare professionals and patients.
                </p>
                {downloadModalPaper.doi && (
                  <p className="text-xs font-mono text-on-surface">
                    Registered Identifier: <strong>{downloadModalPaper.doi}</strong>
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDownloadModalPaper(null)}
                  className="rounded-xl border border-outline-variant/40 px-4 py-2.5 text-xs font-button text-on-surface hover:bg-surface-container transition-colors"
                >
                  Close
                </button>

                {downloadModalPaper.doiUrl && (
                  <a
                    href={downloadModalPaper.doiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-gold-accent/50 bg-surface-container px-4 py-2.5 text-xs font-button text-primary hover:bg-gold-accent hover:text-on-surface transition-colors"
                  >
                    <ExternalLink size={13} />
                    <span>Publisher DOI Portal</span>
                  </a>
                )}

                {downloadModalPaper.pdfUrl && downloadModalPaper.pdfUrl !== '#' ? (
                  <a
                    href={downloadModalPaper.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-button text-xs text-on-primary hover:bg-gold-accent hover:text-on-surface transition-all shadow-sm"
                  >
                    <Download size={14} />
                    <span>Download Full Manuscript PDF</span>
                  </a>
                ) : (
                  <a
                    href={`mailto:${siteConfig.email}?subject=Full%20PDF%20Manuscript%20Request%20-%20${encodeURIComponent(
                      downloadModalPaper.title
                    )}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-button text-xs text-on-primary hover:bg-gold-accent hover:text-on-surface transition-all shadow-sm"
                  >
                    <Download size={14} />
                    <span>Request Full Manuscript PDF</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        <MobileStickyActions />
        <Footer />
      </PageWrapper>
    </Skeleton>
  );
}
