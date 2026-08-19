import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scroller } from 'react-scroll';
import { 
  X, 
  Brain, 
  Bot, 
  User, 
  Send, 
  ArrowRight, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Compass, 
  FileText 
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  action?: {
    label: string;
    target: 'scroll' | 'resume' | 'recruiter' | 'link';
    value: string;
  };
}

interface AIAssistantProps {
  onViewResume?: () => void;
  onOpenRecruiterMode?: () => void;
}

const NAV_SHORTCUTS = [
  { label: '🚀 Projects', target: 'projects' },
  { label: '⚡ Skills', target: 'skills' },
  { label: '👤 About Me', target: 'about' },
  { label: '🏆 Certifications', target: 'experience' },
  { label: '📬 Contact', target: 'contact' }
];

const PRESETS = [
  'Who is Viswas?',
  'What are his core skills?',
  'Show top projects',
  'Academic background',
  'How to contact & hire?'
];

const KNOWLEDGE_RESPONSES = [
  {
    keywords: ['who', 'about', 'viswas', 'background', 'intro', 'creator', 'yourself', 'summary'],
    answer: "Kasi Viswas is a Full Stack Developer & AI Engineer based in Visakhapatnam, India.\n\nHe crafts reactive web applications with React 19 & TypeScript, and engineers autonomous AI agent systems with LangChain and Python.",
    action: { label: 'Explore About Section', target: 'scroll' as const, value: 'about' }
  },
  {
    keywords: ['skill', 'stack', 'tech', 'languages', 'frontend', 'backend', 'technologies', 'react', 'python', 'node'],
    answer: "Technical Stack Summary:\n\n• AI/Agents: LangChain.js, LangGraph, Gemini & NVIDIA APIs, ChromaDB, MongoDB Vector Search.\n• Frontend: React 19, TypeScript, TailwindCSS, Three.js, WebGL, Vite.\n• Backend: Node.js, Express, Python, MongoDB Atlas, REST APIs, SSE, WebSockets.\n• Systems: Data Structures & Algorithms, OpenCV, MediaPipe, Git.",
    action: { label: 'View 3D Skills Matrix', target: 'scroll' as const, value: 'skills' }
  },
  {
    keywords: ['project', 'work', 'showcase', 'apps', 'repo'],
    answer: "Featured Projects Built by Viswas:\n\n1. VYRIS 8.0: 100% offline local AI voice butler (Gemma 4 GGUF, ChromaDB, Silero VAD).\n2. V-CHAT: Multi-LLM chat ecosystem with live SSE token streams & React sandbox rendering.\n3. Gesture Volume Controller: Touchless hand tracking audio controller with MediaPipe & OpenCV.\n4. AI Background Remover: Automated U2-Net deep learning segmentation pipeline.",
    action: { label: 'Explore Featured Projects', target: 'scroll' as const, value: 'projects' }
  },
  {
    keywords: ['vyris', 'offline', 'voice assistant', 'gemma'],
    answer: "VYRIS 8.0 is a 100% offline local AI butler:\n\n• Local Inference: Runs on Gemma 4 GGUF models with multi-brain dynamic routing.\n• Zero Latency: 0.4ms ChromaDB vector cache lookup.\n• Complete Privacy: No cloud dependency, with WebSockets live telemetry.",
    action: { label: 'Jump to Project Showcase', target: 'scroll' as const, value: 'projects' }
  },
  {
    keywords: ['vchat', 'v-chat', 'chat bot', 'multi-llm', 'sse'],
    answer: "V-CHAT is a full-stack multi-LLM workspace:\n\n• Multi-LLM Engine: Auto-routing across Gemini, NVIDIA NIM, and local Ollama.\n• Live Streaming: 48+ tokens/sec via Server-Sent Events (SSE).\n• Live Component Sandbox: Renders and previews React UI artifacts directly in chat.",
    action: { label: 'Jump to Project Showcase', target: 'scroll' as const, value: 'projects' }
  },
  {
    keywords: ['education', 'college', 'degree', 'study', 'school', 'academic', 'bca'],
    answer: "Academic Qualifications:\n\n🎓 BCA (Computer Science): Aditya Degree College, Visakhapatnam (2024–2027, Pursuing).\n📚 Intermediate (MPC): NRI Junior College (2022–2024).\n📚 Secondary (SSC): Sree Krishna Grammar School (2021–2022).",
    action: { label: 'View Academic Path', target: 'scroll' as const, value: 'about' }
  },
  {
    keywords: ['certification', 'certificate', 'training', 'milestone', 'experience', 'award'],
    answer: "Certifications & Experience:\n\n✓ Full Stack Web Development Specialization (MERN Stack).\n✓ Applied Generative AI & Autonomous Agent Architecture.\n✓ Active Open Source Contributor on GitHub.",
    action: { label: 'View Certifications & Timeline', target: 'scroll' as const, value: 'experience' }
  },
  {
    keywords: ['contact', 'hire', 'email', 'phone', 'reach', 'job', 'interview', 'opportunity', 'location', 'available'],
    answer: "Contact & Hire Coordinates:\n\n📧 Email: viswaskasi2006@gmail.com\n📱 Phone: +91 8074800497\n📍 Location: Visakhapatnam, Andhra Pradesh, India\n🌐 GitHub: github.com/viswaskasi\n💼 LinkedIn: linkedin.com/in/kasi-viswas\n\n⚡ Status: Open for Software Engineer, Full Stack, and AI Engineer roles globally (Remote / On-site). Guaranteed response time: < 2 Hours.",
    action: { label: 'Go to Contact Hub', target: 'scroll' as const, value: 'contact' }
  },
  {
    keywords: ['navigate', 'where', 'find', 'section', 'guide', 'menu'],
    answer: "Portfolio Navigation Guide:\n\n• Home: Live 3D reactor model & recruiter summary.\n• About: Engineering narrative & academic path.\n• Skills: 3D interactive cylinder & technical domains.\n• Projects: Production AI pipelines & repositories.\n• Certifications: Academic milestones & certifications.\n• Contact: Direct communication hub & transmission form.\n• Keyboard Shortcut: Press ⌘K (or click Search) anytime to open Command Palette.",
    action: { label: 'Scroll to Top', target: 'scroll' as const, value: 'home' }
  }
];

export default function AIAssistant({ onViewResume, onOpenRecruiterMode }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: '1', 
      sender: 'assistant', 
      text: "👋 Welcome! I am Genesis Agent, your AI guide to Kasi Viswas's portfolio.\n\nAsk me any question, or use the navigation chips below to explore projects, skills, academic degrees, and contact details."
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);

  // Reliable scroll inside chatbox
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const scrollToSection = (target: string) => {
    scroller.scrollTo(target, {
      duration: 600,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -70
    });
  };

  const handleActionClick = (action: NonNullable<ChatMessage['action']>) => {
    if (action.target === 'scroll') {
      scrollToSection(action.value);
    } else if (action.target === 'resume' && onViewResume) {
      onViewResume();
    } else if (action.target === 'recruiter' && onOpenRecruiterMode) {
      onOpenRecruiterMode();
    } else if (action.target === 'link') {
      window.open(action.value, '_blank');
    }
  };

  const handleQuery = (text: string) => {
    const query = text.trim();
    if (!query || isTyping) return;

    setMessages(prev => [...prev, { id: `user-${Date.now()}`, sender: 'user', text: query }]);
    setInputVal('');
    setIsTyping(true);

    const lowerQuery = query.toLowerCase();

    // Check for direct navigation commands
    if (lowerQuery.includes('go to project') || lowerQuery.includes('navigate to project') || lowerQuery.includes('show project')) {
      setTimeout(() => {
        scrollToSection('projects');
        setMessages(prev => [...prev, {
          id: `agent-${Date.now()}`,
          sender: 'assistant',
          text: "🚀 Navigated to Featured Projects section.",
          action: { label: 'Explore Projects', target: 'scroll', value: 'projects' }
        }]);
        setIsTyping(false);
      }, 400);
      return;
    }

    if (lowerQuery.includes('go to skill') || lowerQuery.includes('navigate to skill') || lowerQuery.includes('show skill')) {
      setTimeout(() => {
        scrollToSection('skills');
        setMessages(prev => [...prev, {
          id: `agent-${Date.now()}`,
          sender: 'assistant',
          text: "⚡ Navigated to Core Technical Domains & Skills Matrix.",
          action: { label: 'View Skills', target: 'scroll', value: 'skills' }
        }]);
        setIsTyping(false);
      }, 400);
      return;
    }

    if (lowerQuery.includes('go to contact') || lowerQuery.includes('navigate to contact') || lowerQuery.includes('hire') || lowerQuery.includes('reach')) {
      setTimeout(() => {
        scrollToSection('contact');
        setMessages(prev => [...prev, {
          id: `agent-${Date.now()}`,
          sender: 'assistant',
          text: "📬 Navigated to Direct Coordinates & Contact form.",
          action: { label: 'Go to Contact', target: 'scroll', value: 'contact' }
        }]);
        setIsTyping(false);
      }, 400);
      return;
    }

    if (lowerQuery.includes('resume') || lowerQuery.includes('cv')) {
      setTimeout(() => {
        if (onViewResume) onViewResume();
        setMessages(prev => [...prev, {
          id: `agent-${Date.now()}`,
          sender: 'assistant',
          text: "📄 Opened Kasi Viswas's verified Resume PDF viewer.",
          action: { label: 'Open Resume PDF', target: 'resume', value: 'resume' }
        }]);
        setIsTyping(false);
      }, 400);
      return;
    }

    if (lowerQuery.includes('recruiter') || lowerQuery.includes('hud') || lowerQuery.includes('brief')) {
      setTimeout(() => {
        if (onOpenRecruiterMode) onOpenRecruiterMode();
        setMessages(prev => [...prev, {
          id: `agent-${Date.now()}`,
          sender: 'assistant',
          text: "📊 Opened Recruiter Intelligence HUD with one-click highlights.",
          action: { label: 'Open Recruiter Mode', target: 'recruiter', value: 'recruiter' }
        }]);
        setIsTyping(false);
      }, 400);
      return;
    }

    // Knowledge base matcher
    setTimeout(() => {
      const matched = KNOWLEDGE_RESPONSES.find(item => 
        item.keywords.some(k => lowerQuery.includes(k))
      );

      const reply = matched 
        ? matched.answer 
        : "I can answer any question about Viswas's portfolio.\n\nAsk about his core skills (React, Python, LangChain), featured projects (VYRIS, V-CHAT), education, or how to contact and hire him!";

      const action = matched?.action;

      setMessages(prev => [...prev, { 
        id: `agent-${Date.now()}`, 
        sender: 'assistant', 
        text: reply,
        action 
      }]);
      setIsTyping(false);
    }, 500);
  };

  const handleResetChat = () => {
    setMessages([
      { id: `reset-${Date.now()}`, sender: 'assistant', text: '👋 Conversation reset. How can I guide you through Viswas\'s portfolio?' }
    ]);
    setInputVal('');
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-4 right-4 xs:bottom-6 xs:right-6 z-45">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Genesis AI Assistant"
          className="w-14 h-14 rounded-full bg-[#000000] hover:bg-[#1C1C1C] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.18)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.22)] transition-all cursor-pointer border border-[#000000] relative"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="relative">
                <Brain size={22} className="text-white" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed z-50 bg-[#FFFFFF] flex flex-col text-xs md:text-sm text-left shadow-[0_20px_60px_rgba(0,0,0,0.2)] overflow-hidden transition-all duration-300 ${
              isFullScreen
                ? 'inset-0 h-full w-full rounded-none border-none'
                : 'bottom-0 left-0 right-0 h-[65vh] max-h-[540px] rounded-t-3xl border-t border-x border-[#D0D3D9] md:bottom-24 md:right-6 md:left-auto md:w-[400px] md:h-[560px] md:rounded-3xl md:border md:border-[#D0D3D9]'
            }`}
          >
            {/* Mobile Sheet Grab Indicator */}
            {!isFullScreen && (
              <div className="md:hidden w-full flex justify-center pt-2 pb-1 bg-[#F8F9FB] select-none">
                <div className="w-12 h-1.5 rounded-full bg-[#D0D3D9]" />
              </div>
            )}

            {/* Header */}
            <div className="px-4 py-3 border-b border-[#E5E7EB] bg-[#F8F9FB] flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#000000] text-white flex items-center justify-center shadow-xs">
                  <Bot size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-black text-[#000000]">
                    <span>GENESIS AGENT</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <span className="text-[9px] font-mono text-[#2E3033] font-bold block">
                    Portfolio Intelligence & Navigator
                  </span>
                </div>
              </div>

              {/* Action Buttons: Reset, Fullscreen Toggle, Close */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="p-1.5 rounded-lg bg-[#FFFFFF] border border-[#D0D3D9] text-[#2E3033] hover:text-[#000000] hover:bg-[#F8F9FB] transition-colors cursor-pointer shadow-2xs"
                >
                  <RotateCcw size={14} />
                </button>

                <button
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  title={isFullScreen ? "Switch to Mini Box" : "Full Screen Mode"}
                  className="p-1.5 rounded-lg bg-[#FFFFFF] border border-[#D0D3D9] text-[#2E3033] hover:text-[#000000] hover:bg-[#F8F9FB] transition-colors cursor-pointer shadow-2xs"
                >
                  {isFullScreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="p-1.5 rounded-lg bg-[#FFFFFF] border border-[#D0D3D9] text-[#2E3033] hover:text-[#000000] hover:bg-[#F8F9FB] transition-colors cursor-pointer shadow-2xs"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Quick Navigation Toolbar */}
            <div 
              data-lenis-prevent="true"
              className="px-3 py-1.5 bg-[#FFFFFF] border-b border-[#E5E7EB] flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0"
            >
              <div className="flex items-center gap-1 text-[9px] font-mono font-black uppercase text-[#000000] pr-1 shrink-0">
                <Compass size={11} />
                <span>Jump:</span>
              </div>
              {NAV_SHORTCUTS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSection(item.target)}
                  className="shrink-0 px-2 py-0.5 rounded-md bg-[#F8F9FB] hover:bg-[#000000] hover:text-white border border-[#D0D3D9] hover:border-[#000000] text-[10px] font-mono font-bold text-[#000000] transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}

              {onViewResume && (
                <button
                  onClick={onViewResume}
                  className="shrink-0 px-2 py-0.5 rounded-md bg-[#000000] text-white border border-[#000000] hover:bg-[#1C1C1C] text-[10px] font-mono font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <FileText size={10} />
                  <span>Resume</span>
                </button>
              )}
            </div>

            {/* Message Feed with lenis prevention and smooth scrolling */}
            <div 
              ref={feedRef}
              data-lenis-prevent="true"
              style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
              className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 scrollbar-thin bg-[#FFFFFF] min-h-0"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5`}>
                  <div className={`flex gap-2.5 max-w-[90%] sm:max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-6 h-6 rounded-lg shrink-0 flex items-center justify-center border shadow-2xs ${
                      msg.sender === 'user' 
                        ? 'bg-[#000000] border-[#000000] text-white' 
                        : 'bg-[#F8F9FB] border-[#D0D3D9] text-[#000000]'
                    }`}>
                      {msg.sender === 'user' ? <User size={11} /> : <Bot size={11} />}
                    </div>

                    <div className={`p-3 rounded-2xl whitespace-pre-line leading-relaxed text-xs sm:text-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#000000] text-white rounded-tr-none font-semibold shadow-xs'
                        : 'bg-[#F8F9FB] border border-[#D0D3D9] text-[#2E3033] rounded-tl-none font-medium'
                    }`}>
                      {msg.text}
                    </div>
                  </div>

                  {/* Interactive Action Jump Button attached to response */}
                  {msg.action && (
                    <div className="pl-8 pt-0.5">
                      <button
                        onClick={() => handleActionClick(msg.action!)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#000000] hover:bg-[#1C1C1C] text-white font-mono text-[10px] sm:text-[11px] font-bold transition-all shadow-xs cursor-pointer group"
                      >
                        <span>{msg.action.label}</span>
                        <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2 items-center">
                  <div className="w-6 h-6 rounded-lg shrink-0 flex items-center justify-center border bg-[#F8F9FB] border-[#D0D3D9] text-[#000000]">
                    <Bot size={11} />
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F8F9FB] border border-[#D0D3D9] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#000000] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#000000] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#000000] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggestions Chips */}
            <div 
              data-lenis-prevent="true"
              className="px-3 py-2 border-t border-[#E5E7EB] bg-[#F8F9FB] overflow-x-auto flex gap-1.5 scrollbar-none shrink-0"
            >
              {PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuery(preset)}
                  disabled={isTyping}
                  className="shrink-0 px-2.5 py-1 rounded-full border border-[#D0D3D9] bg-[#FFFFFF] hover:bg-[#000000] hover:text-white hover:border-[#000000] text-[10px] font-mono font-bold text-[#000000] transition-all cursor-pointer shadow-2xs flex items-center gap-1"
                >
                  <span className="truncate max-w-[180px]">{preset}</span>
                  <ArrowRight size={9} />
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleQuery(inputVal);
              }}
              className="p-3 border-t border-[#E5E7EB] bg-[#FFFFFF] shrink-0 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask Genesis (e.g., 'projects', 'skills', 'go to contact')..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#F8F9FB] border border-[#D0D3D9] focus:border-[#000000] text-xs sm:text-sm font-semibold text-[#000000] placeholder:text-[#2E3033]/50 focus:outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!inputVal.trim() || isTyping}
                className="p-2.5 rounded-xl bg-[#000000] hover:bg-[#1C1C1C] text-white border border-[#000000] transition-all disabled:opacity-40 cursor-pointer shadow-xs"
              >
                <Send size={13} />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
