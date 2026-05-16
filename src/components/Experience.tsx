import { motion } from 'framer-motion';

const timeline = [
  {
    title: "Software Engineer Intern",
    company: "Kofuku Technologies Pvt. Ltd.",
    date: "May 2025 - Jul 2025",
    desc: "Engineered robust software solutions, optimized backend performance, and contributed to core product architecture."
  },
  {
    title: "ResiliNet Project",
    company: "Academic Research & Development",
    date: "Ongoing",
    desc: "Developed a decentralized 6G network simulator. Explored Hybrid Quantum Convolutional Neural Networks on EMG datasets."
  },
  {
    title: "Marketing, Design & PR Head",
    company: "SAE-VIT",
    date: "May 2024 - Present",
    desc: "Leading cross-functional teams, managing organizational branding, and driving strategic communications."
  }
];

export default function Experience() {
  return (
    <section className="py-24 px-8 md:px-24">
      <h3 className="text-3xl md:text-5xl font-black mb-16 border-b border-royal/30 pb-4 inline-block">
        &gt; KERNEL_HISTORY
      </h3>
      
      <div className="flex flex-col gap-12 border-l border-royal/50 pl-8">
        {timeline.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative group"
          >
            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-dark border-2 border-royal group-hover:bg-royal transition-colors duration-300" />
            <h4 className="text-2xl font-bold text-white">{item.title}</h4>
            <h5 className="text-royal font-mono text-sm mt-1">{item.company} | {item.date}</h5>
            <p className="mt-4 text-gray-400 max-w-3xl leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}