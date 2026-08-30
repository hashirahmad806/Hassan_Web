import { useLenisContext } from '@/animations/lenis';

/**
 * Returns the Lenis instance from context.
 */
export function useLenis() {
  const { lenis, reducedMotion } = useLenisContext();
  return { lenis, reducedMotion };
}
