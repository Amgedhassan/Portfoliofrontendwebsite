import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedBlob({ color = '#00fff2' }: { color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 4]} />
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

interface MorphingBlobProps {
  color?: string;
  className?: string;
}

export function MorphingBlob({ color = '#00fff2', className = '' }: MorphingBlobProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <AnimatedBlob color={color} />
      </Canvas>
    </div>
  );
}
