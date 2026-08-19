import { motion } from 'framer-motion';
import { Cpu, Code, Brain, Network, Database, Terminal } from 'lucide-react';

const icons = [
  { component: <Brain size={18} />, label: 'LLMs', top: '15%', left: '8%', speed: 18 },
  { component: <Network size={18} />, label: 'LangChain', top: '55%', left: '5%', speed: 22 },
  { component: <Code size={18} />, label: 'TypeScript', top: '25%', left: '85%', speed: 20 },
  { component: <Database size={18} />, label: 'VectorDB', top: '70%', left: '88%', speed: 24 },
  { component: <Cpu size={18} />, label: 'Computer Vision', top: '80%', left: '15%', speed: 19 },
  { component: <Terminal size={18} />, label: 'Python', top: '10%', left: '75%', speed: 21 },
];

export default function TechStackFloating() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {icons.map((item, index) => (
        <motion.div
          key={index}
          style={{
            position: 'absolute',
            top: item.top,
            left: item.left,
          }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, 8, 0],
          }}
          transition={{
            duration: item.speed,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#D0D3D9] text-[#000000] hover:bg-[#F8F9FB] hover:border-[#000000] hover:scale-105 transition-all duration-300 pointer-events-auto cursor-default shadow-xs group"
        >
          <div className="text-[#000000] transition-colors">
            {item.component}
          </div>
          <span className="text-[10px] uppercase font-mono tracking-widest font-black">
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
