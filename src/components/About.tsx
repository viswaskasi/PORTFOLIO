import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Cpu, Eye, FileCode, FileText } from 'lucide-react';
import TerminalIntro from './TerminalIntro';

const items = [
  {
    icon: <Cpu size={18} />,
    title: 'AI Architect',
    description: 'Developing autonomous LLM agent systems and LangChain pipelines.',
    glowColor: '#FF003C'
  },
  {
    icon: <Eye size={18} />,
    title: 'Computer Vision',
    description: 'Deploying real-time landmark recognition and image segmentation models.',
    glowColor: '#FF3E6C'
  }
];

const education = [
  {
    institution: 'Aditya Degree College, Visakhapatnam',
    degree: 'Bachelor of Computer Applications (BCA) – Computer Science',
    duration: 'July 2024 – April 2027',
    status: 'Pursuing',
    previewFile: 'bca_cs.md',
    jsonFile: 'aditya_bca.json',
    highlights: [
      'Specializing in Modern Web (MERN Stack) & Agentic AI Pipelines.',
      'Active development of scalable REST APIs, SSE streams and MongoDB database pipelines.',
      'Deep study of Data Structures, Algorithms, and clean system architecture.'
    ],
    jsonLines: [
      '{',
      '  "institution": "Aditya Degree College, Visakhapatnam",',
      '  "degree": "BCA (Computer Science)",',
      '  "duration": "July 2024 – April 2027",',
      '  "status": "Pursuing",',
      '  "focus": [',
      '    "MERN Stack",',
      '    "AI Agent Pipelines",',
      '    "Data Structures & Algorithms"',
      '  ]',
      '}'
    ]
  },
  {
    institution: 'NRI Junior College',
    degree: 'Intermediate – Mathematics, Physics, Chemistry (MPC)',
    duration: 'June 2022 – April 2024',
    status: 'Completed',
    previewFile: 'intermediate.md',
    jsonFile: 'nri_intermediate.json',
    highlights: [
      'Specialized in Mathematics, Physics, and Chemistry (MPC).',
      'Strong analytical base in logic, calculus, and scientific theory.'
    ],
    jsonLines: [
      '{',
      '  "institution": "NRI Junior College",',
      '  "stream": "Mathematics, Physics, Chemistry (MPC)",',
      '  "duration": "June 2022 – April 2024",',
      '  "status": "Completed"',
      '}'
    ]
  },
  {
    institution: 'Sree Krishna Grammar School',
    degree: 'Secondary School Certificate (SSC) – 10th Grade',
    duration: 'April 2021 – May 2022',
    status: 'Completed',
    previewFile: 'ssc_school.md',
    jsonFile: 'sree_krishna_ssc.json',
    highlights: [
      'Completed secondary board certificate with standard coursework.',
      'Active participation in science workshops and math competitions.'
    ],
    jsonLines: [
      '{',
      '  "institution": "Sree Krishna Grammar School",',
      '  "certificate": "Secondary School Certificate (SSC)",',
      '  "grade": "10th Grade",',
      '  "duration": "April 2021 – May 2022",',
      '  "status": "Completed"',
      '}'
    ]
  }
];

// Helper function to colorize JSON syntax in the code tab
function highlightJSONLine(line: string) {
  const parts = line.split('"');
  if (parts.length === 5) {
    const leading = parts[0];
    const key = parts[1];
    const middle = parts[2];
    const val = parts[3];
    const trailing = parts[4];
    
    const isStatus = key === 'status';
    const valColorClass = isStatus
      ? val === 'Pursuing' ? 'text-emerald-400 font-semibold' : 'text-zinc-400'
      : 'text-[#ce9178]'; // VS Code string color
      
    return (
      <span>
        {leading}
        <span className="text-[#9cdcfe]">"{key}"</span>
        <span className="text-zinc-400">{middle}</span>
        <span className={valColorClass}>"{val}"</span>
        <span className="text-zinc-400">{trailing}</span>
      </span>
    );
  } else if (parts.length === 3) {
    const leading = parts[0];
    const str = parts[1];
    const trailing = parts[2];
    
    const isKey = trailing.trim().startsWith(':');
    
    return (
      <span>
        {leading}
        <span className={isKey ? 'text-[#9cdcfe]' : 'text-[#ce9178]'}>"{str}"</span>
        <span className="text-zinc-400">{trailing}</span>
      </span>
    );
  }
  
  return <span className="text-zinc-400">{line}</span>;
}

interface EduItem {
  institution: string;
  degree: string;
  duration: string;
  status: string;
  previewFile: string;
  jsonFile: string;
  highlights: string[];
  jsonLines: string[];
}

function EducationCard({ edu }: { edu: EduItem }) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  return (
    <div className="w-full bg-[#0d0d11]/80 border border-white/[0.06] hover:border-[#FF003C]/30 rounded-xl overflow-hidden transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.4)] card-shimmer-trail">
      {/* Tab bar header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-black/40 border-b border-white/5 select-none">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Preview Tab Button */}
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-md text-[10px] sm:text-[11px] font-mono transition-all duration-200 cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-white/[0.08] text-white border border-white/10'
                : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
            }`}
          >
            <FileText size={11} className={activeTab === 'preview' ? 'text-sky-400' : 'text-zinc-500'} />
            <span className="hidden sm:inline">{edu.previewFile}</span>
            <span className="inline sm:hidden">Preview</span>
          </button>

          {/* Code Tab Button */}
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-md text-[10px] sm:text-[11px] font-mono transition-all duration-200 cursor-pointer ${
              activeTab === 'code'
                ? 'bg-white/[0.08] text-white border border-white/10'
                : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
            }`}
          >
            <FileCode size={11} className={activeTab === 'code' ? 'text-yellow-400' : 'text-zinc-500'} />
            <span className="hidden sm:inline">{edu.jsonFile}</span>
            <span className="inline sm:hidden">Code</span>
          </button>
        </div>

        {/* Window controls */}
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FF003C]/75"></span>
          <span className="w-2 h-2 rounded-full bg-yellow-500/75"></span>
          <span className="w-2 h-2 rounded-full bg-emerald-500/75"></span>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="p-3 sm:p-5 font-mono text-xs md:text-sm">
        {activeTab === 'preview' ? (
          /* Rendered Markdown Preview */
          <div className="text-zinc-300 space-y-4 font-sans text-left">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${
                edu.status === 'Pursuing'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
              }`}>
                {edu.status === 'Pursuing' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                {edu.status}
              </span>
              <span className="text-zinc-500 text-xs font-mono">{edu.duration}</span>
            </div>

            <div>
              <h4 className="text-lg md:text-xl font-bold font-display text-white tracking-tight group-hover:text-[#FF003C] transition-colors duration-300">
                {edu.institution}
              </h4>
              <p className="text-[#FF3E6C] font-mono text-xs mt-1">{edu.degree}</p>
            </div>

            {edu.highlights && edu.highlights.length > 0 && (
              <div className="pt-3 border-t border-white/5 space-y-2">
                <h5 className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold">Key Focus & Milestones</h5>
                <ul className="space-y-2">
                  {edu.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2 text-zinc-400 text-xs md:text-sm leading-relaxed font-light">
                      <span className="text-[#FF003C] mt-1 shrink-0 font-mono">▸</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          /* Syntax Highlighted JSON Code */
          <div className="flex gap-2 sm:gap-4 text-left leading-relaxed overflow-x-auto scrollbar-thin">
            {/* Line numbers */}
            <div className="text-zinc-600 select-none text-right w-4 sm:w-5 pr-1.5 sm:pr-2 border-r border-white/5 shrink-0">
              {edu.jsonLines.map((_, lineIdx) => (
                <div key={lineIdx}>{lineIdx + 1}</div>
              ))}
            </div>
            {/* Highlighting */}
            <div className="flex-1 whitespace-pre-wrap break-words font-mono text-[10px] sm:text-xs md:text-sm">
              {edu.jsonLines.map((line, lineIdx) => (
                <div key={lineIdx}>{highlightJSONLine(line)}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15
    }
  }
};

export default function About() {
  return (
    <section id="about" className="py-20 relative overflow-hidden bg-transparent">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-[-10%] w-[400px] h-[400px] bg-[#FF003C]/5 blur-[120px] rounded-full pointer-events-none"></div>

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
            <User size={12} />
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-tight">
            Crafting Cognitive Architectures <br />
            That <span className="text-gradient-purple" style={{ '--color-accent': '#FF003C' } as React.CSSProperties}>Drive Results</span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-[#FF003C] to-[#FF3E6C] rounded-full mt-4"></div>
        </motion.div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Story, Education, Subcards */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6 text-zinc-400 font-light text-base md:text-lg leading-relaxed"
            >
              <p>
                Hello! I'm <strong className="text-white font-medium">Kasi Viswas</strong>, a passionate and self-driven AI Engineer based in <strong className="text-white font-medium">Visakhapatnam, India</strong>, currently pursuing my BCA degree at Aditya Degree College.
              </p>
              <p>
                I specialize in the <strong className="text-white font-medium">generative AI space and agentic pipelines</strong>, creating scale-invariant systems using Python, LangChain, and advanced model routing. I love merging computer vision capabilities with intuitive full-stack user interfaces.
              </p>
              <p>
                As a versatile developer, I design and build highly optimized architectures for both frontend and backend cores. On the backend, I construct secure server logic, database pipelines, and high-throughput APIs. On the frontend, I focus on crafting premium, pixel-perfect user experiences with modern aesthetics, smooth micro-interactions, and state-of-the-art UI/UX design that merges flawless usability with visual excellence.
              </p>
              <p>
                Beyond traditional engineering, I actively embrace the modern <strong className="text-white font-medium">vibe coding</strong> paradigm. By orchestrating autonomous AI agents in a highly professional manner and crafting optimal, context-dense prompts, I coordinate complex multi-step development loops. This developer-agent synergy allows me to rapidly iterate, prototype, and scale production-ready systems while maintaining absolute command over architectural integrity and design aesthetics.
              </p>
            </motion.div>

            {/* Sub-cards: clean flowing border card styles with shimmer trail */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 flowing-border-card card-shimmer-trail flex items-start gap-4"
                >
                  <div 
                    className="p-3 rounded-xl shrink-0 transition-colors duration-300 relative z-10"
                    style={{
                      color: item.glowColor,
                      borderColor: `${item.glowColor}25`,
                      backgroundColor: `${item.glowColor}10`,
                      borderWidth: '1px'
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold font-display text-white mb-1">{item.title}</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed font-light">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Clean Professional Education Timeline */}
            <div className="pt-6 mt-2 border-t border-white/5 space-y-6">
              <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 mb-6 bg-white/[0.02] border border-white/5 py-1.5 px-3 rounded-lg w-fit">
                <span className="text-[#FF003C]">visitor@kasi-viswas</span>
                <span>:</span>
                <span className="text-[#FF3E6C]">~/education</span>
                <span>$</span>
                <span className="text-zinc-300">git log --oneline --graph</span>
              </div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="relative"
              >
                {education.map((edu, idx) => (
                  <motion.div 
                    key={idx}
                    variants={itemVariants}
                    className="flex gap-4 md:gap-6 items-stretch relative text-left"
                  >
                    {/* Git Graph Visualizer Column */}
                    <div className="w-8 md:w-16 shrink-0 relative flex justify-center">
                      {idx === 0 && (
                        <>
                          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <line x1="30" y1="0" x2="30" y2="100" stroke="#10b981" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                            <line x1="70" y1="20" x2="70" y2="100" stroke="#FF003C" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                          </svg>
                          <div className="absolute left-[70%] top-[20px] -translate-x-1/2 -translate-y-1/2 z-20">
                            <span className="relative flex h-3.5 w-3.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF003C]/70 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-[#FF003C] bg-[#09090b]"></span>
                            </span>
                          </div>
                        </>
                      )}

                      {idx === 1 && (
                        <>
                          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <line x1="30" y1="0" x2="30" y2="100" stroke="#10b981" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                            <path d="M 30,20 Q 70,20 70,0" fill="none" stroke="#FF003C" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                          </svg>
                          <div className="absolute left-[30%] top-[20px] -translate-x-1/2 -translate-y-1/2 z-20">
                            <span className="relative flex h-3 w-3">
                              <span className="relative inline-flex rounded-full h-3 w-3 border-2 border-emerald-500 bg-[#09090b]"></span>
                            </span>
                          </div>
                        </>
                      )}

                      {idx === 2 && (
                        <>
                          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <line x1="30" y1="0" x2="30" y2="100" stroke="#10b981" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                          </svg>
                          <div className="absolute left-[30%] top-[20px] -translate-x-1/2 -translate-y-1/2 z-20">
                            <span className="relative flex h-3 w-3">
                              <span className="relative inline-flex rounded-full h-3 w-3 border-2 border-emerald-500 bg-[#09090b]"></span>
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* The Interactive Editor Card */}
                    <div className="flex-1 pb-8">
                      <EducationCard edu={edu} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

          </div>

          {/* Right Column: Interactive Code Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className="lg:col-span-5 w-full relative"
          >
            {/* Ambient terminal backing glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF003C]/5 to-transparent blur-[40px] rounded-3xl opacity-50 pointer-events-none"></div>

            {/* Welcome TerminalIntro */}
            <TerminalIntro />
          </motion.div>

        </div>

      </div>
    </section>
  );
}
