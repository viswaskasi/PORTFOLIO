import { motion } from 'framer-motion';
import { MapPin, Mail, Github, Linkedin, MessageSquare, Globe, Terminal, Cpu } from 'lucide-react';

export default function ProfileCard() {
  const email = "viswaskasi2006@gmail.com";
  const githubUrl = "https://github.com/viswaskasi";
  const linkedinUrl = "https://www.linkedin.com/in/kasi-viswas";

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.2 }}
      className="w-full lg:w-[350px] shrink-0 sticky top-28 z-20"
    >
      {/* Container with premium glass styling and subtle glow shadow */}
      <div className="relative rounded-3xl p-6 border border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
        
        {/* Subtle grid mesh inside card */}
        <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none rounded-3xl"></div>

        {/* Ambient top right glow indicator */}
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-purple-glow/15 blur-[30px] rounded-full group-hover:bg-purple-glow/25 transition-colors duration-500"></div>

        {/* ── Avatar Replacement: Glowing Cyber-Reactor HUD Core ── */}
        <div className="relative flex justify-center mt-4 mb-6">
          <div className="relative w-44 h-44 rounded-full flex items-center justify-center p-1 bg-gradient-to-tr from-purple-glow via-electric-blue to-accent-purple animate-[spin_16s_linear_infinite]">
            {/* Dark core */}
            <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center relative overflow-hidden">
              {/* Rotating inner circuit mesh */}
              <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:12px_12px] opacity-40"></div>
            </div>
          </div>

          {/* Overlay non-rotating HUD display inside core */}
          <div className="absolute inset-0 w-44 h-44 mx-auto rounded-full flex flex-col items-center justify-center z-10 pointer-events-none">
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-28 h-28 rounded-full bg-[#0a0a0a] border border-white/10 shadow-[inset_0_0_20px_rgba(139,92,246,0.15)] flex flex-col items-center justify-center gap-1.5"
            >
              <Cpu size={28} className="text-purple-glow drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
              <div className="text-[10px] uppercase font-mono tracking-widest text-electric-blue font-bold">
                SYSTEM OK
              </div>
              
              {/* Micro bar levels */}
              <div className="flex gap-0.5 items-end h-2">
                <span className="w-0.5 h-1.5 bg-electric-blue rounded-full animate-[pulse_1s_infinite]"></span>
                <span className="w-0.5 h-2 bg-purple-glow rounded-full animate-[pulse_1.2s_infinite]"></span>
                <span className="w-0.5 h-1 bg-accent-purple rounded-full animate-[pulse_0.8s_infinite]"></span>
              </div>
            </motion.div>
          </div>

          {/* Active online status badge */}
          <div className="absolute bottom-2 right-[calc(50%-75px)] bg-[#050505] border border-white/10 py-1 px-3 rounded-full flex items-center gap-1.5 shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-400">ACTIVE</span>
          </div>
        </div>

        {/* ── Profile Information ── */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold font-display text-white tracking-tight mb-1 flex items-center justify-center gap-2">
            Kasi Viswas
            <Terminal size={16} className="text-purple-glow" />
          </h2>
          <p className="text-sm font-medium text-purple-glow uppercase tracking-wider mb-4">
            Full Stack Developer
          </p>

          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>

        {/* ── Meta Fields (Details) ── */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3.5 px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors duration-300">
            <Globe size={16} className="text-electric-blue" />
            <div className="text-left">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Location</p>
              <p className="text-xs text-gray-300 font-medium">India, Earth</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors duration-300">
            <Mail size={16} className="text-purple-glow" />
            <div className="text-left overflow-hidden">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Email Address</p>
              <a href={`mailto:${email}`} className="text-xs text-gray-300 font-medium hover:text-purple-glow transition-colors truncate block">
                {email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors duration-300">
            <MapPin size={16} className="text-accent-purple" />
            <div className="text-left">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Based In</p>
              <p className="text-xs text-gray-300 font-medium">Visakhapatnam, AP</p>
            </div>
          </div>
        </div>

        {/* ── Social Network Connects ── */}
        <div className="flex justify-between items-center bg-[#050505] p-3 rounded-2xl border border-white/5 mb-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 pl-2">Socials</span>
          <div className="flex gap-2">
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-glow/20 hover:border-purple-glow/50 transition-all duration-300"
            >
              <Github size={15} />
            </a>
            <a 
              href={linkedinUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-electric-blue/20 hover:border-electric-blue/50 transition-all duration-300"
            >
              <Linkedin size={15} />
            </a>
            <a 
              href={`mailto:${email}`}
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-accent-purple/20 hover:border-accent-purple/50 transition-all duration-300"
            >
              <Mail size={15} />
            </a>
          </div>
        </div>

        {/* ── Interactive CTA ── */}
        <a
          href="#contact"
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-purple-glow/40 to-electric-blue/40 hover:from-purple-glow/60 hover:to-electric-blue/60 border border-purple-glow/30 hover:border-purple-glow/60 shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
        >
          <MessageSquare size={15} className="group-hover:rotate-12 transition-transform" />
          <span>Let's Connect</span>
        </a>

      </div>
    </motion.div>
  );
}
