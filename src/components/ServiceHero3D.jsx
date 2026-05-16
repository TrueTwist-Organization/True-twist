import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

const FloatingShape = ({ color, position, speed }) => {
  const mesh = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.2;
    mesh.current.rotation.y = t * 0.3;
  });

  return (
    <Float speed={speed} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={mesh} position={position}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={0.4}
          radius={1}
        />
      </mesh>
    </Float>
  );
};

const ServiceHero3D = () => {
  return (
    <div className="service-hero-3d" style={{ width: '100%', height: '400px', marginBottom: '-100px', marginTop: '-50px' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#a78bfa" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#f97316" />
        
        <FloatingShape color="#f97316" position={[0, 0, 0]} speed={2} />
        <group position={[2, 1, -2]}>
          <Float speed={3} rotationIntensity={1} floatIntensity={1}>
            <mesh>
              <octahedronGeometry args={[0.5, 0]} />
              <meshStandardMaterial color="#ea580c" wireframe />
            </mesh>
          </Float>
        </group>
        <group position={[-2, -1, -2]}>
          <Float speed={4} rotationIntensity={1} floatIntensity={1}>
            <mesh>
              <torusGeometry args={[0.4, 0.1, 16, 100]} />
              <meshStandardMaterial color="#a78bfa" />
            </mesh>
          </Float>
        </group>
      </Canvas>
    </div>
  );
};

export default ServiceHero3D;
