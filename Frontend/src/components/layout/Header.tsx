import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { mainNavItems, siteConfig } from '@/content';
import { useUIStore } from '@/store';
import { usePreloaderStore } from '@/store/preloaderStore';
import { formatWhatsAppLink } from '@/utils';
import type { NavigationItem } from '@/types';
import styles from './Header.module.css';

import galleryCaseThumbnail from '@/assets/images/real/proto_case2.jpg';

/** Returns true if the given href matches or is a parent of the current pathname. */
function isRouteActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

/**
 * Architectural luxury site header featuring a high-precision mega-menu
 * and contextual dropdowns for Dr. Hassan Aesthetic Dental Surgery.
 */
export function Header() {
  const { mobileMenuOpen, navScrolled, setMobileMenuOpen, setNavScrolled, toggleMobileMenu } =
    useUIStore();
  const hasSeenIntro = usePreloaderStore((s) => s.hasSeenIntro);
  const location = useLocation();

  // Desktop hover state with delay buffer
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mobile accordion state (single-expand with auto-collapse)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const clearHoverTimeout = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback((itemId: string) => {
    clearHoverTimeout();
    setActiveDropdown(itemId);
  }, [clearHoverTimeout]);

  const handleMouseLeave = useCallback(() => {
    clearHoverTimeout();
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  }, [clearHoverTimeout]);

  const closeAllMenus = useCallback(() => {
    clearHoverTimeout();
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [clearHoverTimeout, setMobileMenuOpen]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setNavScrolled]);

  // Reset dropdowns on route changes
  useEffect(() => {
    closeAllMenus();
    setMobileExpanded(null);
  }, [location.pathname, closeAllMenus]);

  // Close dropdown on Escape key or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Find the services item for the top-level mega-menu
  const servicesItem = mainNavItems.find((item) => item.type === 'mega');
  const isServicesOpen = activeDropdown === 'services';

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
        <Link
          to="/"
          className={styles.brand}
          aria-label="Dr. Hassan Aesthetic Dental Surgery"
          onClick={closeAllMenus}
        >
          <div className={styles.brandTop}>
            <span className={styles.brandTitle}>Dr. Hassan</span>
            <span className={styles.brandDot} aria-hidden="true" />
          </div>
          <span className={styles.brandSubtitle}>Aesthetic Dental Surgery</span>
        </Link>

        {/* ── Desktop Navigation Bar ──────────────────────── */}
        <nav
          className={styles.nav}
          aria-label="Main navigation"
          onMouseLeave={handleMouseLeave}
        >
          {mainNavItems.map((item: NavigationItem) => {
            const hasChildren = item.type !== 'link';
            const isMenuOpen = activeDropdown === item.id;
            const isCurrentPage = isRouteActive(location.pathname, item.href);

            return (
              <div
                key={item.id}
                className={styles.navItem}
                onMouseEnter={() => hasChildren ? handleMouseEnter(item.id) : handleMouseEnter('')}
              >
                <Link
                  to={item.href}
                  className={`${styles.navLink} ${isCurrentPage ? styles.navLinkActive : ''}`}
                  aria-expanded={hasChildren ? isMenuOpen : undefined}
                  aria-haspopup={hasChildren ? 'true' : undefined}
                >
                  <span>{item.label}</span>
                  {hasChildren && (
                    <ChevronDown
                      size={13}
                      className={`${styles.navChevron} ${isMenuOpen ? styles.navChevronOpen : ''}`}
                      aria-hidden="true"
                    />
                  )}
                  {/* Gold active/hover indicator */}
                  {(isCurrentPage || isMenuOpen) && (
                    <motion.span
                      className={styles.activeIndicator}
                      layoutId="activeNavIndicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                </Link>

                {/* ── SIMPLE DROPDOWN (About, Research, Journal) ── */}
                <AnimatePresence>
                  {hasChildren && item.type === 'dropdown' && isMenuOpen && item.dropdownItems && (
                    <div
                      className={`${styles.dropdownContainer} ${
                        item.id === 'journal' ? styles.dropdownContainerRight : ''
                      }`}
                      onMouseEnter={() => handleMouseEnter(item.id)}
                    >
                      <motion.div
                        className={styles.dropdownPanel}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {item.dropdownItems.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.href}
                            className={styles.dropdownItem}
                            onClick={closeAllMenus}
                          >
                            <div className={styles.dropdownItemHeader}>
                              <span className={styles.dropdownItemTitle}>{sub.label}</span>
                              <ChevronRight size={13} className={styles.dropdownItemArrow} aria-hidden="true" />
                            </div>
                            {sub.description && (
                              <span className={styles.dropdownItemDesc}>{sub.description}</span>
                            )}
                          </Link>
                        ))}
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* ── Action Buttons (Right) ──────────────────────── */}
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

          <Link to="/contact" className={styles.ctaBtn} onClick={closeAllMenus}>
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

      {/* ── SERVICES MEGA-MENU (Global Centered Below Header) ── */}
      <AnimatePresence>
        {isServicesOpen && servicesItem?.megaColumns && (
          <div
            className={styles.megaMenuContainer}
            onMouseEnter={() => handleMouseEnter('services')}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              className={styles.megaMenuPanel}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.megaGrid}>
                {/* 4 Service Group Columns */}
                {servicesItem.megaColumns.map((col) => (
                  <div key={col.category} className={styles.megaCol}>
                    <Link
                      to={col.categoryHref || servicesItem.href}
                      className={styles.megaColHeader}
                      onClick={closeAllMenus}
                    >
                      <span className={styles.megaCategory}>{col.category}</span>
                    </Link>
                    <div className={styles.megaList}>
                      {col.items.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.href}
                          className={styles.megaLink}
                          onClick={closeAllMenus}
                        >
                          <span className={styles.megaLinkTitle}>{sub.label}</span>
                          {sub.description && (
                            <span className={styles.megaLinkDesc}>{sub.description}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                {/* 5th Column: Visual Gallery Panel */}
                <div className={styles.megaGalleryPanel}>
                  <Link
                    to="/gallery"
                    className={styles.galleryCard}
                    onClick={closeAllMenus}
                    aria-label="View Smile Gallery Before & After Transformations"
                  >
                    <img
                      src={galleryCaseThumbnail}
                      alt="Before and after smile transformation case"
                      className={styles.galleryImg}
                      loading="lazy"
                    />
                    <div className={styles.galleryOverlay}>
                      <span className={styles.galleryTag}>Transformations</span>
                      <h4 className={styles.galleryTitle}>Clinical Gallery</h4>
                    </div>
                  </Link>

                  <div className={styles.galleryBottomRow}>
                    <p className={styles.gallerySubtitle}>100+ Bespoke Cases</p>
                    <Link
                      to="/gallery"
                      className={styles.galleryCtaLink}
                      onClick={closeAllMenus}
                    >
                      <span>View Cases</span>
                      <ChevronRight size={13} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Mobile Navigation Drawer ──────────────────────── */}
      <AnimatePresence>
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
              {mainNavItems.map((item: NavigationItem) => {
                const hasChildren = item.type !== 'link';
                const isExpanded = mobileExpanded === item.id;
                const isCurrentPage = isRouteActive(location.pathname, item.href);

                // Simple top-level link (Home, Contact)
                if (!hasChildren) {
                  return (
                    <Link
                      key={item.id}
                      to={item.href}
                      className={`${styles.mobileNavLink} ${isCurrentPage ? styles.mobileNavLinkActive : ''}`}
                      onClick={closeAllMenus}
                    >
                      <span>{item.label}</span>
                      {isCurrentPage && <span className={styles.mobileActiveDot} aria-hidden="true" />}
                    </Link>
                  );
                }

                // Accordion group for About, Services, Research, Journal
                return (
                  <div key={item.id} className={styles.mobileAccordionGroup}>
                    <button
                      type="button"
                      className={`${styles.mobileAccordionTrigger} ${isCurrentPage ? styles.mobileAccordionTriggerActive : ''}`}
                      onClick={() => setMobileExpanded(isExpanded ? null : item.id)}
                      aria-expanded={isExpanded}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={16}
                        className={`${styles.mobileAccordionChevron} ${isExpanded ? styles.mobileAccordionChevronExpanded : ''}`}
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          className={styles.mobileAccordionContent}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        >
                          {/* Overview destination link */}
                          <Link
                            to={item.href}
                            className={styles.mobileOverviewLink}
                            onClick={closeAllMenus}
                          >
                            <span>Explore All {item.label}</span>
                            <ArrowRight size={12} aria-hidden="true" />
                          </Link>

                          {/* Simple dropdown sub-items */}
                          {item.type === 'dropdown' &&
                            item.dropdownItems?.map((sub) => (
                              <Link
                                key={sub.label}
                                to={sub.href}
                                className={styles.mobileSubLink}
                                onClick={closeAllMenus}
                              >
                                <span>{sub.label}</span>
                                <ChevronRight size={13} className="text-[#D0B892]/60" aria-hidden="true" />
                              </Link>
                            ))}

                          {/* Mega-menu grouped columns */}
                          {item.type === 'mega' &&
                            item.megaColumns?.map((col) => (
                              <div key={col.category} className="mb-2">
                                <p className={styles.mobileSubCategoryTitle}>{col.category}</p>
                                {col.items.map((sub) => (
                                  <Link
                                    key={sub.label}
                                    to={sub.href}
                                    className={styles.mobileSubLink}
                                    onClick={closeAllMenus}
                                  >
                                    <span>{sub.label}</span>
                                    <ChevronRight size={13} className="text-[#D0B892]/60" aria-hidden="true" />
                                  </Link>
                                ))}
                              </div>
                            ))}

                          {/* Gallery quick link inside Services */}
                          {item.type === 'mega' && (
                            <Link
                              to="/gallery"
                              className="mt-2 flex items-center justify-between rounded-lg border border-[#D0B892]/20 bg-[#D0B892]/10 p-3 text-xs font-semibold text-[#D0B892]"
                              onClick={closeAllMenus}
                            >
                              <span>View Clinical Before/After Cases</span>
                              <ChevronRight size={14} aria-hidden="true" />
                            </Link>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Mobile Contact & Booking Actions */}
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

              <Link to="/contact" className={styles.mobileCtaBtn} onClick={closeAllMenus}>
                <span>Book Consultation</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
