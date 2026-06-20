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
  vchat: "V-CHAT is a full-stack AI ecosystem developed by Viswas. It connects multiple LLM routers (Gemini, NVIDIA, Ollama) and streams responses via Server-Sent Events (SSE). It features persistent MongoDB memories, tool-calling APIs, and a glassmorphic React render box that parses and executes React artifact codes in real-time.",
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
        className={`${isOpen ? 'hidden md:flex' : 'flex'} w-14 h-14 rounded-full bg-[#FF003C] hover:bg-[#FF3E6C] text-white items-center justify-center shadow-[0_0_20px_rgba(255,0,60,0.5)] transition-colors cursor-pointer border border-[#FF3E6C]/30 pointer-events-auto absolute bottom-0 right-0`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="relative">
              <Brain size={22} />
              {/* Pulsing indicator node */}
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-black animate-pulse"></span>
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
            className="fixed inset-0 z-50 md:absolute md:inset-auto md:bottom-16 md:right-0 w-full h-full md:w-[360px] md:h-[460px] md:rounded-2xl rounded-none border-0 md:border border-[#FF003C]/25 bg-black/95 md:bg-black/90 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col font-mono text-xs md:text-sm text-left pointer-events-auto"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/5 bg-white/[0.02] flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center gap-2">
                <Bot size={16} className="text-[#FF003C]" />
                <span className="font-bold text-white tracking-tight">genesis_agent_v1.0</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-[9px] text-zinc-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF003C] animate-ping"></span>
                  <span>INFERENCE_ACTIVE</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="md:hidden w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Message Feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  {/* Icon */}
                  <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center border ${
                    msg.sender === 'user' 
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-300' 
                      : 'bg-[#FF003C]/10 border-[#FF003C]/20 text-[#FF003C]'
                  }`}>
                    {msg.sender === 'user' ? <UserCheck size={12} /> : <Brain size={12} />}
                  </div>

                  {/* Body Bubble */}
                  <div className={`p-3 rounded-xl max-w-[80%] whitespace-pre-wrap leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#FF003C]/5 border border-[#FF003C]/20 text-white rounded-tr-none'
                      : 'bg-white/[0.02] border border-white/5 text-zinc-300 rounded-tl-none font-sans'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center border bg-[#FF003C]/10 border-[#FF003C]/20 text-[#FF003C]">
                    <Brain size={12} />
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-zinc-500 rounded-tl-none flex items-center gap-1 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF003C] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF003C] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF003C] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>

            {/* Presets/Action Buttons */}
            <div className="p-3 border-t border-white/5 bg-white/[0.01] flex flex-col gap-2 shrink-0 select-none">
              <span className="text-[8px] uppercase tracking-wider text-zinc-600 pl-1 font-bold">Query Presets</span>
              <div className="flex flex-col gap-1.5">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleQuery(preset.id, preset.text)}
                    disabled={isTyping}
                    className="w-full text-left px-3 py-1.5 rounded-lg border border-white/5 bg-black hover:bg-[#FF003C]/5 hover:border-[#FF003C]/25 text-[10px] text-zinc-400 hover:text-white transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed leading-snug"
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
