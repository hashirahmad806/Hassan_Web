/** Shared animation tokens synced with GSAP timelines. */
export const animationConfig = {
  ease: {
    default: 'power3.out',
    smooth: 'power2.inOut',
    bounce: 'back.out(1.2)',
  },
  duration: {
    fast: 0.6,
    base: 0.8,
    slow: 1.2,
  },
  stagger: {
    default: 0.12,
    cards: 0.15,
  },
  reveal: {
    y: 30,
    opacity: 0,
  },
} as const;

export type AnimationConfig = typeof animationConfig;
