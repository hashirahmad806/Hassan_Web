import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { navLinks, siteConfig } from '@/content';
import { useUIStore } from '@/store';
import { usePreloaderStore } from '@/store/preloaderStore';
import { formatWhatsAppLink } from '@/utils';
import styles from './Header.module.css';

/** Returns true if the given href matches the current pathname. */
function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

/**
 * Architectural luxury site header with scroll-aware styling and mobile drawer.
 */
export function Header() {
  const { mobileMenuOpen, navScrolled, setMobileMenuOpen, setNavScrolled, toggleMobileMenu } =
    useUIStore();
  const hasSeenIntro = usePreloaderStore((s) => s.hasSeenIntro);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setNavScrolled]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, setMobileMenuOpen]);

  return (
    <motion.header
      className={`${styles.header} ${navScrolled ? styles.headerScrolled : styles.headerDefault}`}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: hasSeenIntro ? 0 : 0.9,
      }}
    >
      <div className={`${styles.inner} ${navScrolled ? styles.innerScrolled : ''}`}>
        {/* Brand hallmark */}
        <Link to="/" className={styles.brand} aria-label="Dr. Hassan Aesthetic Dental Surgery">
          <div className={styles.brandTop}>
            <span className={styles.brandTitle}>Dr. Hassan</span>
            <span className={styles.brandDot} aria-hidden="true" />
          </div>
          <span className={styles.brandSubtitle}>Aesthetic Dental Surgery</span>
        </Link>

        {/* Desktop navigation */}
        <nav className={styles.nav} aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = isActive(location.pathname, link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
              >
                {link.label}
                {active && (
                  <motion.span
                    className={styles.activeIndicator}
                    layoutId="activeNavIndicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action buttons */}
        <div className={styles.actions}>
          <a
            href={`tel:${siteConfig.phone}`}
            className={styles.phoneLink}
            aria-label={`Call clinic at ${siteConfig.phone}`}
          >
            <span className={styles.phoneIconWrap} aria-hidden="true">
              <Phone size={11} />
            </span>
            <span>{siteConfig.phone}</span>
          </a>

          <Link to="/contact" className={styles.ctaBtn}>
            <span>Book Consultation</span>
            <ArrowRight size={13} aria-hidden="true" />
          </Link>

          <button
            type="button"
            className={styles.menuToggle}
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <motion.nav
          className={styles.mobileDrawer}
          aria-label="Mobile navigation"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.mobileInner}>
            {navLinks.map((link) => {
              const active = isActive(location.pathname, link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`${styles.mobileNavLink} ${active ? styles.mobileNavLinkActive : ''}`}
                >
                  <span>{link.label}</span>
                  {active && <span className={styles.mobileActiveDot} aria-hidden="true" />}
                </Link>
              );
            })}

            <div className={styles.mobileContactRow}>
              <a href={`tel:${siteConfig.phone}`} className={styles.mobileContactBtn}>
                <Phone size={12} aria-hidden="true" />
                <span>Call Clinic</span>
              </a>
              <a
                href={formatWhatsAppLink(siteConfig.whatsapp, siteConfig.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileContactBtn}
              >
                <span>WhatsApp</span>
              </a>
            </div>

            <Link to="/contact" className={styles.mobileCtaBtn}>
              <span>Book Consultation</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}
