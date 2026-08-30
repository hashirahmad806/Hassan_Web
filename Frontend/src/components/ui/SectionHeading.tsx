import type { ReactNode } from 'react';

export interface SectionHeadingProps {
  label?: string;
  heading: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  children?: ReactNode;
}

/**
 * Standardized section heading with optional label and description.
 */
export function SectionHeading({
  label,
  heading,
  description,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`mb-16 max-w-3xl ${alignClass} ${className}`} data-reveal>
      {label && (
        <span className="mb-4 block font-label-caps text-label-caps uppercase tracking-widest text-primary">
          {label}
        </span>
      )}
      <h2 className="font-headline-lg text-headline-lg-mobile text-charcoal-text md:text-headline-lg">
        {heading}
      </h2>
      {description && (
        <p className="mt-4 font-body-lg text-body-lg text-on-surface-variant">{description}</p>
      )}
    </div>
  );
}
