import { Link } from 'react-router-dom';
import {
  Instagram,
  Facebook,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUp,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { siteConfig } from '@/content';
import { formatWhatsAppLink } from '@/utils';
import styles from './Footer.module.css';

const socialLinks = [
  { href: siteConfig.socials.instagram, label: 'Instagram', Icon: Instagram },
  { href: siteConfig.socials.facebook, label: 'Facebook', Icon: Facebook },
  { href: siteConfig.socials.linkedin, label: 'LinkedIn', Icon: Linkedin },
];

const clinicalDisciplines = [
  { label: 'Complete Smile Design', href: '/services#cosmetic' },
  { label: 'Full Mouth Rehabilitation', href: '/services#restorative' },
  { label: 'Porcelain Veneers & Crowns', href: '/services#cosmetic' },
  { label: 'Dental Implants & All-on-X', href: '/services#implants' },
  { label: 'Biomimetic Restorations', href: '/gallery' },
  { label: 'Orthodontics & Clear Aligners', href: '/services#orthodontics' },
  { label: 'Laser Teeth Whitening', href: '/services#cosmetic' },
];

const practiceLinks = [
  { label: 'About Dr. Hassan', href: '/about' },
  { label: 'Clinical Philosophy', href: '/about#philosophy' },
  { label: 'Case Studies Gallery', href: '/gallery' },
  { label: 'Consultation Guide', href: '/contact' },
  { label: 'Patient Testimonials', href: '/gallery#contact' },
  { label: 'Safety & Sterilization Standards', href: '/about' },
];

/**
 * Architectural luxury dark footer for Dr. Hassan's practice.
 */
export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* ── 1. Pre-Footer Luxury Consultation Bar ──────────────── */}
      <section className={styles.preFooter} aria-label="Consultation invitation">
        <div className={styles.preFooterGlow} aria-hidden="true" />
        <div className={styles.preFooterGrid}>
          <div className={styles.preFooterText}>
            <div className={styles.preFooterTag}>
              <Sparkles size={12} aria-hidden="true" />
              <span>Private Operatory Suite · Karachi, Pakistan</span>
            </div>
            <h2 className={styles.preFooterTitle}>
              Sculpting Confident, Bespoke Smiles
            </h2>
            <p className={styles.preFooterDesc}>
              Reserve your dedicated clinical assessment with Dr. Hassan. Digital Smile Design™,
              clinical photography, and meticulous personalized treatment planning.
            </p>
          </div>

          <div className={styles.preFooterCtas}>
            <Link to="/contact" className={styles.ctaPrimary}>
              <span>Reserve Consultation</span>
              <ArrowRight size={13} aria-hidden="true" />
            </Link>

            <a
              href={formatWhatsAppLink(siteConfig.whatsapp, siteConfig.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaWhatsApp}
            >
              <span className={styles.waDotWrap} aria-hidden="true">
                <span className={styles.waDotPing} />
                <span className={styles.waDot} />
              </span>
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. Main Architectural Footer Columns ────────────────── */}
      <div className={styles.mainContent}>
        <div className={styles.columnsGrid}>
          {/* Brand & Accreditations Column */}
          <div className={styles.brandCol}>
            <Link to="/" className={styles.brandLink} aria-label="Dr. Hassan Clinic Home">
              <div className={styles.brandTitleRow}>
                <span className={styles.brandName}>{siteConfig.name}</span>
                <span className={styles.brandDot} aria-hidden="true" />
              </div>
              <span className={styles.brandRole}>
                BDS • Aesthetic & Reconstructive Surgery
              </span>
            </Link>

            <p className={styles.brandDesc}>
              Pioneering minimally invasive biomimetic dentistry and bespoke smile architectures.
              Crafted with microscopic precision and refined aesthetic harmony.
            </p>

            {/* Credential Chips */}
            <div className={styles.trustChips}>
              <span className={styles.trustChip}>
                <ShieldCheck size={11} aria-hidden="true" />
                Digital Smile Design™
              </span>
              <span className={styles.trustChip}>
                <ShieldCheck size={11} aria-hidden="true" />
                Biomimetic Protocols
              </span>
              <span className={styles.trustChip}>
                <ShieldCheck size={11} aria-hidden="true" />
                AACD Member
              </span>
            </div>

            {/* Social Links */}
            <div className={styles.socialsRow}>
              <span className={styles.socialsLabel}>Follow Transformations</span>
              <div className={styles.socialsIcons} aria-label="Social media profiles">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={styles.socialIconBtn}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Clinical Disciplines Column */}
          <div>
            <div className={styles.colHeader}>
              <span className={styles.colHeaderDot} aria-hidden="true" />
              <h3 className={styles.colTitle}>Clinical Disciplines</h3>
            </div>
            <ul className={styles.linksList}>
              {clinicalDisciplines.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className={styles.linkItem}>
                    <span className={styles.linkDash} aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* The Practice Column */}
          <div>
            <div className={styles.colHeader}>
              <span className={styles.colHeaderDot} aria-hidden="true" />
              <h3 className={styles.colTitle}>The Practice</h3>
            </div>
            <ul className={styles.linksList}>
              {practiceLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className={styles.linkItem}>
                    <span className={styles.linkDash} aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Private Suite & Operating Hours Column */}
          <div>
            <div className={styles.colHeader}>
              <span className={styles.colHeaderDot} aria-hidden="true" />
              <h3 className={styles.colTitle}>Private Suite & Hours</h3>
            </div>

            {/* Hours box */}
            <div className={styles.hoursBox}>
              <div className={styles.hoursHeader}>
                <Clock size={12} aria-hidden="true" />
                <span>Surgery Hours</span>
              </div>
              <div className={styles.hoursList}>
                <div className={styles.hoursRow}>
                  <span>Mon – Fri:</span>
                  <span className={styles.hoursValue}>09:00 AM – 07:00 PM</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Saturday:</span>
                  <span className={styles.hoursValue}>10:00 AM – 06:00 PM</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Sunday:</span>
                  <span className={styles.hoursVip}>VIP By Appointment</span>
                </div>
              </div>
            </div>

            {/* Direct contact list */}
            <div className={styles.contactList}>
              <a
                href={`tel:${siteConfig.phone}`}
                className={styles.contactLink}
                aria-label={`Call ${siteConfig.phone}`}
              >
                <span className={styles.contactIconCircle} aria-hidden="true">
                  <Phone size={12} />
                </span>
                <span>{siteConfig.phone}</span>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className={styles.contactLink}
                aria-label={`Email ${siteConfig.email}`}
              >
                <span className={styles.contactIconCircle} aria-hidden="true">
                  <Mail size={12} />
                </span>
                <span>{siteConfig.email}</span>
              </a>

              <div className={styles.contactLink}>
                <span className={styles.contactIconCircle} aria-hidden="true">
                  <MapPin size={12} />
                </span>
                <span>{siteConfig.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Bottom Legal & Back to Top ─────────────────────────── */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomInner}>
          <div className={styles.bottomLegal}>
            <p className={styles.copyright}>{siteConfig.copyright}</p>
            <p className={styles.medicalNote}>
              All surgical and aesthetic dental procedures planned under strict international biomimetic protocols.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
            className={styles.backToTopBtn}
          >
            <span>Back to Top</span>
            <ArrowUp size={12} className={styles.backToTopIcon} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
