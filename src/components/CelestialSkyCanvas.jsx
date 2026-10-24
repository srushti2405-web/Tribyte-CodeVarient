import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles, Float, Billboard } from "@react-three/drei";
import * as THREE from "three";

/**
 * Procedural Texture Generator for the Colossal Blood-Red Moon
 */
function createCrimsonMoonTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  // Deep crimson gradient background
  const grad = ctx.createRadialGradient(512, 512, 50, 512, 512, 512);
  grad.addColorStop(0, "#ff4d4d");
  grad.addColorStop(0.35, "#dc2626");
  grad.addColorStop(0.7, "#991b1b");
  grad.addColorStop(0.95, "#450a0a");
  grad.addColorStop(1, "#1c0404");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Lunar Maria & Crater textures (Blood Moon detail)
  ctx.fillStyle = "rgba(40, 5, 5, 0.45)";
  const craters = [
    { x: 340, y: 380, r: 180 },
    { x: 620, y: 310, r: 210 },
    { x: 490, y: 640, r: 160 },
    { x: 280, y: 690, r: 110 },
    { x: 740, y: 580, r: 140 },
    { x: 512, y: 460, r: 90 },
    { x: 680, y: 440, r: 120 },
    { x: 390, y: 220, r: 130 },
  ];

  craters.forEach((c) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fill();
  });

  // Whispers of lunar dust & rays
  ctx.fillStyle = "rgba(255, 180, 180, 0.15)";
  for (let i = 0; i < 220; i++) {
    const rx = Math.random() * 1024;
    const ry = Math.random() * 1024;
    const rr = Math.random() * 12 + 2;
    ctx.beginPath();
    ctx.arc(rx, ry, rr, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * 1. Colossal Blood-Red Moon Sphere with Atmosphere Halo
 * Inspired directly by user reference: celestial-torii-moon.jpg
 */
function ColossalBloodMoon() {
  const moonTexture = useMemo(() => createCrimsonMoonTexture(), []);
  const moonRef = useRef();
  const auraRef = useRef();

  useFrame((_, delta) => {
    if (moonRef.current) {
      moonRef.current.rotation.y += delta * 0.015;
    }
    if (auraRef.current) {
      auraRef.current.rotation.z += delta * 0.005;
    }
  });

  return (
    <group position={[0, 4.5, -28]}>
      {/* Colossal 3D Moon Sphere */}
      <mesh ref={moonRef}>
        <sphereGeometry args={[9.5, 64, 64]} />
        <meshStandardMaterial
          map={moonTexture}
          emissive="#7f1d1d"
          emissiveIntensity={0.65}
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      {/* Atmospheric Blood-Red Glow Ring / Halo */}
      <Billboard follow={true}>
        <mesh ref={auraRef} position={[0, 0, -0.5]}>
          <ringGeometry args={[9.4, 15.5, 64]} />
          <meshBasicMaterial
            color="#ef4444"
            transparent
            opacity={0.32}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </Billboard>

      {/* Ambient Crimson Light from Moon */}
      <pointLight color="#f87171" intensity={2.8} distance={60} decay={1.5} />
    </group>
  );
}

/**
 * 2. Authentic 3D Japanese Torii Gate
 * Modeled with Three.js geometry based on reference: celestial-torii-moon.jpg
 */
function ToriiGate() {
  const gateRef = useRef();

  // Dark lacquered vermilion / charred cedar wood material
  const toriiMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#4a0404",
        roughness: 0.75,
        metalness: 0.2,
      }),
    []
  );

  const stoneMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1e293b",
        roughness: 0.9,
        metalness: 0.05,
      }),
    []
  );

  const goldAccent = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#f59e0b",
        roughness: 0.35,
        metalness: 0.8,
        emissive: "#b45309",
        emissiveIntensity: 0.3,
      }),
    []
  );

  return (
    <group ref={gateRef} position={[0, -2.5, -12]}>
      {/* DUAL PILLARS (Hashira) */}
      {/* Left Pillar */}
      <mesh position={[-5.2, 3.8, 0]} material={toriiMaterial} castShadow>
        <cylinderGeometry args={[0.38, 0.44, 8, 24]} />
      </mesh>
      {/* Left Pillar Stone Base (Nemaki) */}
      <mesh position={[-5.2, 0.1, 0]} material={stoneMaterial}>
        <cylinderGeometry args={[0.55, 0.65, 0.6, 16]} />
      </mesh>

      {/* Right Pillar */}
      <mesh position={[5.2, 3.8, 0]} material={toriiMaterial} castShadow>
        <cylinderGeometry args={[0.38, 0.44, 8, 24]} />
      </mesh>
      {/* Right Pillar Stone Base (Nemaki) */}
      <mesh position={[5.2, 0.1, 0]} material={stoneMaterial}>
        <cylinderGeometry args={[0.55, 0.65, 0.6, 16]} />
      </mesh>

      {/* UPPER MAIN LINTEL (Kasagi) - Curved arch beam at top */}
      <mesh position={[0, 8.1, 0]} material={toriiMaterial}>
        <boxGeometry args={[13.2, 0.65, 0.85]} />
      </mesh>
      {/* Kasagi Black Roof Cap */}
      <mesh position={[0, 8.45, 0]} material={stoneMaterial}>
        <boxGeometry args={[13.6, 0.18, 0.95]} />
      </mesh>

      {/* SUB-LINTEL (Shimaki) - Layer beneath Kasagi */}
      <mesh position={[0, 7.55, 0]} material={toriiMaterial}>
        <boxGeometry args={[11.8, 0.42, 0.7]} />
      </mesh>

      {/* TIE-BEAM (Nuki) - Lower horizontal beam interlocking pillars */}
      <mesh position={[0, 6.1, 0]} material={toriiMaterial}>
        <boxGeometry args={[12.6, 0.45, 0.48]} />
      </mesh>

      {/* CENTRAL TABLET (Gakuzuka) between Kasagi and Nuki */}
      <mesh position={[0, 6.85, 0]} material={goldAccent}>
        <boxGeometry args={[1.1, 1.15, 0.4]} />
      </mesh>

      {/* DUAL STONE LANTERNS (Tōrō) on Left and Right of Torii */}
      <group position={[-7.5, 0, 1]}>
        {/* Pedestal */}
        <mesh position={[0, 0.5, 0]} material={stoneMaterial}>
          <cylinderGeometry args={[0.5, 0.65, 1, 8]} />
        </mesh>
        {/* Light Box with Fire Flame */}
        <mesh position={[0, 1.4, 0]} material={stoneMaterial}>
          <boxGeometry args={[0.9, 0.8, 0.9]} />
        </mesh>
        {/* Lantern Cap */}
        <mesh position={[0, 2.0, 0]} material={stoneMaterial}>
          <coneGeometry args={[1.1, 0.6, 6]} />
        </mesh>
        {/* Inner Flame Light */}
        <pointLight position={[0, 1.4, 0]} color="#f59e0b" intensity={1.8} distance={6} />
      </group>

      <group position={[7.5, 0, 1]}>
        {/* Pedestal */}
        <mesh position={[0, 0.5, 0]} material={stoneMaterial}>
          <cylinderGeometry args={[0.5, 0.65, 1, 8]} />
        </mesh>
        {/* Light Box with Fire Flame */}
        <mesh position={[0, 1.4, 0]} material={stoneMaterial}>
          <boxGeometry args={[0.9, 0.8, 0.9]} />
        </mesh>
        {/* Lantern Cap */}
        <mesh position={[0, 2.0, 0]} material={stoneMaterial}>
          <coneGeometry args={[1.1, 0.6, 6]} />
        </mesh>
        {/* Inner Flame Light */}
        <pointLight position={[0, 1.4, 0]} color="#f59e0b" intensity={1.8} distance={6} />
      </group>

      {/* STONE STAIRWAY leading into the Torii threshold */}
      {[-0.2, -0.6, -1.0, -1.4].map((y, idx) => (
        <mesh key={idx} position={[0, y, idx * 0.9]} material={stoneMaterial}>
          <boxGeometry args={[10.5 + idx * 0.8, 0.35, 1.0]} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * 3. Individual 3D Sky Lantern with Warm Inner Flame
 */
function SingleSkyLantern({ lantern, onSelect, isHovered, onPointerOver, onPointerOut }) {
  const meshRef = useRef();
  const floatSpeed = useMemo(
    () => 1.4 + ((lantern.id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 6) * 0.1),
    [lantern.id]
  );

  return (
    <Float
      speed={floatSpeed}
      rotationIntensity={0.4}
      floatIntensity={0.8}
      position={[lantern.x3d, lantern.y3d, lantern.z3d]}
    >
      <group
        ref={meshRef}
        scale={isHovered ? 1.25 : 1.0}
        onClick={() => onSelect(lantern)}
        onPointerOver={(e) => {
          e.stopPropagation();
          onPointerOver(lantern);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onPointerOut();
        }}
      >
        {/* Octagonal Translucent Rice Paper Body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.55, 0.42, 1.35, 8]} />
          <meshStandardMaterial
            color={isHovered ? "#fef08a" : "#fde047"}
            emissive={isHovered ? "#f59e0b" : "#d97706"}
            emissiveIntensity={isHovered ? 1.6 : 1.1}
            roughness={0.4}
            transparent
            opacity={0.92}
          />
        </mesh>

        {/* Top Rim Collar */}
        <mesh position={[0, 0.72, 0]}>
          <cylinderGeometry args={[0.58, 0.58, 0.08, 8]} />
          <meshStandardMaterial color="#78350f" roughness={0.8} />
        </mesh>

        {/* Bottom Wooden Bamboo Rim */}
        <mesh position={[0, -0.72, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.08, 8]} />
          <meshStandardMaterial color="#78350f" roughness={0.8} />
        </mesh>

        {/* Inner Glowing Fire Candle */}
        <mesh position={[0, -0.3, 0]}>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        {/* Warm Flickering Flame Light */}
        <pointLight
          position={[0, 0, 0]}
          color="#f59e0b"
          intensity={isHovered ? 3.0 : 1.6}
          distance={7}
          decay={1.8}
        />
      </group>
    </Float>
  );
}

/**
 * 4. Drifting Night Mist / Whispers across the Torii & Moon
 */
function DriftingNightMist() {
  const mist1 = useRef();
  const mist2 = useRef();

  useFrame((_, delta) => {
    if (mist1.current) mist1.current.position.x += delta * 0.12;
    if (mist2.current) mist2.current.position.x -= delta * 0.09;
    if (mist1.current && mist1.current.position.x > 22) mist1.current.position.x = -22;
    if (mist2.current && mist2.current.position.x < -22) mist2.current.position.x = 22;
  });

  return (
    <group position={[0, 2, -18]}>
      <mesh ref={mist1} position={[-8, 1, 0]}>
        <planeGeometry args={[26, 6]} />
        <meshBasicMaterial
          color="#1e1b4b"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={mist2} position={[8, -1, 1]}>
        <planeGeometry args={[28, 5]} />
        <meshBasicMaterial
          color="#450a0a"
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

/**
 * 5. Camera Mouse Parallax Rig
 */
function CameraRig() {
  useFrame(({ camera, pointer }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 1.5, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 2 + pointer.y * 0.8, 0.04);
    camera.lookAt(0, 3, -15);
  });
  return null;
}

/**
 * MAIN CELESTIAL SKY CANVAS COMPONENT (Three.js + Drei)
 * Strictly responds to user request: "and for celestial use drei and 3 js"
 */
export function CelestialSkyCanvas({
  lanterns = [],
  hoveredLantern = null,
  onLanternSelect = () => {},
  onLanternHover = () => {},
  onLanternLeave = () => {},
}) {
  // Convert 2D lantern data into 3D world space coordinates
  const lanterns3D = useMemo(() => {
    return lanterns.map((l, idx) => {
      // Map 0-100% 2D space to 3D space: x [-14, 14], y [0, 9], z [-8, -20]
      const nx = ((l.x || 50) / 100 - 0.5) * 28;
      const ny = 1.5 + (1 - (l.y || 20) / 100) * 8.5;
      const nz = -9 - (idx % 4) * 3.5;
      return {
        ...l,
        x3d: nx,
        y3d: ny,
        z3d: nz,
      };
    });
  }, [lanterns]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 2, 7], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        {/* Atmospheric Lighting */}
        <ambientLight intensity={0.35} color="#1e1b4b" />
        <directionalLight position={[0, 10, -5]} intensity={0.6} color="#fda4af" />
        <hemisphereLight groundColor="#050510" color="#450a0a" intensity={0.4} />

        {/* Camera Parallax */}
        <CameraRig />

        {/* Drei Stars in the Infinite Deep Cosmos */}
        <Stars
          radius={120}
          depth={60}
          count={5000}
          factor={4}
          saturation={0.5}
          fade
          speed={1.2}
        />

        {/* Drei Sparkles - Golden Embers and Crimson Dust */}
        <Sparkles
          count={120}
          scale={[30, 20, 25]}
          size={4}
          speed={0.4}
          color="#fde047"
          opacity={0.85}
        />
        <Sparkles
          count={70}
          scale={[25, 18, 25]}
          size={5}
          speed={0.25}
          color="#ef4444"
          opacity={0.65}
        />

        {/* 1. Colossal Blood-Red Moon (Inspired by celestial-torii-moon.jpg) */}
        <ColossalBloodMoon />

        {/* 2. Authentic 3D Japanese Torii Gate */}
        <ToriiGate />

        {/* 3. Drifting Night Mist Layers */}
        <DriftingNightMist />

        {/* 4. 3D Floating Sky Lanterns (Drei Float + Interactive Three.js Meshes) */}
        {lanterns3D.map((lantern) => (
          <SingleSkyLantern
            key={lantern.id}
            lantern={lantern}
            onSelect={onLanternSelect}
            isHovered={hoveredLantern?.id === lantern.id}
            onPointerOver={onLanternHover}
            onPointerOut={onLanternLeave}
          />
        ))}
      </Canvas>
    </div>
  );
}

export default CelestialSkyCanvas;
