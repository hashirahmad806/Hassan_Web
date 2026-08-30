import { useEffect, useState } from 'react';

/**
 * Tracks normalized pointer position for parallax effects.
 */
export function usePointerParallax(): { x: number; y: number } {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in event ? event.touches[0]?.clientX ?? 0 : event.clientX;
      const clientY = 'touches' in event ? event.touches[0]?.clientY ?? 0 : event.clientY;
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = -(clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, []);

  return mouse;
}

/**
 * Caps device pixel ratio for performance.
 */
export function useResponsiveCanvas(): { dpr: number } {
  const dpr = Math.min(window.devicePixelRatio, 2);
  return { dpr };
}
