import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section className="py-24 px-8 md:px-24 bg-gradient-to-t from-royal/10 to-transparent">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h3 className="text-4xl md:text-6xl font-black mb-8">INITIATE_HANDSHAKE</h3>
        <p className="text-xl text-gray-400 mb-12">
          Currently based in Kolkata. Open to software development opportunities, engineering management discussions, and collaborative AI research.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-8 font-mono">
          <a href="#" className="flex items-center gap-3 justify-center text-gray-300 hover:text-royal transition-colors">
            <span className="text-royal font-bold">[EMAIL]</span> <span>shloke.binani@example.com</span>
          </a>
          <a href="#" className="flex items-center gap-3 justify-center text-gray-300 hover:text-royal transition-colors">
            <span className="text-royal font-bold">[LINKEDIN]</span> <span>LinkedIn/ShlokeBinani</span>
          </a>
          <div className="flex items-center gap-3 justify-center text-gray-300">
            <span className="text-royal font-bold">[LOCATION]</span> <span>Kolkata, West Bengal</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}