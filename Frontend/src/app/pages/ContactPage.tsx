import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import { Skeleton } from 'boneyard-js/react';
import { Header, Footer, MobileStickyActions, PageWrapper } from '@/components/layout';
import { ContactForm } from '@/components/sections';
import { contactContent, siteConfig } from '@/content';
import { formatPhoneLink } from '@/utils';

/**
 * Contact and appointment booking page.
 */
export default function ContactPage() {
  return (
    <Skeleton name="contact" loading={false}>
      <PageWrapper>
        <Header />
        <main className="section-padding pt-32">
          <div className="container-main grid grid-cols-1 gap-12 lg:grid-cols-2">
            <ContactForm />

            <aside className="space-y-8">
              <div>
                <h3 className="mb-4 font-headline-md text-headline-md text-charcoal-text">
                  Visit Our Clinic
                </h3>
                <div className="flex items-start gap-3 text-on-surface-variant">
                  <MapPin className="mt-1 shrink-0 text-primary" size={20} aria-hidden="true" />
                  <p className="font-body-md">{siteConfig.address}</p>
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-headline-md text-xl text-charcoal-text">Office Hours</h3>
                <ul className="space-y-2">
                  {contactContent.hours.map((slot) => (
                    <li key={slot.day} className="flex items-center gap-3 font-body-md text-on-surface-variant">
                      <Clock size={16} className="text-primary" aria-hidden="true" />
                      <span className="font-medium text-on-surface">{slot.day}:</span>
                      {slot.time}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <a
                  href={formatPhoneLink(siteConfig.phone)}
                  className="flex items-center gap-3 font-body-md text-on-surface-variant hover:text-primary"
                >
                  <Phone size={20} className="text-primary" aria-hidden="true" />
                  {siteConfig.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 font-body-md text-on-surface-variant hover:text-primary"
                >
                  <Mail size={20} className="text-primary" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </div>
            </aside>
          </div>
        </main>
        <Footer />
        <MobileStickyActions />
      </PageWrapper>
    </Skeleton>
  );
}
