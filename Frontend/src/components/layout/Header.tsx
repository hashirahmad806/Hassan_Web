import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui';
import { navLinks, siteConfig } from '@/content';
import { useUIStore } from '@/store';
import { usePreloaderStore } from '@/store/preloaderStore';
import styles from './Header.module.css';

/** Returns true if the given href matches the current pathname. */
function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

/**
 * Fixed site header with scroll-aware styling and mobile menu.
 */
export function Header() {
  const { mobileMenuOpen, navScrolled, setMobileMenuOpen, setNavScrolled, toggleMobileMenu } =
    useUIStore();
  const hasSeenIntro = usePreloaderStore((s) => s.hasSeenIntro);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setNavScrolled]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, setMobileMenuOpen]);

  return (
    <motion.header
      className={[
        styles.header,
        'fixed top-0 z-50 w-full border-b border-outline-variant/20 transition-all duration-300',
        navScrolled ? 'bg-surface/90 shadow-sm backdrop-blur-xl' : 'bg-surface/10 backdrop-blur-md',
      ].join(' ')}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: hasSeenIntro ? 0 : 1.0,
      }}
    >
      <div className="container-main flex items-center justify-between py-4">
        <Link
          to="/"
          className="group inline-flex items-baseline gap-1.5 transition-opacity hover:opacity-90"
        >
          <span className="font-display-lg text-2xl md:text-[28px] font-semibold tracking-tight text-primary">
            Dr. Hassan
          </span>
          <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-gold-accent" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = isActive(location.pathname, link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                className={[
                  'relative font-label-button text-label-button transition-colors duration-300',
                  active ? 'text-primary' : 'text-on-surface-variant hover:text-primary',
                ].join(' ')}
              >
                {link.label}
                {active && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-px rounded-full bg-gold-accent"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <Link to="/contact" className="hidden md:block">
          <Button variant="gold" size="sm">
            Book Consultation
          </Button>
        </Link>

        <button
          type="button"
          className="text-primary md:hidden"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav
          className="border-t border-outline-variant/20 bg-surface/95 backdrop-blur-xl md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="container-main flex flex-col gap-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-label-button text-label-button text-on-surface-variant hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact">
              <Button variant="primary" fullWidth>
                Book Consultation
              </Button>
            </Link>
          </div>
        </nav>
      )}
    </motion.header>
  );
}
