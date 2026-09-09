import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animationConfig } from './animationConfig';

gsap.registerPlugin(ScrollTrigger);

/**
 * Creates scroll-triggered reveal timeline for a section container.
 */
export function createSectionRevealTimeline(container: HTMLElement): gsap.core.Timeline {
  const items = container.querySelectorAll('[data-reveal]');

  return gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 90%',
      toggleActions: 'play none none none',
      once: true,
    },
    defaults: { ease: animationConfig.ease.default },
  }).from(items, {
    y: 20,
    opacity: 0,
    duration: 0.45,
    stagger: 0.08,
  });
}

/**
 * Creates fast, smooth stagger reveal for card grids like Services/Treatments.
 */
export function createCardsRevealTimeline(container: HTMLElement): gsap.core.Timeline {
  const cards = container.querySelectorAll('[data-reveal-card]');

  return gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 92%',
      toggleActions: 'play none none none',
      once: true,
    },
    defaults: { ease: animationConfig.ease.default },
  }).from(cards, {
    y: 24,
    opacity: 0,
    duration: 0.4,
    stagger: 0.07,
    clearProps: 'opacity,transform',
  });
}
