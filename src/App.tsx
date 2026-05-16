import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene';
import Overlay from './components/Overlay';

export default function App() {
  return (
    <div className="relative w-full bg-[#020202] text-white">
      
      {/* 1. FIXED BACKGROUND 3D CANVAS */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Scene />
        </Canvas>
      </div>

      {/* 2. NATIVE SCROLLING CONTENT LAYER */}
      {/* The floating navbar inside Overlay now completely manages top-level tracking */}
      <main className="relative z-10 w-full pointer-events-none">
        <Overlay />
      </main>

    </div>
  );
}