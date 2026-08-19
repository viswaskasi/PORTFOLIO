import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Maximize2, Minimize2, FileText, Eye, ExternalLink } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeViewer({ isOpen, onClose }: ResumeViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleDownload = useCallback(() => {
    fetch('/resume.pdf')
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Kasi_Viswas_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch(() => window.open('/resume.pdf', '_blank'));
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed z-[101] flex flex-col transition-all duration-500 ease-out ${
              isFullscreen
                ? 'inset-2 md:inset-4 rounded-2xl'
                : 'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[95vw] h-[90vh] md:w-[80vw] md:h-[85vh] lg:w-[65vw] lg:h-[88vh] rounded-2xl'
            }`}
          >
            {/* Main container */}
            <div className="relative flex flex-col h-full bg-[#FFFFFF] rounded-2xl border border-[#D0D3D9] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              {/* Top Accent Line */}
              <div className="h-1.5 w-full bg-[#000000] shrink-0" />

              {/* ── Header Bar ── */}
              <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-[#E5E7EB] bg-[#F8F9FB]">
                {/* Left: File info */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#FFFFFF] border border-[#D0D3D9] shadow-xs">
                    <FileText size={16} className="text-[#000000]" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-black text-[#000000] tracking-tight flex items-center gap-2">
                      Kasi Viswas — Resume
                      <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FFFFFF] border border-[#D0D3D9] text-[9px] font-black uppercase tracking-wider text-[#000000] shadow-xs">
                        <Eye size={8} className="text-[#000000]" />
                        Live Preview
                      </span>
                    </h3>
                    <p className="text-[11px] text-[#2E3033] font-mono mt-0.5 font-bold">resume.pdf</p>
                  </div>
                </div>

                {/* Right: Action buttons */}
                <div className="flex items-center gap-2">
                  {/* Open in new tab */}
                  <button
                    onClick={() => window.open('/resume.pdf', '_blank')}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-bold text-[#000000] bg-[#FFFFFF] hover:bg-[#F8F9FB] hover:border-[#000000] border border-[#D0D3D9] transition-all duration-200 cursor-pointer shadow-xs"
                    title="Open in new tab"
                  >
                    <ExternalLink size={12} />
                    <span>Open</span>
                  </button>

                  {/* Fullscreen toggle */}
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-[#000000] bg-[#FFFFFF] hover:bg-[#F8F9FB] hover:border-[#000000] border border-[#D0D3D9] transition-all duration-200 cursor-pointer shadow-xs"
                    title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                  >
                    {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                  </button>

                  {/* Download button */}
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[11px] font-black text-white bg-[#000000] hover:bg-[#1C1C1C] hover:border-[#333538] border border-[#000000] transition-all duration-200 shadow-xs cursor-pointer"
                  >
                    <Download size={13} className="text-white" />
                    <span>Download</span>
                  </button>

                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="flex items-center justify-center w-9 h-9 rounded-lg text-[#000000] hover:bg-[#F8F9FB] border border-[#D0D3D9] hover:border-[#000000] transition-all duration-200 cursor-pointer shadow-xs"
                    title="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* ── PDF Viewer Area ── */}
              <div 
                data-lenis-prevent
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="flex-1 relative bg-[#F8F9FB] overflow-auto"
              >
                {/* Loading skeleton */}
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
                    <div className="relative w-14 h-14">
                      <div className="absolute inset-0 rounded-full border-2 border-[#D0D3D9]" />
                      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#000000] animate-spin" />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm font-black text-[#000000]">Loading Resume</span>
                      <span className="text-[11px] text-[#2E3033] font-mono font-bold">Initializing document viewer...</span>
                    </div>
                  </div>
                )}

                {/* Embedded PDF */}
                <iframe
                  src="/resume.pdf#toolbar=1&navpanes=0&view=Fit&zoom=page-fit"
                  className="w-full h-full border-0"
                  title="Resume Preview"
                  onLoad={() => setIsLoading(false)}
                />
              </div>

              {/* ── Bottom Status Bar ── */}
              <div className="flex items-center justify-between px-5 md:px-6 py-2.5 border-t border-[#E5E7EB] bg-[#F8F9FB]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#000000] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    Document Ready
                  </span>
                  <span className="text-[10px] text-[#2E3033] font-mono hidden sm:inline font-bold">PDF</span>
                </div>
                <span className="text-[10px] text-[#2E3033] font-mono font-bold">
                  Press ESC to close
                </span>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
