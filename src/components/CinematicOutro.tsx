import { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import Laptop3DModel from './Laptop3DModel';
import { EffectComposer, DepthOfField, Bloom, Vignette } from '@react-three/postprocessing';

gsap.registerPlugin(ScrollTrigger);

// ─── Minimalist wooden desk surface (Dynamically generated wood grain) ───
function DeskSurface() {
  const woodTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Base wood color (rich dark walnut)
    ctx.fillStyle = '#1c1511';
    ctx.fillRect(0, 0, 1024, 1024);

    // Subtle grain speckles
    ctx.fillStyle = 'rgba(12, 8, 5, 0.35)';
    for (let i = 0; i < 400; i++) {
      ctx.fillRect(
        Math.random() * 1024,
        Math.random() * 1024,
        50 + Math.random() * 200,
        1.5 + Math.random() * 1.5
      );
    }

    // Curvy organic grain lines
    ctx.strokeStyle = '#0f0c09';
    ctx.lineWidth = 1.8;
    for (let i = 0; i < 45; i++) {
      ctx.beginPath();
      let x = (i / 45) * 1024 + (Math.random() - 0.5) * 80;
      ctx.moveTo(x, 0);
      for (let y = 0; y < 1024; y += 50) {
        const offset = Math.sin(y * 0.0035 + i) * 35 + (Math.random() - 0.5) * 8;
        ctx.lineTo(x + offset, y);
      }
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, []);

  return (
    <mesh position={[0, -0.131, 0]} receiveShadow castShadow={false}>
      {/* 0.1 thickness, so top surface is at y = -0.081 sitting exactly under rubber feet */}
      <boxGeometry args={[18, 0.1, 12]} />
      <meshPhysicalMaterial
        map={woodTexture || undefined}
        roughness={0.35} // Satin sheen reflections!
        metalness={0.08}
        clearcoat={0.3}
        clearcoatRoughness={0.4}
        reflectivity={0.3}
      />
    </mesh>
  );
}

// ─── 3D Ceramic Flower Pot & Curved Leafy Succulent Plant ───
function DeskPlant({ position }: { position: [number, number, number] }) {
  const leavesRing1 = 8;
  const leavesRing2 = 6;
  const leavesRing3 = 4;

  const potMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#fdfefe',
    roughness: 0.12,
    metalness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05 // High-gloss polished ceramic!
  }), []);

  const leafMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#346b43', // Rich organic green succulent color
    roughness: 0.8,
    metalness: 0.0
  }), []);

  return (
    <group position={position}>
      {/* Ceramic Pot */}
      <mesh position={[0, 0.175, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.26, 0.18, 0.35, 32]} />
        <primitive object={potMaterial} attach="material" />
      </mesh>
      
      {/* Soil */}
      <mesh position={[0, 0.33, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.02, 16]} />
        <meshStandardMaterial color="#2d221a" roughness={0.9} />
      </mesh>

      {/* Lush Green succulent foliage */}
      <group position={[0, 0.34, 0]}>
        {/* Outer Ring - Large leaves tilted downwards */}
        {Array.from({ length: leavesRing1 }).map((_, i) => {
          const angle = (i / leavesRing1) * Math.PI * 2;
          const scaleX = 0.9 + Math.random() * 0.2;
          const scaleZ = 0.9 + Math.random() * 0.2;
          return (
            <mesh
              key={`r1-${i}`}
              rotation={[0.25, angle, 0.2]}
              position={[Math.sin(angle) * 0.13, 0.01, Math.cos(angle) * 0.13]}
              scale={[0.12 * scaleX, 0.03, 0.22 * scaleZ]}
              castShadow
            >
              <sphereGeometry args={[1, 16, 16]} />
              <primitive object={leafMaterial} attach="material" />
            </mesh>
          );
        })}

        {/* Middle Ring - Medium leaves tilted upwards */}
        {Array.from({ length: leavesRing2 }).map((_, i) => {
          const angle = (i / leavesRing2) * Math.PI * 2 + Math.PI / leavesRing2;
          const scaleX = 0.8 + Math.random() * 0.2;
          const scaleZ = 0.8 + Math.random() * 0.2;
          return (
            <mesh
              key={`r2-${i}`}
              rotation={[0.6, angle, 0.1]}
              position={[Math.sin(angle) * 0.08, 0.04, Math.cos(angle) * 0.08]}
              scale={[0.1 * scaleX, 0.025, 0.18 * scaleZ]}
              castShadow
            >
              <sphereGeometry args={[1, 16, 16]} />
              <primitive object={leafMaterial} attach="material" />
            </mesh>
          );
        })}

        {/* Inner Ring - Tiny upright leaves */}
        {Array.from({ length: leavesRing3 }).map((_, i) => {
          const angle = (i / leavesRing3) * Math.PI * 2;
          const scaleX = 0.7 + Math.random() * 0.2;
          const scaleZ = 0.7 + Math.random() * 0.2;
          return (
            <mesh
              key={`r3-${i}`}
              rotation={[1.1, angle, 0]}
              position={[Math.sin(angle) * 0.04, 0.08, Math.cos(angle) * 0.04]}
              scale={[0.07 * scaleX, 0.02, 0.12 * scaleZ]}
              castShadow
            >
              <sphereGeometry args={[1, 16, 16]} />
              <primitive object={leafMaterial} attach="material" />
            </mesh>
          );
        })}

        {/* Center core leaf */}
        <mesh position={[0, 0.12, 0]} scale={[0.04, 0.06, 0.04]} castShadow>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#3a7846" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

// ─── Creative Studio Radial Glow Backdrop ───
function CreativeStudioBackdrop() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Fill dark charcoal base
    ctx.fillStyle = '#08080a';
    ctx.fillRect(0, 0, 512, 512);

    // Warm desk lamp glow (radial gradient) in center-left
    const grad = ctx.createRadialGradient(160, 240, 10, 160, 240, 320);
    grad.addColorStop(0, 'rgba(245, 158, 11, 0.08)'); // Warm amber accent
    grad.addColorStop(0.5, 'rgba(139, 92, 246, 0.03)'); // Violet ambient blend
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  if (!texture) return null;

  return (
    <mesh position={[0, 4, -8]} rotation={[0, 0, 0]}>
      <planeGeometry args={[40, 25]} />
      <meshBasicMaterial map={texture} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

// ─── High-Fidelity Studio Lighting Rig ───
function StudioLights() {
  return (
    <>
      {/* Key spotlight - overhead warm workspace highlight */}
      <spotLight
        position={[0, 8, 4]}
        angle={0.65}
        penumbra={0.9}
        intensity={2.8}
        color={new THREE.Color(1.0, 0.96, 0.90)} // Warm desk lamp glow
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00005}
        shadow-radius={4}
      />
      {/* Rim light - cool daylight window fill */}
      <spotLight
        position={[6, 4, -3]}
        angle={0.7}
        penumbra={0.9}
        intensity={2.0}
        color={new THREE.Color(0.7, 0.85, 1.0)} // Window lighting sheen
        castShadow={false}
      />
      {/* Soft fill lighting from side */}
      <pointLight
        position={[-5, 3, 5]}
        intensity={1.0}
        color={new THREE.Color(0.95, 0.92, 1.0)}
        distance={12}
      />
      {/* Soft warm baseline fill */}
      <ambientLight intensity={0.25} color={new THREE.Color(0.92, 0.90, 1.0)} />
    </>
  );
}

// ─── 3D Ceramic Coffee Mug ───
function CoffeeMug({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, 0.4, 0]}>
      {/* Mug body */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.3, 32]} />
        <meshPhysicalMaterial color="#1a1a1f" roughness={0.12} metalness={0.1} clearcoat={1.0} clearcoatRoughness={0.05} />
      </mesh>
      {/* Handle */}
      <mesh position={[-0.15, 0.15, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[0.07, 0.02, 16, 32, Math.PI]} />
        <meshPhysicalMaterial color="#1a1a1f" roughness={0.12} metalness={0.1} clearcoat={1.0} clearcoatRoughness={0.05} />
      </mesh>
      {/* Liquid coffee */}
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.01, 16]} />
        <meshStandardMaterial color="#3d2314" roughness={0.3} />
      </mesh>
    </group>
  );
}

// ─── 3D Leather Notepad ───
function Notepad({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, -0.15, 0]}>
      {/* Cover */}
      <mesh position={[0, 0.01, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.02, 0.8]} />
        <meshStandardMaterial color="#4a2318" roughness={0.65} />
      </mesh>
      {/* Pages */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.56, 0.015, 0.76]} />
        <meshStandardMaterial color="#fcfaf5" roughness={0.8} />
      </mesh>
    </group>
  );
}

// ─── Camera Controller (runs inside Canvas) ───
// Screen center at 90° open: world pos ≈ [0, 1.575, -0.9]
function CameraController({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const smoothProgress = useRef(0);

  useFrame((_state, delta) => {
    // Smoothly damp progress for instant responsive control
    smoothProgress.current = THREE.MathUtils.damp(
      smoothProgress.current,
      progressRef.current,
      12, // fast response
      delta
    );
    const progress = smoothProgress.current;

    let targetPos: [number, number, number];
    let lookTarget: [number, number, number];

    if (progress <= 0.25) {
      // Phase 1: Pull out from screen - camera starts behind/inside screen and moves back
      const t = progress / 0.25;
      const eased = t * t * (3 - 2 * t); // smoothstep
      targetPos = [
        0,
        THREE.MathUtils.lerp(1.5, 1.5, eased),
        THREE.MathUtils.lerp(-0.6, 0.8, eased),
      ];
      lookTarget = [
        0,
        THREE.MathUtils.lerp(1.5, 1.5, t),
        THREE.MathUtils.lerp(-2.0, -0.9, t),
      ];
    } else if (progress <= 0.65) {
      // Phase 2: Zoom back from screen face (drift upward and back)
      const t = (progress - 0.25) / 0.4;
      const eased = t * t * (3 - 2 * t); // smoothstep
      targetPos = [
        0,
        THREE.MathUtils.lerp(1.5, 2.0, eased),
        THREE.MathUtils.lerp(0.8, 4.0, eased),
      ];
      lookTarget = [
        0,
        THREE.MathUtils.lerp(1.5, 1.0, eased),
        THREE.MathUtils.lerp(-0.9, -0.5, eased),
      ];
    } else {
      // Phase 3: Lid closes — camera drifts to overhead angle as lid shuts
      const t = (progress - 0.65) / 0.35;
      const eased = t * t * (3 - 2 * t); // smoothstep
      targetPos = [
        THREE.MathUtils.lerp(0, 1.0, eased),
        THREE.MathUtils.lerp(2.0, 4.0, eased),
        THREE.MathUtils.lerp(4.0, 5.0, eased),
      ];
      lookTarget = [
        0,
        THREE.MathUtils.lerp(1.0, 0, eased),
        THREE.MathUtils.lerp(-0.5, 0, eased),
      ];
    }

    camera.position.set(
      THREE.MathUtils.lerp(camera.position.x, targetPos[0], 0.08),
      THREE.MathUtils.lerp(camera.position.y, targetPos[1], 0.08),
      THREE.MathUtils.lerp(camera.position.z, targetPos[2], 0.08),
    );

    const lookVec = new THREE.Vector3(lookTarget[0], lookTarget[1], lookTarget[2]);
    camera.lookAt(lookVec);
  });

  return null;
}

interface CinematicOutroProps {
  onProgress?: (progress: number) => void;
}

// ─── Main Cinematic Outro Component ───
export default function CinematicOutro({ onProgress }: CinematicOutroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Shared progress ref (updates zero-latency onScroll, 0 React renders!)
  const progressRef = useRef(0);
  
  const [isCanvasActive, setIsCanvasActive] = useState(false);
  
  // Track canvas active state via ref to avoid re-renders
  const canvasActiveRef = useRef(false);

  // Keep a stable ref to onProgress
  const onProgressRef = useRef(onProgress);
  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  // Setup GSAP ScrollTrigger
  useEffect(() => {
    if (!containerRef.current || !canvasWrapperRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top', // Start pinning when container top reaches viewport top
      end: 'bottom bottom', // Ends when container bottom reaches viewport bottom (absolute bottom of page)
      pin: canvasWrapperRef.current, // Native GSAP pinning (fully compatible with Lenis transforms!)
      scrub: 0.1, // Ultra-responsive tracking
      onUpdate: (self) => {
        progressRef.current = self.progress;
        
        // Direct DOM updates for butter-smooth visual fading (0 React renders!)
        if (overlayRef.current) {
          const progress = self.progress;
          const overlayOpacity = progress < 0.25
            ? Math.max(0, 1 - progress / 0.25)
            : 0;
          overlayRef.current.style.opacity = overlayOpacity.toString();
        }

        // Threshold check for active canvas context
        const shouldCanvasBeActive = self.progress > 0.01;
        if (shouldCanvasBeActive !== canvasActiveRef.current) {
          canvasActiveRef.current = shouldCanvasBeActive;
          setIsCanvasActive(shouldCanvasBeActive);
        }

        if (onProgressRef.current) {
          onProgressRef.current(self.progress);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <>
      {/* Scroll spacer */}
      <div ref={containerRef} className="relative w-full" style={{ height: '300vh', background: '#050505' }}>
        {/* Pinned canvas wrapper */}
        <div
          ref={canvasWrapperRef}
          className="w-full h-screen"
          style={{ position: 'relative' }}
        >
          {/* 3D Canvas */}
          {isCanvasActive && (
            <div className="absolute inset-0">
              <Canvas
                shadows
                dpr={[1, 2]}
                gl={{
                  antialias: true,
                  toneMapping: THREE.ACESFilmicToneMapping,
                  toneMappingExposure: 1.1,
                }}
                camera={{
                  fov: 45,
                  near: 0.1,
                  far: 100,
                  position: [0, 1.5, -0.6], // starts inside screen
                }}
                style={{ background: '#08080b' }}
              >
                <fog attach="fog" args={['#08080b', 4, 18]} />

                <CreativeStudioBackdrop />

                <Suspense fallback={null}>
                  <CameraController progressRef={progressRef} />

                  <StudioLights />

                  {/* Gentle floating animation for the entire desk workspace */}
                  <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.05}>
                    <group>
                      <Laptop3DModel
                        progressRef={progressRef}
                        mode="outro"
                      />

                      <DeskSurface />
                      <DeskPlant position={[2.2, -0.081, 0.3]} />
                      <CoffeeMug position={[-2.2, -0.081, 0.2]} />
                      <Notepad position={[-1.2, -0.081, 1.3]} />

                      {/* Soft, photorealistic contact shadows under workspace items */}
                      <ContactShadows
                        position={[0, -0.08, 0.5]}
                        opacity={0.6}
                        scale={4.5}
                        blur={2.0}
                        far={1.2}
                      />
                      <ContactShadows
                        position={[2.2, -0.08, 0.3]}
                        opacity={0.5}
                        scale={0.8}
                        blur={1.2}
                        far={0.5}
                      />
                      <ContactShadows
                        position={[-2.2, -0.08, 0.2]}
                        opacity={0.4}
                        scale={0.6}
                        blur={1.2}
                        far={0.5}
                      />
                    </group>
                  </Float>

                  <Environment preset="apartment" />

                  {/* Cinematic Post-Processing Effects (Apple commercial style camera) */}
                  <EffectComposer>
                    <DepthOfField
                      focusDistance={0.025} // Focus distance (relative to camera depth)
                      focalLength={0.035}   // Focal length
                      bokehScale={2.8}      // Shallow depth of field background blur
                      height={480}
                    />
                    <Bloom
                      intensity={1.2}
                      luminanceThreshold={0.8}
                      luminanceSmoothing={0.35}
                    />
                    <Vignette eskil={false} offset={0.15} darkness={1.05} />
                  </EffectComposer>
                </Suspense>
              </Canvas>
            </div>
          )}

          {/* Fade overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
            style={{
              background: '#050505',
              opacity: 1, // Starts fully black to cover canvas initialization
            }}
          />
        </div>
      </div>
    </>
  );
}
