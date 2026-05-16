import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-md border-b border-royal/20"
    >
      <div className="text-royal font-mono font-bold text-xl tracking-tighter">
        SB_SYS.v1
      </div>
      <nav className="hidden md:flex gap-8 font-mono text-xs text-gray-400">
        <a href="#about" className="hover:text-royal transition-colors">[ 01. ROOT ]</a>
        <a href="#projects" className="hover:text-royal transition-colors">[ 02. SOURCE ]</a>
        <a href="#contact" className="hover:text-royal transition-colors">[ 03. CONNECT ]</a>
      </nav>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="font-mono text-[10px] text-green-500">SYSTEM_ACTIVE</span>
      </div>
    </motion.header>
  );
}