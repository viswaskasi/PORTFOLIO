import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Home, User, Cpu, FolderCode, Award, Mail, FileText, Menu, X, Terminal } from 'lucide-react';

const professionalItems = [
  { name: 'Home', to: 'home', icon: <Home size={18} /> },
  { name: 'About', to: 'about', icon: <User size={18} /> },
  { name: 'Skills', to: 'skills', icon: <Cpu size={18} /> },
  { name: 'Projects', to: 'projects', icon: <FolderCode size={18} /> },
  { name: 'Certifications', to: 'experience', icon: <Award size={18} /> },
  { name: 'Contact', to: 'contact', icon: <Mail size={18} /> },
];

interface NavbarProps {
  onViewResume: () => void;
}

export default function Navbar({ onViewResume }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const items = professionalItems;

  return (
    <>
      {/* ── Desktop Left Fixed Sidebar Navigation ── */}
      <aside className="hidden lg:flex flex-col justify-between items-center w-64 h-screen fixed left-0 top-0 py-8 px-6 bg-[#09090b]/90 border-r border-white/5 z-45 backdrop-blur-xl">
        
        {/* Top Logo Section */}
        <div className="flex flex-col items-center gap-2">
          <div className="cursor-pointer">
            <div className="relative group flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF003C]/15 to-[#FF3E6C]/15 border border-[#FF003C]/30 hover:border-[#FF003C]/80 transition-all duration-500 shadow-[0_0_15px_rgba(255,0,60,0.1)]">
              <Terminal size={24} className="text-[#FF003C] group-hover:scale-110 transition-transform duration-300" />
              {/* Spinning border ring */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent border-t-[#FF3E6C] border-r-[#FF003C] opacity-0 group-hover:opacity-100 animate-spin pointer-events-none"></div>
            </div>
          </div>
          <span className="text-xs uppercase font-mono tracking-[0.25em] text-zinc-500 mt-2">VK . DEV</span>
        </div>

        {/* Middle Navigation Links */}
        <nav className="flex flex-col gap-1 w-full my-auto">
          {items.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              smooth={true}
              duration={500}
              offset={-70}
              spy={true}
              activeClass="active-sidebar-link"
              className="group flex items-center gap-3.5 px-4.5 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-all duration-300 cursor-pointer"
            >
              <span className="text-zinc-400 group-hover:text-[#FF003C] group-[.active-sidebar-link]:text-[#FF003C] transition-colors duration-300">
                {item.icon}
              </span>
              <span className="tracking-tight group-[.active-sidebar-link]:text-white font-medium">{item.name}</span>
              
              {/* Active right glow line indicator */}
              <span className="ml-auto w-1 h-0 group-[.active-sidebar-link]:h-4.5 rounded-full bg-[#FF003C] opacity-0 group-[.active-sidebar-link]:opacity-100 transition-all duration-300 shadow-[0_0_8px_rgba(255,0,60,0.5)]"></span>
            </Link>
          ))}
        </nav>

        {/* Bottom Resume Shortcut Button */}
        <div className="flex flex-col gap-4 w-full">
          <button
            onClick={onViewResume}
            className="w-full py-3 px-4 rounded-xl border border-white/10 hover:border-[#FF003C]/50 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-[#FF003C]/5 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <FileText size={14} className="text-[#FF003C] group-hover:scale-110 transition-transform" />
            <span>View Resume</span>
          </button>
        </div>

      </aside>

      {/* ── Mobile & Tablet Header Navbar ── */}
      <header className={`lg:hidden fixed top-0 left-0 w-full z-45 transition-all duration-500 ${scrolled ? 'py-3.5 bg-[#050505]/95 border-b border-white/5 backdrop-blur-md' : 'py-5 bg-transparent border-b border-transparent'}`}>
        <div className="px-5 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF003C]/15 to-[#FF3E6C]/15 border border-[#FF003C]/30 flex items-center justify-center text-[#FF003C]">
              <Terminal size={16} />
            </div>
            <span className="text-sm font-bold uppercase font-mono tracking-widest text-white">VK . DEV</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Resume Button */}
            <button
              onClick={onViewResume}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white"
            >
              <FileText size={16} />
            </button>

            {/* Menu Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <div className={`absolute w-full left-0 top-[100%] bg-[#050505]/95 backdrop-blur-lg border-b border-white/5 transition-all duration-300 origin-top overflow-hidden shadow-2xl ${isOpen ? 'scale-y-100 opacity-100 py-6 px-5' : 'scale-y-0 opacity-0 h-0 py-0 px-5'}`}>
          <nav className="flex flex-col gap-2">
            {items.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                smooth={true}
                duration={500}
                offset={-70}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer"
              >
                <span className="text-[#FF003C]">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Styled class injection for Link's active state */}
      <style>{`
        .active-sidebar-link {
          background-color: rgba(255, 255, 255, 0.03) !important;
          border-color: rgba(255, 255, 255, 0.05) !important;
          color: #ffffff !important;
        }
      `}</style>
    </>
  );
}
