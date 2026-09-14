import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, Sparkles, Calendar, ArrowRight, Compass, PhoneCall } from 'lucide-react';
import { Header, Footer, MobileStickyActions, PageWrapper } from '@/components/layout';
import { siteConfig } from '@/content';

interface QuickDestination {
  title: string;
  description: string;
  href: string;
  icon: typeof Compass;
}

const destinations: QuickDestination[] = [
  {
    title: 'Smile Artistry Gallery',
    description: 'Explore verified before & after transformations sculpted by Dr. Hassan.',
    href: '/gallery',
    icon: Sparkles,
  },
  {
    title: 'Bespoke Treatments',
    description: 'Discover porcelain veneers, surgical implants, and composite mastery.',
    href: '/services',
    icon: Compass,
  },
  {
    title: 'Clinical Philosophy',
    description: 'Learn about our meticulous approach, credentials, and surgical precision.',
    href: '/about',
    icon: Sparkles,
  },
  {
    title: 'Reserve Consultation',
    description: 'Schedule your private smile consultation and treatment planning session.',
    href: '/contact',
    icon: Calendar,
  },
];

/**
 * Luxury 404 Page Not Found — architectural aesthetic with helpful navigation pathways.
 */
export default function NotFoundPage() {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '404 - Page Not Located | Dr. Hassan Salman Aesthetic Dental Surgery';
    return () => {
      document.title = originalTitle;
    };
  }, []);

  return (
    <PageWrapper className="bg-background text-on-surface">
      <Header />

      <main className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        {/* Ambient atmospheric backdrop glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gold-accent/15 via-primary-container/10 to-transparent blur-3xl opacity-70"
        />

        <div className="container-main relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            {/* Architectural Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-accent/40 bg-surface/80 backdrop-blur-md text-primary text-xs font-semibold tracking-widest uppercase mb-6 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>Error 404 • Route Not Located</span>
            </motion.div>

            {/* Monumental 404 Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative my-2 select-none"
            >
              <span className="font-display-lg text-8xl md:text-9xl lg:text-[160px] font-bold leading-none tracking-tighter bg-gradient-to-b from-primary via-primary-container to-gold-accent bg-clip-text text-transparent opacity-90 drop-shadow-sm">
                404
              </span>
            </motion.div>

            {/* Main Heading & Description */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="font-display-lg text-3xl md:text-5xl font-semibold text-on-surface tracking-tight mb-4">
                This Clinical Pathway Does Not Exist
              </h1>
              <p className="font-body-md text-base md:text-lg text-on-surface-variant max-w-xl mx-auto mb-8 leading-relaxed">
                The page you are looking for has shifted, been renamed, or is no longer available. Let us guide you back to our clinical sanctuary.
              </p>
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-primary text-on-primary font-medium text-sm tracking-wide transition-all duration-300 hover:bg-on-primary-fixed-variant hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Home className="w-4 h-4" />
                <span>Return to Sanctuary Home</span>
              </Link>

              <Link
                to="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-outline-variant text-primary bg-surface/60 backdrop-blur-md font-medium text-sm tracking-wide transition-all duration-300 hover:bg-surface-container hover:border-gold-accent/60 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span>Explore Treatments</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Curated Directory Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mx-auto max-w-4xl"
          >
            <div
              data-testid="recommended-destinations"
              className="glass-panel ambient-shadow rounded-2xl p-6 sm:p-8 md:p-10 border border-gold-accent/25"
            >
              <div className="flex items-center justify-between border-b border-gold-accent/20 pb-4 mb-6">
                <div>
                  <h2 className="font-display-lg text-lg sm:text-xl font-semibold text-on-surface">
                    Recommended Destinations
                  </h2>
                  <p className="text-xs sm:text-sm text-on-surface-variant">
                    Discover key areas of our clinical practice
                  </p>
                </div>
                <Compass className="w-5 h-5 text-gold-accent opacity-70 hidden sm:block" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {destinations.map((dest) => {
                  const Icon = dest.icon;
                  return (
                    <Link
                      key={dest.href}
                      to={dest.href}
                      className="group p-4 sm:p-5 rounded-xl border border-gold-accent/15 bg-surface/50 hover:bg-surface-container/80 transition-all duration-300 hover:border-gold-accent/50 hover:shadow-md flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-md bg-gold-accent/15 flex items-center justify-center text-primary">
                              <Icon className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <span className="font-medium text-on-surface text-base group-hover:text-primary transition-colors">
                              {dest.title}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gold-accent transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                          {dest.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Direct Concierge Contact Strip */}
              <div className="mt-8 pt-6 border-t border-gold-accent/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-on-surface-variant">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <span>
                    Need immediate appointment assistance? Contact our concierge directly.
                  </span>
                </div>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:text-on-primary-fixed-variant transition-colors underline-offset-4 hover:underline flex-shrink-0"
                >
                  <span>{siteConfig.phone}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
      <MobileStickyActions />
    </PageWrapper>
  );
}
