import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

import codechefLogo from '../assets/logos/codechef-logo.png';
import ieeeLogo from '../assets/logos/ieee-logo.png';
import kofukuLogo from '../assets/logos/kofuku-logo.png';
import saeLogo from '../assets/logos/sae-logo.png';
import vitLogo from '../assets/logos/vit-logo.png';

// --- KINETIC COMPONENTS ---

// 1. Magnetic Cursor Tracker
function MagneticCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 300, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 28 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 w-96 h-96 bg-[#ff1a53]/[0.08] blur-[80px] rounded-full z-0 transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
      style={{ x: springX, y: springY }}
    />
  );
}

// 2. Continuous Floating Embers (Canvas Particle System)
function FloatingEmbers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; size: number; speedY: number; speedX: number; opacity: number }[] = [];
    
    // Create fewer particles for optimization
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedY: Math.random() * -0.5 - 0.1, // Float upward slowly
        speedX: Math.random() * 0.4 - 0.2,  // Drift sideways slightly
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 26, 83, ${p.opacity})`;
        ctx.fill();

        p.y += p.speedY;
        p.x += p.speedX;

        // Reset particle if it drifts off screen
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" />;
}

// 3. Staggered Character Reveal for Hero
function StaggeredText({ text }: { text: string }) {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const child = {
    hidden: { opacity: 0, y: 40, rotateX: -90 },
    visible: {
      opacity: 1, y: 0, rotateX: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 }
    }
  };

  return (
    <motion.h1 
      className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter mb-2 break-words"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{ perspective: 1000 }}
    >
      {text.split('').map((char, index) => (
        <motion.span key={index} variants={child} className="inline-block" style={{ transformStyle: "preserve-3d" }}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
      <motion.span variants={child} className="inline-block text-[#ff1a53]">.</motion.span>
    </motion.h1>
  );
}

// 4. Kinetic Underline Heading
function KineticHeading({ text }: { text: string }) {
  return (
    <div className="relative mb-16 inline-block group">
      <h2 className="text-4xl md:text-6xl font-black text-white relative z-10 pb-4">
        {text}
      </h2>
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-[#ff1a53] shadow-[0_0_10px_#ff1a53]"
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 0.8, ease: "circOut", delay: 0.2 }}
        viewport={{ once: false, amount: 0.8 }}
      />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
    </div>
  );
}

// 5. 3D Depth Project Card
function ProjectCard({ project, isActive, onClick, onHover, onLeave }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const shadowX = useTransform(x, [-0.5, 0.5], [20, -20]);
  const shadowY = useTransform(y, [-0.5, 0.5], [20, -20]);

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const box = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - box.left - box.width / 2) / box.width);
    y.set((e.clientY - box.top - box.height / 2) / box.height);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    onLeave();
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onHover}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative w-full p-6 transition-all duration-500 rounded-2xl cursor-pointer bg-white/[0.02] border border-white/5 backdrop-blur-sm ${isActive ? '!bg-white/[0.05] !border-[#ff1a53]/40' : 'hover:bg-white/[0.04]'}`}
    >
      <motion.div 
        className="absolute inset-0 bg-[#ff1a53]/20 rounded-2xl -z-10 blur-xl transition-opacity duration-300"
        style={{ x: shadowX, y: shadowY, opacity: isActive ? 1 : 0 }}
      />
      
      <div style={{ transform: "translateZ(30px)" }}>
        <h3 className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${isActive ? 'text-[#ff1a53]' : 'text-white'}`}>
          {project.title}
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm mt-2 font-light">{project.shortDesc}</p>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="block lg:hidden overflow-hidden pt-4 mt-4 border-t border-white/10 space-y-3"
            style={{ transform: "translateZ(20px)" }}
          >
            <span className="text-[9px] font-mono text-[#ff1a53] tracking-widest block">{project.tag.toUpperCase()}</span>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">{project.longDesc}</p>
            <div className="flex flex-wrap gap-1.5 font-mono text-[9px] text-gray-400 pt-1">
              {project.tech.map((t: string, idx: number) => (
                <span key={idx} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded">{t}</span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// 6. Existing Skill Card (Preserved & Adjusted)
function SkillCard3D({ title, subtitle, skills, delayIndex }: { title: string, subtitle: string, skills: string[], delayIndex: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);
  const glowX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={(e) => {
        if (!cardRef.current) return;
        const box = cardRef.current.getBoundingClientRect();
        x.set((e.clientX - box.left - box.width / 2) / box.width);
        y.set((e.clientY - box.top - box.height / 2) / box.height);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1200 }}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      animate={{ y: [0, -6, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: delayIndex * 0.15 } }}
      whileHover={{ scale: 1.02, z: 20 }}
      className="group relative p-6 sm:p-8 rounded-3xl bg-white/[0.01] border border-white/5 backdrop-blur-md overflow-hidden cursor-pointer"
    >
      <motion.div 
        style={{ background: `radial-gradient(circle 200px at ${glowX} ${glowY}, rgba(255, 26, 83, 0.12), transparent)`, transform: "translateZ(-30px)" }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />
      <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }} className="relative z-10">
        <span style={{ transform: "translateZ(10px)" }} className="text-[9px] font-mono text-[#ff1a53] tracking-widest block mb-1 uppercase">{subtitle}</span>
        <h3 style={{ transform: "translateZ(20px)" }} className="text-xl md:text-2xl font-black text-white tracking-tight mb-5 border-b border-white/10 pb-3">{title}</h3>
      </div>
      <div style={{ transform: "translateZ(60px)" }} className="relative z-20 flex flex-wrap gap-2 font-mono text-xs">
        {skills.map((skill, index) => (
          <span key={index} className="px-3 py-1.5 bg-black/40 border border-white/5 rounded-xl text-gray-300 font-medium transition-all group-hover:border-[#ff1a53]/30">{skill}</span>
        ))}
      </div>
    </motion.div>
  );
}

// 7. Typographic Education block
function Typographic3DEducation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={(e) => {
        if (!containerRef.current) return;
        const box = containerRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - box.left - box.width / 2) / box.width);
        mouseY.set((e.clientY - box.top - box.height / 2) / box.height);
      }}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="w-full relative py-6 pointer-events-auto select-none"
      style={{ perspective: 1000 }}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="flex flex-col md:flex-row md:items-center gap-8 border-l border-white/10 pl-8 relative group">
        <div className="absolute left-0 top-0 -translate-x-1/2 w-2 h-2 bg-[#ff1a53] rounded-full shadow-[0_0_15px_#ff1a53] group-hover:scale-150 transition-transform duration-300" />
        <div style={{ transform: "translateZ(40px)" }} className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-3 group-hover:border-[#ff1a53]/40 transition-colors">
          <img src={vitLogo} alt="VIT" className="w-full h-full object-contain filter brightness-90 group-hover:brightness-100" />
        </div>
        <div style={{ transform: "translateZ(20px)" }} className="space-y-2">
          <div className="font-mono text-xs text-[#ff1a53] tracking-widest uppercase">2023 to 2027</div>
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-white pb-1">Vellore Institute of Technology</h3>
          <p className="text-lg md:text-xl text-gray-400 font-light tracking-wide">Bachelor of Technology in Electronics and Communication Engineering</p>
        </div>
      </motion.div>
    </div>
  );
}

// --- MAIN OVERLAY COMPONENT ---
export default function Overlay() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;

  const textVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const projectsData = [
    {
      id: 1,
      title: "MS HQNet Quantum Framework",
      tag: "Quantum Computing Research Track",
      shortDesc: "Introduced a Hybrid QCNN classifying 600 EMG signals with 99.17 percent accuracy.",
      longDesc: "Introduced a Hybrid QCNN classifying 600 EMG signals with 99.17 percent accuracy by pairing a 6 qubit quantum circuit with a classical MLP bypass. Constructed an advanced data pipeline using SM SSA and NCA to distill 260 temporal features into 64 optimal vectors.",
      tech: ["Python", "Quantum Circuits", "EMG Pipeline", "TensorFlow"]
    },
    {
      id: 2,
      title: "ResiliNet Decentralized 6G Simulator",
      tag: "Telecommunications Simulation Architecture",
      shortDesc: "Simulation platform modeling architectural node resilience and dynamic routing pipelines.",
      longDesc: "Architected a simulation framework for decentralized 6G networks proposed on modern software architecture. Modeled high fidelity node resilience and dynamic data routing mechanics to optimize live bandwidth use and achieve significant reductions in packet loss during targeted node failures.",
      tech: ["System Design", "6G Architecture", "Decentralized Routing"]
    },
    {
      id: 3,
      title: "Manchester Carry Chain Adder",
      tag: "Hardware Architecture and VLSI Simulation",
      shortDesc: "CMOS and dynamic logic circuit topologies evaluated inside Cadence Virtuoso.",
      longDesc: "Built and simulated static CMOS and dynamic logic adder architectures inside Cadence Virtuoso. Applied targeted transistor sizing optimizations to reduce critical path delay parameters by 18 percent over baseline CMOS layout models.",
      tech: ["Cadence Virtuoso", "CMOS Logic", "Transistor Tuning", "VLSI"]
    },
    {
      id: 4,
      title: "Voice AI Facility Scheduler",
      tag: "Intelligent Systems and Automation Pipelines",
      shortDesc: "Hands free calendar booking environment powered by real time speech processing.",
      longDesc: "Deployed a production ready voice AI facility booking system integrating speech to text algorithms and dynamic scheduling loops. Built calendar synchronization mechanics and rule based edge logic that accelerated booking cycles by 50 percent and cut manual alignment efforts.",
      tech: ["Speech to Text", "FastAPI", "n8n Pipelines", "Automation"]
    },
    {
      id: 5,
      title: "Anonymous Confessions Cloud Platform",
      tag: "Secure Infrastructure and Full Stack Systems",
      shortDesc: "React and Node.js pipeline handling encrypted relational data persistence.",
      longDesc: "Engineered a full stack React and Node.js platform from scratch, architecting a secure PostgreSQL schema on Neon and custom RESTful APIs. Implemented secure JWT user authentication and production grade SSL cloud deployments, multiplying active behavioral reporting participation metrics 3x.",
      tech: ["React", "Node", "PostgreSQL", "Neon Cloud", "JWT"]
    },
    {
      id: 6,
      title: "Netflix Clone Relational Database System",
      tag: "Web Architecture and Scalable Datasets",
      shortDesc: "Production grade video content application leveraging containerized backend architectures.",
      longDesc: "Orchestrated a highly optimized OTT platform using React.js, Express, and Docker with a robust MySQL relational schema. Configured optimized indexing and structured API queries that reduced application login latency by 25 percent and improved video load times.",
      tech: ["React.js", "Express", "Docker", "MySQL", "JWT Auth"]
    },
    {
      id: 7,
      title: "Instagram Influencer Tracker Engine",
      tag: "Data Compilation and Natural Language Processing",
      shortDesc: "Automated extraction pipeline compiling automated behavioral analysis streams.",
      longDesc: "Built a structured Python web scraping and natural language sentiment tracking engine automating cross platform influencer insights. Reduced manual collection efforts by 90 percent by mapping real time data compilation vectors directly into analytics dashboards.",
      tech: ["Python Automation", "NLP Sentiment", "Airtable API"]
    },
    {
      id: 8,
      title: "Advanced Hardware Automation Circuits",
      tag: "Firmware Logic and Embedded Systems Engineering",
      shortDesc: "Microcontroller logic structures optimized for circuit sensing stability tracks.",
      longDesc: "Designed and mapped embedded system frameworks including digital Code Lock Systems, Ultrasonic Distance Detectors, and high precision LDR light tracking models. Enhanced localized system responsiveness and sensor sampling reliability via optimized firmware loops.",
      tech: ["Embedded Logic", "Firmware Loops", "Actuators", "Circuit Design"]
    }
  ];

  return (
    <div className="w-full font-sans text-white relative overflow-x-hidden">
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      
      {/* GLOBAL 3D ATMOSPHERE */}
      <MagneticCursor />
      <FloatingEmbers />
      <div className="fixed inset-0 bg-[#0b0b0e]/10 backdrop-blur-[2px] pointer-events-none z-0" />

      {/* NAVBAR */}
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[92%] lg:w-[85%] px-5 py-4 md:py-3 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 backdrop-blur-2xl border border-white/10 bg-[#0d0d11]/70 rounded-2xl md:rounded-full z-50 pointer-events-auto shadow-2xl transition-all duration-300">
        <div className="font-black text-base md:text-lg tracking-tighter cursor-pointer hover:text-[#ff1a53] transition-colors" onClick={() => setIsAboutOpen(true)}>
          SB<span className="text-[#ff1a53]">.</span>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-3 text-[10px] md:text-[11px] font-mono tracking-wider text-gray-400 w-full md:w-auto">
          <button onClick={() => scrollToSection('hero')} className="hover:text-[#ff1a53] transition-colors">HOME</button>
          <button onClick={() => scrollToSection('education')} className="hover:text-[#ff1a53] transition-colors">EDUCATION</button>
          <button onClick={() => scrollToSection('experience')} className="hover:text-[#ff1a53] transition-colors">EXPERIENCE</button>
          <button onClick={() => scrollToSection('skills')} className="hover:text-[#ff1a53] transition-colors">SKILLS</button>
          <button onClick={() => scrollToSection('projects')} className="hover:text-[#ff1a53] transition-colors">PROJECTS</button>
          <button onClick={() => scrollToSection('leadership')} className="hover:text-[#ff1a53] transition-colors">LEADERSHIP</button>
          <button onClick={() => scrollToSection('connect')} className="hover:text-[#ff1a53] transition-colors">CONNECT</button>
          
          <motion.a 
            href={`${baseUrl}Shloke_Binani_Resume.pdf`} download 
            className="group relative overflow-hidden px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] md:text-[10px] font-bold tracking-wider transition-all duration-300 hover:border-[#ff1a53] ml-2 shadow-[0_0_10px_rgba(255,26,83,0.1)]"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#ff1a53] to-[#b3002d] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            <div className="relative z-10 flex items-center justify-center overflow-hidden h-3.5 w-14 sm:w-16">
              <span className="absolute flex w-full h-full transition-transform duration-300 group-hover:-translate-y-full text-gray-300 group-hover:text-white">RESUME ↓</span>
              <span className="absolute flex w-full h-full transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-white">DOWNLOAD</span>
            </div>
          </motion.a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 md:px-24 pt-20 relative z-10">
        <motion.div className="max-w-3xl pointer-events-auto relative" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={textVariant}>
          <StaggeredText text="Shloke Binani" />
          <h2 className="text-lg sm:text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff1a53] to-gray-300 mb-6 pb-2 leading-normal drop-shadow-sm">
            Software Developer and AI Engineer
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 font-light leading-relaxed max-w-2xl mb-10">
            Final year Electronics and Communication Engineering student at Vellore Institute of Technology. 
            Focused on advanced Java data structures, industrial workflow automation engines, and machine learning structures.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <motion.a 
              href={`${baseUrl}Shloke_Binani_Resume.pdf`} download
              className="relative overflow-hidden px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#ff1a53] to-[#b3002d] text-white font-black text-xs sm:text-sm rounded-xl tracking-wide shadow-[0_0_20px_rgba(255,26,83,0.3)]"
              whileHover={{ scale: 1.06, boxShadow: "0px 0px 30px rgba(255, 26, 83, 0.6)" }} whileTap={{ scale: 0.94 }}
            >
              <span className="relative z-10 flex items-center gap-2">Download Resume <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.2 }}>↓</motion.span></span>
            </motion.a>
            <motion.button
              onClick={() => setIsAboutOpen(true)}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }} whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/10 transition-colors backdrop-blur-md"
            >
              About Me
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* EDUCATION SECTION */}
      <section id="education" className="min-h-screen w-full flex flex-col justify-center px-8 md:px-24 py-24 relative z-10">
        <motion.div className="w-full max-w-4xl" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={textVariant}>
          <KineticHeading text="Education" />
          <Typographic3DEducation />
        </motion.div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="min-h-screen w-full flex flex-col justify-center px-8 md:px-24 py-24 relative z-10">
        <motion.div className="w-full max-w-4xl" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={textVariant}>
          <KineticHeading text="Experience" />
          <div className="flex flex-col md:flex-row items-start gap-6 border-l border-white/10 pl-8 relative group">
            <div className="absolute left-0 top-0 -translate-x-1/2 w-2 h-2 bg-[#ff1a53] rounded-full shadow-[0_0_15px_#ff1a53]" />
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#0b0b0e] border border-white/10 flex items-center justify-center p-2 shadow-xl group-hover:border-[#ff1a53]/40 transition-colors">
              <img src={kofukuLogo} alt="Kofuku" className="w-full h-full object-contain brightness-90 group-hover:brightness-100" />
            </div>
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#ff1a53] tracking-widest uppercase block">May 2025 to July 2025</span>
              <h3 className="text-3xl font-black text-white tracking-tight">Kofuku Technologies</h3>
              <p className="text-lg text-gray-300 font-normal">Software Engineer Intern</p>
              <ul className="text-gray-400 text-sm font-light space-y-3 max-w-3xl pt-2 list-disc pl-4 leading-relaxed marker:text-[#ff1a53]">
                <li>Developed scalable backend APIs using Python and FastAPI, increasing internal tool reliability and reducing overall API failure rates by an estimated 30 percent.</li>
                <li>Automated multi-application workflows with n8n, eliminating 8 to 12 hours weekly of manual coordination efforts across separate technical teams.</li>
                <li>Designed and deployed a secure, anonymous Confession Platform used by 150 plus active internal users, enabling behavioural analytics pipelines for product research tracks and increasing survey participation metrics by 40 percent.</li>
                <li>Built a production ready voice AI facility booking system incorporating hardware speech to text conversion loops and automated reservation rules, minimizing booking friction patterns by 60 percent and cutting manual allocation effort by 25 plus hours monthly.</li>
                <li>Delivered complex full stack system code architectures including an optimized OTT platform and an AI scraping extraction stream to improve test velocity paths by 35 percent.</li>
                <li>Enhanced core platform infrastructure backends by refining admin data structures, updating structural technical documents, and reducing QA rework cycles by 20 percent.</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="min-h-screen w-full flex flex-col justify-center px-8 md:px-24 py-24 relative z-10">
        <motion.div className="w-full pointer-events-auto" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} variants={textVariant}>
          <KineticHeading text="Skills" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            <SkillCard3D title="Programming Languages" subtitle="System Translation Engines" skills={["Java", "Python", "C++", "C", "SQL", "JavaScript", "Assembly ARM7 and 8051", "MATLAB"]} delayIndex={0} />
            <SkillCard3D title="Algorithmic Foundations" subtitle="Problem Solving Frameworks" skills={["Java Data Structures", "Competitive Programming", "System Design", "Object Oriented Programming", "Structural Logics"]} delayIndex={1} />
            <SkillCard3D title="AI and Automation" subtitle="Cognitive Intelligence Layers" skills={["Machine Learning", "AI Pipeline Integration", "LLM Prompt Engineering", "n8n automation", "Product Lifecycle Management", "Requirement Analysis"]} delayIndex={2} />
            <SkillCard3D title="Backend Frameworks" subtitle="Enterprise Code Architecture" skills={["FastAPI", "Express", "Hasura", "REST APIs", "GraphQL", "JWT Auth", "API Integration", "Render"]} delayIndex={3} />
            <SkillCard3D title="Data Architecture" subtitle="Persistence Systems" skills={["MySQL", "PostgreSQL", "MongoDB", "Airtable", "Neon", "Notion", "pgAdmin"]} delayIndex={4} />
            <SkillCard3D title="Electronics and Hardware" subtitle="Physical Silicon Design" skills={["Circuit Design", "Analog and Digital Electronics", "Microprocessors", "VLSI Design", "Cadence Virtuoso", "Synopsys Custom Compiler", "Signal Processing", "Operating Systems"]} delayIndex={5} />
            <SkillCard3D title="DevOps and Testing" subtitle="Infrastructure Deployments" skills={["Docker", "Git", "Postman", "Unit Testing", "Technical Documentation", "Figma", "Adobe Photoshop", "Adobe XD", "Canva"]} delayIndex={6} />
            <SkillCard3D title="Strategic Competencies" subtitle="Operational Optimization" skills={["Problem Solving", "Analytical Thinking", "Debugging", "Teamwork", "Communication", "Leadership", "Time Management", "Adaptability", "Coordination"]} delayIndex={7} />
          </div>
        </motion.div>
      </section>

      {/* PROJECTS SECTION (Tilt Cards) */}
      <section id="projects" className="min-h-screen w-full flex flex-col justify-center px-8 md:px-24 py-24 relative z-10">
        <motion.div className="w-full pointer-events-auto relative" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} variants={textVariant}>
          <KineticHeading text="Projects" />
          <div className="flex flex-col space-y-5 max-w-2xl relative">
            {projectsData.map((project) => (
              <ProjectCard 
                key={project.id} project={project} isActive={hoveredProject === project.id} 
                onClick={() => setHoveredProject(hoveredProject === project.id ? null : project.id)}
                onHover={() => setHoveredProject(project.id)} onLeave={() => setHoveredProject(null)} 
              />
            ))}
          </div>

          <AnimatePresence>
            {hoveredProject && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95, x: 10 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="absolute right-0 top-32 hidden lg:block w-[480px] p-8 rounded-3xl border border-white/10 bg-[#0d0d11]/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-30"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#ff1a53]/15 rounded-full blur-3xl pointer-events-none" />
                <span className="text-[10px] font-mono text-[#ff1a53] tracking-widest block mb-3 uppercase">{projectsData.find(p => p.id === hoveredProject)?.tag}</span>
                <h4 className="text-3xl font-black text-white mb-4 tracking-tight leading-tight">{projectsData.find(p => p.id === hoveredProject)?.title}</h4>
                <p className="text-gray-300 font-light leading-relaxed mb-6 text-sm">{projectsData.find(p => p.id === hoveredProject)?.longDesc}</p>
                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2 font-mono text-[10px] text-gray-300">
                  {projectsData.find(p => p.id === hoveredProject)?.tech.map((t, idx) => (
                    <span key={idx} className="px-3 py-1 bg-black/50 border border-white/5 rounded-lg shadow-inner">{t}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* LEADERSHIP SECTION */}
      <section id="leadership" className="min-h-screen w-full flex flex-col justify-center px-8 md:px-24 py-24 relative z-10">
        <motion.div className="max-w-2xl pointer-events-auto relative" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={textVariant}>
          <KineticHeading text="Leadership" />
          
          <div className="mb-12 group flex flex-col md:flex-row items-start gap-6 bg-white/[0.01] p-6 rounded-3xl border border-transparent hover:border-white/5 transition-colors">
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#0b0b0e] shadow-lg border border-white/10 flex items-center justify-center p-2 group-hover:border-[#ff1a53]/40 transition-colors">
              <img src={saeLogo} alt="SAE VIT" className="w-full h-full object-contain filter brightness-90 group-hover:brightness-100" />
            </div>
            <div>
              <span className="font-mono text-xs text-[#ff1a53] tracking-widest uppercase block mb-1">May 2024 to Present</span>
              <h3 className="text-2xl font-bold text-white group-hover:text-[#ff1a53] transition-colors duration-300">SAE VIT - Marketing, Design and PR Head</h3>
              <p className="text-gray-300 mt-2 font-light leading-relaxed">
                Elected Executive Board member leading strategic PR, corporate communications, and media operations reaching over 5,000 students. Spearheaded comprehensive design pipelines, promotional outreach campaigns, and event management setups for 12 major university initiatives. Managed full logistics, procurement parameters, safety protocols, and cross functional volunteer tracking for the landmark SAE AirShow 25 event to drive an estimated 45 percent increase in user engagement tracks.
              </p>
            </div>
          </div>

          <div className="mb-12 group flex flex-col md:flex-row items-start gap-6 bg-white/[0.01] p-6 rounded-3xl border border-transparent hover:border-white/5 transition-colors">
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#0b0b0e] shadow-lg border border-white/10 flex items-center justify-center p-2 group-hover:border-[#ff1a53]/40 transition-colors">
              <img src={codechefLogo} alt="CodeChef VIT" className="w-full h-full object-contain filter brightness-90 group-hover:brightness-100" />
            </div>
            <div>
              <span className="font-mono text-xs text-[#ff1a53] tracking-widest uppercase block mb-1">May 2024 to June 2025</span>
              <h3 className="text-2xl font-bold text-white group-hover:text-[#ff1a53] transition-colors duration-300">CodeChef VIT - Core Member</h3>
              <p className="text-gray-300 mt-2 font-light leading-relaxed">
                Hosted programming contests for hundreds of participants, handled problem setting, and wrote automated scripts to process results quickly.
              </p>
            </div>
          </div>

          <div className="group flex flex-col md:flex-row items-start gap-6 bg-white/[0.01] p-6 rounded-3xl border border-transparent hover:border-white/5 transition-colors">
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#0b0b0e] shadow-lg border border-white/10 flex items-center justify-center p-2 group-hover:border-[#ff1a53]/40 transition-colors">
              <img src={ieeeLogo} alt="IEEE VIT" className="w-full h-full object-contain filter brightness-90 group-hover:brightness-100" />
            </div>
            <div>
              <span className="font-mono text-xs text-[#ff1a53] tracking-widest uppercase block mb-1">May 2024 to June 2025</span>
              <h3 className="text-2xl font-bold text-white group-hover:text-[#ff1a53] transition-colors duration-300">IEEE VIT - Core Member</h3>
              <p className="text-gray-300 mt-2 font-light leading-relaxed">
                Organized and ran technical workshops on embedded systems and Python development for over 200 students while mentoring student teams on project planning.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CONNECT SECTION */}
      <section id="connect" className="min-h-screen w-full flex flex-col justify-center items-end px-8 md:px-24 text-right pb-24 relative z-10">
        <motion.div className="max-w-xl pointer-events-auto relative" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={textVariant}>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">Connect<span className="text-[#ff1a53]">.</span></h2>
          <p className="text-xl text-gray-300 mb-12 font-light leading-relaxed">
            Currently based out of Kolkata, West Bengal, and open to relocation. Seeking software development roles with long-term goals in Engineering Management.
          </p>
          <div className="flex flex-col items-end gap-6 text-lg font-mono">
            <a href="mailto:shlokebinani@gmail.com" className="text-white hover:text-[#ff1a53] transition-colors flex items-center gap-4 w-max group duration-200">
              shlokebinani@gmail.com
              <svg className="w-6 h-6 text-gray-500 group-hover:text-[#ff1a53] transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </a>
            <a href="https://www.linkedin.com/in/shlokebinani1501" target="_blank" rel="noreferrer" className="text-white hover:text-[#ff1a53] transition-colors flex items-center gap-4 w-max group duration-200">
              LinkedIn Profile
              <svg className="w-6 h-6 text-gray-500 group-hover:text-[#ff1a53] transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="https://github.com/ShlokeBinani" target="_blank" rel="noreferrer" className="text-white hover:text-[#ff1a53] transition-colors flex items-center gap-4 w-max group duration-200">
              GitHub Profile
              <svg className="w-6 h-6 text-gray-500 group-hover:text-[#ff1a53] transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
          </div>
        </motion.div>
      </section>

      {/* ABOUT ME MODAL CONTAINER */}
      <AnimatePresence>
        {isAboutOpen && (
          <div className="fixed inset-0 w-full h-screen z-[100] flex items-center justify-center p-4 md:p-12 pointer-events-auto bg-black/60 backdrop-blur-xl">
            <div className="absolute inset-0 w-full h-full cursor-pointer" onClick={() => setIsAboutOpen(false)} />

            <div className="relative w-full max-w-4xl h-auto max-h-[85vh] flex items-center justify-center overflow-visible">
              <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0], transition: { times: [0, 0.4, 0.5, 0.9], duration: 0.9, ease: "easeInOut" } }} exit={{ opacity: 0 }} className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[2px] bg-[#ff1a53] shadow-[0_0_20px_#ff1a53] z-20 pointer-events-none" />

              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.4 } }} exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }} className="relative w-full h-full p-6 sm:p-8 md:p-12 flex flex-col md:flex-row gap-6 md:gap-8 items-center z-30 overflow-y-auto max-h-[80vh] md:overflow-hidden text-left bg-[#0d0d11] rounded-3xl border border-white/10 shadow-2xl">
                <motion.button onClick={() => setIsAboutOpen(false)} whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 26, 83, 0.2)", borderColor: "rgba(255, 26, 83, 0.5)" }} whileTap={{ scale: 0.9 }} className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 border border-white/15 bg-black rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all z-50 shadow-lg">✕</motion.button>

                <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 shrink-0 rounded-2xl bg-white/5 border border-white/10 overflow-hidden shadow-2xl relative flex items-center justify-center mx-auto md:mx-0">
                  <img src={`${baseUrl}shloke.png`} alt="Shloke Binani" className="w-full h-full object-cover filter contrast-[1.03]" />
                </div>

                <div className="flex-1 space-y-3 text-left">
                  <span className="font-mono text-[10px] sm:text-xs text-[#ff1a53] tracking-widest uppercase block">Developer Profile</span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">Shloke Binani</h3>
                  <div className="space-y-3 text-gray-300 font-light text-xs md:text-sm leading-relaxed max-w-xl">
                    <p>I am currently completing my final year of Electronics and Communication Engineering at Vellore Institute of Technology. This background allows me to bridge the gap between high-frequency physical hardware traits and modern backend engineering. Yes, I speak fluent Java, Python, and compiler bugs.</p>
                    <p>I specialize in addressing complex engineering bottlenecks, from optimizing database queries during my internship at Kofuku Technologies to designing decentralized 6G network simulators. My research experiences involve building hybrid quantum convolutional neural networks to classify intensive data signals.</p>
                    <p>My professional timeline focuses on entering advanced software engineering paths before stepping into Technical Engineering Management roles. If you are looking for an adaptive team contributor who is entirely unfazed by a failing deployment script, <span onClick={() => { setIsAboutOpen(false); scrollToSection('connect'); }} className="text-white font-semibold underline decoration-[#ff1a53] decoration-2 underline-offset-4 cursor-pointer hover:text-[#ff1a53] transition-colors inline-flex items-center gap-1.5">let us connect<motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }} className="text-[#ff1a53] font-bold font-mono text-base sm:text-lg">→</motion.span></span></p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
      
    </div>
  );
}