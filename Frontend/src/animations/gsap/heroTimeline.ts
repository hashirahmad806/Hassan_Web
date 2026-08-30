import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animationConfig } from './animationConfig';

gsap.registerPlugin(ScrollTrigger);

export interface HeroTimelineOptions {
  container: HTMLElement;
  delay?: number;
  onComplete?: () => void;
}

/**
 * Creates the hero section entrance timeline with staggered text reveals.
 */
export function createHeroTimeline({ container, delay = 0, onComplete }: HeroTimelineOptions): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: animationConfig.ease.default }, delay });

  const label = container.querySelector('[data-hero-label]');
  const heading = container.querySelector('[data-hero-heading]');
  const description = container.querySelector('[data-hero-description]');
  const actions = container.querySelector('[data-hero-actions]');
  const card = container.querySelector('[data-hero-card]');

  tl.from(label, {
    y: animationConfig.reveal.y,
    opacity: animationConfig.reveal.opacity,
    duration: animationConfig.duration.base,
  })
    .from(
      heading,
      {
        y: animationConfig.reveal.y,
        opacity: animationConfig.reveal.opacity,
        duration: animationConfig.duration.slow,
      },
      '-=0.5',
    )
    .from(
      description,
      {
        y: animationConfig.reveal.y,
        opacity: animationConfig.reveal.opacity,
        duration: animationConfig.duration.base,
      },
      '-=0.6',
    )
    .from(
      actions,
      {
        y: 20,
        opacity: 0,
        duration: animationConfig.duration.fast,
      },
      '-=0.4',
    )
    .from(
      card,
      {
        y: animationConfig.reveal.y,
        opacity: animationConfig.reveal.opacity,
        duration: animationConfig.duration.slow,
      },
      '-=0.8',
    );

  if (onComplete) {
    tl.eventCallback('onComplete', onComplete);
  }

  return tl;
}

/**
 * Scroll-linked camera/object transform for hero 3D scene.
 */
export function createHeroScrollTimeline(
  container: HTMLElement,
  onUpdate: (progress: number) => void,
): ScrollTrigger {
  return ScrollTrigger.create({
    trigger: container,
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
    onUpdate: (self) => onUpdate(self.progress),
  });
}
