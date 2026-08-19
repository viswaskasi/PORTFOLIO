import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface InitialPreloaderProps {
  onComplete?: () => void;
}

export default function InitialPreloader({ onComplete }: InitialPreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show intro logo for exactly 1.8 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onComplete) onComplete();
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(12px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FFFFFF] text-[#000000] overflow-hidden select-none font-sans"
        >
          {/* Ambient Soft Glow Behind Logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#F0F2F5] rounded-full blur-[120px] pointer-events-none" />

          {/* 3D Rotating Logo Container (Centered) */}
          <div className="relative flex items-center justify-center w-28 h-28 z-10">
            
            {/* Outer Spinning Dual Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute inset-0 rounded-3xl border-2 border-[#D0D3D9] border-t-[#000000] shadow-sm"
            />

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
              className="absolute -inset-2 rounded-[28px] border-2 border-[#D0D3D9]/60 border-b-[#000000]"
            />

            {/* Glowing Terminal Logo Box */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-20 h-20 rounded-2xl bg-[#000000] border-2 border-[#000000] flex items-center justify-center shadow-xl backdrop-blur-xl relative overflow-hidden group"
            >
              {/* Sheen animation across logo */}
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
              />

              {/* Terminal Icon Logo */}
              <div className="flex items-center justify-center text-white font-mono font-bold text-2xl tracking-tighter">
                <Terminal size={30} className="text-white drop-shadow-sm" />
              </div>
            </motion.div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
