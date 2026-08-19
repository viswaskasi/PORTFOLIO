import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, UserCheck, Terminal, Award, FolderGit2, Mail, ExternalLink, CornerDownLeft } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenRecruiterMode: () => void;
}

export default function CommandPalette({ isOpen, onClose, onOpenResume, onOpenRecruiterMode }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = [
    {
      id: 'recruiter',
      title: 'Open Recruiter Executive Mode',
      subtitle: '30-second candidate summary & metrics',
      icon: <UserCheck size={16} className="text-[#000000]" />,
      action: () => {
        onClose();
        onOpenRecruiterMode();
      }
    },
    {
      id: 'resume',
      title: 'View / Download Resume PDF',
      subtitle: 'Open live PDF document viewer',
      icon: <FileText size={16} className="text-[#000000]" />,
      action: () => {
        onClose();
        onOpenResume();
      }
    },
    {
      id: 'projects',
      title: 'Jump to Featured Projects',
      subtitle: 'VYRIS 8.0, V-CHAT, Gesture Controller, Background Remover',
      icon: <FolderGit2 size={16} className="text-[#000000]" />,
      action: () => {
        onClose();
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'skills',
      title: 'Explore Tech Stack & Skills Engine',
      subtitle: '3D Holographic tech stack carousel',
      icon: <Terminal size={16} className="text-[#000000]" />,
      action: () => {
        onClose();
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'experience',
      title: 'View Certifications & Publications',
      subtitle: 'IBM ML, Cisco C/Python, Research Paper',
      icon: <Award size={16} className="text-[#000000]" />,
      action: () => {
        onClose();
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'contact',
      title: 'Get In Touch / Contact',
      subtitle: 'Direct email or phone communication',
      icon: <Mail size={16} className="text-[#000000]" />,
      action: () => {
        onClose();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'github',
      title: 'Visit GitHub Repository',
      subtitle: 'github.com/viswaskasi',
      icon: <ExternalLink size={16} className="text-[#000000]" />,
      action: () => {
        onClose();
        window.open('https://github.com/viswaskasi', '_blank');
      }
    }
  ];

  const filteredActions = actions.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredActions.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % (filteredActions.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredActions, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-start justify-center pt-20 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
            className="relative w-full max-w-xl bg-[#FFFFFF] border border-[#D0D3D9] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden z-10 font-sans text-left"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#E5E7EB] bg-[#F8F9FB]">
              <Search size={18} className="text-[#000000] shrink-0 stroke-[2.5]" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or section name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-[#000000] placeholder-[#2E3033]/60 font-mono text-sm font-bold focus:ring-0"
              />
              <kbd className="px-2 py-0.5 rounded bg-[#FFFFFF] border border-[#D0D3D9] text-[10px] font-mono text-[#000000] font-black shadow-xs">
                ESC
              </kbd>
            </div>

            <div 
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="p-2 max-h-[340px] overflow-y-auto space-y-1 scrollbar-thin overscroll-contain bg-[#FFFFFF]"
            >
              {filteredActions.length > 0 ? (
                filteredActions.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      ref={(el) => {
                        if (isSelected && el) {
                          el.scrollIntoView({ block: 'nearest' });
                        }
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-[#F8F9FB] border border-[#000000] text-[#000000] shadow-xs' 
                          : 'text-[#2E3033] hover:text-[#000000] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg border shadow-xs ${
                          isSelected ? 'bg-[#000000] border-[#000000] text-white' : 'bg-[#F8F9FB] border-[#D0D3D9] text-[#000000]'
                        }`}>
                          {item.icon}
                        </div>
                        <div className="flex flex-col text-left">
                          <p className="font-black text-[#000000] tracking-tight">{item.title}</p>
                          <p className="text-[10px] font-mono text-[#2E3033] font-bold">{item.subtitle}</p>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="flex items-center gap-1 text-[10px] font-mono text-[#000000] font-black">
                          <span>Execute</span>
                          <CornerDownLeft size={10} />
                        </div>
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center text-[#2E3033] font-mono text-xs font-bold">
                  No matching commands found for "{query}".
                </div>
              )}
            </div>

            <div className="px-4 py-2.5 border-t border-[#E5E7EB] bg-[#F8F9FB] flex items-center justify-between text-[10px] font-mono text-[#2E3033] font-bold">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-[#FFFFFF] border border-[#D0D3D9] text-[#000000] font-black">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-[#FFFFFF] border border-[#D0D3D9] text-[#000000] font-black">↓</kbd>
                  <span>Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-[#FFFFFF] border border-[#D0D3D9] text-[#000000] font-black">↵</kbd>
                  <span>Execute</span>
                </span>
              </div>
              <span className="text-[#000000] font-black">Genesis Cmd Palette</span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
