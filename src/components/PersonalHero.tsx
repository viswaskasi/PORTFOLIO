import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDownRight, Compass, Heart, Radio, Sparkles } from 'lucide-react';

export default function PersonalHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Premium entrance animation for text lines and tags
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.reveal-text',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.15 }
      );
      gsap.fromTo(
        '.reveal-tag',
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.5)', stagger: 0.1, delay: 0.4 }
      );
      gsap.fromTo(
        '.hero-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 0.6 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="personal-home" 
      className="min-h-[80vh] flex flex-col justify-center py-10 relative overflow-hidden"
    >
      {/* ── Subtitle Header Badge ── */}
      <div className="reveal-tag opacity-0 flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#FB3640]/30 bg-[#FB3640]/5 self-start mb-6 text-xs font-semibold uppercase tracking-widest text-[#FB3640]">
        <Sparkles size={12} className="animate-pulse" />
        <span>Welcome to my Personal Space</span>
      </div>

      {/* ── Big Editorial Headings ── */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-[1.08] tracking-tight mb-8">
        <span className="reveal-text opacity-0 block text-zinc-400 font-light">CREATIVE MIND,</span>
        <span className="reveal-text opacity-0 block text-white">
          EXPLORING <span className="text-gradient-purple">INTERESTS</span> & 
        </span>
        <span className="reveal-text opacity-0 block text-gradient-blue">SOCIAL ACTIVITIES.</span>
      </h1>

      {/* ── Editorial Paragraph ── */}
      <p className="reveal-text opacity-0 max-w-2xl text-base md:text-lg text-zinc-400 font-sans leading-relaxed mb-12">
        By day, I design and write high-performance production code. By night, I dive into the creative domains—exploring visual design, listening to deep house and synthwave, experimenting with open-source systems, and contributing to developer communities. Here is a glance into my daily interests.
      </p>

      {/* ── High-Contrast Real-Time Activity Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mt-4">
        {/* Card 1: Currently Playing */}
        <div className="hero-card opacity-0 p-5 rounded-2xl bg-[#041b10]/40 border border-white/[0.03] hover:border-[#FB3640]/30 transition-all duration-300 relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#FB3640]/3 blur-xl rounded-full group-hover:bg-[#FB3640]/8 transition-colors duration-300"></div>
          <div className="flex items-center gap-3.5 mb-4 text-[#FB3640]">
            <div className="w-9 h-9 rounded-xl bg-[#FB3640]/10 flex items-center justify-center">
              <Compass size={18} />
            </div>
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-zinc-400">Current Focus</span>
          </div>
          <h3 className="text-lg font-bold font-display text-white mb-1">User Experience & Web 3D</h3>
          <p className="text-xs text-zinc-500 font-mono leading-relaxed">
            Exploring shaders, Three.js performance math, and fluid UI animations.
          </p>
        </div>

        {/* Card 2: Currently Listening */}
        <div className="hero-card opacity-0 p-5 rounded-2xl bg-[#041b10]/40 border border-white/[0.03] hover:border-[#FF7F11]/30 transition-all duration-300 relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF7F11]/3 blur-xl rounded-full group-hover:bg-[#FF7F11]/8 transition-colors duration-300"></div>
          <div className="flex items-center gap-3.5 mb-4 text-[#FF7F11]">
            <div className="w-9 h-9 rounded-xl bg-[#FF7F11]/10 flex items-center justify-center">
              <Radio size={18} className="animate-bounce" />
            </div>
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-zinc-400">On Repeat</span>
          </div>
          <h3 className="text-lg font-bold font-display text-white mb-1">Deep House & Synthwave</h3>
          <p className="text-xs text-zinc-500 font-mono leading-relaxed">
            Keeps my flow state locked while building systems and crafting code.
          </p>
        </div>

        {/* Card 3: Creative Values */}
        <div className="hero-card opacity-0 p-5 rounded-2xl bg-[#041b10]/40 border border-white/[0.03] hover:border-[#60E1C0]/30 transition-all duration-300 relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#60E1C0]/3 blur-xl rounded-full group-hover:bg-[#60E1C0]/8 transition-colors duration-300"></div>
          <div className="flex items-center gap-3.5 mb-4 text-[#60E1C0]">
            <div className="w-9 h-9 rounded-xl bg-[#60E1C0]/10 flex items-center justify-center">
              <Heart size={18} />
            </div>
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-zinc-400">Core Passion</span>
          </div>
          <h3 className="text-lg font-bold font-display text-white mb-1">Open Source & Community</h3>
          <p className="text-xs text-zinc-500 font-mono leading-relaxed">
            Volunteering, sharing knowledge, and building accessible software.
          </p>
        </div>
      </div>

      {/* ── Scroll Explore Indicator ── */}
      <div className="reveal-text opacity-0 flex items-center gap-2 mt-12 text-xs font-mono tracking-widest text-zinc-500 hover:text-white transition-colors cursor-pointer w-fit group">
        <span>Explore Interests</span>
        <ArrowDownRight size={14} className="text-[#FB3640] group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
      </div>
    </section>
  );
}
