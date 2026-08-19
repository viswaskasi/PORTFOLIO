import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, FolderGit2, Terminal, Cpu, Code, Eye, Filter } from 'lucide-react';

const projects = [
  {
    id: "vyris",
    title: "VYRIS 8.0: VOICE ASSISTANT",
    category: "AI & LLMs",
    displayCategory: "Offline AI / Voice Assistant",
    image: "/vyris.png",
    description: "An advanced, real-time, zero-latency local AI digital butler and voice assistant built for 100% offline operation. Integrates a switchable multi-brain system routing queries between local GGUF models (Gemma 4 IT), a semantic cache database (MongoDB/ChromaDB), and learning-mode vectors. Features anti-interruption audio VAD processing, Numpy DSP tone analysis, a safety watchdog, and telemetry streams synced to a glassmorphic web control panel.",
    tags: ["Python", "Gemma-4 GGUF", "LangChain", "MongoDB", "ChromaDB", "FastAPI", "WebSockets"],
    github: "https://github.com/viswaskasi/VYRIS-AI.git",
    accent: "#000000",
    icon: <Terminal size={18} />
  },
  {
    id: "vchat",
    title: "V-CHAT: AI CHAT BOT",
    category: "Full Stack",
    displayCategory: "Full Stack AI / Agents",
    image: "/v-chat.png",
    description: "An advanced full-stack AI chat ecosystem with support for multiple LLMs (Gemini, NVIDIA, Ollama) and a smart model-switching router. Built real-time Server-Sent Events (SSE) streaming, persistent memory via MongoDB, and agentic tools using LangChain.js. Encased in a beautiful glassmorphic dashboard containing a voice module (STT/TTS), image vision capabilities, and a dynamic live artifact renderer to execute and view components inside the chat.",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "LangChain.js", "Generative AI", "SSE"],
    github: "https://github.com/viswaskasi/V-CHAT.git",
    accent: "#000000",
    icon: <Cpu size={18} />
  },
  {
    id: "gesture",
    title: "Gesture Volume Controller",
    category: "Computer Vision",
    displayCategory: "Computer Vision / HCI",
    image: "/gesture.png",
    description: "Touchless real-time hardware volume controller leveraging hand landmark models. Uses MediaPipe Hands to detect landmarks and computes custom vector distances to dynamically adjust volume through Pycaw, rendering graphical HUD overlays.",
    tags: ["Python", "OpenCV", "MediaPipe", "Pycaw", "NumPy"],
    github: "https://github.com/viswaskasi/volume-controller.git",
    accent: "#000000",
    icon: <Code size={18} />
  },
  {
    id: "remover",
    title: "AI Background Remover",
    category: "Python",
    displayCategory: "AI & Image Processing",
    image: "/remover.png",
    description: "An automated image preprocessing pipeline utilizing rembg and U2-Net deep learning models. Detects and isolates foreground elements to output flawless transparent alpha-channel PNGs with no manual pixel cleanup.",
    tags: ["Python", "rembg", "OpenCV", "Pillow", "NumPy"],
    github: "https://github.com/viswaskasi/BACKGROUND-REMOVER.git",
    accent: "#000000",
    icon: <Eye size={18} />
  }
];

const CATEGORIES = ["All", "AI & LLMs", "Full Stack", "Computer Vision", "Python"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-transparent">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[500px] h-[250px] bg-[#F0F2F5] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D0D3D9] bg-[#FFFFFF] text-xs font-bold text-[#000000] mb-4 tracking-wider uppercase font-mono shadow-xs">
            <FolderGit2 size={12} />
            Showcase & Pipelines
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-display text-[#000000] tracking-tight">
            Featured <span className="text-[#000000] font-black">Projects</span>
          </h2>
          <div className="flex items-center gap-2 mt-4">
            <div className="h-1.5 w-16 bg-[#000000] rounded-full"></div>
            <div className="h-1.5 w-3 bg-[#66676A] rounded-full"></div>
          </div>
          <p className="mt-4 text-[#2E3033] max-w-2xl font-semibold text-base md:text-lg">
            A premium showcase of production agentic frameworks, computer vision algorithms, and multi-LLM architectures.
          </p>
        </motion.div>

        {/* Category Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-start gap-2 mb-12"
        >
          <div className="flex items-center gap-1.5 pr-3 text-xs font-mono text-[#000000] uppercase font-black">
            <Filter size={13} className="text-[#000000]" />
            <span>Filter:</span>
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#000000] text-white border border-[#000000] shadow-xs'
                  : 'bg-[#FFFFFF] border border-[#D0D3D9] text-[#000000] hover:bg-[#F8F9FB] hover:border-[#000000]'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group p-6 flowing-border-card card-shimmer-trail flex flex-col justify-between overflow-hidden relative"
              >
                {/* Card Content */}
                <div className="relative z-10 flex flex-col h-full justify-between">

                  {/* Header (Category & Icon) */}
                  <div className="flex justify-between items-center mb-4 text-left">
                    <span className="px-2.5 py-1 rounded-md bg-[#F8F9FB] border border-[#D0D3D9] group-hover:border-[#000000] text-[9px] font-mono font-black uppercase tracking-wider text-[#000000] transition-colors">
                      {project.displayCategory}
                    </span>
                    <div className="p-1.5 rounded-lg bg-[#F8F9FB] border border-[#D0D3D9] group-hover:border-[#000000] text-[#000000] transition-colors">
                      {project.icon}
                    </div>
                  </div>

                  {/* Visual Cover Container */}
                  <div className="relative w-full h-44 overflow-hidden rounded-xl border border-[#D0D3D9] mb-5 shrink-0 bg-[#F8F9FB]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Text Descriptions */}
                  <div className="flex-grow text-left">
                    <h3 className="text-xl font-black font-display text-[#000000] mb-2 tracking-tight transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[#2E3033] font-medium text-xs md:text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags & Action Triggers */}
                  <div className="mt-auto space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="text-[10px] font-mono text-[#000000] bg-[#F8F9FB] border border-[#D0D3D9] hover:border-[#000000] hover:bg-[#FFFFFF] px-2 py-0.5 rounded-md font-bold transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Button: View Code */}
                    <div className="pt-3 border-t border-[#E5E7EB]">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[#000000] bg-[#000000] hover:bg-[#1C1C1C] hover:border-[#333538] text-xs font-black text-white transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md group/btn"
                      >
                        <Github size={14} className="text-white group-hover/btn:scale-110 transition-transform" />
                        <span>View Source Code</span>
                      </a>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

    </section>
  );
}
