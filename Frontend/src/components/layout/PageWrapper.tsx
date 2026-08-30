import type { ReactNode } from 'react';

export interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

/**
 * Standard page wrapper with bottom padding for mobile sticky bar.
 */
export function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <div className={`min-h-screen pb-20 md:pb-0 ${className}`}>
      {children}
    </div>
  );
}
