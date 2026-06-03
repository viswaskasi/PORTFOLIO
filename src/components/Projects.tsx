import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, FolderGit2, Cpu, Eye, Code, Terminal } from 'lucide-react';

const projects = [
  {
    title: "VYRIS 8.0: VOICE ASSISTANT",
    category: "Offline AI / Voice Assistant",
    image: "/vyris.png",
    description: "An advanced, real-time, zero-latency local AI digital butler and voice assistant built for 100% offline operation. Integrates a switchable multi-brain system routing queries between local GGUF models (Gemma 4 IT), a semantic cache database (MongoDB/ChromaDB), and learning-mode vectors. Features anti-interruption audio VAD processing, Numpy DSP tone analysis, a safety watchdog, and telemetry streams synced to a glassmorphic web control panel.",
    tags: ["Python", "Gemma-4 GGUF", "LangChain", "MongoDB", "ChromaDB", "FastAPI", "WebSockets"],
    github: "https://github.com/viswaskasi/VYRIS-AI.git",
    
    accent: "#FF003C",
    icon: <Terminal size={18} />
  },
  {
    title: "V-CHAT: AI CHAT BOT",
    category: "Full Stack AI / Agents",
    image: "/v-chat.png",
    description: "An advanced full-stack AI chat ecosystem with support for multiple LLMs (Gemini, NVIDIA, Ollama) and a smart model-switching router. Built real-time Server-Sent Events (SSE) streaming, persistent memory via MongoDB, and agentic tools using LangChain.js. Encased in a beautiful glassmorphic dashboard containing a voice module (STT/TTS), image vision capabilities, and a dynamic live artifact renderer to execute and view components inside the chat.",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "LangChain.js", "Generative AI", "SSE"],
    github: "https://github.com/viswaskasi/V-CHAT.git",
    
    accent: "#FF3E6C",
    icon: <Cpu size={18} />
  },
  {
    title: "Gesture Volume Controller",
    category: "Computer Vision / HCI",
    image: "/gesture.png",
    description: "Touchless real-time hardware volume controller leveraging hand landmark models. Uses MediaPipe Hands to detect landmarks and computes custom vector distances to dynamically adjust volume through Pycaw, rendering graphical HUD overlays.",
    tags: ["Python", "OpenCV", "MediaPipe", "Pycaw", "NumPy"],
    github: "https://github.com/viswaskasi/volume-controller.git",
    
    accent: "#9B001C",
    icon: <Code size={18} />
  },
  {
    title: "AI Background Remover",
    category: "AI & Image Processing",
    image: "/remover.png",
    description: "An automated image preprocessing pipeline utilizing rembg and U2-Net deep learning models. Detects and isolates foreground elements to output flawless transparent alpha-channel PNGs with no manual pixel cleanup.",
    tags: ["Python", "rembg", "OpenCV", "Pillow", "NumPy"],
    github: "https://github.com/viswaskasi/BACKGROUND-REMOVER.git",
    
    accent: "#FF003C",
    icon: <Eye size={18} />
  }
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoords({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-6 flowing-border-card card-shimmer-trail flex flex-col justify-between overflow-hidden relative"
    >
      
      {/* Spotlight Effect inside Card */}
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(circle 200px at ${coords.x}px ${coords.y}px, rgba(255, 0, 60, 0.15) 0%, transparent 80%)`,
          }}
        />
      )}

      {/* Card Content */}
      <div className="relative z-10 flex flex-col h-full justify-between">

        {/* 1. Header (Category & Icon) */}
        <div className="flex justify-between items-center mb-4 text-left">
          <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400">
            {project.category}
          </span>
          <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400" style={{ color: project.accent }}>
            {project.icon}
          </div>
        </div>

        {/* 2. Visual Cover Container */}
        <div className="relative w-full h-40 overflow-hidden rounded-xl border border-white/5 mb-5 shrink-0 bg-[#09090b]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-75 transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* 3. Text Descriptions */}
        <div className="flex-grow text-left">
          <h3 className="text-xl font-bold font-display text-white mb-2 tracking-tight transition-colors" style={{ color: hovered ? '#FF003C' : '#ffffff' }}>
            {project.title}
          </h3>
          <p className="text-zinc-400 font-light text-xs md:text-sm leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        {/* 4. Tags & Action Triggers */}
        <div className="mt-auto space-y-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, tagIndex) => (
              <span key={tagIndex} className="text-[10px] font-mono text-zinc-500 bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-3 border-t border-white/5">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-white/5 hover:border-[#FF003C]/30 bg-white/[0.01] hover:bg-[#FF003C]/5 text-xs font-semibold text-zinc-400 hover:text-white transition-all duration-300 cursor-pointer"
            >
              <Github size={12} />
              <span>View Code</span>
            </a>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-transparent">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[500px] h-[250px] bg-[#FF003C]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#FF003C]/20 bg-[#FF003C]/5 text-xs font-semibold text-[#FF003C] mb-4 tracking-wider uppercase">
            <FolderGit2 size={12} />
            Showcase
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white tracking-tight">
            Featured <span className="text-gradient-purple font-extrabold" style={{ '--color-accent': '#FF003C' } as React.CSSProperties}>Projects</span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-[#FF003C] to-[#FF3E6C] rounded-full mt-4"></div>
          <p className="mt-4 text-zinc-500 max-w-2xl font-light text-base md:text-lg">
            A premium collection of agentic frameworks, computer vision algorithms, and automated deep learning pipelines of equal dimensions.
          </p>
        </motion.div>

        {/* Equal Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
