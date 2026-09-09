import { Phone, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/content';
import { formatPhoneLink, formatWhatsAppLink } from '@/utils';

/**
 * Mobile sticky action bar + Desktop floating WhatsApp quick contact.
 */
export function MobileStickyActions() {
  return (
    <>
      {/* Mobile sticky call/WhatsApp action bar */}
      <div className="fixed bottom-0 z-50 flex w-full gap-4 border-t border-outline-variant/30 bg-surface-container-lowest/95 p-3.5 backdrop-blur-md md:hidden">
        <a
          href={formatPhoneLink(siteConfig.phone)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-surface-container py-3 font-button text-sm text-primary transition-colors hover:bg-surface-container-high"
          aria-label="Call clinic"
        >
          <Phone size={17} />
          Call Clinic
        </a>
        <a
          href={formatWhatsAppLink(siteConfig.whatsapp, siteConfig.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-button text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-700"
          aria-label="Contact via WhatsApp"
        >
          <MessageCircle size={17} />
          WhatsApp
        </a>
      </div>

      {/* Desktop Floating WhatsApp Quick Connect */}
      <a
        href={formatWhatsAppLink(siteConfig.whatsapp, siteConfig.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="group fixed bottom-6 right-6 z-50 hidden md:inline-flex items-center gap-2.5 rounded-full bg-emerald-600 px-5 py-3.5 text-white shadow-[0_8px_24px_rgba(5,150,105,0.35)] transition-all duration-300 hover:bg-emerald-700 hover:shadow-[0_12px_32px_rgba(5,150,105,0.45)] hover:-translate-y-1"
        aria-label="Chat with Dr. Hassan Salman on WhatsApp"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-200" />
        </span>
        <MessageCircle size={19} className="transition-transform duration-200 group-hover:scale-110" />
        <span className="font-button text-xs font-semibold tracking-wide">
          Chat on WhatsApp
        </span>
      </a>
    </>
  );
}
