import { useEffect, useRef } from 'react';

export default function StudioDeskBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking for particle repulsion
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Samurai glowing fire embers (ashes) & crimson sakura petals drifting
    // Lighten load for mobile viewports to ensure high frame rate scrolling
    const isMobile = window.innerWidth < 768 || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const particleCount = isMobile ? 25 : 75;
    const particles: {
      type: 'ember' | 'sakura';
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      baseOpacity: number;
      fadeSpeed: number;
      wobble: number;
      wobbleSpeed: number;
      rotation: number;
      rotSpeed: number;
      color: { r: number; g: number; b: number };
    }[] = [];

    // Colors: Crimson Red, Coral Orange, Golden Amber, and Sakura Pink-Red
    const fireColors = [
      { r: 251, g: 54, b: 64 },   // Crimson Red
      { r: 255, g: 127, b: 17 },  // Coral Orange
      { r: 255, g: 196, b: 45 }   // Golden Amber
    ];
    const sakuraColors = [
      { r: 251, g: 54, b: 64 },   // Deep Cherry Red
      { r: 255, g: 80, b: 110 },  // Vibrant Sakura Pink
      { r: 190, g: 20, b: 40 }    // Ruby Red
    ];

    for (let i = 0; i < particleCount; i++) {
      const isSakura = Math.random() > 0.6;
      const color = isSakura 
         ? sakuraColors[Math.floor(Math.random() * sakuraColors.length)]
         : fireColors[Math.floor(Math.random() * fireColors.length)];
      
      const baseOpacity = isMobile ? (0.15 + Math.random() * 0.35) : (0.25 + Math.random() * 0.55);
      
      particles.push({
        type: isSakura ? 'sakura' : 'ember',
        x: Math.random() * width,
        y: Math.random() * height,
        size: isSakura ? (1.5 + Math.random() * 2.8) : (1.0 + Math.random() * 2.2),
        speedX: isSakura ? (-0.6 - Math.random() * 0.8) : (-0.2 + Math.random() * 0.5), // Sakura drifts more diagonally (wind-blown)
        speedY: isSakura ? (-0.4 - Math.random() * 0.7) : (-0.6 - Math.random() * 1.3), // Embers rise faster
        opacity: Math.random() * baseOpacity,
        baseOpacity,
        fadeSpeed: 0.002 + Math.random() * 0.005,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: isSakura ? (0.01 + Math.random() * 0.015) : (0.018 + Math.random() * 0.025),
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: isSakura ? (-0.015 + Math.random() * 0.03) : (-0.04 + Math.random() * 0.08),
        color
      });
    }

    // Dynamic wind simulation
    let windForce = 0;
    let windTarget = 0;
    let windInterval = setInterval(() => {
      // Occasional sudden gust of wind
      windTarget = Math.random() > 0.7 ? -1.2 - Math.random() * 1.5 : 0;
    }, 4500);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate wind force
      windForce += (windTarget - windForce) * 0.05;

      // Render floating samurai embers & sakura
      particles.forEach((p) => {
        // Apply wind sway and rotation
        p.wobble += p.wobbleSpeed;
        p.rotation += p.rotSpeed;

        // Calculate distance from cursor for interactive repel force
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let forceX = 0;
        let forceY = 0;

        if (dist < 150) {
          const strength = (150 - dist) / 150;
          const angle = Math.atan2(dy, dx);
          // Push away faster
          forceX = Math.cos(angle) * strength * 2.2;
          forceY = Math.sin(angle) * strength * 2.2;
        }
        
        // Apply forces
        p.x += p.speedX + Math.sin(p.wobble) * 0.4 + windForce + forceX;
        p.y += p.speedY + forceY;

        // Organic glow flicker / fade
        p.opacity += p.fadeSpeed;
        if (p.opacity > p.baseOpacity || p.opacity < 0) {
          p.fadeSpeed = -p.fadeSpeed;
        }
        const displayOpacity = Math.max(0, Math.min(p.baseOpacity, p.opacity));

        // Wrap around boundary coordinates
        if (p.y < -15) {
          p.y = height + 15;
          p.x = Math.random() * width;
          p.opacity = 0;
        }
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        // Draw rotated shape
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Core hot ember / petal glowing gradient
        const grad = ctx.createRadialGradient(0, 0, p.size * 0.1, 0, 0, p.size * 1.5);
        grad.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${displayOpacity})`);
        
        if (p.type === 'ember') {
          grad.addColorStop(0.3, `rgba(${p.color.r}, ${p.color.g - 30 > 0 ? p.color.g - 30 : 0}, ${p.color.b}, ${displayOpacity * 0.85})`);
          grad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = grad;
          
          // Draw diamond ash polygon
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.3);
          ctx.lineTo(p.size * 0.7, 0);
          ctx.lineTo(0, p.size * 1.3);
          ctx.lineTo(-p.size * 0.7, 0);
          ctx.closePath();
          ctx.fill();

          // Outer halo for hot sparks
          if (p.size > 1.8) {
            ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${displayOpacity * 0.15})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.arc(0, 0, p.size * 2.8, 0, Math.PI * 2);
            ctx.stroke();
          }
        } else {
          // Sakura Petal
          grad.addColorStop(0.4, `rgba(${p.color.r}, ${Math.max(0, p.color.g - 20)}, ${p.color.b + 10}, ${displayOpacity * 0.9})`);
          grad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = grad;

          // Draw an elegant organic leaf/petal curve
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 1.5, p.size * 0.8, 0, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fill();

          // Small notch at the end of the cherry blossom petal
          ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${displayOpacity * 0.25})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 1.5, p.size * 0.8, 0, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      clearInterval(windInterval);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* ── Ambient Lighting Spots (Unified premium samurai crimson glows) ── */}
      {/* Glowing Crimson (Top-Left) */}
      <div 
        className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] rounded-full blur-[140px] bg-[#FB3640]/[0.11]"
      />

      {/* Glowing Crimson (Center-Right) */}
      <div 
        className="absolute top-[15%] right-[-10%] w-[75%] h-[75%] rounded-full blur-[150px] bg-[#FB3640]/[0.06]"
      />

      {/* Glowing Crimson (Bottom-Left) */}
      <div 
        className="absolute bottom-[-15%] left-[5%] w-[65%] h-[65%] rounded-full blur-[130px] bg-[#FB3640]/[0.05]"
      />

      {/* ── Fine structural glassmorphic room dividers (architectural/office aesthetic) ── */}
      <div className="absolute inset-0 border-r border-white/[0.015] left-1/4 h-full pointer-events-none"></div>
      <div className="absolute inset-0 border-r border-white/[0.01] left-2/3 h-full pointer-events-none"></div>
      <div className="absolute inset-0 border-b border-white/[0.01] top-1/3 w-full pointer-events-none"></div>
      
      {/* ── Dust Particles Canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full mix-blend-screen"
        style={{ opacity: 0.85 }}
      />
    </div>
  );
}
