import { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';

// ─── Keyboard layout definition ───
const KEYBOARD_ROWS = [
  { keys: 14, widths: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5], y: 0 },
  { keys: 14, widths: [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], y: 1 },
  { keys: 13, widths: [1.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.8], y: 2 },
  { keys: 12, widths: [2.2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.2], y: 3 },
  { keys: 11, widths: [2.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.5], y: 4 },
  { keys: 8, widths: [1.3, 1.3, 1.3, 5.5, 1.3, 1.3, 1.3, 1.3], y: 5 },
];

interface Laptop3DModelProps {
  progressRef: React.MutableRefObject<number>;
  mode: 'intro' | 'outro';
}

/* ────────────────────────────────────────────
   Keyboard Keys
   ──────────────────────────────────────────── */
function KeyboardKeys({ materialRef }: { materialRef: React.RefObject<THREE.MeshStandardMaterial | null> }) {
  const keysData = useMemo(() => {
    const keys: { x: number; z: number; w: number; d: number }[] = [];
    const baseWidth = 3.8;
    const baseDepth = 2.2;
    const startX = -baseWidth / 2 + 0.15;
    const startZ = -baseDepth / 2 + 0.2;
    const keyGap = 0.035;
    const rowHeight = (baseDepth - 0.4) / 6;

    KEYBOARD_ROWS.forEach((row) => {
      const totalWidthUnits = row.widths.reduce((s, w) => s + w, 0);
      const availableWidth = baseWidth - 0.3;
      const unitWidth = availableWidth / totalWidthUnits;
      let currentX = startX;
      row.widths.forEach((w) => {
        const keyW = w * unitWidth - keyGap;
        const keyD = rowHeight - keyGap;
        keys.push({
          x: currentX + keyW / 2,
          z: startZ + row.y * rowHeight + keyD / 2,
          w: keyW,
          d: keyD,
        });
        currentX += w * unitWidth;
      });
    });
    return keys;
  }, []);

  return (
    <group position={[0, 0.078, 0.15]}>
      {keysData.map((k, i) => (
        <mesh key={i} position={[k.x, 0, k.z]} castShadow>
          <boxGeometry args={[k.w, 0.015, k.d]} />
          <meshStandardMaterial
            ref={i === 0 ? materialRef : undefined}
            color={new THREE.Color(0.04, 0.04, 0.05)}
            roughness={0.55}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ────────────────────────────────────────────
   Touchpad (with a micro-thin bezel line)
   ──────────────────────────────────────────── */
function Touchpad() {
  return (
    <group position={[0, 0.076, 1.55]}>
      {/* Micro-thin seam border */}
      <mesh>
        <boxGeometry args={[1.42, 0.003, 0.92]} />
        <meshStandardMaterial color="#0f0f12" roughness={0.8} />
      </mesh>
      {/* Trackpad surface */}
      <mesh position={[0, 0.001, 0]} castShadow>
        <boxGeometry args={[1.4, 0.005, 0.9]} />
        <meshStandardMaterial
          color={new THREE.Color(0.70, 0.72, 0.75)}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

/* ────────────────────────────────────────────
   Dual Stereo Speaker Grills
   ──────────────────────────────────────────── */
function SpeakerGrill({ position }: { position: [number, number, number] }) {
  const bars = 18;
  const gap = 0.035;
  const barW = 0.012;
  const barD = 1.6;
  const barH = 0.002;

  return (
    <group position={position}>
      {Array.from({ length: bars }).map((_, i) => (
        <mesh key={i} position={[(i - bars / 2) * gap, 0, 0]}>
          <boxGeometry args={[barW, barH, barD]} />
          <meshStandardMaterial color="#0b0b0d" roughness={0.95} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

/* ────────────────────────────────────────────
   Chassis Side Interface Ports
   ──────────────────────────────────────────── */
function ChassisPorts({ statusLedRef }: { statusLedRef: React.RefObject<THREE.MeshStandardMaterial | null> }) {
  return (
    <group>
      {/* ─── LEFT SIDE PORTS ─── */}
      {/* HDMI socket */}
      <mesh position={[-2.101, 0.01, 0.0]}>
        <boxGeometry args={[0.005, 0.04, 0.12]} />
        <meshStandardMaterial color="#0b0b0e" roughness={0.9} metalness={0.1} />
      </mesh>
      {/* USB-C Port 1 */}
      <group position={[-2.101, 0.02, 0.4]}>
        <mesh>
          <boxGeometry args={[0.005, 0.02, 0.08]} />
          <meshStandardMaterial color="#09090c" roughness={0.9} />
        </mesh>
        {/* USB-C Inner tongue */}
        <mesh position={[0.002, 0, 0]}>
          <boxGeometry args={[0.001, 0.005, 0.05]} />
          <meshStandardMaterial color="#c5a059" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
      {/* USB-C Port 2 */}
      <group position={[-2.101, 0.02, 0.65]}>
        <mesh>
          <boxGeometry args={[0.005, 0.02, 0.08]} />
          <meshStandardMaterial color="#09090c" roughness={0.9} />
        </mesh>
        <mesh position={[0.002, 0, 0]}>
          <boxGeometry args={[0.001, 0.005, 0.05]} />
          <meshStandardMaterial color="#c5a059" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
      {/* Power Socket status LED */}
      <mesh position={[-2.103, 0.025, 0.95]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 0.005, 12]} />
        <meshStandardMaterial
          ref={statusLedRef}
          color={new THREE.Color(0.2, 0.8, 0.2)}
          emissive={new THREE.Color(0.2, 0.8, 0.2)}
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>

      {/* ─── RIGHT SIDE PORTS ─── */}
      {/* USB-A Port */}
      <mesh position={[2.101, 0.015, 0.2]}>
        <boxGeometry args={[0.005, 0.035, 0.15]} />
        <meshStandardMaterial color="#08080a" roughness={0.9} metalness={0.1} />
      </mesh>
      {/* Headphone Audio Jack */}
      <mesh position={[2.101, 0.02, 0.58]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.022, 0.022, 0.005, 16]} />
        <meshStandardMaterial color="#7f8c8d" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Audio jack deep recess */}
      <mesh position={[2.102, 0.02, 0.58]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 0.005, 12]} />
        <meshStandardMaterial color="#000000" roughness={0.95} />
      </mesh>
    </group>
  );
}

/* ════════════════════════════════════════════════════
   MAIN LAPTOP 3D MODEL
   ═════════════════════════════════════════════════════ */
export default function Laptop3DModel({ progressRef, mode }: Laptop3DModelProps) {
  const lidRef = useRef<THREE.Group>(null);
  const screenLightRef = useRef<THREE.PointLight>(null);
  
  // Materials refs for non-re-rendering dynamic updates
  const screenMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const keyMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const frontLedMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const underglowMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const backLogoMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const backLogoDotMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const statusLedMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Smooth values
  const smoothAngle = useRef(mode === 'intro' ? 0 : Math.PI / 2);
  const smoothBrightness = useRef(mode === 'intro' ? 0 : 1.0);
  const smoothGlow = useRef(mode === 'intro' ? 0 : 1.0);

  // Load screen texture
  const screenTexture = useLoader(TextureLoader, '/assets/env_screen_bg.png');
  screenTexture.colorSpace = THREE.SRGBColorSpace;

  // Smoothly interpolate lid angle and materials in the 3D render thread
  useFrame((_state, delta) => {
    const progress = progressRef.current;
    let targetLidAngle = 0;
    let targetScreenBrightness = 0;
    let targetKeyboardGlow = 0;

    if (mode === 'intro') {
      targetLidAngle = Math.min(progress / 0.35, 1) * (Math.PI / 2);
      targetScreenBrightness = Math.min(progress / 0.25, 1);
      targetKeyboardGlow = Math.min(progress / 0.3, 1);
    } else {
      // Outro mode
      targetLidAngle = progress < 0.65
        ? Math.PI / 2
        : Math.max(0, (1 - (progress - 0.65) / 0.35) * (Math.PI / 2));
      targetScreenBrightness = progress < 0.25
        ? 1.0
        : Math.max(0, 1 - (progress - 0.25) / 0.4);
      targetKeyboardGlow = scrollProgressToGlow(progress);
    }

    // Premium responsive smooth damping
    smoothAngle.current = THREE.MathUtils.damp(smoothAngle.current, targetLidAngle, 10, delta);
    smoothBrightness.current = THREE.MathUtils.damp(smoothBrightness.current, targetScreenBrightness, 10, delta);
    smoothGlow.current = THREE.MathUtils.damp(smoothGlow.current, targetKeyboardGlow, 10, delta);

    // Apply rotation to lid pivot
    if (lidRef.current) {
      lidRef.current.rotation.x = -smoothAngle.current;
    }

    // Apply pointlight intensity
    if (screenLightRef.current) {
      screenLightRef.current.intensity = smoothBrightness.current * 4.5;
    }

    // Apply screen emissive intensity
    if (screenMaterialRef.current) {
      screenMaterialRef.current.emissiveIntensity = smoothBrightness.current * 1.35;
    }

    // Apply front edge accent neon glow
    if (frontLedMaterialRef.current) {
      frontLedMaterialRef.current.emissiveIntensity = smoothGlow.current * 2.5;
    }

    // Apply physical keycaps backlighting underglow
    if (underglowMaterialRef.current) {
      underglowMaterialRef.current.emissiveIntensity = smoothGlow.current * 1.5;
      underglowMaterialRef.current.opacity = smoothGlow.current * 0.45;
    }

    // Apply glowing initials brand logo on back of screen lid
    const logoGlowIntensity = smoothAngle.current > 0.05 ? 1.8 : 0;
    if (backLogoMaterialRef.current) {
      backLogoMaterialRef.current.emissiveIntensity = logoGlowIntensity;
    }
    if (backLogoDotMaterialRef.current) {
      backLogoDotMaterialRef.current.emissiveIntensity = logoGlowIntensity;
    }

    // Dynamically update status LED color based on lid opening completion
    if (statusLedMaterialRef.current) {
      const openRatio = smoothAngle.current / (Math.PI / 2);
      if (openRatio < 0.85) {
        // Charging / Booting up -> Glowing Amber/Orange
        statusLedMaterialRef.current.color.setRGB(1.0, 0.5, 0.0);
        statusLedMaterialRef.current.emissive.setRGB(1.0, 0.5, 0.0);
      } else {
        // Fully active and operational -> Bright Green
        statusLedMaterialRef.current.color.setRGB(0.1, 0.9, 0.1);
        statusLedMaterialRef.current.emissive.setRGB(0.1, 0.9, 0.1);
      }
      statusLedMaterialRef.current.emissiveIntensity = smoothGlow.current * 2.0;
    }

    // Apply keyboard letter glow
    if (keyMaterialRef.current) {
      keyMaterialRef.current.emissive.setRGB(
        0.35 * smoothGlow.current,
        0.18 * smoothGlow.current,
        1.0 * smoothGlow.current
      );
      keyMaterialRef.current.emissiveIntensity = smoothGlow.current * 0.6;
    }
  });

  // Outro helper
  function scrollProgressToGlow(progress: number) {
    return progress < 0.65 ? 1.0 : Math.max(0, 1 - (progress - 0.65) / 0.35);
  }

  // ── Materials ──
  const chassisColor = useMemo(() => new THREE.Color(0.74, 0.76, 0.80), []);
  const bezelColor = useMemo(() => new THREE.Color(0.02, 0.02, 0.03), []);

  return (
    <group>
      {/* ═══════════════════════════════════
          BASE / KEYBOARD DECK
         ═══════════════════════════════════ */}
      <group position={[0, 0, 0]}>
        {/* Rubber Feet under the bottom corner chassis */}
        <mesh position={[-1.7, -0.076, -0.5]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.01, 16]} />
          <meshStandardMaterial color="#0b0b0d" roughness={0.9} />
        </mesh>
        <mesh position={[1.7, -0.076, -0.5]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.01, 16]} />
          <meshStandardMaterial color="#0b0b0d" roughness={0.9} />
        </mesh>
        <mesh position={[-1.7, -0.076, 1.5]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.01, 16]} />
          <meshStandardMaterial color="#0b0b0d" roughness={0.9} />
        </mesh>
        <mesh position={[1.7, -0.076, 1.5]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.01, 16]} />
          <meshStandardMaterial color="#0b0b0d" roughness={0.9} />
        </mesh>

        {/* Main chassis body */}
        <mesh position={[0, 0, 0.5]} receiveShadow castShadow>
          <boxGeometry args={[4.2, 0.15, 2.8]} />
          <meshStandardMaterial
            color={chassisColor}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* Dynamic Status LED & side interface ports */}
        <ChassisPorts statusLedRef={statusLedMaterialRef} />

        {/* Keyboard recessed plate */}
        <mesh position={[0, 0.073, 0.35]} receiveShadow>
          <boxGeometry args={[3.9, 0.01, 2.4]} />
          <meshStandardMaterial
            color={new THREE.Color(0.04, 0.04, 0.05)}
            roughness={0.65}
            metalness={0.35}
          />
        </mesh>

        {/* physical keyboard backlight underglow light-leak sheet */}
        <mesh position={[0, 0.075, 0.35]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.8, 2.3]} />
          <meshStandardMaterial
            ref={underglowMaterialRef}
            color={new THREE.Color(0.4, 0.2, 1.0)}
            emissive={new THREE.Color(0.4, 0.2, 1.0)}
            emissiveIntensity={0}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Keyboard keys */}
        <KeyboardKeys materialRef={keyMaterialRef} />

        {/* Stereo Speaker Grills flanking keyboard */}
        <SpeakerGrill position={[-2.0, 0.076, 0.35]} />
        <SpeakerGrill position={[2.0, 0.076, 0.35]} />

        {/* Touchpad */}
        <Touchpad />

        {/* Front edge LED accent */}
        <mesh position={[0, 0.01, 1.9]}>
          <boxGeometry args={[3.8, 0.008, 0.02]} />
          <meshStandardMaterial
            ref={frontLedMaterialRef}
            color={new THREE.Color(0.4, 0.2, 1.0)}
            emissive={new THREE.Color(0.4, 0.2, 1.0)}
            emissiveIntensity={0}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>

        {/* Sleek brand label on front lip */}
        <mesh position={[0, 0.076, -0.7]}>
          <boxGeometry args={[0.5, 0.003, 0.12]} />
          <meshStandardMaterial
            color={new THREE.Color(0.42, 0.44, 0.47)}
            roughness={0.15}
            metalness={0.9}
          />
        </mesh>
      </group>

      {/* ═══════════════════════════════════
          HINGES
         ═══════════════════════════════════ */}
      {/* Matte black engineering hinge cover bar */}
      <mesh position={[0, 0.085, -0.9]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 2.1, 32]} />
        <meshStandardMaterial color="#0f0f13" roughness={0.8} metalness={0.2} />
      </mesh>
      {/* Left silver hinge bracket */}
      <mesh position={[-1.12, 0.085, -0.9]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.072, 0.072, 0.1, 32]} />
        <meshStandardMaterial color={chassisColor} roughness={0.25} metalness={0.9} />
      </mesh>
      {/* Right silver hinge bracket */}
      <mesh position={[1.12, 0.085, -0.9]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.072, 0.072, 0.1, 32]} />
        <meshStandardMaterial color={chassisColor} roughness={0.25} metalness={0.9} />
      </mesh>

      {/* ═══════════════════════════════════
          SCREEN LID (pivots from hinge)
         ═══════════════════════════════════ */}
      <group ref={lidRef} position={[0, 0.085, -0.9]}>
        {/* Outer lid back panel */}
        <mesh position={[0, 0.03, 1.4]} castShadow>
          <boxGeometry args={[4.2, 0.06, 2.8]} />
          <meshStandardMaterial
            color={chassisColor}
            roughness={0.18}
            metalness={0.9}
          />
        </mesh>

        {/* Outer Lid custom brand logo (back of the screen) */}
        <group position={[0, 0.061, 1.4]} rotation={[-Math.PI / 2, 0, 0]}>
          {/* Diamond shaped elegant logo */}
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <ringGeometry args={[0.16, 0.2, 4]} />
            <meshStandardMaterial
              ref={backLogoMaterialRef}
              color={new THREE.Color(0.4, 0.25, 1.0)}
              emissive={new THREE.Color(0.4, 0.25, 1.0)}
              emissiveIntensity={0}
              toneMapped={false}
            />
          </mesh>
          {/* Centered dot */}
          <mesh position={[0, 0, 0]}>
            <circleGeometry args={[0.04, 16]} />
            <meshStandardMaterial
              ref={backLogoDotMaterialRef}
              color={new THREE.Color(0.4, 0.25, 1.0)}
              emissive={new THREE.Color(0.4, 0.25, 1.0)}
              emissiveIntensity={0}
              toneMapped={false}
            />
          </mesh>
        </group>

        {/* Black inner bezel frame */}
        <mesh position={[0, -0.002, 1.4]}>
          <boxGeometry args={[4.0, 0.004, 2.65]} />
          <meshStandardMaterial
            color={bezelColor}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>

        {/* Screen Display Panel */}
        <mesh position={[0, -0.005, 1.4]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.7, 2.4]} />
          <meshStandardMaterial
            ref={screenMaterialRef}
            map={screenTexture}
            emissiveMap={screenTexture}
            emissive={new THREE.Color(1, 1, 1)}
            emissiveIntensity={0}
            roughness={0.9}
            metalness={0.0}
            toneMapped={false}
            side={THREE.FrontSide}
          />
        </mesh>

        {/* Glass panel overlay (creates glossy window reflections) */}
        <mesh position={[0, -0.007, 1.4]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.7, 2.4]} />
          <meshPhysicalMaterial
            transparent
            opacity={0.07}
            roughness={0.04}
            metalness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.02}
            reflectivity={0.95}
            color={new THREE.Color(0.9, 0.93, 1.0)}
            side={THREE.FrontSide}
          />
        </mesh>

        {/* Webcam dot */}
        <mesh position={[0, -0.004, 2.75]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.035, 16]} />
          <meshStandardMaterial
            color={new THREE.Color(0.05, 0.05, 0.06)}
            roughness={0.6}
            metalness={0.4}
          />
        </mesh>

        {/* Screen ambient glow light */}
        <pointLight
          ref={screenLightRef}
          position={[0, -0.5, 1.4]}
          color={new THREE.Color(1.0, 0.45, 0.35)}
          intensity={0}
          distance={7}
          decay={1.8}
        />
      </group>
    </group>
  );
}
