import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const ParticleBackground = () => {
  const points = useRef();
  
  const particlesCount = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    points.current.rotation.y = t * 0.05;
    points.current.rotation.x = t * 0.02;
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a78bfa"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
};

const FloatingCodeCube = ({ position, rotationSpeed }) => {
  const mesh = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = t * rotationSpeed;
    mesh.current.rotation.y = t * rotationSpeed * 1.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh} position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ea580c" wireframe transparent opacity={0.14} />
      </mesh>
    </Float>
  );
};

const ServicePageBackground3D = ({ isSoftware }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#a78bfa" />
        
        <ParticleBackground />
        
        <FloatingCodeCube position={[-10, 5, -5]} rotationSpeed={0.2} />
        <FloatingCodeCube position={[12, -8, -10]} rotationSpeed={0.3} />
        <FloatingCodeCube position={[-5, -12, -2]} rotationSpeed={0.15} />
        <FloatingCodeCube position={[8, 10, -15]} rotationSpeed={0.25} />

        {isSoftware && (
          <>
            <FloatingCodeCube position={[0, 15, -10]} rotationSpeed={0.4} />
            <FloatingCodeCube position={[-15, -5, -8]} rotationSpeed={0.35} />
            <FloatingCodeCube position={[15, 5, -12]} rotationSpeed={0.45} />
            <Sparkles count={100} scale={20} size={1} speed={0.5} color="#a78bfa" />
          </>
        )}

        <fog attach="fog" args={['#fff7ed', 10, 50]} />
      </Canvas>
    </div>
  );
};

export default ServicePageBackground3D;
