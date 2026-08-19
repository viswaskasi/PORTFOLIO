import { motion } from 'framer-motion';
import { Award, Calendar, MapPin, CheckCircle } from 'lucide-react';

const milestones = [
  {
    type: 'certification',
    title: 'Machine Learning with Python',
    subtitle: 'IBM / Coursera',
    date: 'Mar 2026',
    location: 'Remote',
    status: 'Verified',
    description: 'IBM-authorized rigorous coursework covering supervised and unsupervised learning models.',
    details: [
      'Mastered supervised and unsupervised ML modeling using Scikit-Learn.',
      'Covered regression, classification, clustering, and recommender systems.',
      'Developed classification models with evaluation metrics (F1-Score, Jaccard).'
    ],
    color: '#000000'
  },
  {
    type: 'certification',
    title: 'C Essentials 1 & 2',
    subtitle: 'Cisco Networking Academy',
    date: 'Jan 2026',
    location: 'Remote',
    status: 'Completed',
    description: 'Covered fundamentals and intermediate concepts of C programming including data types, control flow, functions, pointers, and memory management.',
    details: [
      'Deep dive into pointers, custom structures, and static/dynamic memory allocations.',
      'Mastered conditional execution, complex loops, and nested control flow configs.',
      'Implemented robust, memory-safe data processing routines and library modules.'
    ],
    color: '#000000'
  },
  {
    type: 'certification',
    title: 'Python Essentials',
    subtitle: 'Cisco Networking Academy',
    date: 'Dec 2025',
    location: 'Remote',
    status: 'Completed',
    description: 'Completed comprehensive Python programming course covering core syntax, data structures, OOP, and scripting for real-world applications.',
    details: [
      'Mastered core syntax, variables, expressions, and dynamic type configurations.',
      'Developed modular scripts leveraging object-oriented programming (OOP) paradigms.',
      'Built algorithm scripts and automation pipelines using Python\'s standard packages.'
    ],
    color: '#000000'
  },
  {
    type: 'certification',
    title: 'AIML Research Paper Publication',
    subtitle: 'ULearn Publication',
    date: 'Nov 2025',
    location: 'India',
    status: 'Published',
    description: 'Authored and successfully published a research paper covering ML applications.',
    details: [
      'Researched optimization algorithms and neural network architectures for AI.',
      'Documented results demonstrating technical writing and research methodology.',
      'Published in peer-reviewed science journal.'
    ],
    color: '#000000'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15
    }
  }
};

export default function Experience() {
  return (
    <section id="experience" className="py-20 relative overflow-hidden bg-transparent">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#F0F2F5] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D0D3D9] bg-[#FFFFFF] text-xs font-bold text-[#000000] mb-4 tracking-wider uppercase font-mono shadow-xs">
            <Award size={12} />
            Timeline
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-display text-[#000000] tracking-tight">
            My <span className="text-[#000000] font-black">Certifications</span>
          </h2>
          <div className="flex items-center gap-2 mt-4">
            <div className="h-1.5 w-16 bg-[#000000] rounded-full"></div>
            <div className="h-1.5 w-3 bg-[#66676A] rounded-full"></div>
          </div>
          <p className="mt-4 text-[#2E3033] max-w-2xl font-semibold text-base md:text-lg">
            A comprehensive look at my professional credentials, published research papers, and technical mastery certifications.
          </p>
        </motion.div>

        {/* Timeline Path */}
        <div className="relative pl-4 md:pl-0">
          
          {/* Vertical Path Guide Line */}
          <div className="absolute left-[5px] md:left-1/2 top-4 bottom-4 w-[2px] bg-[#D0D3D9] transform md:-translate-x-1/2 z-0"></div>

          {/* Timeline Nodes */}
          <div className="space-y-16">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={index} 
                  className={`flex flex-col md:flex-row items-start relative ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Glowing pulse indicator node */}
                  <div className="absolute left-[5px] md:left-1/2 top-6 -translate-x-1/2 z-10 flex items-center justify-center">
                    <span className="relative flex h-4 w-4">
                      <span 
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-40 bg-[#000000]"
                      ></span>
                      <span 
                        className="relative inline-flex rounded-full h-4 w-4 border-2 border-[#000000]/50 bg-[#FFFFFF] shadow-sm"
                      >
                        <span 
                          className="m-auto h-1.5 w-1.5 rounded-full bg-[#000000]"
                        ></span>
                      </span>
                    </span>
                  </div>

                  {/* Slide toward center line on scroll */}
                  <div className={`w-full md:w-[45%] pl-6 pr-2 md:pl-0 md:pr-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <motion.div
                      initial={{ 
                        opacity: 0, 
                        x: isEven ? -60 : 60 
                      }}
                      whileInView={{ 
                        opacity: 1, 
                        x: 0 
                      }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ type: "spring", stiffness: 60, damping: 15 }}
                      className="group p-6 flowing-border-card card-shimmer-trail"
                    >
                      <div className={`flex items-start gap-4 mb-4 ${isEven ? 'md:flex-row-reverse md:text-right' : 'text-left'}`}>
                        <div 
                          className="p-2.5 rounded-xl border border-[#D0D3D9] group-hover:border-[#000000] group-hover:bg-[#000000] bg-[#F8F9FB] text-[#000000] group-hover:text-white shrink-0 flex items-center justify-center shadow-xs transition-colors"
                        >
                          <Award size={18} />
                        </div>
                        <div>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#F8F9FB] border border-[#D0D3D9] group-hover:border-[#000000] text-[9px] font-mono font-black uppercase tracking-wider text-[#000000] mb-1 transition-colors">
                            {item.status}
                          </span>
                          <h3 className="text-lg font-black font-display text-[#000000] tracking-tight">
                            {item.title}
                          </h3>
                          <p className="text-xs font-bold mt-0.5 font-display text-[#2E3033]">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Timeline subdetails */}
                      <div className={`flex flex-wrap items-center gap-4 text-[10px] text-[#2E3033] mb-4 font-mono font-bold ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                        <span className="flex items-center gap-1">
                          <Calendar size={11} className="text-[#000000]" />
                          {item.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={11} className="text-[#000000]" />
                          {item.location}
                        </span>
                      </div>

                      <p className="text-xs text-[#2E3033] font-medium leading-relaxed mb-4 text-left">
                        {item.description}
                      </p>

                      {/* Bullet outcomes list */}
                      <motion.ul 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={`space-y-2 mt-4 pt-4 border-t border-[#E5E7EB] text-left`}
                      >
                        {item.details.map((detail, idx) => (
                          <motion.li 
                            key={idx} 
                            variants={itemVariants}
                            className="flex items-start gap-2 text-xs text-[#2E3033] font-semibold leading-relaxed group/bullet"
                          >
                            <CheckCircle size={13} className="mt-0.5 shrink-0 text-[#000000] stroke-[2.5]" />
                            <span>
                              {detail}
                            </span>
                          </motion.li>
                        ))}
                      </motion.ul>

                    </motion.div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block md:w-[10%]"></div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
