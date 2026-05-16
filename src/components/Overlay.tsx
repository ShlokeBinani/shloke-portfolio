import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

import codechefLogo from '../assets/logos/codechef-logo.png';
import ieeeLogo from '../assets/logos/ieee-logo.png';
import kofukuLogo from '../assets/logos/kofuku-logo.png';
import saeLogo from '../assets/logos/sae-logo.png';
import vitLogo from '../assets/logos/vit-logo.png';

function SkillCard3D({ title, subtitle, skills, delayIndex }: { title: string, subtitle: string, skills: string[], delayIndex: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [22, -22]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-22, 22]);
  
  const glowX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  function handleMouseMove(event: React.MouseEvent) {
    if (!cardRef.current) return;
    const box = cardRef.current.getBoundingClientRect();
    const width = box.width;
    const height = box.height;
    const mouseX = event.clientX - box.left - width / 2;
    const mouseY = event.clientY - box.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1200 }}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      animate={{
        y: [0, -8, 0],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delayIndex * 0.2
        }
      }}
      whileHover={{ 
        scale: 1.04,
        z: 20,
        y: 0
      }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
      className="group relative p-8 rounded-3xl bg-black/60 border border-white/5 backdrop-blur-2xl overflow-hidden cursor-pointer"
    >
      <motion.div 
        style={{ 
          background: `radial-gradient(circle 200px at ${glowX} ${glowY}, rgba(255, 26, 83, 0.18), transparent)`,
          transform: "translateZ(-30px)"
        }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />
      
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ff1a53]/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ff1a53]/40 to-transparent translate-x-full group-hover:-translate-x-full transition-transform duration-1000 ease-in-out" />

      <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }} className="relative z-10">
        <span style={{ transform: "translateZ(15px)" }} className="text-[9px] font-mono text-[#ff1a53] tracking-widest block mb-1 uppercase">
          {subtitle}
        </span>
        <h3 style={{ transform: "translateZ(30px)" }} className="text-2xl font-black text-white tracking-tight mb-5 border-b border-white/10 pb-3">
          {title}
        </h3>
      </div>

      <div style={{ transform: "translateZ(80px)" }} className="relative z-20 flex flex-wrap gap-2 font-mono text-xs">
        {skills.map((skill, index) => (
          <span 
            key={index} 
            className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-xl text-gray-400 font-medium tracking-wide transition-all duration-300 group-hover:border-[#ff1a53]/30 group-hover:text-white group-hover:bg-white/[0.02] hover:!border-[#ff1a53] hover:!bg-[#ff1a53]/10"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function Typographic3DEducation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-18, 18]);

  function handleMouseMove(e: React.MouseEvent) {
    if (!containerRef.current) return;
    const box = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - box.left - box.width / 2) / box.width);
    mouseY.set((e.clientY - box.top - box.height / 2) / box.height);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full relative py-12 pointer-events-auto select-none overflow-visible"
      style={{ perspective: 1000 }}
    >
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="flex flex-col md:flex-row md:items-center gap-8 border-l border-white/10 pl-8 relative group"
      >
        <div className="absolute left-0 top-0 -translate-x-1/2 w-2 h-2 bg-[#ff1a53] rounded-full shadow-[0_0_15px_#ff1a53] group-hover:scale-150 transition-transform duration-300" />
        
        <div 
          style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
          className="w-20 h-20 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden p-3 group-hover:border-[#ff1a53]/40 transition-colors duration-300"
        >
          <img src={vitLogo} alt="VIT" className="w-full h-full object-contain filter brightness-90 group-hover:brightness-100 transition-all" />
        </div>

        <div style={{ transform: "translateZ(30px)" }} className="space-y-3">
          <div className="font-mono text-xs text-[#ff1a53] tracking-widest uppercase">2023 to 2027</div>
          <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white transition-all duration-300 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
            Vellore Institute of Technology
          </h3>
          <p className="text-xl text-gray-400 font-light tracking-wide">
            Bachelor of Technology in Electronics and Communication Engineering
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Overlay() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

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
    <div className="w-full font-sans text-white relative">
      
      {/* NAVBAR */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] md:w-[85%] px-6 py-3 flex justify-between items-center backdrop-blur-xl border border-white/10 bg-black/40 rounded-full z-50 pointer-events-auto shadow-2xl">
        <div 
          className="font-black text-lg tracking-tighter cursor-pointer hover:text-[#ff1a53] transition-colors" 
          onClick={() => setIsAboutOpen(true)}
        >
          SB<span className="text-[#ff1a53]">.</span>
        </div>
        <div className="flex items-center gap-3 md:gap-6 text-[11px] font-mono tracking-wider text-gray-400">
          <button onClick={() => scrollToSection('hero')} className="hover:text-[#ff1a53] transition-colors duration-200">HOME</button>
          <button onClick={() => scrollToSection('education')} className="hover:text-[#ff1a53] transition-colors duration-200">EDUCATION</button>
          <button onClick={() => scrollToSection('experience')} className="hover:text-[#ff1a53] transition-colors duration-200">EXPERIENCE</button>
          <button onClick={() => scrollToSection('skills')} className="hover:text-[#ff1a53] transition-colors duration-200">SKILLS</button>
          <button onClick={() => scrollToSection('projects')} className="hover:text-[#ff1a53] transition-colors duration-200">PROJECTS</button>
          <button onClick={() => scrollToSection('leadership')} className="hover:text-[#ff1a53] transition-colors duration-200">LEADERSHIP</button>
          <button onClick={() => scrollToSection('connect')} className="hover:text-[#ff1a53] transition-colors duration-200">CONNECT</button>
          
          <motion.a 
            href="/Shloke_Binani_Resume.pdf" 
            download 
            className="relative overflow-hidden px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold tracking-wider"
            whileHover={{ scale: 1.05, borderColor: "rgba(255,26,83,0.5)", boxShadow: "0px 0px 15px rgba(255,26,83,0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span 
              className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              initial={{ x: '-150%' }}
              animate={{ x: '250%' }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
            />
            RESUME ↓
          </motion.a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="min-h-screen w-full flex flex-col justify-center px-8 md:px-24 pt-20">
        <motion.div className="max-w-3xl pointer-events-auto" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={textVariant}>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-2">
            Shloke Binani<span className="text-[#ff1a53]">.</span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff1a53] to-gray-400 mb-6">
            Software Developer and AI Researcher
          </h2>
          <p className="text-lg text-gray-400 font-light leading-relaxed max-w-2xl mb-10">
            Final year Electronics and Communication Engineering student at Vellore Institute of Technology. 
            Focused on advanced Java data structures, industrial workflow automation engines, and machine learning structures.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <motion.a 
              href="/Shloke_Binani_Resume.pdf" 
              download
              className="relative overflow-hidden px-8 py-4 bg-gradient-to-r from-[#ff1a53] to-[#b3002d] text-white font-black text-sm rounded-xl tracking-wide shadow-xl shadow-[#ff1a53]/10"
              whileHover={{ scale: 1.06, boxShadow: "0px 0px 25px rgba(255, 26, 83, 0.5)" }}
              whileTap={{ scale: 0.94 }}
            >
              <motion.span 
                className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                initial={{ x: '-150%' }}
                animate={{ x: '350%' }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Download Resume
                <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.2 }}>↓</motion.span>
              </span>
            </motion.a>

            <motion.button
              onClick={() => setIsAboutOpen(true)}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/5 text-white font-semibold text-sm rounded-xl border border-white/10 transition-colors"
            >
              About Me
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* EDUCATION SECTION */}
      <section id="education" className="min-h-screen w-full flex flex-col justify-center px-8 md:px-24 py-24">
        <motion.div className="w-full max-w-4xl" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={textVariant}>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-16 border-b border-white/10 pb-4 inline-block">Education</h2>
          <Typographic3DEducation />
        </motion.div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="min-h-screen w-full flex flex-col justify-center px-8 md:px-24 py-24">
        <motion.div className="w-full max-w-4xl" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={textVariant}>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-16 border-b border-white/10 pb-4 inline-block">Experience</h2>
          
          <div className="flex flex-col md:flex-row items-start gap-6 border-l border-white/10 pl-8 relative group">
            <div className="absolute left-0 top-0 -translate-x-1/2 w-2 h-2 bg-[#ff1a53] rounded-full shadow-[0_0_15px_#ff1a53]" />
            
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden p-2 group-hover:border-[#ff1a53]/40 transition-colors duration-300">
              <img src={kofukuLogo} alt="Kofuku Technologies" className="w-full h-full object-contain filter brightness-90 group-hover:brightness-100 transition-all" />
            </div>
            
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#ff1a53] tracking-widest uppercase">May 2025 to July 2025</span>
              <h3 className="text-3xl font-black text-white tracking-tight">Kofuku Technologies</h3>
              <p className="text-lg text-gray-400 font-normal">Software Engineer Intern</p>
              <ul className="text-gray-400 text-sm font-light space-y-3 max-w-3xl pt-2 list-disc pl-4 leading-relaxed">
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
      <section id="skills" className="min-h-screen w-full flex flex-col justify-center px-8 md:px-24 py-24">
        <motion.div className="w-full pointer-events-auto" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} variants={textVariant}>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-16 border-b border-white/10 pb-4 inline-block">Skills</h2>

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

      {/* PROJECTS SECTION */}
      <section id="projects" className="min-h-screen w-full flex flex-col justify-center px-8 md:px-24 py-24 relative">
        <motion.div className="w-full pointer-events-auto z-10" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} variants={textVariant}>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-16 border-b border-white/10 pb-4 inline-block">Projects</h2>
          
          <div className="flex flex-col space-y-4 max-w-2xl relative">
            {projectsData.map((project) => (
              <div 
                key={project.id}
                className="relative flex items-center w-full"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div 
                  className={`w-full p-5 border-l-2 transition-all duration-300 rounded-r-xl ${hoveredProject === project.id ? 'border-[#ff1a53] bg-white/[0.03]' : 'border-white/10 bg-transparent'}`}
                >
                  <h3 className={`text-xl font-bold transition-colors duration-200 ${hoveredProject === project.id ? 'text-[#ff1a53]' : 'text-white'}`}>
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1 font-light">{project.shortDesc}</p>
                </div>

                <AnimatePresence>
                  {hoveredProject === project.id && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.3, x: -40 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.5, x: -20 }}
                      transition={{ type: "spring", stiffness: 380, damping: 16 }}
                      className="absolute left-full top-0 ml-8 hidden lg:block w-[480px] p-6 rounded-3xl backdrop-blur-2xl border border-white/10 bg-black/70 shadow-2xl z-30 overflow-hidden"
                      style={{ boxShadow: "0px 0px 40px rgba(255, 26, 83, 0.2)" }}
                    >
                      <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#ff1a53]/10 rounded-full blur-2xl pointer-events-none" />
                      
                      <span className="text-[10px] font-mono text-[#ff1a53] tracking-widest block mb-2">{project.tag}</span>
                      <h4 className="text-2xl font-black text-white mb-3 tracking-tight">{project.title}</h4>
                      <p className="text-gray-300 font-light leading-relaxed mb-5 text-sm">{project.longDesc}</p>
                      
                      <div className="pt-3 border-t border-white/10">
                        <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-gray-300">
                          {project.tech.map((t, idx) => (
                            <span key={idx} className="px-2.5 py-0.5 bg-white/5 border border-white/5 rounded-md">{t}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* LEADERSHIP SECTION */}
      <section id="leadership" className="min-h-screen w-full flex flex-col justify-center px-8 md:px-24">
        <motion.div className="max-w-2xl pointer-events-auto" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={textVariant}>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-16 border-b border-white/10 pb-4 inline-block">Leadership</h2>
          
          <div className="mb-12 group flex flex-col md:flex-row items-start gap-6">
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden p-2 group-hover:border-[#ff1a53]/40 transition-colors duration-300">
              <img src={saeLogo} alt="SAE VIT" className="w-full h-full object-contain filter brightness-90 group-hover:brightness-100 transition-all" />
            </div>
            <div>
              <span className="font-mono text-xs text-[#ff1a53] tracking-widest uppercase block mb-1">May 2024 to Present</span>
              <h3 className="text-2xl font-bold text-white group-hover:text-[#ff1a53] transition-colors duration-300">SAE VIT - Marketing, Design and PR Head</h3>
              <p className="text-gray-400 mt-2 font-light leading-relaxed">
                Elected Executive Board member leading strategic PR, corporate communications, and media operations reaching over 5,000 students. Spearheaded comprehensive design pipelines, promotional outreach campaigns, and event management setups for 12 major university initiatives. Managed full logistics, procurement parameters, safety protocols, and cross functional volunteer tracking for the landmark SAE AirShow 25 event to drive an estimated 45 percent increase in user engagement tracks.
              </p>
            </div>
          </div>

          <div className="mb-12 group flex flex-col md:flex-row items-start gap-6">
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden p-2 group-hover:border-[#ff1a53]/40 transition-colors duration-300">
              <img src={codechefLogo} alt="CodeChef VIT" className="w-full h-full object-contain filter brightness-90 group-hover:brightness-100 transition-all" />
            </div>
            <div>
              <span className="font-mono text-xs text-[#ff1a53] tracking-widest uppercase block mb-1">May 2024 to June 2025</span>
              <h3 className="text-2xl font-bold text-white group-hover:text-[#ff1a53] transition-colors duration-300">CodeChef VIT - Core Member</h3>
              <p className="text-gray-400 mt-2 font-light leading-relaxed">
                Hosted programming contests for hundreds of participants, handled problem setting, and wrote automated scripts to process results quickly.
              </p>
            </div>
          </div>

          <div className="group flex flex-col md:flex-row items-start gap-6">
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden p-2 group-hover:border-[#ff1a53]/40 transition-colors duration-300">
              <img src={ieeeLogo} alt="IEEE VIT" className="w-full h-full object-contain filter brightness-90 group-hover:brightness-100 transition-all" />
            </div>
            <div>
              <span className="font-mono text-xs text-[#ff1a53] tracking-widest uppercase block mb-1">May 2024 to June 2025</span>
              <h3 className="text-2xl font-bold text-white group-hover:text-[#ff1a53] transition-colors duration-300">IEEE VIT - Core Member</h3>
              <p className="text-gray-400 mt-2 font-light leading-relaxed">
                Organized and ran technical workshops on embedded systems and Python development for over 200 students while mentoring student teams on project planning.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CONNECT SECTION */}
      <section id="connect" className="min-h-screen w-full flex flex-col justify-center items-end px-8 md:px-24 text-right pb-24">
        <motion.div className="max-w-xl pointer-events-auto" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={textVariant}>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
            Connect<span className="text-[#ff1a53]">.</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 font-light">
            Based out of Kolkata, West Bengal. Open to software development roles with long term goals in Engineering Management.
          </p>
          <div className="flex flex-col items-end gap-6 text-lg font-mono">
            <a href="mailto:shlokebinani@gmail.com" className="text-white hover:text-[#ff1a53] transition-all flex items-center gap-4 w-max group duration-200">
              shlokebinani@gmail.com
              <span className="w-8 h-[1px] bg-gray-600 group-hover:bg-[#ff1a53] transition-colors duration-200" />
            </a>
            <a href="https://www.linkedin.com/in/shlokebinani1501" target="_blank" rel="noreferrer" className="text-white hover:text-[#ff1a53] transition-all flex items-center gap-4 w-max group duration-200">
              LinkedIn Profile
              <span className="w-8 h-[1px] bg-gray-600 group-hover:bg-[#ff1a53] transition-colors duration-200" />
            </a>
            <a href="https://github.com/ShlokeBinani" target="_blank" rel="noreferrer" className="text-white hover:text-[#ff1a53] transition-all flex items-center gap-4 w-max group duration-200">
              GitHub Profile
              <span className="w-8 h-[1px] bg-gray-600 group-hover:bg-[#ff1a53] transition-colors duration-200" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* ABOUT ME SPLIT REVEAL MODAL */}
      <AnimatePresence>
        {isAboutOpen && (
          <div className="fixed inset-0 w-full h-screen z-[100] flex items-center justify-center p-4 md:p-12 pointer-events-auto bg-black/80 backdrop-blur-md">
            <div className="absolute inset-0 w-full h-full cursor-pointer" onClick={() => setIsAboutOpen(false)} />

            <div className="relative w-full max-w-4xl h-[660px] md:h-[480px] flex items-center justify-center overflow-visible">
              
              {/* UPPER HALF BACKDROP PANEL */}
              <motion.div 
                initial={{ x: "-150%", scaleY: 0.005, originY: 1 }}
                animate={{ 
                  x: 0, 
                  scaleY: [0.005, 0.005, 1],
                  transition: { 
                    x: { duration: 0.4, ease: "easeOut" },
                    scaleY: { times: [0, 0.45, 1], duration: 0.9, ease: "easeInOut" }
                  }
                }}
                exit={{ 
                  scaleY: [1, 0.005, 0.005],
                  x: ["0%", "0%", "-150%"],
                  transition: {
                    scaleY: { times: [0, 0.55, 1], duration: 0.8, ease: "easeInOut" },
                    x: { times: [0, 0.55, 1], duration: 0.8, ease: "easeIn" }
                  }
                }}
                className="absolute top-0 left-0 w-full h-1/2 bg-[#0d0d11] border-t border-x border-white/10 rounded-t-[32px] pointer-events-none z-10"
              />

              {/* LOWER HALF BACKDROP PANEL */}
              <motion.div 
                initial={{ x: "150%", scaleY: 0.005, originY: 0 }}
                animate={{ 
                  x: 0, 
                  scaleY: [0.005, 0.005, 1],
                  transition: { 
                    x: { duration: 0.4, ease: "easeOut" },
                    scaleY: { times: [0, 0.45, 1], duration: 0.9, ease: "easeInOut" }
                  }
                }}
                exit={{ 
                  scaleY: [1, 0.005, 0.005],
                  x: ["0%", "0%", "150%"],
                  transition: {
                    scaleY: { times: [0, 0.55, 1], duration: 0.8, ease: "easeInOut" },
                    x: { times: [0, 0.55, 1], duration: 0.8, ease: "easeIn" }
                  }
                }}
                className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0d0d11] border-b border-x border-white/10 rounded-b-[32px] pointer-events-none z-10"
              />

              {/* COLLISION LINE ACCENT SWEEP */}
              <motion.div 
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ 
                  scaleX: [0, 1, 1, 0], 
                  opacity: [0, 1, 1, 0],
                  transition: { times: [0, 0.4, 0.5, 0.9], duration: 0.9, ease: "easeInOut" }
                }}
                exit={{ opacity: 0 }}
                className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[2px] bg-[#ff1a53] shadow-[0_0_20px_#ff1a53] z-20 pointer-events-none"
              />

              {/* POPUP CONTENT FIELD */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.65, duration: 0.3 } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="relative w-full h-full p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center z-30 overflow-hidden text-left"
              >
                <motion.button 
                  onClick={() => setIsAboutOpen(false)}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 26, 83, 0.2)", borderColor: "rgba(255, 26, 83, 0.5)" }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-6 right-6 w-10 h-10 border border-white/15 bg-black rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 z-50 font-sans text-sm font-light shadow-lg shadow-black/50"
                >
                  ✕
                </motion.button>

                <div className="w-40 h-40 md:w-52 md:h-52 shrink-0 rounded-2xl bg-white/5 border border-white/10 overflow-hidden shadow-2xl relative flex items-center justify-center mx-auto md:mx-0">
                  <img 
                    src="/shloke.png" 
                    alt="Shloke Binani" 
                    className="w-full h-full object-cover filter contrast-[1.03]"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const msg = parent.querySelector('.fallback-msg');
                        if (msg) msg.classList.remove('hidden');
                      }
                    }}
                  />
                  <div className="fallback-msg hidden flex flex-col items-center justify-center text-center p-4 font-mono text-[10px] text-gray-500">
                    <span className="text-[#ff1a53] font-bold block mb-1">IMAGE DISCONNECTED</span>
                    Drop shloke.png inside your public folder.
                  </div>
                </div>

                <div className="flex-1 space-y-3 text-left pr-0 md:pr-2">
                  <span className="font-mono text-xs text-[#ff1a53] tracking-widest uppercase block">Developer Profile</span>
                  <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">Shloke Binani</h3>
                  
                  <div className="space-y-3 text-gray-300 font-light text-xs md:text-sm leading-relaxed">
                    <p>
                      I am currently completing my final year of Electronics and Communication Engineering at Vellore Institute of Technology. This background allows me to bridge the gap between high-frequency physical hardware traits and modern backend engineering. Yes, I speak fluent Java, Python, and compiler bugs.
                    </p>
                    <p>
                      I specialize in addressing complex engineering bottlenecks, from optimizing database queries during my internship at Kofuku Technologies to designing decentralized 6G network simulators. My research experiences involve building hybrid quantum convolutional neural networks to classify intensive data signals.
                    </p>
                    <p>
                      My professional timeline focuses on entering advanced software engineering paths before stepping into Technical Engineering Management roles. If you are looking for an adaptive team contributor who is entirely unfazed by a failing deployment script,{' '}
                      <span 
                        onClick={() => {
                          setIsAboutOpen(false);
                          scrollToSection('connect');
                        }}
                        className="text-white font-semibold underline decoration-[#ff1a53] decoration-2 underline-offset-4 cursor-pointer hover:text-[#ff1a53] transition-colors inline-flex items-center gap-1.5"
                      >
                        let us connect
                        <motion.span 
                          animate={{ x: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                          className="text-[#ff1a53] font-bold font-mono text-lg"
                        >
                          →
                        </motion.span>
                      </span>
                    </p>
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