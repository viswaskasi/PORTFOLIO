import { motion } from 'framer-motion';
import { Cpu, Check } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import TechStackFloating from './TechStackFloating';

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      damping: 15,
    },
  },
};

const skills = [
  { 
    name: 'LangChain.js & LangGraph', 
    level: 95, 
    color: '#000000', 
    glow: 'rgba(0, 0, 0, 0.15)', 
    category: 'AI & Agents', 
    desc: 'Multi-agent routing, self-correcting loops, memory states, custom tool bindings.',
    logo: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" className="animate-pulse" />
      </svg>
    )
  },
  { 
    name: 'Generative Models', 
    level: 92, 
    color: '#000000', 
    glow: 'rgba(0, 0, 0, 0.15)', 
    category: 'AIML', 
    desc: 'Structured generation, system prompt tuning, embeddings, vector indexing.',
    logo: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21m0 0l-1.813-5.096M9 21h7.5M12 3v13.5M3 12h18M5.25 5.25l13.5 13.5M18.75 5.25L5.25 18.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a6 6 0 00-6 6c0 2.22 1 4.22 2.5 5.5.5.5.5 1.5.5 2h6s0-1.5.5-2c1.5-1.28 2.5-3.28 2.5-5.5a6 6 0 00-6-6z" />
      </svg>
    )
  },
  { 
    name: 'React.js & TS', 
    level: 90, 
    color: '#000000', 
    glow: 'rgba(0, 0, 0, 0.15)', 
    category: 'Frontend', 
    desc: 'Custom hooks, WebGL canvases, real-time dashboards, state management.',
    logo: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse rx="8" ry="3" cx="12" cy="12" transform="rotate(0 12 12)" />
        <ellipse rx="8" ry="3" cx="12" cy="12" transform="rotate(60 12 12)" />
        <ellipse rx="8" ry="3" cx="12" cy="12" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    )
  },
  { 
    name: 'Python', 
    level: 92, 
    color: '#000000', 
    glow: 'rgba(0, 0, 0, 0.15)', 
    category: 'Languages', 
    desc: 'Deep learning scripts, API routing, OpenCV, NumPy data pipelines.',
    logo: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.5 2 6.5 4.5 6.5 4.5v3h5.5v1H5S2 8.5 2 13.5s3 5.5 3 5.5h2v-2.5c0-2.5 2-4.5 4.5-4.5h5V9.5C19.5 4.5 15.5 2 12 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22c5.5 0 5.1-2.4 5.1-2.4v-3h-5.5v-1h7S22 15.5 22 10.5s-3-5.5-3-5.5h-2v2.5c0 2.5-2 4.5-4.5 4.5h-5v2.5c0 5 4 7.5 7.5 7.5z" />
        <circle cx="9" cy="6" r="0.75" fill="currentColor" />
        <circle cx="15" cy="18" r="0.75" fill="currentColor" />
      </svg>
    )
  },
  { 
    name: 'Node.js & Express', 
    level: 88, 
    color: '#000000', 
    glow: 'rgba(0, 0, 0, 0.15)', 
    category: 'Backend', 
    desc: 'Server-Sent Events (SSE) streaming, REST APIs, JSON parsing pipelines.',
    logo: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    )
  },
  { 
    name: 'MongoDB', 
    level: 88, 
    color: '#000000', 
    glow: 'rgba(0, 0, 0, 0.15)', 
    category: 'Databases', 
    desc: 'Aggregation pipelines, indexing, vector search, database management.',
    logo: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v11M9 9h6" />
      </svg>
    )
  },
  { 
    name: 'OpenCV & MediaPipe', 
    level: 86, 
    color: '#000000', 
    glow: 'rgba(0, 0, 0, 0.15)', 
    category: 'Computer Vision', 
    desc: 'HCI gesture tracking, hand landmark coordinates, image preprocessors.',
    logo: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8V5a2 2 0 012-2h3M16 3h3a2 2 0 012 2v3M21 16v3a2 2 0 01-2 2h-3M8 21H5a2 2 0 01-2-2v-3" />
      </svg>
    )
  },
  { 
    name: 'Data Structures (DSA)', 
    level: 85, 
    color: '#000000', 
    glow: 'rgba(0, 0, 0, 0.15)', 
    category: 'Computer Science', 
    desc: 'Algorithmic efficiency analysis, logic trees, searching and sorting.',
    logo: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="5" r="2" fill="currentColor" />
        <circle cx="6" cy="12" r="2" />
        <circle cx="18" cy="12" r="2" />
        <circle cx="6" cy="19" r="2" />
        <circle cx="18" cy="19" r="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7l-5 3M12 7l5 3M6 14v3M18 14v3" />
      </svg>
    )
  }
];

export default function Skills() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  
  // Interactive Drag State
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startAngle = useRef(0);
  const currentAngle = useRef(0);
  const isHoveredRef = useRef(false);

  // Mouse 3D tilt tracking for the cylinder container
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isDragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTiltX(-y * 0.03); 
    setTiltY(x * 0.03);
  };

  const handleMouseLeave = () => {
    setTiltX(0);
    setTiltY(0);
  };

  // Sync isHovered state with ref for the requestAnimationFrame loop
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  // Smooth rotation animation frame loop
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (!isDragging.current) {
        const speed = isHoveredRef.current ? 0 : 0.06;
        currentAngle.current = (currentAngle.current + speed) % 360;
      }

      if (spinnerRef.current) {
        spinnerRef.current.style.transform = `rotateY(${currentAngle.current}deg)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Global mouse & touch events for drag rotation
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - startX.current;
      const sensitivity = 0.45;
      currentAngle.current = startAngle.current + dx * sensitivity;
    };

    const handleGlobalMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        document.body.classList.remove('cursor-grabbing');
        if (containerRef.current) {
          containerRef.current.classList.remove('is-dragging');
        }
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      if (e.cancelable) {
        e.preventDefault();
      }
      const dx = e.touches[0].clientX - startX.current;
      const sensitivity = 0.6;
      currentAngle.current = startAngle.current + dx * sensitivity;
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
    window.addEventListener('touchend', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);

  // Mouse drag triggers
  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    isDragging.current = true;
    startX.current = e.clientX;
    startAngle.current = currentAngle.current;
    document.body.classList.add('cursor-grabbing');
    if (containerRef.current) {
      containerRef.current.classList.add('is-dragging');
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    startAngle.current = currentAngle.current;
    if (containerRef.current) {
      containerRef.current.classList.add('is-dragging');
    }
  };

  const activeSkill = skills[activeIdx];

  const domains = [
    {
      category: 'Languages',
      items: ['Python', 'JavaScript', 'TypeScript', 'C Programming', 'Java', 'SQL'],
      color: '#000000'
    },
    {
      category: 'Libraries & Frameworks',
      items: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'LangChain.js', 'LangGraph', 'NumPy'],
      color: '#000000'
    },
    {
      category: 'Tools & Platforms',
      items: ['Git & GitHub', 'VS Code', 'Vite', 'Jupyter Notebook', 'Postman', 'Atlas Vector Search'],
      color: '#000000'
    },
    {
      category: 'Concepts & Systems',
      items: ['Data Structures & Algorithms (DSA)', 'Object-Oriented Programming (OOP)', 'Database Management (DBMS)', 'Computer Networking', 'REST APIs'],
      color: '#000000'
    },
    {
      category: 'AI & Advanced APIs',
      items: ['Gemini API', 'NVIDIA API', 'LangGraph Agentics', 'Generative AI Integration', 'Prompt Engineering'],
      color: '#000000'
    },
    {
      category: 'Soft Skills & Execution',
      items: ['Problem Solving', 'Self-Learning', 'Analytical Thinking', 'Attention to Detail'],
      color: '#000000'
    }
  ];

  return (
    <section id="skills" className="py-20 relative bg-transparent overflow-hidden">
      {/* TechStack Floating Particles in Background */}
      <TechStackFloating />

      {/* Dynamic 3D Styles */}
      <style>{`
        .tech-carousel-container {
          perspective: 1200px;
          transform-style: preserve-3d;
          user-select: none;
        }
        .tech-carousel-container.is-dragging .tech-carousel-card {
          pointer-events: none;
        }
        .tech-carousel-spinner {
          transform-style: preserve-3d;
          will-change: transform;
        }
        .tech-carousel-card {
          will-change: transform;
        }
        :root {
          --carousel-radius: 200px;
        }
        @media (max-width: 1400px) {
          :root {
            --carousel-radius: 180px;
          }
        }
        @media (max-width: 1280px) {
          :root {
            --carousel-radius: 160px;
          }
        }
        @media (max-width: 1024px) {
          :root {
            --carousel-radius: 200px;
          }
        }
        @media (max-width: 768px) {
          :root {
            --carousel-radius: 140px;
          }
        }
        @media (max-width: 480px) {
          :root {
            --carousel-radius: 105px;
          }
        }
      `}</style>

      {/* Background Glow */}
      <div className="absolute top-1/2 right-[-10%] w-[450px] h-[450px] bg-[#F0F2F5] blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D0D3D9] bg-[#FFFFFF] text-xs font-bold text-[#000000] mb-4 tracking-wider uppercase font-mono shadow-xs">
            <Cpu size={12} />
            Stack & Competencies
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-display text-[#000000] tracking-tight">
            Technical <span className="text-[#000000] font-black">Skills</span>
          </h2>
          <div className="flex items-center gap-2 mt-4">
            <div className="h-1.5 w-16 bg-[#000000] rounded-full"></div>
            <div className="h-1.5 w-3 bg-[#66676A] rounded-full"></div>
          </div>
          <p className="mt-4 text-[#2E3033] max-w-2xl font-semibold text-base md:text-lg">
            Mastery across generative AI, local LLM orchestration, full-stack frameworks, vector databases, and real-time computer vision.
          </p>
        </motion.div>

        {/* Interactive Main Area: Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-24">
          
          {/* Left Side: Active Card Detail HUD */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 text-left order-2 lg:order-1">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="p-6 md:p-8 rounded-2xl border border-[#D0D3D9] bg-[#FFFFFF] shadow-sm relative overflow-hidden transition-all duration-300 hover:border-[#000000]"
            >
              {/* Top ambient highlight line */}
              <div 
                className="absolute top-0 left-0 right-0 h-[2px] opacity-100 bg-[#000000]"
              />
              
              {/* Category & Badge */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#000000] border border-[#D0D3D9] bg-[#F8F9FB] px-3 py-1 rounded-full font-black">
                  {activeSkill.category}
                </span>
                <span style={{ color: '#000000' }} className="scale-110">
                  {activeSkill.logo}
                </span>
              </div>

              {/* Title & Desc */}
              <div className="space-y-3">
                <h3 className="text-2xl font-black font-display text-[#000000] tracking-tight">
                  {activeSkill.name}
                </h3>
                <p className="text-sm text-[#2E3033] font-medium leading-relaxed">
                  {activeSkill.desc}
                </p>
              </div>

              {/* Dynamic Progress Meter */}
              <div className="space-y-2 pt-6 border-t border-[#E5E7EB] mt-6">
                <div className="flex justify-between items-center text-xs font-mono font-black">
                  <span className="text-[#2E3033] tracking-wider">ENGINE PROFICIENCY</span>
                  <span className="text-sm text-[#000000]">{activeSkill.level}%</span>
                </div>
                <div className="h-2.5 w-full bg-[#F8F9FB] rounded-full overflow-hidden border border-[#D0D3D9] relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${activeSkill.level}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-[#000000] to-[#333538]"
                  />
                </div>
              </div>
            </motion.div>

            {/* Instruction Helper Text */}
            <p className="text-xs font-mono tracking-wider text-[#000000] pl-2 font-black">
              ▲ HOVER OVER COGNITIVE CHIPS IN THE REACTOR OR HOLD AND DRAG TO SPIN
            </p>
          </div>

          {/* Right Side: 3D Ring Carousel */}
          <div 
            ref={containerRef}
            className="lg:col-span-7 flex items-center justify-center relative min-h-[380px] md:min-h-[440px] cursor-grab active:cursor-grabbing order-1 lg:order-2"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
            <div 
              className="tech-carousel-container w-full h-[380px] md:h-[440px] flex items-center justify-center relative"
              style={{
                transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                transition: 'transform 0.15s ease-out'
              }}
            >
              
              {/* Central Core Indicator Point */}
              <div className="absolute w-12 h-12 rounded-full border border-[#D0D3D9] bg-[#FFFFFF] shadow-sm flex items-center justify-center pointer-events-none z-0">
                <span className="w-4 h-4 rounded-full bg-[#000000] animate-ping opacity-25"></span>
                <span className="absolute w-2 h-2 rounded-full bg-[#000000]"></span>
              </div>

              {/* Spinning Cylinder Parent */}
              <div 
                ref={spinnerRef}
                className="tech-carousel-spinner w-full h-full absolute flex items-center justify-center"
              >
                {skills.map((skill, idx) => {
                  const angle = (idx / skills.length) * 360;
                  const isCardActive = activeIdx === idx;

                  return (
                    <div
                      key={idx}
                      className={`tech-carousel-card absolute w-28 md:w-32 p-3.5 rounded-2xl bg-[#FFFFFF] border transition-all duration-300 cursor-pointer flex flex-col items-center justify-center ${
                        isCardActive
                          ? 'border-2 border-[#000000] shadow-[0_10px_30px_rgba(0,0,0,0.15)]'
                          : 'border-[#D0D3D9] shadow-xs'
                      }`}
                      style={{
                        transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(var(--carousel-radius)) scale(${
                          isCardActive ? 1.12 : 1
                        })`,
                        transformStyle: 'preserve-3d',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        left: '50%',
                        top: '50%',
                      }}
                      onMouseEnter={() => {
                        setActiveIdx(idx);
                        setIsHovered(true);
                      }}
                      onMouseLeave={() => {
                        setIsHovered(false);
                      }}
                    >
                      {/* Icon */}
                      <div 
                        className="mb-2 text-[#000000] group-hover:scale-110 transition-transform duration-300"
                      >
                        {skill.logo}
                      </div>

                      {/* Name */}
                      <h4 className="text-[10px] md:text-[11px] font-black font-display text-[#000000] text-center tracking-tight mb-0.5 max-w-full truncate select-none">
                        {skill.name.split(' & ')[0]}
                      </h4>

                      {/* Category Badge */}
                      <span className="text-[7px] uppercase font-mono tracking-widest text-[#2E3033] mb-2 select-none font-bold">
                        {skill.category}
                      </span>

                      {/* Level bubble */}
                      <div 
                        className="px-2 py-0.5 rounded-full text-[8px] font-black font-mono border border-[#D0D3D9] bg-[#F8F9FB] text-[#000000] select-none"
                      >
                        {skill.level}%
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

        {/* Secondary core tools list */}
        <div className="mt-20 space-y-8">
          <div className="text-center">
            <h4 className="text-xs uppercase font-mono tracking-[0.2em] text-[#000000] font-black mb-2">Technical Core Domains</h4>
            <div className="w-12 h-1 bg-[#000000] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains.map((group, groupIdx) => (
              <div 
                key={groupIdx} 
                className="p-6 flowing-border-card card-shimmer-trail flex flex-col justify-start text-left relative overflow-hidden"
              >
                {/* Header */}
                <h5 
                  className="text-xs uppercase font-mono tracking-wider font-black mb-4 border-b border-[#E5E7EB] pb-2.5 relative z-10 flex justify-between items-center text-[#000000]"
                >
                  <span>{group.category}</span>
                </h5>

                {/* Staggered Vertical List */}
                <motion.ul
                  variants={listVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  className="space-y-3 relative z-10"
                >
                  {group.items.map((item, idx) => (
                    <motion.li
                      key={idx}
                      variants={listItemVariants}
                      className="flex items-center gap-2.5 text-xs text-[#2E3033] font-bold group/item transition-colors duration-300 hover:text-[#000000]"
                    >
                      <Check size={14} className="shrink-0 text-[#000000] transition-transform duration-300 group-hover/item:scale-125 stroke-[2.5]" />
                      <span className="font-sans font-bold text-[#2E3033] group-hover/item:text-[#000000] transition-colors">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
