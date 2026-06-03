import { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, RefreshCw } from 'lucide-react';

interface LogLine {
  text: string;
  type: 'system' | 'input' | 'output' | 'error';
}

const BOOT_SEQUENCE = [
  'VK_OS v4.2.1-genesis booting...',
  'Initializing cognitive subroutines...',
  'Loading neural weight buffers... [OK]',
  'Connecting LangChain agent frameworks... [OK]',
  'Indexing vector databases (ChromaDB / MongoDB Atlas)... [OK]',
  'Establishing secure WebGL rendering thread... [OK]',
  'Firewall: ACTIVE | LLM Router: ONLINE',
  'SYSTEM STATUS: READY',
  'Type "help" for a list of available query protocols.'
];

export default function TerminalIntro() {
  const [history, setHistory] = useState<LogLine[]>([]);
  const [bootIndex, setBootIndex] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Play boot sequence
  useEffect(() => {
    if (bootIndex < BOOT_SEQUENCE.length) {
      const timer = setTimeout(() => {
        setHistory((prev) => [...prev, { text: BOOT_SEQUENCE[bootIndex], type: 'system' }]);
        setBootIndex((prev) => prev + 1);
      }, bootIndex === 0 ? 200 : 350);
      return () => clearTimeout(timer);
    }
  }, [bootIndex]);

  // Scroll to bottom of terminal log container on updates
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newHistory: LogLine[] = [...history, { text: `viswas@vk-dev:~$ ${inputVal}`, type: 'input' }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          text: 'Available queries: [about] [skills] [projects] [contact] [clear] [reboot]',
          type: 'output'
        });
        break;
      case 'about':
        newHistory.push({
          text: 'VK (Kasi Viswas) is a Full-Stack AI Engineer based in India. Specializes in building autonomous LLM agents, dynamic React architectures, and custom computer vision modules.',
          type: 'output'
        });
        break;
      case 'skills':
        newHistory.push({
          text: 'Primary Stack:\n- AI/ML: LangChain.js, Generative APIs, Prompt Engineering, NLP\n- Backend: Node.js, Express.js, MongoDB\n- Frontend: React.js, TypeScript, TailwindCSS v4, GSAP, Three.js\n- Systems: Python, OpenCV, C, Git',
          type: 'output'
        });
        break;
      case 'projects':
        newHistory.push({
          text: 'Key Showcase:\n- V-CHAT: Advanced Multi-LLM Chat Assistant\n- Gesture Volume: Hand Landmarking Computer Vision HUD\n- Background Remover: Automated U2-Net Preprocessing Pipeline',
          type: 'output'
        });
        break;
      case 'contact':
        newHistory.push({
          text: 'Contact Info:\n- Email: viswaskasi2006@gmail.com\n- Phone: +91 8074800497\n- GitHub: github.com/viswaskasi\n- LinkedIn: linkedin.com/in/kasi-viswas',
          type: 'output'
        });
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      case 'reboot':
        setHistory([]);
        setBootIndex(0);
        setInputVal('');
        return;
      default:
        newHistory.push({
          text: `Command not found: "${cmd}". Type "help" for valid directives.`,
          type: 'error'
        });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const focusInput = () => {
    if (window.innerWidth >= 768) {
      inputRef.current?.focus();
    }
  };

  return (
    <div 
      onClick={focusInput}
      className="w-full rounded-2xl border border-[#FF003C]/25 bg-black/80 backdrop-blur-xl shadow-2xl overflow-hidden font-mono text-xs md:text-sm text-left h-[380px] flex flex-col relative group cursor-text"
    >
      {/* Glow highlight */}
      <div className="absolute inset-0 border border-[#FF003C]/10 rounded-2xl pointer-events-none group-hover:border-[#FF003C]/25 transition-all duration-300"></div>

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/[0.02] shrink-0 select-none">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FF003C]/30 border border-[#FF003C] hover:bg-[#FF003C] transition-colors"></span>
          <span className="w-3 h-3 rounded-full bg-zinc-800"></span>
          <span className="w-3 h-3 rounded-full bg-zinc-800"></span>
        </div>
        <span className="text-[10px] text-zinc-500 tracking-wider flex items-center gap-1.5 uppercase font-bold">
          <Terminal size={12} className="text-[#FF003C]" />
          genesis_core.sh
        </span>
        <div className="flex items-center gap-1.5 text-zinc-600 text-[10px]">
          <Shield size={10} className="text-[#FF003C]/50" />
          <span>SSL_SECURE</span>
        </div>
      </div>

      {/* Log Feed Display */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-2.5 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
      >
        {history.map((line, idx) => (
          <div 
            key={idx} 
            className={`whitespace-pre-line leading-relaxed ${
              line.type === 'system' ? 'text-[#FF3E6C]/90 font-semibold' :
              line.type === 'input' ? 'text-white' :
              line.type === 'error' ? 'text-red-400' : 'text-zinc-300 font-light'
            }`}
          >
            {line.text}
          </div>
        ))}
        {bootIndex < BOOT_SEQUENCE.length && (
          <div className="flex items-center gap-2 text-[#FF003C] text-xs">
            <RefreshCw size={12} className="animate-spin" />
            <span>Booting modules...</span>
          </div>
        )}
      </div>

      {/* Input Form at Bottom */}
      {bootIndex >= BOOT_SEQUENCE.length && (
        <form 
          onSubmit={handleCommandSubmit}
          className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 border-t border-white/5 bg-white/[0.01] shrink-0"
        >
          <span className="text-[#FF003C] font-semibold select-none">viswas@vk-dev:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs md:text-sm focus:ring-0 p-0"
            placeholder='Type command (e.g. "help", "skills")...'
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </form>
      )}
    </div>
  );
}
