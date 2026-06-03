import { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music, Gamepad2, Cpu, Compass, Image as ImageIcon, ExternalLink } from 'lucide-react';

export default function PersonalInterests() {
  // Spotify mock playback state
  const [isPlaying, setIsPlaying] = useState(true);
  const [songProgress, setSongProgress] = useState(38);
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setSongProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlayback = () => setIsPlaying(!isPlaying);

  const creativePhotos = [
    {
      title: 'Obsidian Studio Workspace',
      desc: 'Minimalist setup under low ambient light, optimized for focus.',
      grad: 'from-[#A1D1B1]/20 to-[#86B898]/10',
    },
    {
      title: 'High-End Keyboard Design',
      desc: 'GMMK Pro customized with hand-lubed linear keycaps.',
      grad: 'from-[#C3E7CE]/20 to-[#A1D1B1]/10',
    },
    {
      title: 'Generative Web Art',
      desc: 'Experimenting with canvas algorithms and 3D fluid meshes.',
      grad: 'from-[#86B898]/20 to-[#C3E7CE]/10',
    },
  ];

  return (
    <section id="interests" className="py-20 relative bg-transparent overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#A1D1B1]/4 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#A1D1B1]/20 bg-[#A1D1B1]/5 text-xs font-semibold text-[#A1D1B1] tracking-wider uppercase w-fit">
            <Music size={12} />
            My Vibe & Interests
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white tracking-tight">
            What Keeps Me <span className="text-gradient-purple font-extrabold" style={{ '--color-accent': '#A1D1B1' } as React.CSSProperties}>Inspired</span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-[#A1D1B1] to-[#C3E7CE] rounded-full mt-1"></div>
          <p className="mt-4 text-zinc-500 max-w-2xl font-light text-base md:text-lg">
            A window into my life outside compilation screens. The albums, hardware, and aesthetics that define my creative world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
          
          {/* ── Spotify Live Player Card (5 cols) ── */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#232E33]/40 border border-white/[0.03] shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-[#A1D1B1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div>
              {/* Top Indicator */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-[9px] font-mono tracking-widest text-[#A1D1B1] uppercase font-bold">
                  <Music size={10} className="animate-spin" />
                  <span>Now Listening</span>
                </div>
                <span className="text-[9px] font-mono text-zinc-500">Spotify Feed</span>
              </div>

              {/* Album Cover & Details */}
              <div className="flex gap-4 items-center mb-8 text-left">
                {/* Animated Album Vinyl Sleeve */}
                <div className="relative w-20 h-20 rounded-xl bg-gradient-to-tr from-[#A1D1B1] to-[#86B898] flex items-center justify-center shadow-lg overflow-hidden group-hover:rotate-6 transition-transform duration-500">
                  <Music size={32} className="text-zinc-900 opacity-80" />
                  {/* Vinyl record spinning out slightly */}
                  <div className={`absolute -right-3 w-16 h-16 rounded-full bg-zinc-900 border-4 border-zinc-950 flex items-center justify-center shadow-inner transition-transform duration-1000 ${isPlaying ? 'animate-spin' : ''}`}>
                    <div className="w-4 h-4 rounded-full bg-[#A1D1B1]"></div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#A1D1B1] transition-colors font-display">Midnight City</h3>
                  <p className="text-sm text-zinc-400">M83</p>
                  <span className="text-[10px] font-mono text-zinc-500 mt-1 block">Album: Hurry Up, We're Dreaming</span>
                </div>
              </div>

              {/* Simulated Live Audio Wave Visualizer */}
              <div className="flex items-end justify-center gap-1.5 h-10 mb-6 px-4">
                {[...Array(16)].map((_, i) => {
                  const heights = ['h-2', 'h-5', 'h-8', 'h-6', 'h-9', 'h-4', 'h-7', 'h-3', 'h-8', 'h-5', 'h-9', 'h-6', 'h-4', 'h-8', 'h-5', 'h-2'];
                  return (
                    <span 
                      key={i} 
                      className={`w-1 rounded-t-full bg-gradient-to-t from-[#A1D1B1] to-[#C3E7CE] transition-all duration-300 ${
                        isPlaying ? heights[i] + ' animate-[pulse_1s_infinite_alternate]' : 'h-1.5'
                      }`} 
                      style={{ animationDelay: `${i * 0.08}s` }}
                    />
                  );
                })}
              </div>
            </div>

            <div>
              {/* Music Progress Bar */}
              <div className="w-full mb-5">
                <div className="relative w-full h-1 bg-zinc-800 rounded-full overflow-hidden cursor-pointer">
                  <div className="absolute top-0 left-0 h-full bg-[#A1D1B1] transition-all duration-300" style={{ width: `${songProgress}%` }} />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1.5">
                  <span>1:38</span>
                  <span>4:03</span>
                </div>
              </div>

              {/* Media Player Buttons */}
              <div className="flex items-center justify-center gap-8 text-zinc-400">
                <button className="hover:text-white transition-colors cursor-pointer"><SkipBack size={18} /></button>
                <button 
                  onClick={togglePlayback}
                  className="w-12 h-12 rounded-full bg-white text-zinc-950 flex items-center justify-center hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-95 cursor-pointer"
                >
                  {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                </button>
                <button className="hover:text-white transition-colors cursor-pointer"><SkipForward size={18} /></button>
              </div>
            </div>
          </div>

          {/* ── Studio Gear & Hobbies Card (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Top Row Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Polaroid Slider Card (7 cols) */}
              <div className="md:col-span-7 p-6 rounded-2xl bg-[#232E33]/40 border border-white/[0.03] shadow-xl relative overflow-hidden group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#C3E7CE] uppercase flex items-center gap-1.5">
                    <ImageIcon size={12} />
                    <span>Creative Pursuits</span>
                  </span>
                  <span className="text-[9px] font-mono text-zinc-500">Photography</span>
                </div>

                {/* Styled Gradient Photo Display */}
                <div className="w-full h-36 rounded-xl relative overflow-hidden mb-4 shadow-inner text-left">
                  <div className={`absolute inset-0 bg-gradient-to-tr ${creativePhotos[activePhoto].grad} transition-all duration-700 blur-[2px]`}></div>
                  <div className="absolute inset-0 bg-[#1C2529]/40 mix-blend-overlay"></div>
                  <div className="absolute inset-x-4 bottom-4 flex flex-col justify-end">
                    <h4 className="text-base font-bold text-white font-display text-shadow-md">{creativePhotos[activePhoto].title}</h4>
                    <p className="text-[11px] text-zinc-300 leading-snug">{creativePhotos[activePhoto].desc}</p>
                  </div>
                </div>

                {/* Navigation Indicators */}
                <div className="flex justify-between items-center mt-2.5">
                  <div className="flex gap-1.5">
                    {creativePhotos.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActivePhoto(i)}
                        className={`w-6 h-1 rounded-full transition-all duration-300 cursor-pointer ${
                          activePhoto === i ? 'bg-[#A1D1B1] w-8' : 'bg-zinc-700 hover:bg-zinc-500'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">Vol. 0{activePhoto + 1}</span>
                </div>
              </div>

              {/* Hardware Gear Specs (5 cols) */}
              <div className="md:col-span-5 p-6 rounded-2xl bg-[#232E33]/40 border border-white/[0.03] shadow-xl flex flex-col justify-between text-left">
                <div className="flex items-center gap-2 mb-4 text-[#A1D1B1]">
                  <Gamepad2 size={16} />
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase">My Battle Gear</span>
                </div>

                <div className="flex flex-col gap-3 font-mono text-[11px]">
                  <div className="flex flex-col border-b border-white/5 pb-2">
                    <span className="text-zinc-500">KEYBOARD</span>
                    <span className="text-white font-medium text-xs mt-0.5">GMMK Pro Linear Custom</span>
                  </div>
                  <div className="flex flex-col border-b border-white/5 pb-2">
                    <span className="text-zinc-500">AUDIO DECK</span>
                    <span className="text-white font-medium text-xs mt-0.5">Focusrite Scarlett Solo</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-zinc-500">MONITOR</span>
                    <span className="text-white font-medium text-xs mt-0.5">34" Curved Ultrawide</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Row Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Pet Projects Tech (6 cols) */}
              <div className="md:col-span-6 p-6 rounded-2xl bg-[#232E33]/40 border border-white/[0.03] shadow-xl flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center gap-2 mb-4 text-[#C3E7CE]">
                    <Cpu size={16} />
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase">Pet Projects Tech</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    Tech stacks I experiment with for pure fun and home automation systems.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['Rust', 'Raspberry Pi', 'Neovim', 'Figma', 'Docker', 'Lua'].map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-md bg-[#86B898]/10 border border-[#86B898]/25 text-[10px] font-mono text-[#A1D1B1] font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Philosophy Card (6 cols) */}
              <div className="md:col-span-6 p-6 rounded-2xl bg-[#232E33]/40 border border-white/[0.03] shadow-xl flex flex-col justify-between relative overflow-hidden group text-left">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#A1D1B1]/3 blur-xl rounded-full pointer-events-none"></div>
                
                <div>
                  <div className="flex items-center gap-2 mb-4 text-[#A1D1B1]">
                    <Compass size={16} />
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase">My Philosophy</span>
                  </div>
                  <h4 className="text-lg font-bold font-display text-white mb-2 leading-snug">"Simple details define the final masterpiece."</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Whether crafting a custom keyboard layout, arranging lighting spots on a wooden desk, or writing algorithms, I value meticulous execution, continuous learning, and open sharing.
                  </p>
                </div>

                <a 
                  href="https://github.com/viswaskasi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 mt-5 text-[10px] font-mono text-zinc-500 hover:text-white transition-colors cursor-pointer hover:underline"
                >
                  <span>My GitHub Profile</span>
                  <ExternalLink size={10} className="text-[#A1D1B1]" />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
