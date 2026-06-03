import { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface F1IntroProps {
  onTransitionStart: () => void;
  onComplete: () => void;
}

export default function F1Intro({ onTransitionStart, onComplete }: F1IntroProps) {
  const [transitionStarted, setTransitionStarted] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Disable scrolling when the intro mounts
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      // Restore scrolling on unmount
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  const handleVideoEnded = () => {
    if (!transitionStarted) {
      setTransitionStarted(true);
      onTransitionStart();
      
      // Allow the video container to fade out smoothly over 800ms before unmounting
      setTimeout(() => {
        onComplete();
      }, 800);
    }
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.currentTime >= 9.03 && !transitionStarted) {
      setTransitionStarted(true);
      onTransitionStart();
      
      // Allow the video container to fade out smoothly over 800ms before unmounting
      setTimeout(() => {
        onComplete();
      }, 800);
    }
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !muted;
      setMuted(!muted);
    }
  };

  const handleSkip = () => {
    if (!transitionStarted) {
      setTransitionStarted(true);
      onTransitionStart();
      setTimeout(() => {
        onComplete();
      }, 300);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#030102] overflow-hidden select-none"
      style={{
        opacity: transitionStarted ? 0 : 1,
        transition: 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1)', // Smooth fade out of video player
        pointerEvents: transitionStarted ? 'none' : 'auto'
      }}
    >
      {/* Full-Screen Autoplay Cinematic Intro Video */}
      <video
        ref={videoRef}
        src="/samuari.mp4"
        autoPlay
        muted={muted}
        playsInline
        onEnded={handleVideoEnded}
        onTimeUpdate={handleTimeUpdate}
        className="w-full h-full object-cover"
      />

      {/* Vignette Shadow Overlay for cinematic depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

      {/* Sound & Skip Controls Overlay */}
      {!transitionStarted && (
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center z-40">
          {/* Audio Toggle */}
          <button
            onClick={toggleSound}
            className="p-3.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/5 hover:border-white/20 text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          {/* Skip Capsule */}
          <button
            onClick={handleSkip}
            className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs font-mono tracking-wider font-semibold transition-all hover:scale-[1.03] cursor-pointer"
          >
            SKIP INTRO
          </button>
        </div>
      )}
    </div>
  );
}
