import { Link } from 'react-router-dom';
import { footerContent, siteConfig } from '@/content';

/**
 * Site footer with link groups and copyright.
 */
export function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant bg-surface-container-lowest">
      <div className="container-main grid grid-cols-1 gap-gutter section-padding md:grid-cols-4">
        <div>
          <h3 className="mb-4 font-headline-md text-headline-md text-primary">{siteConfig.name}</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            {footerContent.description}
          </p>
        </div>

        {footerContent.linkGroups.map((group) => (
          <div key={group.title}>
            <h4 className="mb-4 font-label-button text-label-button text-on-surface">
              {group.title}
            </h4>
            <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="underline-offset-4 opacity-80 transition-opacity hover:text-primary hover:opacity-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-outline-variant/30 py-6 text-center">
        <p className="font-body-md text-sm text-on-surface-variant">{siteConfig.copyright}</p>
      </div>
    </footer>
  );
}
