import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

/**
 * Placeholder 3D Tooth model until a real .glb is provided.
 */
export function ToothModel() {
  const meshRef = useRef<Mesh>(null);

  // Gentle floating animation to make it feel organic, but we let OrbitControls handle rotation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -0.5, 0]} scale={[0.4, 0.4, 0.4]}>
      {/* We use an octahedron or a capsule for a nice clean modern look for now */}
      <capsuleGeometry args={[0.6, 1.2, 4, 16]} />
      <meshStandardMaterial 
        color="#ffffff" 
        roughness={0.15}
        metalness={0.1}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}
