import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, PerspectiveCamera, Sparkles, Float } from '@react-three/drei';

const TechCore = () => {
  const coreRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    coreRef.current.rotation.x = t * 0.05;
    coreRef.current.rotation.y = t * 0.07;
  });

  return (
    <group ref={coreRef} position={[0, 0, -10]}>
      {/* Outer Data Sphere */}
      <mesh>
        <icosahedronGeometry args={[8, 2]} />
        <meshStandardMaterial color="#00e8ff" wireframe transparent opacity={0.08} />
      </mesh>
      {/* Inner Core */}
      <mesh>
        <icosahedronGeometry args={[4, 1]} />
        <meshStandardMaterial color="#00e8ff" wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  );
};

const ThreeBackground = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -10, background: '#000000', pointerEvents: 'none' }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
        
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#00e8ff" />
        
        {/* Dynamic Space Background */}
        <Stars radius={100} depth={50} count={4000} factor={3} saturation={0} fade speed={1.5} />
        
        {/* Glowing Tech Particles */}
        <Sparkles count={600} scale={25} size={2.5} speed={0.4} opacity={0.5} color="#00e8ff" />
        <Sparkles count={400} scale={18} size={4} speed={0.2} opacity={0.3} color="#00e8ff" />
        
        {/* Abstract Rotating Data Nodes */}
        <Float speed={1} rotationIntensity={0.8} floatIntensity={1.5}>
          <TechCore />
        </Float>

        <fog attach="fog" args={['#000000', 10, 40]} />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
