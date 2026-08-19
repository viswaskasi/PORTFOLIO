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
          text: 'Primary Stack:\n- AI/ML: LangChain.js, Generative APIs, Prompt Engineering, NLP\n- Backend: Node.js, Express.js, MongoDB\n- Frontend: React.js, TypeScript, TailwindCSS, Three.js\n- Systems: Python, OpenCV, C, Git',
          type: 'output'
        });
        break;
      case 'projects':
        newHistory.push({
          text: 'Key Showcase:\n- VYRIS 8.0: Voice Assistant & Local LLMs\n- V-CHAT: Advanced Multi-LLM Chat Assistant\n- Gesture Volume: Hand Landmarking Computer Vision HUD\n- Background Remover: Automated U2-Net Preprocessing Pipeline',
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
      className="w-full rounded-2xl border border-[#D0D3D9] bg-[#FFFFFF] shadow-xs overflow-hidden font-mono text-xs md:text-sm text-left h-[380px] flex flex-col relative group cursor-text transition-all duration-300 hover:border-[#333538] hover:shadow-sm"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#E5E7EB] bg-[#F8F9FB] shrink-0 select-none">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-[#0E0E0E]"></span>
          <span className="w-3 h-3 rounded-full bg-[#0E0E0E]/40"></span>
          <span className="w-3 h-3 rounded-full bg-[#0E0E0E]/20"></span>
        </div>
        <span className="text-[10px] text-[#000000] tracking-wider flex items-center gap-1.5 uppercase font-bold">
          <Terminal size={12} className="text-[#000000]" />
          genesis_core.sh
        </span>
        <div className="flex items-center gap-1.5 text-[#000000] text-[10px] font-bold">
          <Shield size={10} className="text-[#000000]" />
          <span>SSL_SECURE</span>
        </div>
      </div>

      {/* Log Feed Display */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-2.5 scrollbar-thin bg-[#FFFFFF]"
      >
        {history.map((line, idx) => (
          <div 
            key={idx} 
            className={`whitespace-pre-line leading-relaxed ${
              line.type === 'system' ? 'text-[#000000] font-bold' :
              line.type === 'input' ? 'text-[#000000] font-black' :
              line.type === 'error' ? 'text-rose-600 font-bold' : 'text-[#2E3033] font-semibold'
            }`}
          >
            {line.text}
          </div>
        ))}
        {bootIndex < BOOT_SEQUENCE.length && (
          <div className="flex items-center gap-2 text-[#000000] text-xs font-bold">
            <RefreshCw size={12} className="animate-spin text-[#000000]" />
            <span>Booting modules...</span>
          </div>
        )}
      </div>

      {/* Input Form at Bottom */}
      {bootIndex >= BOOT_SEQUENCE.length && (
        <form 
          onSubmit={handleCommandSubmit}
          className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 border-t border-[#E5E7EB] bg-[#F8F9FB] shrink-0"
        >
          <span className="text-[#000000] font-black select-none">viswas@vk-dev:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[#000000] font-mono text-xs md:text-sm font-bold focus:ring-0 p-0 placeholder-[#2E3033]/60"
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
