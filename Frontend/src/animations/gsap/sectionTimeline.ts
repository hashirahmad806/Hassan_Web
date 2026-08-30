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
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    defaults: { ease: animationConfig.ease.default },
  }).from(items, {
    y: animationConfig.reveal.y,
    opacity: animationConfig.reveal.opacity,
    duration: animationConfig.duration.base,
    stagger: animationConfig.stagger.default,
  });
}

/**
 * Creates stagger reveal for card grids.
 */
export function createCardsRevealTimeline(container: HTMLElement): gsap.core.Timeline {
  const cards = container.querySelectorAll('[data-reveal-card]');

  return gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
    defaults: { ease: animationConfig.ease.default },
  }).from(cards, {
    y: 40,
    opacity: 0,
    duration: animationConfig.duration.base,
    stagger: animationConfig.stagger.cards,
  });
}
