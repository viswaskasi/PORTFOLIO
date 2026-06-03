import { Github, Linkedin, Facebook, Instagram, Send, Star, Users, MessageSquare, Award, ExternalLink } from 'lucide-react';

export default function SocialActivities() {
  const milestones = [
    {
      year: '2025 - Present',
      title: 'Open Source Organizer & Core Contributor',
      org: 'Developer Community Group',
      desc: 'Organizing regional developer meetings, mentoring junior coders, and contributing core features to accessible web frameworks.',
      icon: <Users size={16} />,
      accent: 'border-[#A1D1B1] text-[#A1D1B1] bg-[#A1D1B1]/10',
    },
    {
      year: '2024',
      title: 'Grand Prize Winner',
      org: 'Global Web3 & WebXR Hackathon',
      desc: 'Collaborated with a cross-functional team to build a high-performance 3D collaboration space on a detailed canvas, winning first place.',
      icon: <Award size={16} />,
      accent: 'border-[#86B898] text-[#86B898] bg-[#86B898]/10',
    },
    {
      year: '2023 - 2024',
      title: 'Hobby Blogger & Technical Writer',
      org: 'Personal Technical Blog',
      desc: 'Authoring articles on React engine architecture, CSS variables customization, and optimized 60fps canvas animation rendering.',
      icon: <MessageSquare size={16} />,
      accent: 'border-[#C3E7CE] text-[#C3E7CE] bg-[#C3E7CE]/10',
    },
    {
      year: '2023',
      title: 'Community Tech Speaker',
      org: 'Regional Tech Meets',
      desc: 'Spoke on modern web aesthetics, standard component architectures, and best practices in building luxury portfolio websites.',
      icon: <Star size={16} />,
      accent: 'border-[#A1D1B1] text-[#A1D1B1] bg-[#A1D1B1]/10',
    },
  ];

  const socialChannels = [
    { name: 'GitHub', handle: '@viswaskasi', link: 'https://github.com/viswaskasi', icon: <Github size={20} />, color: 'hover:border-[#A1D1B1] hover:text-[#A1D1B1] hover:shadow-[0_0_15px_rgba(161,209,177,0.15)]' },
    { name: 'LinkedIn', handle: 'Viswas Kasi', link: 'https://www.linkedin.com/in/kasi-viswas', icon: <Linkedin size={20} />, color: 'hover:border-[#C3E7CE] hover:text-[#C3E7CE] hover:shadow-[0_0_15px_rgba(195,231,206,0.15)]' },
    { name: 'Facebook', handle: 'Kasi Viswas', link: 'https://www.facebook.com/profile.php?id=61573993324010', icon: <Facebook size={20} />, color: 'hover:border-[#86B898] hover:text-[#86B898] hover:shadow-[0_0_15px_rgba(134,184,152,0.15)]' },
    { name: 'Instagram', handle: '@viswas.kasi', link: 'https://www.instagram.com/viswas.kasi/', icon: <Instagram size={20} />, color: 'hover:border-[#A1D1B1] hover:text-[#A1D1B1] hover:shadow-[0_0_15px_rgba(161,209,177,0.15)]' },
  ];

  return (
    <section id="contributions" className="py-20 relative bg-transparent overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#A1D1B1]/4 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#A1D1B1]/20 bg-[#A1D1B1]/5 text-xs font-semibold text-[#A1D1B1] tracking-wider uppercase w-fit">
            <Users size={12} />
            Milestones Feed
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white tracking-tight">
            My Active <span className="text-gradient-purple font-extrabold" style={{ '--color-accent': '#A1D1B1' } as React.CSSProperties}>Contributions</span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-[#A1D1B1] to-[#C3E7CE] rounded-full mt-1"></div>
          <p className="mt-4 text-zinc-500 max-w-2xl font-light text-base md:text-lg">
            Volunteering, technical writing, hackathons, and community projects that fuel my personal growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* ── Vertical Timeline of Milestones (7 cols) ── */}
          <div className="lg:col-span-7 relative pl-6 md:pl-10 text-left">
            {/* Vertical glowing spine line */}
            <div className="absolute left-[17px] md:left-[29px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-[#A1D1B1] via-[#C3E7CE] to-[#86B898] opacity-40 shadow-[0_0_8px_rgba(161,209,177,0.3)]"></div>

            <div className="flex flex-col gap-10">
              {milestones.map((m, idx) => (
                <div key={idx} className="relative group">
                  
                  {/* Timeline Connector node */}
                  <div className={`absolute -left-[23px] md:-left-[35px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 scale-100 group-hover:scale-110 z-10 ${m.accent}`}>
                    {m.icon}
                  </div>

                  <div className="p-5 rounded-2xl bg-[#232E33]/40 border border-white/5 hover:border-[#A1D1B1]/30 transition-all duration-300 relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(161,209,177,0.04)]">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono font-bold text-[#C3E7CE] tracking-wider uppercase">{m.year}</span>
                      <span className="text-[11px] font-medium text-zinc-500 font-display flex items-center gap-1 group-hover:text-white transition-colors">
                        {m.org}
                        <ExternalLink size={10} className="text-[#A1D1B1]" />
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 font-display tracking-tight group-hover:text-[#A1D1B1] transition-colors">{m.title}</h3>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed">{m.desc}</p>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* ── Social Handles Connect (5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            
            {/* Quick Connect deck */}
            <div className="p-6 rounded-2xl bg-[#232E33]/40 border border-white/5 shadow-xl">
              <h3 className="text-base font-bold font-display text-white mb-1">Let's Connect Socially</h3>
              <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                Find my snapshots, daily musings, open-source commits, or directly drop a line on your preferred channel.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {socialChannels.map((s) => (
                  <a 
                    key={s.name}
                    href={s.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className={`p-4 rounded-xl border border-white/5 bg-[#1C2529]/80 flex flex-col gap-2 transition-all duration-300 cursor-pointer ${s.color}`}
                  >
                    <span className="opacity-80 group-hover:scale-110 transition-transform">{s.icon}</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold font-display text-white">{s.name}</span>
                      <span className="text-[10px] font-mono text-zinc-500 mt-0.5">{s.handle}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Greeting Portal */}
            <div className="p-6 rounded-2xl bg-[#232E33]/40 border border-white/5 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#A1D1B1]/3 blur-xl rounded-full pointer-events-none"></div>
              
              <h3 className="text-base font-bold font-display text-white mb-1">Leave a Fast Greeting</h3>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                Drop a note directly to my inbox without switching back to professional mode!
              </p>

              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full px-3.5 py-2.5 rounded-lg border border-white/5 bg-[#1C2529]/90 text-xs font-sans text-white focus:border-[#A1D1B1] focus:shadow-[0_0_12px_rgba(161,209,177,0.1)] outline-none transition-all duration-300"
                />
                <textarea 
                  rows={3}
                  placeholder="Say hello..." 
                  className="w-full px-3.5 py-2.5 rounded-lg border border-white/5 bg-[#1C2529]/90 text-xs font-sans text-white focus:border-[#A1D1B1] focus:shadow-[0_0_12px_rgba(161,209,177,0.1)] outline-none transition-all duration-300 resize-none"
                />
                <button 
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#A1D1B1] to-[#C3E7CE] text-xs font-bold text-zinc-900 tracking-wider uppercase transition-transform active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 hover:opacity-90 cursor-pointer"
                >
                  <Send size={12} />
                  <span>Send Greeting</span>
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
