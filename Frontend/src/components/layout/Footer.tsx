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

const socialLinks = [
  { href: siteConfig.socials.instagram, label: 'Instagram', Icon: Instagram },
  { href: siteConfig.socials.facebook, label: 'Facebook', Icon: Facebook },
  { href: siteConfig.socials.linkedin, label: 'LinkedIn', Icon: Linkedin },
];

/**
 * Architectural luxury footer designed for Dr. Hassan's practice.
 * Features a pre-footer VIP consultation callout, detailed clinical disciplines,
 * operating suite hours, certification trust marks, and smooth navigation.
 */
export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/20">
      {/* 1. Pre-Footer Luxury Consultation Bar */}
      <div className="relative border-b border-gold-accent/25 bg-gradient-to-r from-surface via-surface-container-low to-surface py-12">
        <div className="container-main flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="max-w-xl text-center md:text-left">
            <div className="mb-2 flex items-center justify-center md:justify-start gap-2 text-gold-accent">
              <Sparkles size={14} />
              <span className="font-label-caps text-[11px] uppercase tracking-[0.2em] font-semibold">
                Exclusive Consultations
              </span>
            </div>
            <h3 className="font-display-lg text-2xl md:text-3xl font-medium text-charcoal-text">
              Ready for Your Signature Smile?
            </h3>
            <p className="mt-1 font-body-md text-sm text-on-surface-variant">
              Reserve your dedicated clinical assessment with Dr. Hassan in our private operatory suite.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-7 py-3 font-label-caps text-xs uppercase tracking-widest text-on-primary transition-all duration-300 hover:border-gold-accent hover:bg-gold-accent hover:shadow-[0_4px_20px_rgba(208,184,146,0.25)]"
            >
              <span>Book Consultation</span>
              <ArrowRight size={14} />
            </Link>
            <a
              href={formatWhatsAppLink(siteConfig.whatsapp, siteConfig.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full border border-[#25D366]/40 bg-surface-container-lowest px-6 py-3 font-label-caps text-xs uppercase tracking-widest text-charcoal-text transition-all duration-300 hover:border-[#25D366] hover:bg-[#25D366]/5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25D366]" />
              </span>
              <span className="text-[#128C7E] font-medium group-hover:text-[#075E54]">
                WhatsApp Concierge
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Architectural Footer */}
      <div className="container-main py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand Column (Col 1 to 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <Link
                to="/"
                className="inline-flex items-baseline gap-1.5 transition-opacity hover:opacity-90"
              >
                <span className="font-display-lg text-3xl font-semibold tracking-tight text-primary">
                  {siteConfig.name}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-gold-accent" />
              </Link>
              <p className="mt-1 font-label-caps text-[10px] uppercase tracking-[0.2em] text-gold-accent font-semibold">
                BDS • Aesthetic & Reconstructive Surgery
              </p>
            </div>

            <p className="font-body-md text-sm leading-relaxed text-on-surface-variant max-w-sm">
              Pioneering minimally invasive biomimetic dentistry and bespoke smile architectures.
              Crafted with microscopic precision and refined aesthetic harmony.
            </p>

            {/* Clinical Credential Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-accent/30 bg-gold-accent/5 px-3 py-1 font-label-caps text-[10px] uppercase tracking-wider text-primary">
                <ShieldCheck size={12} className="text-gold-accent" />
                Digital Smile Design™
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-accent/30 bg-gold-accent/5 px-3 py-1 font-label-caps text-[10px] uppercase tracking-wider text-primary">
                <ShieldCheck size={12} className="text-gold-accent" />
                Biomimetic Protocols
              </span>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <span className="block font-label-caps text-[10px] uppercase tracking-[0.18em] text-on-surface-variant/70 mb-3">
                Follow Our Transformations
              </span>
              <div className="flex gap-3" aria-label="Social media channels">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant/50 bg-surface-container-low text-on-surface-variant transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-accent hover:bg-gold-accent/15 hover:text-primary hover:shadow-sm"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Clinical Disciplines (Col 5 to 7) */}
          <div className="lg:col-span-3 space-y-5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gold-accent/70" />
              <h4 className="font-label-caps text-[11px] uppercase tracking-[0.18em] text-charcoal-text font-bold">
                Clinical Disciplines
              </h4>
            </div>
            <ul className="space-y-3">
              {[
                { label: 'Complete Smile Design', href: '/services#cosmetic' },
                { label: 'Full Mouth Rehabilitation', href: '/services#restorative' },
                { label: 'Porcelain Veneers & Crowns', href: '/services#cosmetic' },
                { label: 'Dental Implants & All-on-X', href: '/services#implants' },
                { label: 'Biomimetic Restorations', href: '/gallery' },
                { label: 'Orthodontics & Aligners', href: '/services#orthodontics' },
                { label: 'Laser Teeth Whitening', href: '/services#cosmetic' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="group inline-flex items-center gap-2 font-body-md text-sm text-on-surface-variant transition-colors duration-200 hover:text-primary"
                  >
                    <span
                      className="h-px w-2 bg-gold-accent/0 transition-all duration-200 group-hover:w-3.5 group-hover:bg-gold-accent"
                      aria-hidden="true"
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio & Patients (Col 8 to 9) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gold-accent/70" />
              <h4 className="font-label-caps text-[11px] uppercase tracking-[0.18em] text-charcoal-text font-bold">
                The Practice
              </h4>
            </div>
            <ul className="space-y-3">
              {[
                { label: 'About Dr. Hassan', href: '/about' },
                { label: 'Clinical Philosophy', href: '/about#philosophy' },
                { label: 'Case Studies Gallery', href: '/gallery' },
                { label: 'Consultation Guide', href: '/contact' },
                { label: 'Patient Testimonials', href: '/gallery#contact' },
                { label: 'Clinic Safety Standards', href: '/about' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="group inline-flex items-center gap-2 font-body-md text-sm text-on-surface-variant transition-colors duration-200 hover:text-primary"
                  >
                    <span
                      className="h-px w-2 bg-gold-accent/0 transition-all duration-200 group-hover:w-3.5 group-hover:bg-gold-accent"
                      aria-hidden="true"
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Private Suite & Visiting Hours (Col 10 to 12) */}
          <div className="lg:col-span-3 space-y-5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gold-accent/70" />
              <h4 className="font-label-caps text-[11px] uppercase tracking-[0.18em] text-charcoal-text font-bold">
                Private Suite & Hours
              </h4>
            </div>

            {/* Schedule Box */}
            <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low/60 p-4 space-y-2">
              <div className="flex items-center gap-2 text-primary font-medium text-xs font-label-caps tracking-wider uppercase">
                <Clock size={13} className="text-gold-accent" />
                <span>Surgery Hours</span>
              </div>
              <div className="space-y-1 text-xs text-on-surface-variant font-body-md pt-1">
                <div className="flex justify-between">
                  <span>Mon – Fri:</span>
                  <span className="font-medium text-charcoal-text">09:00 AM – 07:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-medium text-charcoal-text">10:00 AM – 06:00 PM</span>
                </div>
                <div className="flex justify-between text-gold-accent">
                  <span>Sunday:</span>
                  <span className="font-medium">VIP By Appointment</span>
                </div>
              </div>
            </div>

            {/* Direct Contact Details */}
            <div className="space-y-2.5 pt-1 text-xs text-on-surface-variant">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2.5 transition-colors hover:text-primary"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-accent/10 text-primary">
                  <Phone size={13} />
                </span>
                <span className="font-medium">{siteConfig.phone}</span>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-primary"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-accent/10 text-primary">
                  <Mail size={13} />
                </span>
                <span>{siteConfig.email}</span>
              </a>

              <div className="flex items-start gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-accent/10 text-primary">
                  <MapPin size={13} />
                </span>
                <span className="leading-snug pt-0.5">{siteConfig.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Bar with Medical Statement and Smooth Back-to-Top */}
      <div className="border-t border-outline-variant/20 bg-surface-container-low/40">
        <div className="container-main flex flex-col items-center justify-between gap-4 py-6 text-center md:flex-row md:text-left">
          <div className="space-y-1">
            <p className="font-body-md text-xs text-on-surface-variant">
              {siteConfig.copyright}
            </p>
            <p className="font-body-md text-[11px] text-on-surface-variant/70">
              All surgical and aesthetic dental procedures planned under strict international biomimetic protocols.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group inline-flex items-center gap-2 rounded-full border border-outline-variant/40 bg-surface-container-lowest px-4 py-2 font-label-caps text-[11px] uppercase tracking-widest text-on-surface-variant transition-all duration-300 hover:border-gold-accent hover:text-primary hover:shadow-sm"
          >
            <span>Back to Top</span>
            <ArrowUp
              size={13}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 text-gold-accent"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
