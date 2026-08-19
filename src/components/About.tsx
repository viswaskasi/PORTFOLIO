import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Sparkles, 
  GraduationCap, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ArrowUpRight,
  Code2
} from 'lucide-react';

const NARRATIVE_TABS = [
  {
    id: 'story',
    label: 'Engineering Story',
    icon: <User size={14} />,
    headline: 'Building Scalable Web & Full-Stack Applications',
    content: (
      <>
        <p className="text-base text-[#2E3033] leading-relaxed font-medium">
          I'm <strong className="text-[#000000] font-black">Kasi Viswas</strong>, a Full Stack Developer based in Visakhapatnam, India. I specialize in building responsive, high-performance web applications using the modern JavaScript and Python ecosystems.
        </p>
        <p className="text-base text-[#2E3033] leading-relaxed font-medium mt-3">
          With a strong foundation in both frontend engineering (React, TypeScript, TailwindCSS) and backend architecture (Node.js, Express, MongoDB, Python), I turn complex requirements into clean, intuitive, and production-ready digital products.
        </p>
      </>
    )
  },
  {
    id: 'mindset',
    label: 'Development Philosophy',
    icon: <Sparkles size={14} />,
    headline: 'Clean Code, High Performance & User-First Design',
    content: (
      <>
        <p className="text-base text-[#2E3033] leading-relaxed font-medium">
          My development philosophy centers on <strong className="text-[#000000] font-black">simplicity, scalability, and speed</strong>. I believe great software should not only look good but also be effortless and fast for end users.
        </p>
        <p className="text-base text-[#2E3033] leading-relaxed font-medium mt-3">
          I leverage modern workflows, component-driven architectures, and rigorous testing to build clean, maintainable systems that scale smoothly over time.
        </p>
      </>
    )
  },
  {
    id: 'capabilities',
    label: 'Full-Stack Craft',
    icon: <Code2 size={14} />,
    headline: 'Frontend Precision Meets Backend Reliability',
    content: (
      <>
        <p className="text-base text-[#2E3033] leading-relaxed font-medium">
          On the frontend, I create modern, accessible, and responsive user interfaces with smooth micro-interactions and pixel-perfect layouts.
        </p>
        <p className="text-base text-[#2E3033] leading-relaxed font-medium mt-3">
          On the backend, I design secure RESTful APIs, manage database pipelines, and implement real-time event streams to ensure rock-solid data integrity and fast response times.
        </p>
      </>
    )
  }
];

const EDUCATION_TIMELINE = [
  {
    degree: 'BCA (Computer Science)',
    institution: 'Aditya Degree College, Visakhapatnam',
    period: '2024 – 2027',
    status: 'Pursuing',
    badge: 'Core Major',
    highlights: [
      'Specializing in Modern Web (MERN Stack) & Full-Stack Application Development',
      'Scalable REST APIs, Real-Time Streams, and Database Architecture (MongoDB / SQL)',
      'Data Structures, Algorithm Efficiency & Object-Oriented Software Design'
    ]
  },
  {
    degree: 'Intermediate (MPC)',
    institution: 'NRI Junior College',
    period: '2022 – 2024',
    status: 'Completed',
    badge: 'Math & Physics',
    highlights: [
      'Specialized in Mathematics, Physics, and Chemistry',
      'Strong analytical foundation in calculus, logic, and scientific problem-solving'
    ]
  },
  {
    degree: 'Secondary School (SSC)',
    institution: 'Sree Krishna Grammar School',
    period: '2021 – 2022',
    status: 'Completed',
    badge: '10th Board',
    highlights: [
      'Completed secondary board certificate with foundational science curriculum',
      'Active participant in regional mathematics & science Olympiads'
    ]
  }
];

export default function About() {
  const [activeNarrativeTab, setActiveNarrativeTab] = useState('story');
  const [selectedEduIndex, setSelectedEduIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState('');

  // Live time ticker for Visakhapatnam (IST / UTC+5:30)
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setCurrentTime(new Date().toLocaleTimeString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeTabContent = NARRATIVE_TABS.find(tab => tab.id === activeNarrativeTab) || NARRATIVE_TABS[0];
  const activeEdu = EDUCATION_TIMELINE[selectedEduIndex];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-transparent">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#F0F2F5] blur-[140px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D0D3D9] bg-[#FFFFFF] text-xs font-bold text-[#000000] mb-4 tracking-wider uppercase font-mono shadow-xs">
            <User size={12} />
            Professional Background & Story
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-[#000000] tracking-tight">
                About <span className="text-[#000000] font-black">Me</span>
              </h2>
              <div className="flex items-center gap-2 mt-4">
                <div className="h-1.5 w-16 bg-[#000000] rounded-full"></div>
                <div className="h-1.5 w-3 bg-[#66676A] rounded-full"></div>
              </div>
            </div>

            {/* Live Location & Status Ticker Pill */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#D0D3D9] text-xs font-mono font-bold text-[#000000] shadow-xs">
                <MapPin size={13} className="text-[#000000]" />
                <span>Visakhapatnam, IN</span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F8F9FB] border border-[#D0D3D9] text-xs font-mono font-bold text-[#000000] shadow-xs">
                <Clock size={13} className="text-[#000000]" />
                <span>{currentTime || 'IST (UTC+5:30)'}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── TOP NARRATIVE CARD ── */}
        <div className="w-full mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col p-6 sm:p-8 md:p-10 flowing-border-card card-shimmer-trail justify-between text-left"
          >
            <div>
              {/* Tab Selector */}
              <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-[#E5E7EB]">
                {NARRATIVE_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveNarrativeTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-black transition-all cursor-pointer ${
                      activeNarrativeTab === tab.id
                        ? 'bg-[#000000] text-white border border-[#000000] shadow-xs'
                        : 'bg-[#FFFFFF] text-[#2E3033] hover:text-[#000000] hover:bg-[#F8F9FB] border border-[#D0D3D9] hover:border-[#000000]'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Headline & Dynamic Copy */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNarrativeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4 max-w-4xl"
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-display text-[#000000] tracking-tight">
                    {activeTabContent.headline}
                  </h3>
                  <div className="text-base md:text-lg leading-relaxed">
                    {activeTabContent.content}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick Metrics Bar at Bottom */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-6 mt-8 border-t border-[#E5E7EB]">
              <div className="p-3.5 rounded-xl bg-[#F8F9FB] border border-[#D0D3D9] text-left">
                <span className="text-[10px] uppercase font-mono text-[#2E3033] font-black block">Role</span>
                <span className="text-xs sm:text-sm font-black text-[#000000]">Full Stack Dev</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8F9FB] border border-[#D0D3D9] text-left">
                <span className="text-[10px] uppercase font-mono text-[#2E3033] font-black block">Specialty</span>
                <span className="text-xs sm:text-sm font-black text-[#000000]">React & Node.js</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8F9FB] border border-[#D0D3D9] text-left">
                <span className="text-[10px] uppercase font-mono text-[#2E3033] font-black block">Focus</span>
                <span className="text-xs sm:text-sm font-black text-[#000000]">Web & AI Agents</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8F9FB] border border-[#D0D3D9] text-left">
                <span className="text-[10px] uppercase font-mono text-[#2E3033] font-black block">Availability</span>
                <span className="text-xs sm:text-sm font-black text-[#000000] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Open to Work
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── INTERACTIVE EDUCATION & ACADEMIC PATH HUB ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-6 sm:p-8 flowing-border-card card-shimmer-trail text-left"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#000000] text-white flex items-center justify-center border border-[#000000]">
                <GraduationCap size={20} />
              </div>
              <div>
                <h3 className="text-xl font-black font-display text-[#000000] tracking-tight">
                  Academic Journey & Credentials
                </h3>
                <p className="text-xs font-mono font-bold text-[#2E3033]">
                  Select an academic milestone to inspect focus areas
                </p>
              </div>
            </div>

            <span className="text-xs font-mono font-black px-3 py-1 rounded-full bg-[#F8F9FB] border border-[#D0D3D9] text-[#000000] w-fit">
              Aditya Degree College • CS
            </span>
          </div>

          {/* Stepper Grid: Left 3 Milestones Selector + Right Expanded Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 3 Milestone Buttons */}
            <div className="lg:col-span-5 space-y-3">
              {EDUCATION_TIMELINE.map((item, idx) => {
                const isSelected = selectedEduIndex === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedEduIndex(idx)}
                    className={`w-full p-4 rounded-xl text-left transition-all cursor-pointer flex items-center justify-between border ${
                      isSelected
                        ? 'bg-[#000000] text-white border-[#000000] shadow-sm'
                        : 'bg-[#FFFFFF] text-[#2E3033] hover:text-[#000000] hover:bg-[#F8F9FB] border-[#D0D3D9] hover:border-[#000000]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded border ${
                          isSelected 
                            ? 'bg-white/20 border-white/30 text-white' 
                            : 'bg-[#F8F9FB] border-[#D0D3D9] text-[#000000]'
                        }`}>
                          {item.badge}
                        </span>
                        <span className={`text-xs font-mono font-bold ${isSelected ? 'text-white/80' : 'text-[#2E3033]'}`}>
                          {item.period}
                        </span>
                      </div>
                      <h4 className={`text-sm font-black font-display tracking-tight ${isSelected ? 'text-white' : 'text-[#000000]'}`}>
                        {item.degree}
                      </h4>
                      <p className={`text-xs truncate max-w-[240px] sm:max-w-none mt-0.5 ${isSelected ? 'text-white/70 font-medium' : 'text-[#2E3033] font-semibold'}`}>
                        {item.institution}
                      </p>
                    </div>

                    <ArrowUpRight size={16} className={`shrink-0 transition-transform ${isSelected ? 'text-white translate-x-1 -translate-y-1' : 'text-[#2E3033]'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Detailed Inspector Panel */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-[#F8F9FB] border border-[#D0D3D9] space-y-5">
              <div className="flex items-start justify-between gap-4 flex-wrap pb-4 border-b border-[#E5E7EB]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full bg-[#000000] text-white">
                      {activeEdu.status}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#2E3033]">
                      {activeEdu.period}
                    </span>
                  </div>
                  <h4 className="text-xl font-black font-display text-[#000000] tracking-tight">
                    {activeEdu.degree}
                  </h4>
                  <p className="text-xs font-mono font-bold text-[#2E3033] mt-0.5">
                    {activeEdu.institution}
                  </p>
                </div>
              </div>

              {/* Highlights Bullet List */}
              <div className="space-y-3">
                <h5 className="text-[10px] uppercase font-mono tracking-widest text-[#000000] font-black">
                  Key Curriculum & Technical Competencies
                </h5>

                <div className="space-y-2.5">
                  {activeEdu.highlights.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs text-[#2E3033] font-semibold leading-relaxed">
                      <CheckCircle2 size={14} className="text-[#000000] shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Snippet Tag */}
              <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#D0D3D9] flex items-center justify-between text-xs font-mono font-bold text-[#000000]">
                <span>Status Verified: 100% Certified Academic Record</span>
                <span className="text-emerald-700 font-bold">● Active</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
