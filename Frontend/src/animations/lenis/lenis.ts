import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenisInstance: Lenis | null = null;

export interface LenisOptions {
  reducedMotion?: boolean;
}

/**
 * Creates and returns the Lenis smooth scroll singleton.
 */
export function createLenis(options: LenisOptions = {}): Lenis {
  if (lenisInstance) {
    return lenisInstance;
  }

  lenisInstance = new Lenis({
    duration: options.reducedMotion ? 0 : 1.2,
    easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    smoothWheel: !options.reducedMotion,
    touchMultiplier: 2,
  });

  lenisInstance.on('scroll', ScrollTrigger.update);

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function destroyLenis(): void {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}
