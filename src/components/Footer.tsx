import { Heart, Terminal } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-white/5 bg-[#09090b] z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="text-center md:text-left space-y-1">
            <span className="text-lg font-bold font-display text-white tracking-tight uppercase select-none flex items-center justify-center md:justify-start gap-2">
              VK . DEV
              <Terminal size={14} className="text-[#FF003C]" />
            </span>
            <p className="text-zinc-600 text-xs font-mono">© {currentYear} Kasi Viswas. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
            <span>Built with React &</span>
            <Heart size={12} className="text-[#FF003C] fill-[#FF003C] animate-pulse" />
            <span>by Kasi Viswas</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
