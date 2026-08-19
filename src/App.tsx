import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InitialPreloader from './components/InitialPreloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeViewer from './components/ResumeViewer';
import AIAssistant from './components/AIAssistant';
import RecruiterMode from './components/RecruiterMode';
import CommandPalette from './components/CommandPalette';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [recruiterModeOpen, setRecruiterModeOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [mounted, setMounted] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  // Custom Cursor state refs
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent browser auto-scroll restoration on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    
    const scrollTimeout = setTimeout(() => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    }, 150);

    setMounted(true);

    // ─── Initialize Butter-Smooth Lenis Scroll synchronized with GSAP Ticker ───
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    let tickerCallback: ((time: number) => void) | null = null;

    if (!isTouchDevice) {
      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.05,
        touchMultiplier: 1.5,
        infinite: false,
      });
      lenisRef.current = lenis;

      lenis.on('scroll', ScrollTrigger.update);

      tickerCallback = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
    }

    // ─── Custom Cursor Mouse Event Handler ───
    const handleMouseMove = (e: MouseEvent) => {
      const dot = cursorDotRef.current;
      const ring = cursorRingRef.current;
      if (!dot || !ring) return;

      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.05, ease: 'power2.out' });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power2.out' });
    };

    const handleMouseEnterLink = () => {
      document.body.classList.add('cursor-hover');
    };

    const handleMouseLeaveLink = () => {
      document.body.classList.remove('cursor-hover');
    };

    // ─── Keyboard Shortcut Listener for Cmd+K / Ctrl+K ───
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    // Add hover listener to clickables
    const addCursorHoverListeners = () => {
      const clickables = document.querySelectorAll('a, button, [role="button"], .flowing-border-card, input, textarea');
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterLink);
        el.addEventListener('mouseleave', handleMouseLeaveLink);
      });
    };

    const hoverTimeout = setTimeout(addCursorHoverListeners, 1000);

    // ─── IntersectionObserver Scroll Reveal ───
    const handleScrollReveal = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
            }
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px -10px 0px' }
      );

      const targets = document.querySelectorAll('.reveal-on-scroll');
      targets.forEach((t) => observer.observe(t));

      return () => {
        targets.forEach((t) => observer.unobserve(t));
      };
    };

    const revealCleanup = handleScrollReveal();

    // ─── Scroll Progress Bar Logic ───
    const handleScrollProgress = () => {
      const progressBar = document.querySelector('.scroll-progress-bar') as HTMLDivElement;
      if (!progressBar) return;

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      progressBar.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', handleScrollProgress);

    return () => {
      clearTimeout(scrollTimeout);
      clearTimeout(hoverTimeout);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScrollProgress);
      revealCleanup();
      if (tickerCallback) {
        gsap.ticker.remove(tickerCallback);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  // ─── Pause Lenis & Lock Body Scroll When Modals Open ───
  const isAnyModalOpen = resumeOpen || recruiterModeOpen || commandPaletteOpen;

  useEffect(() => {
    if (isAnyModalOpen) {
      lenisRef.current?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenisRef.current?.start();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAnyModalOpen]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0E0E0E] font-sans selection:bg-[#000000] selection:text-[#FFFFFF] relative overflow-x-hidden transition-colors duration-500">
      
      {/* ── Initial Rotating Logo Portfolio Intro ── */}
      <InitialPreloader />

      {/* ── Viewport Scroll Progress Indicator Line ── */}
      <div className="scroll-progress-bar" />

      {/* ── Custom Interactive Fluid Cursor (Hidden on touch devices) ── */}
      <div className="hidden md:block">
        <div ref={cursorDotRef} className="custom-cursor-dot" />
        <div ref={cursorRingRef} className="custom-cursor-ring" />
      </div>

      {/* ── Dynamic Ambient Background Mesh for White Theme ── */}
      <div className="fixed-bg-stage select-none">
        <div className="absolute -top-[20%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-[#F0F2F5]/80 blur-[150px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[40%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-[#E7E8EB]/50 blur-[160px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-[#F8F9FB] blur-[140px]" />
        <div className="absolute inset-0 cyber-grid opacity-50" />
      </div>

      {/* ── Fixed Centered Ambient Profile Silhouette Background Image ── */}
      <div className="fixed-bg-stage lg:pl-64 select-none">
        <div className="w-full h-full flex items-center justify-center p-4 pointer-events-none relative">
          <img
            src="/profile-bg.png"
            alt="Profile Silhouette Background"
            aria-hidden="true"
            className="w-[75vw] sm:w-[75vw] md:w-[70vw] lg:w-[85vw] max-w-[280px] xs:max-w-[320px] sm:max-w-[520px] md:max-w-[850px] lg:max-w-[1050px] max-h-[55vh] sm:max-h-[75vh] md:max-h-[88vh] object-contain object-center opacity-[0.14] sm:opacity-[0.18] md:opacity-[0.22] grayscale contrast-125 select-none mix-blend-multiply relative z-[1]"
            style={{
              maskImage: 'radial-gradient(ellipse at 50% 50%, black 50%, transparent 92%)',
              WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 50%, transparent 92%)',
              transform: 'translateZ(0)',
              WebkitTransform: 'translateZ(0)'
            }}
          />
        </div>
      </div>

      {/* ── NAVIGATION NAVBAR ── */}
      <Navbar 
        onOpenRecruiterMode={() => setRecruiterModeOpen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onViewResume={() => setResumeOpen(true)}
      />

      {/* ── MAIN PORTFOLIO CONTENT ── */}
      <div className="relative z-10 lg:pl-64 flex flex-col min-h-screen">
        <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 lg:pt-16 pb-4 md:pb-6">
          <main className="w-full space-y-12 md:space-y-20">
            
            <div className="reveal-on-scroll">
              <Hero 
                onOpenResume={() => setResumeOpen(true)}
                onOpenRecruiterMode={() => setRecruiterModeOpen(true)}
              />
            </div>

            <div className="reveal-on-scroll">
              <About />
            </div>

            <div className="reveal-on-scroll">
              <Skills />
            </div>

            <div className="reveal-on-scroll">
              <Projects />
            </div>

            <div className="reveal-on-scroll">
              <Experience />
            </div>

            <div className="reveal-on-scroll">
              <Contact />
            </div>

          </main>
        </div>
        <Footer />
      </div>

      {/* ── Global Interactive Utilities & Modals ── */}
      <AIAssistant 
        onViewResume={() => setResumeOpen(true)}
        onOpenRecruiterMode={() => setRecruiterModeOpen(true)}
      />
      <ResumeViewer isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      <RecruiterMode 
        isOpen={recruiterModeOpen} 
        onClose={() => setRecruiterModeOpen(false)} 
        onOpenResume={() => setResumeOpen(true)}
      />
      <CommandPalette 
        isOpen={commandPaletteOpen} 
        onClose={() => setCommandPaletteOpen(false)} 
        onOpenResume={() => setResumeOpen(true)}
        onOpenRecruiterMode={() => setRecruiterModeOpen(true)}
      />
    </div>
  );
}

export default App;
