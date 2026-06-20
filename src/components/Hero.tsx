import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, MessageSquare, Layers, Brain, Cpu } from 'lucide-react';
import { Link } from 'react-scroll';
import { Typewriter } from 'react-simple-typewriter';
import React from 'react';
import ThreeHero from './ThreeHero';

const stats = [
  { value: 'Design-Driven', label: 'Loves to design every type of application', icon: <Layers size={16} /> },
  { value: '3 AI Projects', label: 'Built single-person (solo)', icon: <Brain size={16} /> },
  { value: 'AI-First', label: 'Dedicated to AI building & engineering', icon: <Cpu size={16} /> },
];

export default function Hero() {
  // Magnetic button hover logic using Framer Motion
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);
  const springX = useSpring(btnX, { stiffness: 150, damping: 15 });
  const springY = useSpring(btnY, { stiffness: 150, damping: 15 });

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    btnX.set(x * 0.35);
    btnY.set(y * 0.35);
  };

  const handleBtnMouseLeave = () => {
    btnX.set(0);
    btnY.set(0);
  };

  return (
    <section id="home" className="relative pt-10 pb-8 overflow-hidden min-h-[85vh] flex flex-col justify-center">
      
      {/* ── Background Mesh Ambient Glow ── */}
      <div className="absolute right-[-10%] top-[10%] w-[35vw] h-[35vw] bg-[#FF003C]/6 blur-[130px] rounded-full pointer-events-none z-0"></div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-center w-full z-10">
        
        {/* Left Column: Copy & Actions */}
        <div className="xl:col-span-7 text-left flex flex-col items-start z-10">
          
          {/* Availability Pulse Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#FF003C]/25 bg-[#FF003C]/5 text-xs font-semibold text-[#FF003C] tracking-wider uppercase mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF003C] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF003C]"></span>
            </span>
            Available for new opportunities
          </motion.div>
          
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm md:text-base font-mono uppercase tracking-[0.2em] text-zinc-500 mb-3"
          >
            Hello World, I'm
          </motion.span>

          {/* Clean, Massive Typographic Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.2 }}
            className="text-4xl xs:text-5xl md:text-7xl lg:text-8xl font-black font-display text-white mb-3 leading-[1.05] tracking-tight"
          >
            Kasi <span className="text-gradient-purple font-extrabold" style={{ '--color-accent': '#FF003C' } as React.CSSProperties}>Viswas</span>
          </motion.h1>

          {/* Typewriting Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold font-display text-zinc-400 mb-6 flex items-center gap-2"
          >
            <span>Full Stack</span>
            <span className="text-[#FF003C] bg-[#FF003C]/5 border border-[#FF003C]/20 px-2 py-0.5 rounded-md drop-shadow-[0_0_8px_rgba(255,0,60,0.2)]">
              <Typewriter
                words={['AI Engineer', 'Agent Architect', 'Developer']}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1800}
              />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-zinc-400 text-sm md:text-base mb-10 max-w-xl font-normal leading-relaxed"
          >
            I am a results-driven Full Stack MERN Developer specializing in building highly scalable, secure, and production-ready web architectures from the ground up. By combining robust database designs, Express services, and Node backends with polished, high-performance React user interfaces, I deliver complete end-to-end solutions. My focus is merging flawless technical engineering with premium visual designs to craft immersive and intuitive digital experiences.
          </motion.p>

          {/* Call-to-action buttons (Tactile Magnetic Buttons) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap gap-4 w-full sm:w-auto"
          >
            <motion.div
              style={{ x: springX, y: springY }}
              className="magnetic-btn"
            >
              <Link
                to="projects"
                smooth={true}
                duration={500}
                offset={-70}
                onMouseMove={handleBtnMouseMove}
                onMouseLeave={handleBtnMouseLeave}
                className="px-8 py-4 bg-gradient-to-r from-[#FF003C] to-[#FF3E6C] text-white rounded-xl font-bold text-sm shadow-[0_0_25px_rgba(255,0,60,0.25)] hover:shadow-[0_0_35px_rgba(255,0,60,0.45)] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </motion.div>

            <Link
              to="contact"
              smooth={true}
              duration={500}
              offset={-70}
              className="px-8 py-4 bg-transparent border border-white/10 text-gray-300 hover:text-white rounded-xl font-bold text-sm hover:bg-white/[0.03] hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare size={16} className="text-[#FF003C]" />
              <span>Contact Me</span>
            </Link>
          </motion.div>

        </div>

        {/* Right Column: Interactive 3D WebGL Canvas Model */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 45, damping: 16, delay: 0.3 }}
          className="xl:col-span-5 w-full flex items-center justify-center relative min-h-[280px] sm:min-h-[400px] md:min-h-[550px]"
        >
          {/* Ambient model back glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF003C]/8 to-transparent blur-[60px] rounded-full opacity-60 pointer-events-none"></div>

          {/* ThreeHero Component */}
          <ThreeHero />
        </motion.div>

      </div>

      {/* ── Statistics Section Below Hero ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 w-full relative z-10"
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-5 flowing-border-card card-shimmer-trail"
          >
            <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-[#FF003C] group-hover:scale-105 group-hover:bg-[#FF003C]/10 transition-all duration-300">
              {stat.icon}
            </div>
            <div>
              <div className="text-3xl font-extrabold font-display text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-500 uppercase font-mono tracking-widest mt-0.5">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </motion.div>

    </section>
  );
}
