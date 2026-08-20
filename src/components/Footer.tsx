import { useEffect, useState } from 'react';
import { Terminal, ArrowUp, Heart, ThumbsUp } from 'lucide-react';
import { animateScroll as scroll } from 'react-scroll';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const liked = window.localStorage.getItem('portfolio-liked') === 'true';
    setHasLiked(liked);
    setLikeCount(liked ? 1 : 0);
  }, []);

  const toggleLike = () => {
    setHasLiked((previouslyLiked) => {
      const nextLiked = !previouslyLiked;
      window.localStorage.setItem('portfolio-liked', String(nextLiked));
      setLikeCount(nextLiked ? 1 : 0);
      return nextLiked;
    });
  };

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 600,
      smooth: 'easeInOutQuart'
    });
  };

  return (
    <footer className="relative w-full border-t border-[#D0D3D9] bg-[#FFFFFF] z-10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-5 sm:pt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-[#D0D3D9] bg-[#F8F9FB] px-4 py-3 sm:px-5">
          <div className="text-center sm:text-left">
            <p className="font-display text-sm font-black tracking-tight text-[#000000]">Enjoyed the portfolio?</p>
            <p className="mt-0.5 text-xs font-mono text-[#5F6368]">Loved my portfolio? Hit like to show your support.</p>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <button
              type="button"
              onClick={toggleLike}
              aria-pressed={hasLiked}
              className={`inline-flex min-w-28 items-center justify-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-mono font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
                hasLiked
                  ? 'border-[#000000] bg-[#000000] text-white shadow-sm'
                  : 'border-[#D0D3D9] bg-white text-[#000000] hover:border-[#000000] hover:bg-[#000000] hover:text-white'
              }`}
            >
              <ThumbsUp size={14} className={hasLiked ? 'fill-current' : ''} />
              {hasLiked ? 'Liked — thanks!' : 'Like this site'}
            </button>
            <span className="text-[10px] font-mono font-bold text-[#5F6368]" aria-live="polite">
              {likeCount} {likeCount === 1 ? 'like' : 'likes'} from this browser
            </span>
          </div>
        </div>
      </div>

      <div className="py-3 sm:py-3.5">
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
      </div>
    </footer>
  );
}
