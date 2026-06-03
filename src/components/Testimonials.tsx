import { motion } from 'framer-motion';
import { Quote, MessageSquare, Terminal } from 'lucide-react';

const testimonials = [
  {
    quote: "Kasi's grasp of hand landmark tracking and deep integration with system volume drivers is stellar. He possesses a unique blend of core computer vision skills and modern web capabilities that is rare for a developer at this stage.",
    author: "Dr. A. Srinivasan",
    role: "Computer Science Academic Mentor",
    project: "Gesture Volume Controller"
  },
  {
    quote: "An exceptionally dedicated full-stack developer. When building MERN solutions, Kasi doesn't just write functional code; he focuses heavily on security, rapid load profiles, and neat structures. Always a pleasure pairing up.",
    author: "Pranav Mehta",
    role: "Senior Full Stack Architect",
    project: "Collab Stack Project"
  },
  {
    quote: "Authored an outstanding AI research paper in 2025 detailing advanced computational models. Kasi shows incredible research capability, critical thinking, and structured analysis of deep learning networks.",
    author: "ULearn Review Board",
    role: "Editorial Committee",
    project: "AI/ML Publication"
  }
];

export default function Testimonials() {
  return (
    <section id="endorsements" className="py-20 relative bg-transparent overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 w-[500px] h-[250px] bg-[#A1D1B1]/4 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#A1D1B1]/20 bg-[#A1D1B1]/5 text-xs font-semibold text-[#A1D1B1] mb-4 tracking-wider uppercase">
            <MessageSquare size={12} />
            Endorsements
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white tracking-tight">
            Peer <span className="text-gradient-purple font-extrabold" style={{ '--color-accent': '#A1D1B1' } as React.CSSProperties}>Testimonials</span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-[#A1D1B1] to-[#C3E7CE] rounded-full mt-4"></div>
          <p className="mt-4 text-zinc-500 max-w-2xl font-light text-base md:text-lg">
            Read comments from academic mentors, publishers, and peer full stack engineers.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 70, damping: 15, delay: index * 0.15 }}
              className="relative p-8 rounded-3xl border border-white/5 bg-[#232E33]/60 backdrop-blur-xl group hover:border-[#A1D1B1]/30 hover:shadow-[0_20px_45px_rgba(161,209,177,0.06)] transition-all duration-500 flex flex-col justify-between"
            >
              {/* Inner grid overlay */}
              <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none rounded-3xl"></div>

              {/* Quote icon */}
              <div className="absolute top-6 right-8 text-white/5 group-hover:text-[#A1D1B1]/10 transition-colors duration-500">
                <Quote size={56} />
              </div>

              <div className="relative z-10 flex-grow text-left">
                <p className="text-zinc-300 font-light text-xs md:text-sm leading-relaxed italic mb-8">
                  "{t.quote}"
                </p>
              </div>

              {/* Author footer */}
              <div className="relative z-10 border-t border-white/5 pt-5 flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#A1D1B1]/10 to-[#C3E7CE]/10 border border-white/10 flex items-center justify-center text-[#A1D1B1] shrink-0">
                  <Terminal size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-display text-white">{t.author}</h4>
                  <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider mb-0.5">{t.role}</p>
                  <span className="inline-flex text-[9px] font-mono text-[#C3E7CE] bg-[#C3E7CE]/5 border border-[#C3E7CE]/20 py-0.5 px-2 rounded-full">
                    {t.project}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
