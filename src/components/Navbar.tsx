import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { Home, User, Cpu, FolderCode, Award, Mail, FileText, Menu, X, Terminal, UserCheck, Search } from 'lucide-react';

const professionalItems = [
  { name: 'Home', to: 'home', icon: <Home size={18} /> },
  { name: 'About', to: 'about', icon: <User size={18} /> },
  { name: 'Skills', to: 'skills', icon: <Cpu size={18} /> },
  { name: 'Projects', to: 'projects', icon: <FolderCode size={18} /> },
  { name: 'Certifications', to: 'experience', icon: <Award size={18} /> },
  { name: 'Contact', to: 'contact', icon: <Mail size={18} /> },
];

interface NavbarProps {
  onOpenRecruiterMode?: () => void;
  onOpenCommandPalette?: () => void;
  onViewResume?: () => void;
}

export default function Navbar({ onOpenRecruiterMode, onOpenCommandPalette, onViewResume }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ── Desktop Left Fixed Sidebar Navigation (White Theme with Refined Lighter Borders) ── */}
      <aside className="hidden lg:flex flex-col justify-between items-center w-64 h-screen fixed left-0 top-0 py-8 px-6 bg-[#FFFFFF]/95 border-r border-[#D0D3D9] z-45 backdrop-blur-xl">
        
        {/* Top Logo Section */}
        <div className="flex flex-col items-center gap-2">
          <div className="cursor-pointer">
            <div className="relative group flex items-center justify-center w-14 h-14 rounded-2xl bg-[#000000] text-white border border-[#000000] hover:border-[#333538] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-all duration-300">
              <Terminal size={24} className="text-white group-hover:scale-110 transition-all duration-300" />
            </div>
          </div>
          <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#000000] mt-2 font-black">
            VK . <span className="text-[#000000]">DEV</span>
          </span>
        </div>

        {/* Middle Navigation Links */}
        <nav className="flex flex-col gap-1.5 w-full my-auto text-left">
          {professionalItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              smooth={true}
              duration={500}
              offset={-70}
              spy={true}
              activeClass="active-sidebar-link"
              className="group flex items-center gap-3.5 px-4.5 py-3 rounded-xl text-sm font-semibold text-[#2E3033] hover:text-[#000000] hover:bg-[#F8F9FB] border border-transparent hover:border-[#D0D3D9] transition-all duration-200 cursor-pointer"
            >
              <span className="text-[#2E3033] group-hover:text-[#000000] group-[.active-sidebar-link]:text-[#000000] transition-colors duration-200">
                {item.icon}
              </span>
              <span className="tracking-tight group-[.active-sidebar-link]:text-[#000000] font-bold">{item.name}</span>
              
              <span className="ml-auto w-1.5 h-0 group-[.active-sidebar-link]:h-4 rounded-full bg-[#000000] opacity-0 group-[.active-sidebar-link]:opacity-100 transition-all duration-200"></span>
            </Link>
          ))}
        </nav>

        {/* Bottom Quick Triggers */}
        <div className="flex flex-col gap-2 w-full">
          {onViewResume && (
            <button
              onClick={onViewResume}
              className="w-full py-2.5 px-4 rounded-xl bg-[#FFFFFF] hover:bg-[#F8F9FB] border border-[#D0D3D9] hover:border-[#333538] text-xs font-bold text-[#000000] transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer shadow-xs hover:shadow-sm"
            >
              <FileText size={14} className="text-[#000000] group-hover:scale-105 transition-all" />
              <span>View Resume</span>
            </button>
          )}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="w-full py-2.5 px-3 rounded-xl bg-[#F8F9FB] hover:bg-[#ECECEC] border border-[#D0D3D9] hover:border-[#333538] text-xs font-mono text-[#000000] font-bold transition-all flex items-center justify-between cursor-pointer shadow-xs"
            >
              <span className="flex items-center gap-2">
                <Search size={13} className="text-[#000000]" />
                <span>Search</span>
              </span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#FFFFFF] border border-[#D0D3D9] text-[9px] text-[#000000] font-bold">
                ⌘K
              </kbd>
            </button>
          )}

          {onOpenRecruiterMode && (
            <button
              onClick={onOpenRecruiterMode}
              className="w-full py-2.5 px-4 rounded-xl bg-[#000000] hover:bg-[#252525] hover:border-[#333538] border border-[#000000] text-xs font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)] cursor-pointer"
            >
              <UserCheck size={14} className="text-white" />
              <span>Recruiter HUD</span>
            </button>
          )}
        </div>

      </aside>

      {/* ── Mobile Header Navbar ── */}
      <header className={`lg:hidden fixed top-0 left-0 w-full z-45 transition-all duration-300 ${scrolled ? 'py-3.5 bg-[#FFFFFF]/95 border-b border-[#D0D3D9] backdrop-blur-md shadow-xs' : 'py-5 bg-transparent border-b border-transparent'}`}>
        <div className="px-5 flex justify-between items-center">
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-[#000000] border border-[#000000] flex items-center justify-center text-white">
              <Terminal size={16} />
            </div>
            <span className="text-sm font-black uppercase font-mono tracking-widest text-[#000000]">
              VK . <span className="text-[#000000]">DEV</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {onOpenRecruiterMode && (
              <button
                onClick={onOpenRecruiterMode}
                className="px-3 py-1.5 rounded-lg bg-[#000000] border border-[#000000] text-[10px] font-mono font-bold text-white shadow-xs"
              >
                Recruiter
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#FFFFFF] border border-[#D0D3D9] text-[#000000] hover:bg-[#F8F9FB] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[#FFFFFF]/98 backdrop-blur-xl border-b border-[#D0D3D9] p-4 flex flex-col gap-2 text-left shadow-lg"
            >
              {professionalItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-[#2E3033] hover:text-[#000000] hover:bg-[#F8F9FB] border border-transparent hover:border-[#D0D3D9]"
                >
                  <span className="text-[#000000]">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}

              {onOpenCommandPalette && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCommandPalette();
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-mono font-bold text-[#2E3033] hover:text-[#000000] hover:bg-[#F8F9FB] border border-transparent hover:border-[#D0D3D9] text-left"
                >
                  <Search size={16} className="text-[#000000]" />
                  <span>Search (⌘K)</span>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Styled class injection for Link's active state */}
      <style>{`
        .active-sidebar-link {
          background-color: #F8F9FB !important;
          border-color: #000000 !important;
          color: #000000 !important;
          font-weight: 700 !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </>
  );
}
