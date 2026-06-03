import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
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

    // Initialize Lenis smooth scroll on all devices (with touch support enabled)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      syncTouch: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    // Native requestAnimationFrame loop for ultra-smooth scrolling at screen refresh rate
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // ─── Custom Cursor Mouse Event Handler ───
    const handleMouseMove = (e: MouseEvent) => {
      const dot = cursorDotRef.current;
      const ring = cursorRingRef.current;
      if (!dot || !ring) return;

      // Animate dot and ring positions
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.05, ease: 'power2.out' });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power2.out' });
    };

    const handleMouseEnterLink = () => {
      document.body.classList.add('cursor-hover');
    };

    const handleMouseLeaveLink = () => {
      document.body.classList.remove('cursor-hover');
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Add hover listener to clickables
    const addCursorHoverListeners = () => {
      const clickables = document.querySelectorAll('a, button, [role="button"], .flowing-border-card, input, textarea');
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterLink);
        el.addEventListener('mouseleave', handleMouseLeaveLink);
      });
    };

    // Delay a bit to ensure elements are mounted
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
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
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
      window.removeEventListener('scroll', handleScrollProgress);
      revealCleanup();
      cancelAnimationFrame(rafId);
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-white font-sans selection:bg-[#FF003C]/30 relative overflow-x-hidden transition-colors duration-500">
      
      {/* ── Viewport Scroll Progress Indicator Line ── */}
      <div className="scroll-progress-bar" />

      {/* ── Custom Interactive Fluid Cursor (Hidden on touch devices) ── */}
      <div className="hidden md:block">
        <div ref={cursorDotRef} className="custom-cursor-dot" />
        <div ref={cursorRingRef} className="custom-cursor-ring" />
      </div>

      {/* ── Dynamic Mesh Gradient Background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle grid mesh */}
        <div className="absolute inset-0 cyber-grid opacity-[0.03]"></div>
        {/* Moving ambient glowing lights */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#FF003C]/8 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#FF3E6C]/4 blur-[150px]"></div>
      </div>

      {/* ── NAVIGATION NAVBAR ── */}
      <Navbar onViewResume={() => setResumeOpen(true)} />

      {/* ── MAIN PORTFOLIO CONTENT ── */}
      <div className="relative z-10 lg:pl-64 flex flex-col min-h-screen">
        <div className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 py-10 lg:py-16">
          <main className="w-full space-y-24">
            
            <div className="reveal-on-scroll">
              <Hero />
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

      {/* ── AI Assistant Chat Widget ── */}
      <AIAssistant />

      {/* ── Resume Viewer Modal ── */}
      <ResumeViewer isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}

export default App;
