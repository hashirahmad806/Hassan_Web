import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { footerContent, siteConfig } from '@/content';
import { formatWhatsAppLink } from '@/utils';

const socialLinks = [
  { href: siteConfig.socials.instagram, label: 'Instagram', Icon: Instagram },
  { href: siteConfig.socials.facebook, label: 'Facebook', Icon: Facebook },
  { href: siteConfig.socials.linkedin, label: 'LinkedIn', Icon: Linkedin },
];

/**
 * Premium site footer with gold divider, social icons, and contact info.
 */
export function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest">
      {/* Gold gradient top divider */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(208,184,146,0.6), transparent)' }}
        aria-hidden="true"
      />

      <div className="container-main grid grid-cols-1 gap-12 py-16 md:grid-cols-4">
        {/* Brand column */}
        <div className="md:col-span-1">
          <Link to="/" className="mb-4 block">
            <h3 className="font-display-lg text-2xl font-semibold tracking-tight text-primary transition-opacity hover:opacity-85">{siteConfig.name}</h3>
          </Link>
          <p className="mb-6 font-body-md text-sm text-on-surface-variant leading-relaxed">
            {footerContent.description}
          </p>
          {/* Social icons */}
          <div className="flex gap-3" aria-label="Social media links">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant/40 text-on-surface-variant transition-all duration-300 hover:border-gold-accent/60 hover:bg-gold-accent/10 hover:text-primary"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Link groups */}
        {footerContent.linkGroups.map((group) => (
          <div key={group.title}>
            <h4 className="mb-5 font-label-caps text-[11px] uppercase tracking-[0.15em] text-on-surface">
              {group.title}
            </h4>
            <ul className="space-y-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="group inline-flex items-center gap-1.5 font-body-md text-sm text-on-surface-variant transition-colors duration-200 hover:text-primary"
                  >
                    <span className="h-px w-3 bg-gold-accent/0 transition-all duration-200 group-hover:w-4 group-hover:bg-gold-accent" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Contact strip */}
      <div className="border-t border-outline-variant/20">
        <div className="container-main flex flex-col items-center justify-between gap-4 py-5 text-center md:flex-row md:text-left">
          <p className="font-body-md text-xs text-on-surface-variant">{siteConfig.copyright}</p>
          <div className="flex flex-wrap items-center justify-center gap-6 font-body-md text-xs text-on-surface-variant">
            <a
              href={formatWhatsAppLink(siteConfig.whatsapp, siteConfig.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-700 font-medium hover:text-emerald-800 transition-colors"
            >
              <MessageCircle size={13} aria-hidden="true" />
              WhatsApp
            </a>
            <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Phone size={12} aria-hidden="true" />
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Mail size={12} aria-hidden="true" />
              {siteConfig.email}
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin size={12} aria-hidden="true" />
              {siteConfig.address}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
