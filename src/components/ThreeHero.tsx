import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Constants ───
const NODE_COUNT = 80;
const MAX_DISTANCE = 2.4;

interface NeuralNetworkProps {
  isVisibleRef: React.RefObject<boolean | null>;
}

function NeuralNetwork({ isVisibleRef }: NeuralNetworkProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Keep track of mouse positions
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coords (-1 to 1)
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize random nodes in a sphere & V target positions
  const [positions, velocities, colors, vTargets, randomPositions] = useMemo(() => {
    const pos = new Float32Array(NODE_COUNT * 3);
    const vel = new Float32Array(NODE_COUNT * 3);
    const col = new Float32Array(NODE_COUNT * 3);
    const vT = new Float32Array(NODE_COUNT * 3);
    const randPos = new Float32Array(NODE_COUNT * 3);

    for (let i = 0; i < NODE_COUNT; i++) {
      // Position inside a sphere of radius 2.3
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 0.8 + Math.random() * 1.5;

      const px = r * Math.sin(phi) * Math.cos(theta);
      const py = r * Math.sin(phi) * Math.sin(theta);
      const pz = r * Math.cos(phi);

      pos[i * 3] = px;
      pos[i * 3 + 1] = py;
      pos[i * 3 + 2] = pz;

      randPos[i * 3] = px;
      randPos[i * 3 + 1] = py;
      randPos[i * 3 + 2] = pz;

      // Velocity vectors
      vel[i * 3] = (Math.random() - 0.5) * 0.006;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.006;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.006;

      // Color mapping: Neon red with variations
      col[i * 3] = 1.0;                                 // R
      col[i * 3 + 1] = Math.random() * 0.15;            // G
      col[i * 3 + 2] = 0.2 + Math.random() * 0.2;       // B

      // Pre-calculate target coordinates forming a V shape
      if (i < 40) {
        // Left wing of V
        const t = i / 39;
        vT[i * 3] = -1.5 * t;
        vT[i * 3 + 1] = -1.1 + 2.2 * t;
        vT[i * 3 + 2] = (Math.random() - 0.5) * 0.25;
      } else {
        // Right wing of V
        const t = (i - 40) / 39;
        vT[i * 3] = 1.5 * t;
        vT[i * 3 + 1] = -1.1 + 2.2 * t;
        vT[i * 3 + 2] = (Math.random() - 0.5) * 0.25;
      }
    }

    return [pos, vel, col, vT, randPos];
  }, []);

  // Preallocate lines coordinates buffer to avoid frame-allocation garbage collection sweeps
  const [linePositions, lineColors] = useMemo(() => {
    const MAX_LINES = (NODE_COUNT * (NODE_COUNT - 1)) / 2;
    const pos = new Float32Array(MAX_LINES * 2 * 3);
    const col = new Float32Array(MAX_LINES * 2 * 3);
    return [pos, col];
  }, []);

  // Update positions and connect lines in frame loops
  useFrame((state, delta) => {
    // Scroll optimization: Skip all calculations and redraws when out of viewport
    if (isVisibleRef && !isVisibleRef.current) return;
    if (!pointsRef.current || !linesRef.current || !groupRef.current) return;

    const time = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const positionsArr = posAttr.array as Float32Array;

    // Smoothly damp mouse interactive rotation
    mouse.current.x = THREE.MathUtils.damp(mouse.current.x, mouse.current.targetX, 4, delta);
    mouse.current.y = THREE.MathUtils.damp(mouse.current.y, mouse.current.targetY, 4, delta);

    // Apply auto-rotation plus mouse swiveling
    groupRef.current.rotation.y = time * 0.05 + mouse.current.x * 0.25;
    groupRef.current.rotation.x = mouse.current.y * 0.25;

    // Morph cycle timeline config: 12 seconds
    const cycleTime = time % 12;
    let morphProgress = 0;

    if (cycleTime < 4) {
      morphProgress = cycleTime / 4;
    } else if (cycleTime >= 4 && cycleTime < 6) {
      morphProgress = 1;
    } else if (cycleTime >= 6 && cycleTime < 10) {
      morphProgress = 1 - (cycleTime - 6) / 4;
    } else {
      morphProgress = 0;
    }

    // Apply smoothstep easing to morphing
    const easeProgress = morphProgress * morphProgress * (3 - 2 * morphProgress);

    // Update particles
    for (let i = 0; i < NODE_COUNT; i++) {
      randomPositions[i * 3] += velocities[i * 3];
      randomPositions[i * 3 + 1] += velocities[i * 3 + 1];
      randomPositions[i * 3 + 2] += velocities[i * 3 + 2];

      const rx = randomPositions[i * 3];
      const ry = randomPositions[i * 3 + 1];
      const rz = randomPositions[i * 3 + 2];
      const dist = Math.sqrt(rx * rx + ry * ry + rz * rz);

      // Bounce back inside sphere boundary
      if (dist > 2.5) {
        velocities[i * 3] *= -1;
        velocities[i * 3 + 1] *= -1;
        velocities[i * 3 + 2] *= -1;
      }

      // Fetch target V coordinates
      const tx = vTargets[i * 3];
      const ty = vTargets[i * 3 + 1];
      const tz = vTargets[i * 3 + 2];

      // Add a subtle electric wavy vibration to the V-shape when formed
      let finalTx = tx;
      let finalTy = ty;
      if (easeProgress > 0.05) {
        const wave = Math.sin(time * 3.5 + ty * 2.0) * 0.04 * easeProgress;
        finalTx += wave;
        finalTy += wave * 0.35;
      }

      // Linearly interpolate position
      positionsArr[i * 3] = rx + (finalTx - rx) * easeProgress;
      positionsArr[i * 3 + 1] = ry + (finalTy - ry) * easeProgress;
      positionsArr[i * 3 + 2] = rz + (tz - rz) * easeProgress;
    }
    posAttr.needsUpdate = true;

    // Connect line segments using preallocated arrays (0 allocations during tick)
    const lineGeom = linesRef.current.geometry;
    const linePosAttr = lineGeom.attributes.position as THREE.BufferAttribute;
    const lineColAttr = lineGeom.attributes.color as THREE.BufferAttribute;
    const linePosArr = linePosAttr.array as Float32Array;
    const lineColArr = lineColAttr.array as Float32Array;

    let lineCount = 0;
    const MAX_LINES = (NODE_COUNT * (NODE_COUNT - 1)) / 2;

    for (let i = 0; i < NODE_COUNT; i++) {
      const x1 = positionsArr[i * 3];
      const y1 = positionsArr[i * 3 + 1];
      const z1 = positionsArr[i * 3 + 2];

      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (lineCount >= MAX_LINES) break;

        const x2 = positionsArr[j * 3];
        const y2 = positionsArr[j * 3 + 1];
        const z2 = positionsArr[j * 3 + 2];

        // Euclidean distance
        const dx = x1 - x2;
        const dy = y1 - y2;
        const dz = z1 - z2;
        const distSq = dx * dx + dy * dy + dz * dz;
        const dist = Math.sqrt(distSq);

        if (dist < MAX_DISTANCE) {
          // Prevent webbing between opposite wings of V when formed
          if (easeProgress > 0.1) {
            const isOppositeWings = (i < 40 && j >= 40) || (i >= 40 && j < 40);
            if (isOppositeWings && (y1 > -0.85 || y2 > -0.85)) {
              continue;
            }
          }

          const offset = lineCount * 6;
          
          linePosArr[offset] = x1;
          linePosArr[offset + 1] = y1;
          linePosArr[offset + 2] = z1;
          linePosArr[offset + 3] = x2;
          linePosArr[offset + 4] = y2;
          linePosArr[offset + 5] = z2;

          const alpha = 1.0 - dist / MAX_DISTANCE;
          const r = 1.0;
          const g = 0.0;
          const b = 0.15 * alpha;

          lineColArr[offset] = r;
          lineColArr[offset + 1] = g;
          lineColArr[offset + 2] = b;
          lineColArr[offset + 3] = r;
          lineColArr[offset + 4] = g;
          lineColArr[offset + 5] = b;

          lineCount++;
        }
      }
    }

    linePosAttr.needsUpdate = true;
    lineColAttr.needsUpdate = true;
    lineGeom.setDrawRange(0, lineCount * 2);
  });

  return (
    <group ref={groupRef}>
      {/* ── Neural Particles ── */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* ── Neural Connection Links ── */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}

export default function ThreeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.01 } // Trigger culling if less than 1% of canvas is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full xl:w-[125%] xl:-left-[12.5%] h-[280px] sm:h-[400px] md:h-[550px] relative pointer-events-auto overflow-visible"
    >
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent', width: '100%', height: '100%', overflow: 'visible' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#FF003C" />
        <NeuralNetwork isVisibleRef={isVisibleRef} />
      </Canvas>
    </div>
  );
}
