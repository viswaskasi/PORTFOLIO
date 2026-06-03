import { motion } from 'framer-motion';
import { Award, Calendar, CheckCircle2 } from 'lucide-react';
import { useRef } from 'react';

const certs = [
  {
    title: "Machine Learning with Python",
    issuer: "IBM / Coursera",
    date: "Mar 2026",
    description: "IBM-authorized course covering supervised/unsupervised learning, model evaluation, and ML algorithms using Python. Includes hands-on labs with Scikit-learn.",
    color: "text-red-500",
    glowColor: "rgba(255, 0, 60, 0.15)"
  },
  {
    title: "C Essentials 1 & 2",
    issuer: "Cisco Networking Academy",
    date: "Jan 2026",
    description: "Covered fundamentals and intermediate concepts of C programming including data types, control flow, functions, pointers, and memory management.",
    color: "text-red-400",
    glowColor: "rgba(255, 62, 108, 0.15)"
  },
  {
    title: "Python Essentials",
    issuer: "Cisco Networking Academy",
    date: "Dec 2025",
    description: "Comprehensive Python programming course covering core syntax, data structures, OOP, and scripting for real-world applications.",
    color: "text-red-500",
    glowColor: "rgba(255, 0, 60, 0.15)"
  },
  {
    title: "AIML Research Paper",
    issuer: "ULearn Publication",
    date: "Nov 2025",
    description: "Authored and published an academic research paper in Artificial Intelligence & Machine Learning, demonstrating research methodology and technical writing.",
    color: "text-red-400",
    glowColor: "rgba(255, 62, 108, 0.15)"
  }
];

export default function CertificationsCarousel() {
  const constraintsRef = useRef(null);

  return (
    <div className="py-12 relative overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
            <Award size={18} className="text-[#FF003C]" />
            <span>Professional Credentials & Certifications</span>
          </h3>
          <p className="text-xs text-zinc-500 font-light mt-1">
            Drag the cards horizontally to browse verified achievements.
          </p>
        </div>

        {/* Carousel Drag Container */}
        <div ref={constraintsRef} className="overflow-hidden cursor-grab active:cursor-grabbing py-4 select-none">
          <motion.div
            drag="x"
            dragConstraints={{ left: -450, right: 0 }}
            className="flex gap-6 w-max"
          >
            {certs.map((cert, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                className="w-[280px] md:w-[320px] p-6 rounded-2xl border border-white/5 bg-[#09090b]/80 backdrop-blur-xl relative group overflow-hidden shadow-lg select-none"
              >
                {/* Glowing border highlight */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{ boxShadow: `inset 0 0 20px ${cert.glowColor}` }}
                ></div>

                <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                  <div className="flex justify-between items-start">
                    <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${cert.color}`}>
                      <Award size={20} />
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1.5 px-2 py-0.5 bg-black/40 rounded-full border border-white/5">
                      <Calendar size={10} />
                      {cert.date}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold font-display text-white mb-1 group-hover:text-[#FF003C] transition-colors leading-tight">
                      {cert.title}
                    </h4>
                    <p className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
                      <CheckCircle2 size={12} className={cert.color} />
                      {cert.issuer}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-500 leading-relaxed font-light">
                    {cert.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
