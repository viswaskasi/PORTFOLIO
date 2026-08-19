import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers, Server, Activity, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface ProjectArchitectureData {
  title: string;
  category: string;
  accent: string;
  overview: string;
  pipeline: string[];
  benchmarks: { label: string; value: string }[];
  stack: string[];
}

interface SystemArchitectureModalProps {
  project: ProjectArchitectureData | null;
  onClose: () => void;
}

export default function SystemArchitectureModal({ project, onClose }: SystemArchitectureModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[105] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-md"
        />

        {/* Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-[#FFFFFF] border border-[#D0D3D9] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden z-10 font-sans text-[#000000] text-left flex flex-col"
        >
          {/* Top Accent Line */}
          <div className="h-1.5 w-full bg-[#000000]" />

          {/* Header Bar */}
          <div className="p-6 pb-4 flex items-start justify-between border-b border-[#E5E7EB] bg-[#F8F9FB]">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFFFFF] border border-[#D0D3D9] text-[10px] font-mono font-black uppercase tracking-wider text-[#000000] shadow-xs">
                <Layers size={11} className="text-[#000000]" />
                {project.category}
              </div>
              <h2 className="text-2xl font-black font-display text-[#000000] tracking-tight">
                {project.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#FFFFFF] border border-[#D0D3D9] text-[#000000] hover:bg-[#F8F9FB] hover:border-[#000000] transition-colors cursor-pointer shadow-xs"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body Specs Content */}
          <div 
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="p-6 space-y-6 overflow-y-auto scrollbar-thin flex-1 overscroll-contain bg-[#FFFFFF]"
          >
            
            {/* Overview Box */}
            <div className="p-4 rounded-xl bg-[#F8F9FB] border border-[#D0D3D9] space-y-2">
              <h3 className="text-xs font-mono font-black uppercase tracking-wider text-[#000000] flex items-center gap-1.5">
                <Activity size={13} className="text-[#000000]" />
                System Blueprint Overview
              </h3>
              <p className="text-xs text-[#2E3033] font-medium leading-relaxed">
                {project.overview}
              </p>
            </div>

            {/* Data Pipeline Flow */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-black uppercase tracking-wider text-[#000000] flex items-center gap-1.5">
                <Server size={13} className="text-[#000000]" />
                Execution & Data Pipeline Steps
              </h3>
              <div className="space-y-2">
                {project.pipeline.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F9FB] border border-[#D0D3D9] text-xs text-[#000000] font-bold">
                    <span className="w-6 h-6 rounded-lg bg-[#FFFFFF] border border-[#D0D3D9] flex items-center justify-center font-mono font-black text-[10px] text-[#000000] shrink-0 shadow-xs">
                      0{idx + 1}
                    </span>
                    <span className="leading-snug">{step}</span>
                    <ArrowRight size={12} className="ml-auto text-[#000000] shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Benchmarks */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-black uppercase tracking-wider text-[#000000] flex items-center gap-1.5">
                <Zap size={13} className="text-[#000000]" />
                Latency & Performance Benchmarks
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.benchmarks.map((bench, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#F8F9FB] border border-[#D0D3D9] space-y-1">
                    <span className="text-[10px] font-mono uppercase text-[#2E3033] font-bold block">{bench.label}</span>
                    <span className="text-sm font-black font-mono text-[#000000]">{bench.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Components */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-black uppercase tracking-wider text-[#000000] flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-[#000000]" />
                Core Component Manifest
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-[#F8F9FB] border border-[#D0D3D9] text-xs font-mono text-[#000000] font-bold">
                    {item}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#E5E7EB] bg-[#F8F9FB] flex items-center justify-between text-[11px] font-mono text-[#2E3033] font-bold">
            <span>Verified System Spec v1.0</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#000000] border border-[#000000] text-white hover:bg-[#252525] transition-all cursor-pointer shadow-xs font-black"
            >
              Close Spec Sheet
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
