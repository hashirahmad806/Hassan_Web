import { Phone, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/content';
import { formatPhoneLink, formatWhatsAppLink } from '@/utils';

/**
 * Mobile sticky call/WhatsApp action bar.
 */
export function MobileStickyActions() {
  return (
    <div className="fixed bottom-0 z-50 flex w-full gap-4 border-t border-outline-variant bg-surface-container-lowest/90 p-4 backdrop-blur-md md:hidden">
      <a
        href={formatPhoneLink(siteConfig.phone)}
        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-surface-container py-3 font-button text-primary"
        aria-label="Call clinic"
      >
        <Phone size={20} />
        Call
      </a>
      <a
        href={formatWhatsAppLink(siteConfig.whatsapp)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-3 font-button text-on-primary"
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle size={20} />
        WhatsApp
      </a>
    </div>
  );
}
