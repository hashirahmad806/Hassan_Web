import type { ReactNode } from 'react';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'gold' | 'outline';
  className?: string;
}

const variantClasses = {
  default: 'bg-surface-container text-on-surface-variant',
  gold: 'bg-gold-accent text-on-primary',
  outline: 'border border-outline-variant text-primary bg-transparent',
};

/**
 * Small label badge for categories and tags.
 */
export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-block rounded-full px-3 py-1 font-label-caps text-label-caps uppercase',
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
