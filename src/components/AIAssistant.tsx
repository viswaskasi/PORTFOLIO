import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Brain, Bot, UserCheck } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
}

const PRESETS = [
  { id: 'skills', text: 'What are Viswas\'s core AI capabilities?' },
  { id: 'vchat', text: 'Describe his V-CHAT agent ecosystem' },
  { id: 'hire', text: 'How can I contact or hire him?' }
];

const ANSWERS: Record<string, string> = {
  skills: "Viswas has deep competence in the Generative AI ecosystem, specifically: \n\n1. Agentic Orchestration: Building multi-agent systems with custom memory states using LangChain and LangGraph.\n2. Prompt Engineering & Vector DBs: Tuning structured generation, model routing, and MongoDB Atlas Vector Search.\n3. Computer Vision: HCI systems utilizing OpenCV, landmark coordinates, and U2-Net image preprocess maskers.",
  vchat: "V-CHAT is a full-stack AI ecosystem developed by Viswas. It connects multiple LLM routers (Gemini, NVIDIA, Ollama) and streams responses via Server-Sent Events (SSE). It features persistent MongoDB memories, tool-calling APIs, and a React render box that executes React artifact codes in real-time.",
  hire: "You can hire or reach out to Viswas immediately through these channels:\n\n- Email: viswaskasi2006@gmail.com\n- Phone: +91 8074800497\n- LinkedIn: linkedin.com/in/kasi-viswas\n\nHe is currently open to internship, full-time, and research opportunities in AIML and Full-Stack Engineering."
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'assistant', text: 'System Online. I am the Genesis AI Agent. Ask me anything about Kasi Viswas\'s technical credentials.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleQuery = (id: string, text: string) => {
    if (isTyping) return;

    // Add user query
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const answer = ANSWERS[id] || "Query protocol not recognized.";
      
      // Dynamic typing stream simulation
      setMessages(prev => [...prev, { sender: 'assistant', text: answer }]);
    }, 1500);
  };

  return (
    <div className={`fixed z-50 pointer-events-none transition-all duration-300 ${
      isOpen 
        ? 'inset-0 md:bottom-4 md:right-4 md:xs:bottom-6 md:xs:right-6 md:w-14 md:h-14 md:inset-auto' 
        : 'bottom-4 right-4 xs:bottom-6 xs:right-6 w-14 h-14'
    }`}>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'hidden md:flex' : 'flex'} w-14 h-14 rounded-full bg-[#000000] hover:bg-[#1C1C1C] hover:border-[#333538] text-white items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.18)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.22)] transition-all cursor-pointer border border-[#000000] pointer-events-auto absolute bottom-0 right-0`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="relative">
              <Brain size={22} className="text-white" />
              {/* Pulsing indicator node */}
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse"></span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed inset-0 z-50 md:absolute md:inset-auto md:bottom-16 md:right-0 w-full h-full md:w-[360px] md:h-[460px] md:rounded-2xl rounded-none border-0 md:border border-[#D0D3D9] bg-[#FFFFFF] shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col font-mono text-xs md:text-sm text-left pointer-events-auto"
          >
            {/* Top Accent Line */}
            <div className="h-1.5 w-full bg-[#000000] shrink-0" />

            {/* Header */}
            <div className="px-4 py-3 border-b border-[#E5E7EB] bg-[#F8F9FB] flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center gap-2">
                <Bot size={16} className="text-[#000000]" />
                <span className="font-black text-[#000000] tracking-tight">genesis_agent_v1.0</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-[9px] text-[#2E3033]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="font-black text-[#000000]">ONLINE</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="md:hidden w-8 h-8 rounded-lg bg-[#F8F9FB] border border-[#D0D3D9] flex items-center justify-center text-[#000000] hover:bg-[#ECECEC] transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Message Feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-thin bg-[#FFFFFF]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  {/* Icon */}
                  <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center border shadow-xs ${
                    msg.sender === 'user' 
                      ? 'bg-[#000000] border-[#000000] text-white' 
                      : 'bg-[#F8F9FB] border-[#D0D3D9] text-[#000000]'
                  }`}>
                    {msg.sender === 'user' ? <UserCheck size={12} /> : <Brain size={12} />}
                  </div>

                  {/* Body Bubble */}
                  <div className={`p-3 rounded-xl max-w-[80%] whitespace-pre-wrap leading-relaxed text-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#000000] text-white rounded-tr-none font-sans font-bold shadow-xs'
                      : 'bg-[#F8F9FB] border border-[#D0D3D9] text-[#000000] rounded-tl-none font-sans font-semibold'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center border bg-[#F8F9FB] border-[#D0D3D9] text-[#000000]">
                    <Brain size={12} />
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8F9FB] border border-[#D0D3D9] text-[#000000] rounded-tl-none flex items-center gap-1 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#000000] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#000000] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#000000] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>

            {/* Presets/Action Buttons */}
            <div className="p-3 border-t border-[#E5E7EB] bg-[#F8F9FB] flex flex-col gap-2 shrink-0 select-none">
              <span className="text-[8px] uppercase tracking-wider text-[#000000] pl-1 font-black">Query Presets</span>
              <div className="flex flex-col gap-1.5">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleQuery(preset.id, preset.text)}
                    disabled={isTyping}
                    className="w-full text-left px-3 py-1.5 rounded-lg border border-[#D0D3D9] bg-[#FFFFFF] hover:bg-[#F8F9FB] hover:border-[#000000] text-[10px] text-[#000000] font-bold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed leading-snug shadow-xs"
                  >
                    {preset.text}
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
