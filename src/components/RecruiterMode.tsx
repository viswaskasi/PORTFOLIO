import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, FileText, Mail, Phone, ExternalLink, Zap, ShieldCheck, Cpu, Code2 } from 'lucide-react';

interface RecruiterModeProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export default function RecruiterMode({ isOpen, onClose, onOpenResume }: RecruiterModeProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const recruiterMetrics = [
    { label: "Role Focus", value: "Full Stack Web Developer / Software Engineer", icon: <Cpu size={14} className="text-[#000000]" /> },
    { label: "Core Stack", value: "React, TypeScript, Node.js, Express, MongoDB, Python", icon: <Code2 size={14} className="text-[#000000]" /> },
    { label: "Specialization", value: "Modern Web Apps, REST APIs, UI/UX Engineering, Database Design", icon: <Zap size={14} className="text-[#000000]" /> },
    { label: "Location", value: "Visakhapatnam, AP, India (Open to Remote / Relocation)", icon: <ShieldCheck size={14} className="text-[#000000]" /> },
  ];

  const highlights = [
    "Experienced in building end-to-end full-stack web applications with React, Node.js, Express, and MongoDB.",
    "Built real-time web platforms with Server-Sent Events (SSE), WebSockets, and dynamic client-side rendering.",
    "IBM Certified in Machine Learning with Python; Published technical research paper in ULearn.",
    "Strong foundation in Data Structures & Algorithms, responsive UI design, and scalable backend architecture."
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[105] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            className="relative w-full max-w-2xl max-h-[88vh] flex flex-col bg-[#FFFFFF] border border-[#D0D3D9] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden z-10 font-sans"
          >
            {/* Header glow line */}
            <div className="h-1.5 w-full bg-[#000000] shrink-0" />

            {/* Header Content */}
            <div className="p-6 pb-4 flex items-start justify-between border-b border-[#E5E7EB] bg-[#F8F9FB] shrink-0">
              <div className="space-y-1 text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFFFFF] border border-[#D0D3D9] text-[10px] font-mono font-black uppercase tracking-wider text-[#000000] shadow-xs">
                  <Zap size={11} className="text-[#000000]" />
                  Recruiter Executive HUD
                </div>
                <h2 className="text-2xl font-black font-display text-[#000000] tracking-tight">
                  Kasi Viswas — Candidate Brief
                </h2>
                <p className="text-xs text-[#2E3033] font-mono font-bold">
                  30-Second Executive Summary for Technical Recruiters & Engineering Leads
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-[#FFFFFF] border border-[#D0D3D9] text-[#000000] hover:bg-[#F8F9FB] hover:border-[#000000] transition-colors cursor-pointer shadow-xs"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body (Scrollable with Lenis prevention) */}
            <div 
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="p-6 space-y-6 text-left flex-1 overflow-y-auto scrollbar-thin overscroll-contain bg-[#FFFFFF]"
            >
              
              {/* Executive Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recruiterMetrics.map((metric, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#F8F9FB] border border-[#D0D3D9] space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#2E3033] font-black">
                      {metric.icon}
                      <span>{metric.label}</span>
                    </div>
                    <p className="text-xs font-bold text-[#000000]">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Key Technical Achievements */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase font-mono tracking-wider font-black text-[#000000] flex items-center gap-1.5">
                  <Zap size={14} className="text-[#000000]" />
                  Key Recruiter Evaluation Points
                </h3>
                <div className="space-y-2">
                  {highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F8F9FB] border border-[#D0D3D9] text-xs text-[#000000] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#000000] mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 1-Click Action Triggers */}
              <div className="pt-2 border-t border-[#E5E7EB] space-y-3">
                <h3 className="text-xs uppercase font-mono tracking-wider font-black text-[#000000]">
                  Instant Contact & Document Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Copy Email */}
                  <button
                    onClick={() => handleCopy("viswaskasi2006@gmail.com", "email")}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#FFFFFF] hover:bg-[#F8F9FB] border border-[#D0D3D9] hover:border-[#333538] text-xs font-black text-[#000000] transition-all cursor-pointer shadow-xs"
                  >
                    {copiedField === "email" ? (
                      <>
                        <Check size={14} className="text-emerald-700 stroke-[2.5]" />
                        <span className="text-emerald-700 font-bold">Email Copied!</span>
                      </>
                    ) : (
                      <>
                        <Mail size={14} className="text-[#000000]" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>

                  {/* Copy Phone */}
                  <button
                    onClick={() => handleCopy("+91 8074800497", "phone")}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#FFFFFF] hover:bg-[#F8F9FB] border border-[#D0D3D9] hover:border-[#333538] text-xs font-black text-[#000000] transition-all cursor-pointer shadow-xs"
                  >
                    {copiedField === "phone" ? (
                      <>
                        <Check size={14} className="text-emerald-700 stroke-[2.5]" />
                        <span className="text-emerald-700 font-bold">Phone Copied!</span>
                      </>
                    ) : (
                      <>
                        <Phone size={14} className="text-[#000000]" />
                        <span>Copy Phone</span>
                      </>
                    )}
                  </button>

                  {/* Open Resume PDF */}
                  <button
                    onClick={() => {
                      onClose();
                      onOpenResume();
                    }}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#000000] hover:bg-[#252525] border border-[#000000] text-xs font-black text-white transition-all cursor-pointer shadow-xs"
                  >
                    <FileText size={14} className="text-white" />
                    <span>View Resume</span>
                  </button>

                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#E5E7EB] bg-[#F8F9FB] flex items-center justify-between text-[11px] font-mono text-[#2E3033] font-bold shrink-0">
              <span>Candidate ID: VK-2026-AI</span>
              <a 
                href="https://github.com/viswaskasi" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1 text-[#000000] hover:underline font-black"
              >
                <span>GitHub Profile</span>
                <ExternalLink size={10} />
              </a>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
