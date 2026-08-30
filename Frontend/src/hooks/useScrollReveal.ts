import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animationConfig } from '@/animations/gsap/animationConfig';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable scroll reveal hook for elements matching a selector within a container.
 */
export function useScrollReveal(containerRef: React.RefObject<HTMLElement | null>) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const items = container.querySelectorAll('[data-reveal]');
    if (items.length === 0) return undefined;

    timelineRef.current = gsap.timeline({
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

    return () => {
      timelineRef.current?.scrollTrigger?.kill();
      timelineRef.current?.kill();
    };
  }, [containerRef]);
}
