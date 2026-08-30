import type { ReactNode } from 'react';
import { LenisProvider } from '@/animations/lenis';

export interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Root providers wrapper for Lenis, future theme, etc.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return <LenisProvider>{children}</LenisProvider>;
}
