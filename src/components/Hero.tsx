import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import systemVisual from '../assets/system_visual.png'; // <-- 1. WE IMPORT IT HERE

export default function Hero() {
  // 1. Mouse Tracking Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Map mouse position to dynamic transforms
  const rotateY = useTransform(mouseX, [0, window.innerWidth], [-10, 10]);
  const rotateX = useTransform(mouseY, [0, window.innerHeight], [10, -10]);
  const scale = useTransform(mouseY, [0, window.innerHeight], [1, 1.05]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-dark font-mono cursor-none">
      
      {/* 3. The Animated Data Surface */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${systemVisual})`, // <-- 2. WE USE THE IMPORT HERE
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          perspective: 1000,
          rotateX: rotateX,
          rotateY: rotateY,
          scale: scale,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* 4. Functional Overlays */}
      <div className="absolute top-0 w-full z-20 flex justify-center gap-12 pt-8 text-sm opacity-0 pointer-events-auto">
        <a href="#about" className="px-6 py-2">_ROOT_</a>
        <a href="#projects" className="px-6 py-2">_PROJECTS_</a>
        <a href="#contact" className="px-6 py-2">_SYSTEM_STATUS_</a>
      </div>

      <div className="absolute bottom-6 right-6 z-20 w-80 h-32 bg-dark/70 backdrop-blur-sm border border-glow-light p-4 text-[11px] text-glow-light selection:bg-maroon selection:text-white">
        <p>shloke.b &gt; [SYSTEM_ACTIVE]</p>
        <p className="mt-2 text-white">Open to Engineering Management Roles</p>
        <p>Email_Status: [ONLINE]</p>
        <motion.p
          className="text-white mt-1 cursor-pointer hover:text-glow-light"
          whileHover={{ x: 5 }}
        >
          _EXECUTE: CONTACT_INITIATE
        </motion.p>
        <span className="inline-block w-2 h-3 bg-white animate-pulse ml-1" />
      </div>

    </section>
  );
}