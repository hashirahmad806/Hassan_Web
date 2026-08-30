import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { ToothModel } from '@/three/objects/ToothModel';
import { useResponsiveCanvas } from '@/three/hooks';
import { motion } from 'motion/react';

export interface HeroSceneProps {
  hasSeenIntro: boolean;
}

function SceneContent() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#fff8f3" />
      <pointLight position={[-3, 2, 2]} intensity={0.4} color="#D0B892" />
      <ToothModel />
      <Environment preset="studio" />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableDamping={true}
        dampingFactor={0.05}
        autoRotate={false}
      />
    </>
  );
}

/**
 * Hero 3D scene for Tooth interaction.
 */
export function HeroScene({ hasSeenIntro }: HeroSceneProps) {
  const { dpr } = useResponsiveCanvas();
  // If the user has seen the intro, the tooth appears immediately. Otherwise, it delays 2.30s.
  const delay = hasSeenIntro ? 0 : 2.30;
  const duration = hasSeenIntro ? 0.3 : 0.75;

  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 md:left-auto md:right-[35%] md:translate-x-0 z-10 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px]"
      initial={{ opacity: 0, scale: 0.96, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
    >
      <Canvas
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
      {/* Interaction Hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-on-surface-variant text-xs font-label-caps tracking-widest pointer-events-none opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: delay + 0.5 }}
      >
        Drag to rotate · Scroll to zoom
      </motion.div>
    </motion.div>
  );
}
