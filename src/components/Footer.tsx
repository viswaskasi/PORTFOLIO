import { Terminal, ArrowUp, Heart } from 'lucide-react';
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
    <footer className="relative w-full border-t border-[#D0D3D9] bg-[#FFFFFF] z-10 py-3 sm:py-3.5 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
        
        {/* Brand & Built with Love */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-mono font-bold text-[#2E3033]">
          <span className="text-[#000000] font-black font-display tracking-tight flex items-center gap-1.5 shrink-0">
            VK.DEV
            <Terminal size={13} className="text-[#000000]" />
          </span>
          <span className="text-[#A0A3AA] hidden xs:inline">•</span>
          <span className="flex items-center gap-1 text-[#2E3033]">
            Built with <Heart size={12} className="text-red-500 fill-red-500 inline-block animate-pulse" /> by Kasi Viswas
          </span>
        </div>

        {/* Copyright & Back to Top Trigger */}
        <div className="flex items-center justify-center gap-3 shrink-0">
          <span className="text-[11px] font-mono text-[#2E3033] font-bold">
            © {currentYear}
          </span>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FFFFFF] hover:bg-[#000000] hover:text-white text-[#000000] border border-[#D0D3D9] hover:border-[#000000] transition-all duration-200 shadow-2xs group cursor-pointer text-xs font-mono font-bold active:scale-95"
            title="Back to top"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}




