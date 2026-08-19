import { Terminal, ArrowUp } from 'lucide-react';
import { animateScroll as scroll } from 'react-scroll';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 600,
      smooth: 'easeInOutQuart'
    });
  };

  return (
    <footer className="relative py-12 border-t border-[#D0D3D9] bg-[#FFFFFF] z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="text-center md:text-left space-y-1">
            <span className="text-lg font-black font-display text-[#000000] tracking-tight uppercase select-none flex items-center justify-center md:justify-start gap-2">
              VK . <span className="text-[#000000]">DEV</span>
              <Terminal size={16} className="text-[#000000]" />
            </span>
            <p className="text-[#2E3033] text-xs font-mono font-bold">© {currentYear} Kasi Viswas. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-[#2E3033] font-mono font-bold">
              <span>Built with React & TypeScript by Kasi Viswas</span>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-[#FFFFFF] hover:bg-[#000000] hover:text-white text-[#000000] border border-[#D0D3D9] hover:border-[#000000] transition-all duration-300 shadow-xs group cursor-pointer"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
