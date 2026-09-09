/**
 * EntranceLoader.tsx — "Precision Reveal" v3
 *
 * TIMELINE (all relative to mount):
 *
 *   0.00s  Blank warm background
 *   0.15s  Ambient glow begins blooming (slow, 2.5s)
 *   0.25s  Particle shimmer sparks (staggered, 0.3-0.8s)
 *   0.30s  TOOTH / LOGO entrance — scale 0.82->1, opacity 0->1, y 18->0, rotate 8->0
 *           duration 0.90s — slow, weighty, premium
 *   1.00s  Tooth idles on screen (breathes gently)
 *   1.00s  Eyebrow "PRECISION CARE TECHNOLOGY" reveals — blur+fade, 0.7s
 *   1.30s  Brand name "Dr. Hassan Salman" reveals — blur+fade, 0.7s
 *   1.10s  Precision ring begins — scale 0.65->1 + rotation, 1.0s
 *   1.60s  Progress bar fades in and starts filling + Digit counter
 *   ~3.0s  Page/asset ready + minimum elapsed -> isReady = true
 *   3.0s   Sub-label fades out, tooth nudges 1->1.04
 *   3.0s   Split panels slide +-100% over 0.65s
 *   3.65s  Homepage fully visible, navbar animates in
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useEntranceLoader } from './useEntranceLoader';
import styles from './EntranceLoader.module.css';
import logoSvg from '@/assets/images/main_design.svg';

/* -- Easing curves --------------------------------------------------------- */
const ENTRANCE = [0.22, 1, 0.36, 1] as const;
const SPLIT    = [0.76, 0, 0.24, 1] as const;

/* -- Brand strings ---------------------------------------------------------- */
const EYEBROW  = 'PRECISION  \u2022  CARE  \u2022  TECHNOLOGY';
const BRAND    = 'Dr. Hassan';
const SUBLABEL = 'Preparing your experience';

/* -- Brand colors ----------------------------------------------------------- */
const BG       = '#FFF8F3';
const PRIMARY  = '#6e5c3c';
const GOLD     = '#D0B892';
const GOLD_DIM = 'rgba(208, 184, 146, 0.20)';

/* -- Ring geometry ---------------------------------------------------------- */
const RING_R   = 118;
const CX       = RING_R + 6;
const CY       = RING_R + 6;
const SVG_DIM  = (RING_R + 6) * 2;
const CIRC     = 2 * Math.PI * RING_R;

/* -- Particle data (deterministic positions) -------------------------------- */
const PARTICLES = [
  { x: -72, y: -95,  size: 3.2, delay: 0.28, dur: 1.8 },
  { x:  85, y: -80,  size: 2.0, delay: 0.42, dur: 2.1 },
  { x: -95, y:  35,  size: 2.6, delay: 0.55, dur: 1.6 },
  { x: 105, y:  50,  size: 1.8, delay: 0.35, dur: 2.4 },
  { x:  20, y: -115, size: 2.2, delay: 0.70, dur: 1.9 },
  { x: -45, y:  110, size: 3.0, delay: 0.25, dur: 2.0 },
  { x:  90, y: -20,  size: 1.6, delay: 0.60, dur: 1.7 },
  { x: -80, y:  80,  size: 2.4, delay: 0.48, dur: 2.2 },
];

interface EntranceLoaderProps {
  onComplete?: () => void;
}

/* -- Animated percentage counter ------------------------------------------- */
function PercentCounter({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(0);
  const rafRef    = useRef<number | null>(null);
  const targetRef = useRef(value);
  targetRef.current = value;

  useEffect(() => {
    const tick = () => {
      setDisplayed((prev) => {
        const diff = targetRef.current - prev;
        if (Math.abs(diff) < 0.5) return Math.round(targetRef.current);
        return prev + diff * 0.09;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return <>{Math.round(displayed)}%</>;
}

export function EntranceLoader({ onComplete }: EntranceLoaderProps) {
  const [exiting, setExiting] = useState(false);

  const handleComplete = useCallback(() => onComplete?.(), [onComplete]);

  const { skip, displayProgress, isReady, handleAnimationComplete } =
    useEntranceLoader(handleComplete);

  useEffect(() => {
    if (isReady && !exiting) setExiting(true);
  }, [isReady, exiting]);

  if (skip) return null;

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {!exiting && (
        <motion.div
          role="status"
          aria-label="Preparing website"
          aria-live="polite"
          className={`fixed inset-0 flex flex-col items-center justify-center overflow-hidden ${styles.loaderRoot}`}
          style={{ backgroundColor: BG, zIndex: 100 }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.62 } }}
        >

          {/* ---- SPLIT PANELS -------------------------------------------- */}
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

          {/* ---- CENTER CONTENT ------------------------------------------ */}
          <motion.div
            className="relative flex flex-col items-center"
            style={{ zIndex: 20 }}
            animate={
              isReady
                ? { opacity: 0, y: -12, transition: { duration: 0.3, ease: 'easeIn' } }
                : { opacity: 1, y: 0 }
            }
          >

            {/* TOOTH / LOGO STAGE */}
            <div
              style={{
                position: 'relative',
                width:  'clamp(220px, 36vmin, 280px)',
                height: 'clamp(220px, 36vmin, 280px)',
              }}
            >
              {/* Ambient glow */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}>
                <motion.div
                  className={styles.ambientGlow}
                  style={{ width: 'clamp(300px,55vmin,460px)', height: 'clamp(300px,55vmin,460px)' }}
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: 1.0, opacity: 1 }}
                  transition={{ duration: 2.5, ease: 'easeOut', delay: 0.15 }}
                />
              </div>

              {/* Gold particles */}
              {PARTICLES.map((p, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    width:  p.size,
                    height: p.size,
                    borderRadius: '50%',
                    background: GOLD,
                    boxShadow: `0 0 ${p.size * 3}px ${GOLD}`,
                    pointerEvents: 'none',
                    translateX: p.x,
                    translateY: p.y,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 0.85, 0.5, 0.85, 0], scale: [0, 1, 0.8, 1, 0] }}
                  transition={{
                    duration: p.dur,
                    delay: p.delay,
                    repeat: Infinity,
                    repeatDelay: p.dur * 0.6,
                    ease: 'easeInOut',
                  }}
                />
              ))}

              {/* Precision ring */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}>
                <motion.div
                  className={styles.precisionRing}
                  initial={{ scale: 0.65, opacity: 0, rotate: -30 }}
                  animate={{ scale: 1.0,  opacity: 1, rotate:  95 }}
                  transition={{ duration: 1.0, ease: ENTRANCE, delay: 1.10 }}
                >
                  <svg width={SVG_DIM} height={SVG_DIM} viewBox={`0 0 ${SVG_DIM} ${SVG_DIM}`} fill="none" aria-hidden="true">
                    <circle cx={CX} cy={CY} r={RING_R} stroke={GOLD_DIM} strokeWidth={1} />
                    <motion.circle
                      cx={CX} cy={CY} r={RING_R}
                      stroke={GOLD}
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeDasharray={CIRC}
                      initial={{ strokeDashoffset: CIRC }}
                      animate={{ strokeDashoffset: CIRC * 0.28 }}
                      transition={{ duration: 1.1, ease: ENTRANCE, delay: 1.15 }}
                      style={{ transformOrigin: `${CX}px ${CY}px` }}
                    />
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
                          animate={{ opacity: 0.70, scale: 1 }}
                          transition={{ duration: 0.5, delay: 1.55 }}
                        />
                      );
                    })}
                    {Array.from({ length: 12 }).map((_, i) => {
                      const angle = (i * 30 * Math.PI) / 180;
                      const inner = RING_R - 5;
                      const outer = RING_R + 5;
                      return (
                        <motion.line
                          key={`tick-${i}`}
                          x1={CX + inner * Math.cos(angle)} y1={CY + inner * Math.sin(angle)}
                          x2={CX + outer * Math.cos(angle)} y2={CY + outer * Math.sin(angle)}
                          stroke={GOLD_DIM}
                          strokeWidth={0.8}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: i % 3 === 0 ? 0.5 : 0.25 }}
                          transition={{ duration: 0.4, delay: 1.4 + i * 0.04 }}
                        />
                      );
                    })}
                  </svg>
                </motion.div>
              </div>

              {/* Tooth logo */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 10 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.82, y: 20, rotate: 8 }}
                  animate={{ opacity: 1, scale: 1,    y:  0, rotate: 0 }}
                  transition={{ duration: 0.90, ease: ENTRANCE, delay: 0.30 }}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3.4, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
                  >
                    <motion.img
                      src={logoSvg}
                      alt="Dr. Hassan"
                      animate={isReady ? { scale: 1.05 } : { scale: 1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      style={{
                        width:     'clamp(150px, 26vmin, 220px)',
                        height:    'clamp(150px, 26vmin, 220px)',
                        objectFit: 'contain',
                        display:   'block',
                        filter:    'drop-shadow(0 18px 48px rgba(208, 184, 146, 0.50))',
                      }}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y:  0, filter: 'blur(0px)' }}
              transition={{ duration: 0.75, ease: ENTRANCE, delay: 1.00 }}
              style={{
                marginTop:     'clamp(18px, 3vmin, 36px)',
                fontFamily:    'Inter, sans-serif',
                fontWeight:    600,
                fontSize:      'clamp(0.55rem, 1.15vw, 0.78rem)',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color:         'rgba(110, 92, 60, 0.55)',
                textAlign:     'center',
                padding:       '0 16px',
              }}
            >
              {EYEBROW}
            </motion.p>

            {/* Brand name */}
            <motion.p
              initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y:  0, filter: 'blur(0px)' }}
              transition={{ duration: 0.75, ease: ENTRANCE, delay: 1.35 }}
              style={{
                marginTop:     'clamp(4px, 1vmin, 10px)',
                fontFamily:    '"Playfair Display", serif',
                fontWeight:    500,
                fontSize:      'clamp(1.10rem, 2.6vw, 1.70rem)',
                letterSpacing: '0.04em',
                color:         PRIMARY,
                textAlign:     'center',
              }}
            >
              {BRAND}
            </motion.p>

            {/* Progress bar + counter */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 1.65 }}
              style={{
                marginTop:     'clamp(20px, 3vmin, 40px)',
                display:       'flex',
                flexDirection: 'column',
                alignItems:    'center',
                gap:           '8px',
              }}
            >
              <div
                style={{
                  width:           'clamp(140px, 18vw, 230px)',
                  height:          2,
                  borderRadius:    9999,
                  backgroundColor: GOLD_DIM,
                  position:        'relative',
                  overflow:        'hidden',
                }}
              >
                <div
                  style={{
                    position:     'absolute',
                    inset:        0,
                    width:        `${displayProgress}%`,
                    background:   `linear-gradient(90deg, ${PRIMARY} 0%, ${GOLD} 100%)`,
                    borderRadius: 9999,
                    transition:   'width 0.08s linear',
                  }}
                />
                <motion.div
                  style={{
                    position:   'absolute',
                    top:        0,
                    bottom:     0,
                    width:      52,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)',
                  }}
                  animate={{ x: ['-52px', '260px'] }}
                  transition={{ duration: 1.3, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.2 }}
                />
              </div>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.45 }}
                transition={{ duration: 0.4, delay: 1.85 }}
                style={{
                  fontFamily:         'Inter, sans-serif',
                  fontWeight:         500,
                  fontSize:           'clamp(0.50rem, 0.9vw, 0.62rem)',
                  letterSpacing:      '0.18em',
                  color:              PRIMARY,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                <PercentCounter value={displayProgress} />
              </motion.span>
            </motion.div>

            {/* Sub-label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isReady ? { opacity: 0 } : { opacity: 0.52 }}
              transition={{
                opacity: { duration: isReady ? 0.25 : 0.55, delay: isReady ? 0 : 1.90 },
              }}
              style={{
                marginTop:     'clamp(8px, 1.4vmin, 16px)',
                fontFamily:    'Inter, sans-serif',
                fontWeight:    500,
                fontSize:      'clamp(0.52rem, 1.0vw, 0.66rem)',
                letterSpacing: '0.20em',
                textTransform: 'uppercase',
                color:         PRIMARY,
                textAlign:     'center',
              }}
            >
              {SUBLABEL}
            </motion.p>

          </motion.div>

          {/* Corner decorations */}
          <motion.div className={styles.cornerTL} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, ease: ENTRANCE, delay: 1.20 }} />
          <motion.div className={styles.cornerTR} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, ease: ENTRANCE, delay: 1.28 }} />
          <motion.div className={styles.cornerBL} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, ease: ENTRANCE, delay: 1.36 }} />
          <motion.div className={styles.cornerBR} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, ease: ENTRANCE, delay: 1.44 }} />

        </motion.div>
      )}
    </AnimatePresence>
  );
}
