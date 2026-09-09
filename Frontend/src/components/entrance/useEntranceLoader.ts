import { useEffect, useRef, useState, useCallback } from 'react';
import { usePreloaderStore } from '@/store/preloaderStore';

/**
 * Tracks real page readiness and drives an animated progress value.
 *
 * Key guarantee: the animation ALWAYS plays for at least MIN_DISPLAY_MS
 * before `isReady` is set — even on cached/instant loads. This prevents
 * the entrance collapsing on fast machines.
 */

/** Minimum time (ms) the loader is visible before the exit can start */
const MIN_DISPLAY_MS = 1000;

export function useEntranceLoader(onComplete: () => void) {
  const { hasSeenIntro, setHasSeenIntro } = usePreloaderStore();

  const [displayProgress, setDisplayProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const targetRef       = useRef(0);
  const rafRef          = useRef<number | null>(null);
  const readyCalledRef  = useRef(false);
  const mountTimeRef    = useRef(Date.now());
  const onCompleteRef   = useRef(onComplete);
  onCompleteRef.current = onComplete;

  /** Smoothly animate displayProgress toward target using RAF */
  const animate = useCallback(() => {
    setDisplayProgress((prev) => {
      const diff = targetRef.current - prev;
      if (Math.abs(diff) < 0.25) return targetRef.current;
      return prev + diff * 0.12; // snappy, smooth progress
    });
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  /** Bump the target progress, never goes backward */
  const setTarget = useCallback((pct: number) => {
    targetRef.current = Math.max(targetRef.current, Math.min(pct, 100));
  }, []);

  /**
   * Attempt to set isReady. Respects MIN_DISPLAY_MS — if the page is ready
   * before the minimum time has elapsed, we wait out the remainder.
   */
  const tryMarkReady = useCallback(() => {
    if (readyCalledRef.current) return;
    readyCalledRef.current = true;
    setTarget(100);

    const elapsed   = Date.now() - mountTimeRef.current;
    const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

    // Give the bar time to visually fill to 100%, then trigger the split
    setTimeout(() => setIsReady(true), remaining + 150);
  }, [setTarget]);

  useEffect(() => {
    if (hasSeenIntro) return;

    mountTimeRef.current = Date.now();
    rafRef.current = requestAnimationFrame(animate);

    // ── Simulate natural progress even before real events ─────────────
    const rampTimer = setTimeout(() => setTarget(45), 200);
    const rampTimer2 = setTimeout(() => setTarget(80), 500);

    // ── Document readyState ─────────────────────────────────────────────
    const onDocReady = () => {
      if (document.readyState === 'interactive') setTarget(70);
      if (document.readyState === 'complete') {
        setTarget(85);
        checkAssetsReady();
      }
    };
    document.addEventListener('readystatechange', onDocReady);
    onDocReady(); // handle already-complete docs (cached)

    // ── Hero video metadata ─────────────────────────────────────────────
    const video = document.querySelector<HTMLVideoElement>('video[autoplay]');
    const onVideoMeta = () => setTarget(90);
    if (video) {
      if (video.readyState >= 1) setTarget(90);
      else video.addEventListener('loadedmetadata', onVideoMeta, { once: true });
    } else {
      setTarget(90);
    }

    // ── Images: only check critical non-lazy images ────────────────────
    function checkAssetsReady() {
      const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('img[src]:not([loading="lazy"])'));
      if (!imgs.length) { tryMarkReady(); return; }
      let loaded = 0;
      const onLoad = () => {
        loaded += 1;
        setTarget(85 + Math.round((loaded / imgs.length) * 15));
        if (loaded >= imgs.length) tryMarkReady();
      };
      imgs.forEach((img) => {
        if (img.complete) onLoad();
        else {
          img.addEventListener('load',  onLoad, { once: true });
          img.addEventListener('error', onLoad, { once: true });
        }
      });
      if (loaded >= imgs.length) tryMarkReady();
    }

    // ── Absolute safety cap: 1.8s ──────────────────────────────────────
    const safetyTimeout = setTimeout(tryMarkReady, 1800);

    return () => {
      document.removeEventListener('readystatechange', onDocReady);
      video?.removeEventListener('loadedmetadata', onVideoMeta);
      clearTimeout(rampTimer);
      clearTimeout(rampTimer2);
      clearTimeout(safetyTimeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hasSeenIntro, animate, setTarget, tryMarkReady]);

  const handleAnimationComplete = useCallback(() => {
    setHasSeenIntro(true);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    onCompleteRef.current();
  }, [setHasSeenIntro]);

  return {
    skip: hasSeenIntro,
    displayProgress,
    isReady,
    handleAnimationComplete,
  };
}
