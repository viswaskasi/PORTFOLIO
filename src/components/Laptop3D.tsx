import { useEffect, useRef } from 'react';

export default function Laptop3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Camera and interaction settings
    const camera = { dist: 480, fov: 420 };
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      mouse.targetX = x * 0.15;
      mouse.targetY = y * 0.15;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
      mouse.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Laptop Dimensions in 3D units
    const baseW = 190;
    const baseD = 135;
    const baseH = 8;
    const screenW = 190;
    const screenH = 125;
    const screenThick = 4;

    // Laptop rotation
    let rotationAngle = -0.5;

    // Generated code lines for the scrolling screen content
    const codeLines = [
      'const dev = new FullStackDeveloper();',
      'dev.name = "Kasi Viswas";',
      'dev.passion = ["Generative AI", "HCI"];',
      'dev.stack = ["React", "Node", "MongoDB"];',
      'dev.skills = ["LangChain", "OpenCV", "TS"];',
      'await dev.optimize({ fps: 60 });',
      '// Deploying responsive elements...',
      'console.log("Status: Online");',
      'api.listen(8080, () => "Ready");',
      'const style = "Mint" + "ShadowedGreen";',
      'git.commit("-m", "Professional redesign");',
      'while(true) { createExceptionalCode(); }',
      'npm run dev --host',
      '⚡ Vite dev server compiled successfully'
    ];

    let codeScrollY = 0;
    const maxVisibleLines = 9;

    // Orbiting particles (API requests / database nodes)
    const nodeCount = 35;
    const nodes: { radius: number; angle: number; y: number; speed: number; size: number; alpha: number; color: string }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        radius: 160 + Math.random() * 90,
        angle: Math.random() * Math.PI * 2,
        y: -120 + Math.random() * 200,
        speed: 0.003 + Math.random() * 0.005,
        size: 1 + Math.random() * 3,
        alpha: 0.15 + Math.random() * 0.65,
        color: Math.random() > 0.4 ? '#A1D1B1' : '#86B898'
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    // Helper 3D Projection functions
    const project = (x: number, y: number, z: number, cosY: number, sinY: number, cosX: number, sinX: number) => {
      // Rotate around Y axis
      const rx1 = x * cosY - z * sinY;
      const rz1 = x * sinY + z * cosY;
      const ry1 = y;

      // Rotate around X axis
      const rx2 = rx1;
      const ry2 = ry1 * cosX - rz1 * sinX;
      const rz2 = ry1 * sinX + rz1 * cosX;

      // Depth offset
      const zFinal = rz2 + camera.dist;
      const scale = camera.fov / zFinal;

      return {
        x: width / 2 + rx2 * scale,
        y: height / 2 + ry2 * scale,
        z: rz2,
        scale
      };
    };

    const drawPolygon = (
      points: { x: number; y: number }[],
      fillColor: string,
      strokeColor?: string,
      strokeWidth = 1
    ) => {
      if (points.length < 3) return;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.closePath();
      if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
      }
      if (strokeColor) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.stroke();
      }
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Mouse interactive easing
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Rotation angles
      rotationAngle += 0.0035; // Auto rotate
      const angleY = rotationAngle + mouse.x * 0.005;
      const angleX = 0.45 + mouse.y * 0.005; // View angle tilt

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const centerX = width / 2;
      const centerY = height / 2;

      // 1. Draw glowing digital grid/mesh behind the laptop
      const radialGlow = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 240);
      radialGlow.addColorStop(0, 'rgba(161, 209, 177, 0.04)');
      radialGlow.addColorStop(0.5, 'rgba(134, 184, 152, 0.02)');
      radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle futuristic cyber circles/rings rotating behind
      ctx.strokeStyle = 'rgba(161, 209, 177, 0.06)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 150, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(134, 184, 152, 0.04)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 190, 0, Math.PI * 2);
      ctx.stroke();

      // Render back-plane nodes (nodes with projected z < 0)
      nodes.forEach(n => {
        n.angle += n.speed;
        const nx = Math.cos(n.angle) * n.radius;
        const nz = Math.sin(n.angle) * n.radius;
        const ny = n.y;

        const proj = project(nx, ny, nz, cosY, sinY, cosX, sinX);

        if (proj.z < 0) {
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, n.size * proj.scale * 0.002, 0, Math.PI * 2);
          ctx.fillStyle = n.color === '#A1D1B1'
            ? `rgba(161, 209, 177, ${n.alpha * 0.4})`
            : `rgba(134, 184, 152, ${n.alpha * 0.4})`;
          ctx.fill();
        }
      });

      // 2. Define LAPTOP Model Vertices
      // Hinge Center at [0, 0, -baseD/2]
      const screenAngle = 1.95; // Opening tilt (approx 112 degrees back)
      const cosS = Math.cos(screenAngle);
      const sinS = Math.sin(screenAngle);

      // BASE Plate Corners (Y = 0 is top surface of base, Y = baseH is bottom)
      const bTL = { x: -baseW / 2, y: 0, z: -baseD / 2 };
      const bTR = { x: baseW / 2, y: 0, z: -baseD / 2 };
      const bBL = { x: -baseW / 2, y: 0, z: baseD / 2 };
      const bBR = { x: baseW / 2, y: 0, z: baseD / 2 };

      const bTL_bot = { x: -baseW / 2, y: baseH, z: -baseD / 2 };
      const bTR_bot = { x: baseW / 2, y: baseH, z: -baseD / 2 };
      const bBL_bot = { x: -baseW / 2, y: baseH, z: baseD / 2 };
      const bBR_bot = { x: baseW / 2, y: baseH, z: baseD / 2 };

      // Project Base plate corners
      const pBTL = project(bTL.x, bTL.y, bTL.z, cosY, sinY, cosX, sinX);
      const pBTR = project(bTR.x, bTR.y, bTR.z, cosY, sinY, cosX, sinX);
      const pBBL = project(bBL.x, bBL.y, bBL.z, cosY, sinY, cosX, sinX);
      const pBBR = project(bBR.x, bBR.y, bBR.z, cosY, sinY, cosX, sinX);

      const pBTL_b = project(bTL_bot.x, bTL_bot.y, bTL_bot.z, cosY, sinY, cosX, sinX);
      const pBTR_b = project(bTR_bot.x, bTR_bot.y, bTR_bot.z, cosY, sinY, cosX, sinX);
      const pBBL_b = project(bBL_bot.x, bBL_bot.y, bBL_bot.z, cosY, sinY, cosX, sinX);
      const pBBR_b = project(bBR_bot.x, bBR_bot.y, bBR_bot.z, cosY, sinY, cosX, sinX);

      // SCREEN Lid Corners
      // Bottom of screen starts at the back base hinge [x, 0, -baseD/2]
      // Top of screen goes up and back based on screenAngle
      const sBL = { x: -screenW / 2, y: 0, z: -baseD / 2 };
      const sBR = { x: screenW / 2, y: 0, z: -baseD / 2 };
      const sTL = { x: -screenW / 2, y: -screenH * sinS, z: -baseD / 2 + screenH * cosS };
      const sTR = { x: screenW / 2, y: -screenH * sinS, z: -baseD / 2 + screenH * cosS };

      const pSBL = project(sBL.x, sBL.y, sBL.z, cosY, sinY, cosX, sinX);
      const pSBR = project(sBR.x, sBR.y, sBR.z, cosY, sinY, cosX, sinX);
      const pSTL = project(sTL.x, sTL.y, sTL.z, cosY, sinY, cosX, sinX);
      const pSTR = project(sTR.x, sTR.y, sTR.z, cosY, sinY, cosX, sinX);

      // Bezel inner screen display boundaries (margins of screen)
      const m = 6; // screen bezel margin
      const sBL_in = { x: -screenW / 2 + m, y: -m * sinS, z: -baseD / 2 + m * cosS };
      const sBR_in = { x: screenW / 2 - m, y: -m * sinS, z: -baseD / 2 + m * cosS };
      const sTL_in = { x: -screenW / 2 + m, y: -(screenH - m) * sinS, z: -baseD / 2 + (screenH - m) * cosS };
      const sTR_in = { x: screenW / 2 - m, y: -(screenH - m) * sinS, z: -baseD / 2 + (screenH - m) * cosS };

      const pSBL_in = project(sBL_in.x, sBL_in.y, sBL_in.z, cosY, sinY, cosX, sinX);
      const pSBR_in = project(sBR_in.x, sBR_in.y, sBR_in.z, cosY, sinY, cosX, sinX);
      const pSTL_in = project(sTL_in.x, sTL_in.y, sTL_in.z, cosY, sinY, cosX, sinX);
      const pSTR_in = project(sTR_in.x, sTR_in.y, sTR_in.z, cosY, sinY, cosX, sinX);

      // Keyboard Area Box
      const kbTL = { x: -baseW * 0.43, y: 0, z: -baseD * 0.35 };
      const kbTR = { x: baseW * 0.43, y: 0, z: -baseD * 0.35 };
      const kbBL = { x: -baseW * 0.43, y: 0, z: baseD * 0.12 };
      const kbBR = { x: baseW * 0.43, y: 0, z: baseD * 0.12 };

      const pKBTL = project(kbTL.x, kbTL.y, kbTL.z, cosY, sinY, cosX, sinX);
      const pKBTR = project(kbTR.x, kbTR.y, kbTR.z, cosY, sinY, cosX, sinX);
      const pKBBL = project(kbBL.x, kbBL.y, kbBL.z, cosY, sinY, cosX, sinX);
      const pKBBR = project(kbBR.x, kbBR.y, kbBR.z, cosY, sinY, cosX, sinX);

      // Trackpad Area
      const tpTL = { x: -baseW * 0.16, y: 0, z: baseD * 0.22 };
      const tpTR = { x: baseW * 0.16, y: 0, z: baseD * 0.22 };
      const tpBL = { x: -baseW * 0.16, y: 0, z: baseD * 0.43 };
      const tpBR = { x: baseW * 0.16, y: 0, z: baseD * 0.43 };

      const pTPTL = project(tpTL.x, tpTL.y, tpTL.z, cosY, sinY, cosX, sinX);
      const pTPTR = project(tpTR.x, tpTR.y, tpTR.z, cosY, sinY, cosX, sinX);
      const pTPBL = project(tpBL.x, tpBL.y, tpBL.z, cosY, sinY, cosX, sinX);
      const pTPBR = project(tpBR.x, tpBR.y, tpBR.z, cosY, sinY, cosX, sinX);

      // Draw Laptop Base Side Walls (3D extrusion thickness)
      // Front face
      drawPolygon([pBBL, pBBR, pBBR_b, pBBL_b], '#0f0f15', 'rgba(134, 184, 152, 0.4)', 0.8);
      // Left face
      drawPolygon([pBTL, pBBL, pBBL_b, pBTL_b], '#0b0b10', 'rgba(161, 209, 177, 0.15)', 0.5);
      // Right face
      drawPolygon([pBTR, pBBR, pBBR_b, pBTR_b], '#12121c', 'rgba(161, 209, 177, 0.15)', 0.5);

      // Draw Main Keyboard Plate (Base Top surface)
      drawPolygon([pBTL, pBTR, pBBR, pBBL], '#151522', 'rgba(161, 209, 177, 0.25)', 1);

      // Draw glowing accent light ring on base edge
      ctx.strokeStyle = 'rgba(161, 209, 177, 0.5)';
      ctx.lineWidth = 1.2;
      ctx.shadowColor = '#A1D1B1';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(pBBL.x, pBBL.y);
      ctx.lineTo(pBBR.x, pBBR.y);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset glow

      // Draw Trackpad (cybernetic outline)
      drawPolygon([pTPTL, pTPTR, pTPBR, pTPBL], '#1a1a2e', 'rgba(134, 184, 152, 0.45)', 0.8);

      // Draw Keyboard Grid Layout
      drawPolygon([pKBTL, pKBTR, pKBBR, pKBBL], '#0b0b12', 'rgba(161, 209, 177, 0.2)', 0.8);

      // Simulated glowing keys layout
      const keyRows = 5;
      const keysPerRow = 12;

      for (let r = 0; r < keyRows; r++) {
        const uY1 = r / keyRows;
        const uY2 = (r + 0.8) / keyRows;

        for (let k = 0; k < keysPerRow; k++) {
          const uX1 = k / keysPerRow;
          const uX2 = (k + 0.85) / keysPerRow;

          const getKBPoint = (ux: number, uy: number) => {
            const rx = kbTL.x + (kbTR.x - kbTL.x) * ux;
            const rz = kbTL.z + (kbBL.z - kbTL.z) * uy;
            return project(rx, 0, rz, cosY, sinY, cosX, sinX);
          };

          const pk1 = getKBPoint(uX1, uY1);
          const pk2 = getKBPoint(uX2, uY1);
          const pk3 = getKBPoint(uX2, uY2);
          const pk4 = getKBPoint(uX1, uY2);

          drawPolygon([pk1, pk2, pk3, pk4], 'rgba(195, 231, 206, 0.15)', 'rgba(195, 231, 206, 0.3)', 0.5);
        }
      }

      // 3. Draw Screen Lid Back & Sides
      const screenTL_thick = { x: sTL.x, y: sTL.y + screenThick * cosS, z: sTL.z + screenThick * sinS };
      const screenTR_thick = { x: sTR.x, y: sTR.y + screenThick * cosS, z: sTR.z + screenThick * sinS };
      const pSTL_t = project(screenTL_thick.x, screenTL_thick.y, screenTL_thick.z, cosY, sinY, cosX, sinX);
      const pSTR_t = project(screenTR_thick.x, screenTR_thick.y, screenTR_thick.z, cosY, sinY, cosX, sinX);

      // Screen side extrusion lines
      drawPolygon([pSTL, pSTR, pSTR_t, pSTL_t], '#101018', 'rgba(134, 184, 152, 0.1)', 0.5);

      // Draw Main Screen Bezel Panel
      drawPolygon([pSBL, pSBR, pSTR, pSTL], '#09090f', 'rgba(134, 184, 152, 0.4)', 1.2);

      // Draw Inner Display Glass
      drawPolygon([pSBL_in, pSBR_in, pSTR_in, pSTL_in], '#020206', 'rgba(161, 209, 177, 0.1)', 0.5);

      // Draw Neon Screen Borders
      ctx.strokeStyle = 'rgba(161, 209, 177, 0.55)';
      ctx.lineWidth = 1;
      ctx.shadowColor = '#A1D1B1';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(pSBL_in.x, pBBL.y > pSBL_in.y ? pSBL_in.y : pBBL.y);
      ctx.lineTo(pSBL_in.x, pSBL_in.y);
      ctx.lineTo(pSTL_in.x, pSTL_in.y);
      ctx.lineTo(pSTR_in.x, pSTR_in.y);
      ctx.lineTo(pSBR_in.x, pSBR_in.y);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // 4. Render code/HUD on the screen glass
      codeScrollY += 0.35;
      if (codeScrollY >= codeLines.length * 14) {
        codeScrollY = 0;
      }

      ctx.save();
      ctx.font = 'bold 7.5px monospace';
      ctx.fillStyle = 'rgba(161, 209, 177, 0.85)';

      const screenHeightProj = Math.abs(pSBL_in.y - pSTL_in.y);

      for (let i = 0; i < maxVisibleLines; i++) {
        const lineIndex = Math.floor((codeScrollY / 14) + i) % codeLines.length;
        const lineText = codeLines[lineIndex];

        const vRatio = 0.15 + (i * 0.75) / maxVisibleLines;

        const lPointX = pSTL_in.x + (pSBL_in.x - pSTL_in.x) * vRatio;
        const lPointY = pSTL_in.y + (pSBL_in.y - pSTL_in.y) * vRatio;
        const rPointX = pSTR_in.x + (pSBR_in.x - pSTR_in.x) * vRatio;
        const rPointY = pSTR_in.y + (pSBR_in.y - pSTR_in.y) * vRatio;

        const textX = lPointX + 10;
        const textY = lPointY + (rPointY - lPointY) * 0.05 + 3;

        const skewAngle = Math.atan2(rPointY - lPointY, rPointX - lPointX);
        ctx.save();
        ctx.translate(textX, textY);
        ctx.rotate(skewAngle);

        ctx.fillStyle = lineText.startsWith('//')
          ? 'rgba(134, 184, 152, 0.65)'
          : lineText.includes('console.log') || lineText.startsWith('⚡')
            ? '#C3E7CE'
            : 'rgba(161, 209, 177, 0.85)';

        ctx.fillText(lineText.substring(0, 36), 0, 0);
        ctx.restore();
      }

      // Draw glowing holographic circular HUD diagram in the center-right of the screen
      const hudRatioX = 0.72;
      const hudRatioY = 0.42;
      const hudCenterX = pSTL_in.x + (pSBR_in.x - pSTL_in.x) * hudRatioX;
      const hudCenterY = pSTL_in.y + (pSBR_in.y - pSTL_in.y) * hudRatioY;

      ctx.strokeStyle = 'rgba(195, 231, 206, 0.45)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(hudCenterX, hudCenterY, screenHeightProj * 0.16, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(161, 209, 177, 0.3)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(hudCenterX, hudCenterY, screenHeightProj * 0.11, rotationAngle * 2, rotationAngle * 2 + Math.PI * 0.85);
      ctx.stroke();

      ctx.fillStyle = 'rgba(161, 209, 177, 0.7)';
      ctx.font = '6px sans-serif';
      ctx.fillText('99% CPU', hudCenterX - 11, hudCenterY + 2);

      ctx.restore();

      // 5. Render front-plane nodes (z >= 0)
      nodes.forEach(n => {
        const nx = Math.cos(n.angle) * n.radius;
        const nz = Math.sin(n.angle) * n.radius;
        const ny = n.y;

        const proj = project(nx, ny, nz, cosY, sinY, cosX, sinX);

        if (proj.z >= 0) {
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, n.size * proj.scale * 0.002, 0, Math.PI * 2);
          ctx.fillStyle = n.color === '#A1D1B1'
            ? `rgba(161, 209, 177, ${n.alpha * 0.85})`
            : `rgba(134, 184, 152, ${n.alpha * 0.85})`;
          ctx.fill();

          // Connect nearby front nodes with network lines
          nodes.forEach(n2 => {
            if (n === n2) return;
            const distSq = Math.pow(n.angle - n2.angle, 2) + Math.pow(n.y - n2.y, 2) * 0.0001;
            if (distSq < 0.015 && n2.radius > n.radius - 20 && n2.radius < n.radius + 20) {
              const nx2 = Math.cos(n2.angle) * n2.radius;
              const nz2 = Math.sin(n2.angle) * n2.radius;
              const proj2 = project(nx2, n2.y, nz2, cosY, sinY, cosX, sinX);

              ctx.strokeStyle = `rgba(161, 209, 177, ${0.12 * (1 - distSq / 0.015)})`;
              ctx.lineWidth = 0.4;
              ctx.beginPath();
              ctx.moveTo(proj.x, proj.y);
              ctx.lineTo(proj2.x, proj2.y);
              ctx.stroke();
            }
          });
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="w-full h-full relative flex items-center justify-center pointer-events-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[500px] max-h-[500px] cursor-pointer"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
}
