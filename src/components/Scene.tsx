import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Grid, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function InteractiveNode({ position, baseScale, isWireframe }: { position: [number, number, number], baseScale: number, isWireframe: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const idleColor = useMemo(() => new THREE.Color("#2a000a"), []); 
  const hoverColor = useMemo(() => new THREE.Color("#ff1a53"), []); 
  const activeColor = useMemo(() => new THREE.Color("#ffffff"), []); 

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    meshRef.current.rotation.x += delta * 0.25;
    meshRef.current.rotation.y += delta * 0.35;

    const targetScale = hovered ? baseScale * 1.4 : baseScale;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    
    materialRef.current.color.lerp(active ? activeColor : (hovered ? hoverColor : idleColor), 0.1);
    materialRef.current.emissive.lerp(active ? activeColor : (hovered ? hoverColor : new THREE.Color("#000000")), 0.1);
    materialRef.current.emissiveIntensity = hovered ? 0.6 : 0;

    if (active) {
      meshRef.current.rotation.x += delta * 6;
      meshRef.current.rotation.y += delta * 6;
    }
  });

  return (
    <mesh 
      ref={meshRef} position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
      onClick={(e) => { e.stopPropagation(); setActive(!active); }}
    >
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial ref={materialRef} roughness={0.1} metalness={0.9} wireframe={isWireframe} />
    </mesh>
  );
}

export default function Scene() {
  const scrollProgress = useRef(0);

  useEffect(() => {
    const catchScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = totalHeight > 0 ? window.scrollY / totalHeight : 0;
    };
    window.addEventListener('scroll', catchScroll, { passive: true });
    catchScroll();
    return () => window.removeEventListener('scroll', catchScroll);
  }, []);

  const nodes = useMemo(() => {
    return Array.from({ length: 50 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 35, 
        (Math.random() - 0.5) * 12 - 1, 
        (Math.random() - 0.5) * -55 - 5
      ] as [number, number, number],
      scale: Math.random() * 0.4 + 0.3,
    }));
  }, []);

  useFrame((state) => {
    const currentProgress = scrollProgress.current;

    const targetZ = 5 - currentProgress * 55;  
    const targetY = 0 - currentProgress * 4.5; 

    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.06);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.06);

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 3.5, 0.05);
    state.camera.position.y += THREE.MathUtils.lerp(0, state.pointer.y * 1.5, 0.05);
    
    state.camera.lookAt(0, -2 - currentProgress * 2, -25); 
  });

  return (
    <>
      <color attach="background" args={['#020202']} />
      <fog attach="fog" args={['#020202', 5, 45]} />
      
      <Stars radius={50} depth={50} count={3500} factor={4} saturation={0} fade speed={1.2} />
      <Sparkles count={250} scale={45} size={2} speed={0.3} opacity={0.2} color="#ff1a53" />
      
      <InteractiveSpotlight />

      <group position={[0, 0, 0]}>
        <Grid 
          position={[0, -3.5, 0]} args={[120, 120]} 
          cellSize={1} cellThickness={1} cellColor="#590014" 
          sectionSize={5} sectionThickness={2} sectionColor="#ff1a53" 
          fadeDistance={45} fadeStrength={1.5} 
        />
        {nodes.map((node, i) => (
          <InteractiveNode key={i} position={node.position} baseScale={node.scale} isWireframe={i % 3 === 0} />
        ))}
      </group>
    </>
  );
}

function InteractiveSpotlight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const trackingVector = useMemo(() => new THREE.Vector3(), []); 

  useFrame((state) => {
    const targetX = (state.pointer.x * state.viewport.width) / 2;
    const targetY = (state.pointer.y * state.viewport.height) / 2;
    if (lightRef.current) {
      trackingVector.set(targetX, targetY, state.camera.position.z - 2);
      lightRef.current.position.lerp(trackingVector, 0.1);
    }
  });

  return <pointLight ref={lightRef} color="#ff4d79" intensity={50} distance={25} decay={2} />;
}