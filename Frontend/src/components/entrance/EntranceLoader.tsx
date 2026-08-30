/**
 * EntranceLoader.tsx — "Precision Reveal" v2
 *
 * TIMELINE (all relative to mount):
 *
 *   0.00s  Blank warm background
 *   0.20s  Ambient glow begins blooming (slow, 2.5s)
 *   0.30s  TOOTH / LOGO entrance — scale 0.82→1, opacity 0→1, y 18→0, rotate 8→0
 *           duration 0.90s — slow, weighty, premium
 *   1.00s  Tooth idles on screen (breathes gently)
 *   1.00s  Eyebrow "PRECISION • CARE • TECHNOLOGY" reveals — blur+fade, 0.7s
 *   1.30s  Brand name "Dr. Hassan Salman" reveals — blur+fade, 0.7s
 *   1.10s  Precision ring begins — scale 0.65→1 + rotation, 1.0s
 *   1.60s  Progress bar fades in and starts filling
 *   ~3.0s  Page/asset ready + minimum elapsed → isReady = true
 *   3.0s   Sub-label fades out, tooth nudges 1→1.04
 *   3.0s   Split panels slide ±100% over 0.65s
 *   3.65s  Homepage fully visible, navbar animates in
 */

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useEntranceLoader } from './useEntranceLoader';
import styles from './EntranceLoader.module.css';
import logoSvg from '@/assets/images/main_design.svg';

/* ── Easing curves ──────────────────────────────────────────────────────── */
const ENTRANCE = [0.22, 1, 0.36, 1] as const;  // premium smooth ease-out
const SPLIT    = [0.76, 0, 0.24, 1] as const;  // cinematic curtain

/* ── Brand strings ──────────────────────────────────────────────────────── */
const EYEBROW  = 'PRECISION  •  CARE  •  TECHNOLOGY';
const BRAND    = 'Dr. Hassan Salman';
const SUBLABEL = 'Preparing your experience';

/* ── Brand colors (existing palette) ────────────────────────────────────── */
const BG      = '#FFF8F3';
const PRIMARY = '#6e5c3c';
const GOLD    = '#D0B892';
const GOLD_DIM = 'rgba(208, 184, 146, 0.20)';

/* ── Ring geometry ───────────────────────────────────────────────────────── */
const RING_R    = 118;
const CX        = RING_R + 6;
const CY        = RING_R + 6;
const SVG_DIM   = (RING_R + 6) * 2;
const CIRC      = 2 * Math.PI * RING_R;

interface EntranceLoaderProps {
  onComplete?: () => void;
}

export function EntranceLoader({ onComplete }: EntranceLoaderProps) {
  const [exiting, setExiting] = useState(false);

  const handleComplete = useCallback(() => onComplete?.(), [onComplete]);

  const { skip, displayProgress, isReady, handleAnimationComplete } =
    useEntranceLoader(handleComplete);

  // When ready, start exit sequence
  useEffect(() => {
    if (isReady && !exiting) setExiting(true);
  }, [isReady, exiting]);

  if (skip) return null;


  /* ── Full cinematic version ──────────────────────────────────────────── */
  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {!exiting && (
        <motion.div
          role="status"
          aria-label="Preparing website"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: BG }}
          initial={{ opacity: 1 }}
          /* Outer container fades out very slightly after panels slide away */
          exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.62 } }}
        >

          {/* ══════════════════════════════════════════════════════════════
               SPLIT PANELS — zIndex 1, sit below everything
               Triggered when isReady becomes true
          ══════════════════════════════════════════════════════════════ */}
          <motion.div
            className={styles.splitLeft}
            style={{ backgroundColor: BG, zIndex: 1 }}
            initial={{ x: '0%' }}
            animate={isReady ? { x: '-101%' } : { x: '0%' }}
            transition={{ duration: 0.65, ease: SPLIT }}
          />
          <motion.div
            className={styles.splitRight}
            style={{ backgroundColor: BG, zIndex: 1 }}
            initial={{ x: '0%' }}
            animate={isReady ? { x: '101%' } : { x: '0%' }}
            transition={{ duration: 0.65, ease: SPLIT }}
          />

          {/* ══════════════════════════════════════════════════════════════
               CENTER CONTENT — zIndex 20, fades out when exiting
          ══════════════════════════════════════════════════════════════ */}
          <motion.div
            className="relative flex flex-col items-center"
            style={{ zIndex: 20 }}
            animate={isReady
              ? { opacity: 0, y: -12, transition: { duration: 0.30, ease: 'easeIn' } }
              : { opacity: 1, y:   0 }
            }
          >

             {/* ── TOOTH / LOGO WRAPPER ───────────────────────────────── */}
            <div className="relative flex items-center justify-center">

              {/* Ambient bloom behind tooth — centered wrapper */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  className={styles.ambientGlow}
                  style={{
                    width:  'clamp(320px, 55vmin, 500px)',
                    height: 'clamp(320px, 55vmin, 500px)',
                  }}
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: 1.0, opacity: 1 }}
                  transition={{ duration: 2.5, ease: 'easeOut', delay: 0.20 }}
                />
              </div>

              {/* Precision ring — centered wrapper */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  className={styles.precisionRing}
                  initial={{ scale: 0.65, opacity: 0, rotate: -30 }}
                  animate={{ scale: 1.0, opacity: 1, rotate:  95 }}
                  transition={{ duration: 1.0, ease: ENTRANCE, delay: 1.10 }}
                >
                  <svg
                    width={SVG_DIM}
                    height={SVG_DIM}
                    viewBox={`0 0 ${SVG_DIM} ${SVG_DIM}`}
                    fill="none"
                    aria-hidden="true"
                  >
                    {/* Background track */}
                    <circle cx={CX} cy={CY} r={RING_R} stroke={GOLD_DIM} strokeWidth={1} />

                    {/* Animated arc — draws in */}
                    <motion.circle
                      cx={CX} cy={CY} r={RING_R}
                      stroke={GOLD}
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeDasharray={CIRC}
                      initial={{ strokeDashoffset: CIRC }}
                      animate={{ strokeDashoffset: CIRC * 0.30 }}
                      transition={{ duration: 1.1, ease: ENTRANCE, delay: 1.15 }}
                      style={{ transformOrigin: `${CX}px ${CY}px` }}
                    />

                    {/* 3 accent dots */}
                    {[0, 120, 240].map((deg) => {
                      const rad = (deg * Math.PI) / 180;
                      return (
                        <motion.circle
                          key={deg}
                          cx={CX + RING_R * Math.cos(rad)}
                          cy={CY + RING_R * Math.sin(rad)}
                          r={2.5}
                          fill={GOLD}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 0.75, scale: 1 }}
                          transition={{ duration: 0.5, delay: 1.55 }}
                        />
                      );
                    })}
                  </svg>
                </motion.div>
              </div>

              {/* ── TOOTH / LOGO ──────────────────────────────────────── */}
              {/*
                  0.30s delay → starts entering
                  0.90s duration → slow, weighty arrival
                  Then idles with gentle float
              */}
              <motion.div
                initial={{ opacity: 0, scale: 0.82, y: 20, rotate: 8 }}
                animate={{ opacity: 1, scale: 1,    y:  0, rotate: 0 }}
                transition={{ duration: 0.90, ease: ENTRANCE, delay: 0.30 }}
                style={{ position: 'relative', zIndex: 10 }}
              >
                {/* Perpetual gentle float */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.4, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
                >
                  {/* Slight scale-up on exit prep */}
                  <div style={{ transform: 'translate(22%, 8%)' }}>
                    <motion.img
                      src={logoSvg}
                      alt="Dr. Hassan Salman"
                      animate={isReady ? { scale: 1.05 } : { scale: 1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      style={{
                        width:      'clamp(155px, 20vmin, 200px)',
                        height:     'clamp(155px, 20vmin, 200px)',
                        objectFit:  'contain',
                        display:    'block',
                        filter:     `drop-shadow(0 16px 42px rgba(208, 184, 146, 0.40))`,
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>

            </div>{/* end tooth wrapper */}

            {/* ── EYEBROW TEXT ───────────────────────────────────────── */}
            {/*
                delay 1.00s — tooth has landed (0.30 + 0.90 ≈ 1.20s, revealed just before)
                duration 0.75s — slow cinematic blur reveal
            */}
            <motion.p
              initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y:  0, filter: 'blur(0px)' }}
              transition={{ duration: 0.75, ease: ENTRANCE, delay: 1.00 }}
              style={{
                marginTop:     'clamp(22px, 3vmin, 36px)',
                fontFamily:    'Inter, sans-serif',
                fontWeight:    600,
                fontSize:      'clamp(0.60rem, 1.15vw, 0.78rem)',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color:         'rgba(110, 92, 60, 0.55)',
                textAlign:     'center',
              }}
            >
              {EYEBROW}
            </motion.p>

            {/* ── BRAND NAME ─────────────────────────────────────────── */}
            {/*
                delay 1.35s — 350ms after eyebrow, staggered feel
                duration 0.75s — same cinematic blur reveal
            */}
            <motion.p
              initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y:  0, filter: 'blur(0px)' }}
              transition={{ duration: 0.75, ease: ENTRANCE, delay: 1.35 }}
              style={{
                marginTop:     'clamp(6px, 1vmin, 10px)',
                fontFamily:    '"Playfair Display", serif',
                fontWeight:    500,
                fontSize:      'clamp(1.20rem, 2.6vw, 1.70rem)',
                letterSpacing: '0.04em',
                color:         PRIMARY,
                textAlign:     'center',
              }}
            >
              {BRAND}
            </motion.p>

            {/* ── PROGRESS BAR ───────────────────────────────────────── */}
            {/*
                delay 1.65s — after brand name has settled
            */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 1.65 }}
              style={{
                marginTop:       'clamp(24px, 3vmin, 40px)',
                width:           'clamp(160px, 18vw, 230px)',
                height:          2,
                borderRadius:    9999,
                backgroundColor: GOLD_DIM,
                position:        'relative',
                overflow:        'hidden',
              }}
            >
              {/* Data-driven fill */}
              <div
                style={{
                  position:         'absolute',
                  inset:            0,
                  width:            `${displayProgress}%`,
                  background:       `linear-gradient(90deg, ${PRIMARY} 0%, ${GOLD} 100%)`,
                  borderRadius:     9999,
                  transition:       'width 0.08s linear',
                }}
              />
              {/* Shimmer sweep */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0, bottom: 0,
                  width: 52,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.60), transparent)',
                }}
                animate={{ x: ['-52px', '260px'] }}
                transition={{ duration: 1.3, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.2 }}
              />
            </motion.div>

            {/* ── SUB-LABEL ──────────────────────────────────────────── */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isReady ? { opacity: 0 } : { opacity: 0.55 }}
              transition={{
                opacity: { duration: isReady ? 0.25 : 0.55, delay: isReady ? 0 : 1.90 },
              }}
              style={{
                marginTop:     'clamp(10px, 1.4vmin, 16px)',
                fontFamily:    'Inter, sans-serif',
                fontWeight:    500,
                fontSize:      'clamp(0.54rem, 1.0vw, 0.68rem)',
                letterSpacing: '0.20em',
                textTransform: 'uppercase',
                color:         PRIMARY,
                textAlign:     'center',
              }}
            >
              {SUBLABEL}
            </motion.p>

          </motion.div>
          {/* end CENTER CONTENT */}

        </motion.div>
      )}
    </AnimatePresence>
  );
}
