import { Component, type ErrorInfo, type ReactNode, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { ToothModel } from '@/three/objects/ToothModel';
import { useResponsiveCanvas } from '@/three/hooks';
import { motion } from 'motion/react';

export interface HeroSceneProps {
  hasSeenIntro: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SceneErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('HeroScene 3D error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

function SceneContent() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
      {/* Studio lighting setup without external network dependencies */}
      <ambientLight intensity={0.7} />
      <hemisphereLight args={['#ffffff', '#D0B892', 0.6]} />
      <directionalLight position={[5, 8, 5]} intensity={1.4} color="#fffaf5" />
      <pointLight position={[-4, 3, 3]} intensity={0.8} color="#D0B892" />
      <pointLight position={[4, -3, -2]} intensity={0.5} color="#E2E9F2" />
      <ToothModel />
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
 * Hero 3D scene for Tooth interaction with robust studio lighting and error boundaries.
 */
export function HeroScene({ hasSeenIntro }: HeroSceneProps) {
  const { dpr } = useResponsiveCanvas();
  // If the user has seen the intro, the tooth appears immediately. Otherwise, it delays 0.8s.
  const delay = hasSeenIntro ? 0 : 0.8;
  const duration = hasSeenIntro ? 0.3 : 0.65;

  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 md:left-auto md:right-[35%] md:translate-x-0 z-10 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px]"
      initial={{ opacity: 0, scale: 0.96, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
    >
      <SceneErrorBoundary>
        <Canvas
          dpr={dpr}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <SceneContent />
          </Suspense>
        </Canvas>
      </SceneErrorBoundary>
      {/* Interaction Hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-on-surface-variant text-xs font-label-caps tracking-widest pointer-events-none opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: delay + 0.5 }}
      >
        Drag to rotate &middot; Scroll to zoom
      </motion.div>
    </motion.div>
  );
}
