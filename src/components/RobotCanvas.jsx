import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useFBX, Float, PerspectiveCamera, Environment, ContactShadows, Sparkles } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';

const Robot = ({ ...props }) => {
  const group = useRef();
  const fbx = useFBX('/models/robot/Robot.FBX');
  const texture = new THREE.TextureLoader().load('/models/robot/Robot.jpg');
  
  // Reference for bones and state
  const headRef = useRef();

  useEffect(() => {
    fbx.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          map: texture,
          metalness: 0.9,
          roughness: 0.1,
          emissive: new THREE.Color('#00e8ff'),
          emissiveIntensity: 0.1
        });
      }
      
      if (child.isBone && (child.name.toLowerCase().includes('head') || child.name.toLowerCase().includes('neck'))) {
        headRef.current = child;
      }
    });

    // Set initial scale to tiny for entrance animation
    if (group.current) {
      group.current.scale.set(0.001, 0.001, 0.001);
    }
  }, [fbx, texture]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { x, y } = state.mouse;

    if (group.current) {
      // 1. Entrance Animation & Breathing Scale
      const baseScale = 1; // since the primitive is scaled to 0.028 in the component
      const breathe = baseScale + Math.sin(time * 1.5) * 0.02;
      
      // Lerp from current scale to breathing target scale
      group.current.scale.lerp(new THREE.Vector3(breathe, breathe, breathe), 0.08);

      // 2. Slow idle rotation
      group.current.rotation.y = Math.sin(time * 0.5) * 0.1;
    }

    // 3. Mouse Follower Effect
    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, x * 0.6, 0.08);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -y * 0.4, 0.08);
    }

    // 4. Neural Activity Flicker & Data Pulse
    const pulseIntensity = Math.max(0, Math.sin(time * 0.8) * 2 - 1); 
    const flicker = Math.random() > 0.98 ? 2 : 0; 
    
    fbx.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.emissiveIntensity = 0.1 + pulseIntensity * 1.2 + flicker;
      }
    });
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={fbx} scale={0.028} />
    </group>
  );
};

const RobotCanvas = () => {
  return (
    <div className="robot-canvas-container" style={{ width: '100%', height: '100%' }}>
      <Canvas dpr={[1, 2]} shadows gl={{ antialias: true, toneMapping: THREE.ReinhardToneMapping }}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={3} castShadow color="#00e8ff" />
        <pointLight position={[-5, 5, -5]} color="#00e8ff" intensity={2} />
        <rectAreaLight width={10} height={10} intensity={1} position={[0, 5, 0]} color="#00e8ff" />
        
        <Suspense fallback={null}>
          <Environment preset="night" />
          
          <Float 
            speed={2.5} 
            rotationIntensity={0.2} 
            floatIntensity={1.5} 
            floatingRange={[-0.2, 0.2]}
          >
            <Robot position={[0, -0.5, 0]} />
          </Float>
          
          <Sparkles count={40} scale={6} size={1.5} speed={0.4} color="#00e8ff" opacity={0.6} />
          <ContactShadows opacity={0.5} scale={12} blur={3} far={10} resolution={512} color="#000000" />
          
          <EffectComposer disableNormalPass>
            <Bloom 
              luminanceThreshold={0.2} 
              mipmapBlur 
              intensity={2} 
              radius={0.3} 
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
      
      <div className="robot-hud">
        <div className="hud-corner top-left"></div>
        <div className="hud-corner top-right"></div>
        <div className="hud-corner bottom-left"></div>
        <div className="hud-corner bottom-right"></div>
        <div className="hud-scan-line"></div>
        <div className="hud-status">
          <span className="status-dot animate-pulse"></span>
          <span className="status-text">NEURAL LINK: STABLE // ASSET LOADED</span>
        </div>
      </div>
    </div>
  );
};

export default RobotCanvas;
