import { useState, useMemo } from 'react';
import { Github, Flame, GitCommit, GitBranch, AlertCircle } from 'lucide-react';

export default function GithubActivity() {
  const [hoveredCell, setHoveredCell] = useState<{ week: number; day: number; commits: number } | null>(null);

  // Generate mock contribution grid (24 weeks, 7 days)
  const gridData = useMemo(() => {
    const data: { commits: number }[][] = [];
    for (let w = 0; w < 24; w++) {
      const week: { commits: number }[] = [];
      for (let d = 0; d < 7; d++) {
        // Create realistic distribution: higher weekday probability, random streaks
        const isWeekend = d === 0 || d === 6;
        let commits = 0;
        const prob = Math.random();

        if (prob > 0.4) {
          commits = Math.floor(Math.random() * (isWeekend ? 3 : 8));
        }
        week.push({ commits });
      }
      data.push(week);
    }
    return data;
  }, []);

  // Map commit counts to red background shades
  const getCellColor = (commits: number) => {
    if (commits === 0) return 'bg-[#0f0f11] border border-white/[0.02]';
    if (commits < 3) return 'bg-[#40000a] border border-[#FF003C]/10';
    if (commits < 5) return 'bg-[#800014] border border-[#FF003C]/20';
    if (commits < 8) return 'bg-[#c0001f] border border-[#FF003C]/40';
    return 'bg-[#ff003c] border border-[#ff3e6c]/60 shadow-[0_0_8px_rgba(255,0,60,0.5)]';
  };

  return (
    <div className="py-12 relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <h3 className="text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
            <Github size={18} className="text-[#FF003C]" />
            <span>Open Source Commits & Engine</span>
          </h3>
          <p className="text-xs text-zinc-500 font-light mt-1">
            Real-time visual monitoring of version control activity logs.
          </p>
        </div>

        {/* Bento Cell Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Grid (Spans 8 columns) */}
          <div className="lg:col-span-8 p-6 rounded-2xl border border-white/5 bg-[#09090b]/80 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between min-h-[220px]">
            <div className="flex justify-between items-center mb-4 select-none">
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold">Contribution Lattice (24 Weeks)</span>
              
              {/* Legend */}
              <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 font-mono">
                <span>Less</span>
                <span className="w-2.5 h-2.5 rounded bg-[#0f0f11]"></span>
                <span className="w-2.5 h-2.5 rounded bg-[#40000a]"></span>
                <span className="w-2.5 h-2.5 rounded bg-[#800014]"></span>
                <span className="w-2.5 h-2.5 rounded bg-[#c0001f]"></span>
                <span className="w-2.5 h-2.5 rounded bg-[#ff003c]"></span>
                <span>More</span>
              </div>
            </div>

            {/* Grid Scroller */}
            <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
              <div className="flex gap-1.5 w-max">
                {gridData.map((week, wIndex) => (
                  <div key={wIndex} className="flex flex-col gap-1.5">
                    {week.map((day, dIndex) => (
                      <div
                        key={dIndex}
                        onMouseEnter={() => setHoveredCell({ week: wIndex, day: dIndex, commits: day.commits })}
                        onMouseLeave={() => setHoveredCell(null)}
                        className={`w-3 h-3 rounded-[3px] transition-all duration-150 cursor-crosshair hover:scale-125 hover:z-10 ${getCellColor(day.commits)}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Hover Tooltip display info */}
            <div className="h-6 mt-4 text-[10px] font-mono text-zinc-400 flex items-center gap-1.5 border-t border-white/5 pt-3">
              {hoveredCell ? (
                <>
                  <GitCommit size={12} className="text-[#FF003C]" />
                  <span>
                    Week {hoveredCell.week + 1}, Day {hoveredCell.day + 1}: <strong className="text-white">{hoveredCell.commits} commits</strong>
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle size={12} className="text-zinc-600" />
                  <span>Hover over nodes to inspect data package packets.</span>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Engine Statistics (Spans 4 columns) */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
            
            {/* Stat Card 1 */}
            <div className="p-5 rounded-2xl border border-white/5 bg-[#09090b]/80 backdrop-blur-xl flex items-center gap-4 relative group hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-xl bg-[#FF003C]/10 flex items-center justify-center text-[#FF003C] shrink-0">
                <Flame size={18} className="animate-pulse" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold font-display text-white">68 Days</div>
                <div className="text-[9px] uppercase font-mono tracking-wider text-zinc-500 mt-0.5">Longest Streak</div>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="p-5 rounded-2xl border border-white/5 bg-[#09090b]/80 backdrop-blur-xl flex items-center gap-4 relative group hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-xl bg-[#FF3E6C]/10 flex items-center justify-center text-[#FF3E6C] shrink-0">
                <GitBranch size={18} />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold font-display text-white">1,420+</div>
                <div className="text-[9px] uppercase font-mono tracking-wider text-zinc-500 mt-0.5">Yearly Commits</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
