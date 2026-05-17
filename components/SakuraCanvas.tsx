"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function SakuraLeaf({ position, speed, rotationSpeed }: { 
  position: [number, number, number];
  speed: number;
  rotationSpeed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = useRef(position[1]);
  const swayOffset = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Falling animation
    meshRef.current.position.y -= speed * 0.01;
    
    // Sway side to side
    meshRef.current.position.x += Math.sin(state.clock.elapsedTime + swayOffset.current) * 0.002;
    
    // Rotation
    meshRef.current.rotation.x += rotationSpeed * 0.01;
    meshRef.current.rotation.z += rotationSpeed * 0.005;
    
    // Reset when below view
    if (meshRef.current.position.y < -5) {
      meshRef.current.position.y = initialY.current + 5;
      meshRef.current.position.x = (Math.random() - 0.5) * 10;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[0.08, 0.06]} />
      <meshBasicMaterial 
        color="#ffb7c5" 
        transparent 
        opacity={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function SakuraParticles() {
  const particles = useMemo(() => {
    const items = [];
    for (let i = 0; i < 70; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 10,
          Math.random() * 10 - 2,
          (Math.random() - 0.5) * 5,
        ] as [number, number, number],
        speed: Math.random() * 0.5 + 0.2,
        rotationSpeed: Math.random() * 2 - 1,
      });
    }
    return items;
  }, []);

  return (
    <>
      {particles.map((particle, index) => (
        <SakuraLeaf key={index} {...particle} />
      ))}
    </>
  );
}

export default function SakuraCanvas() {
  return (
    <div 
      id="webgl-canvas" 
      className="pointer-events-none fixed inset-0 z-10"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <SakuraParticles />
      </Canvas>
    </div>
  );
}
