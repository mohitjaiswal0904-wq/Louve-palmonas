import { useTexture } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";
import { FreeWalkControls } from "./FreeWalkControls";

/** Louve brand colours — aligned with tokens.css */
const C = {
  wine: "#3f1521",
  sand: "#dbd5d1",
  sandLight: "#f4f1ed",
  sandPure: "#faf8f6",
  serenity: "#93a9d1",
  oyster: "#414143",
  accent: "#93a9d1",
  goldSoft: "#d4c0a0",
};

const ASSETS = {
  bannerHero: "/assets/slides/s3-model.png",
  bannerLeft: "/assets/slides/s5-c.png",
  bannerRight: "/assets/slides/s2-a.png",
  bannerRear: "/assets/slides/s1-hero-a.png",
  jewel1: "/assets/pdp/gallery-2.png",
  jewel2: "/assets/pdp/gallery-3.png",
  jewel3: "/assets/pdp/gallery-4.png",
  jewel4: "/assets/pdp/gallery-5.png",
  jewel5: "/assets/pdp/hero.png",
  jewel6: "/assets/slides/s4-pendant.png",
  jewel7: "/assets/slides/s3-earrings-a.png",
} as const;

function FramedArt({
  map,
  width,
  height,
  position,
  rotation = [0, 0, 0],
}: {
  map: THREE.Texture;
  width: number;
  height: number;
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  const frame = 0.06;
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, -0.02]} castShadow>
        <boxGeometry args={[width + frame * 2, height + frame * 2, 0.05]} />
        <meshStandardMaterial color={C.accent} roughness={0.32} metalness={0.82} />
      </mesh>
      <mesh position={[0, 0, -0.045]}>
        <boxGeometry args={[width + frame * 2.4, height + frame * 2.4, 0.02]} />
        <meshStandardMaterial color={C.wine} roughness={0.55} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial map={map} roughness={0.55} metalness={0.05} />
      </mesh>
    </group>
  );
}

function Pedestal({
  position,
  map,
}: {
  position: [number, number, number];
  map: THREE.Texture;
}) {
  return (
    <group position={position}>
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.32, 0.4, 0.7, 32]} />
        <meshStandardMaterial color={C.sand} roughness={0.4} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0.72, 0]} castShadow>
        <cylinderGeometry args={[0.36, 0.36, 0.05, 32]} />
        <meshStandardMaterial color={C.accent} roughness={0.28} metalness={0.85} />
      </mesh>
      {/* Jewelry plate photo */}
      <mesh position={[0, 0.9, 0]} rotation={[-0.35, 0.2, 0]} castShadow>
        <planeGeometry args={[0.55, 0.55]} />
        <meshStandardMaterial map={map} roughness={0.4} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0.885, -0.01]} rotation={[-0.35, 0.2, 0]}>
        <planeGeometry args={[0.62, 0.62]} />
        <meshStandardMaterial color={C.accent} roughness={0.3} metalness={0.8} />
      </mesh>
      <pointLight
        position={[0, 1.55, 0.2]}
        intensity={0.85}
        distance={3.4}
        color="#fff6ea"
      />
    </group>
  );
}

function DisplayCase({
  position,
  mapA,
  mapB,
}: {
  position: [number, number, number];
  mapA: THREE.Texture;
  mapB: THREE.Texture;
}) {
  return (
    <group position={position}>
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.9, 0.7]} />
        <meshStandardMaterial color={C.sandLight} roughness={0.45} metalness={0.08} />
      </mesh>
      <mesh position={[0, 0.91, 0]}>
        <boxGeometry args={[1.62, 0.03, 0.72]} />
        <meshStandardMaterial color={C.accent} roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Jewelry images inside case */}
      <mesh position={[-0.32, 1.05, 0.05]} rotation={[-0.15, 0.15, 0]}>
        <planeGeometry args={[0.42, 0.42]} />
        <meshStandardMaterial map={mapA} roughness={0.35} metalness={0.1} />
      </mesh>
      <mesh position={[0.32, 1.05, 0.05]} rotation={[-0.15, -0.15, 0]}>
        <planeGeometry args={[0.42, 0.42]} />
        <meshStandardMaterial map={mapB} roughness={0.35} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.15, 0]}>
        <boxGeometry args={[1.55, 0.55, 0.62]} />
        <meshPhysicalMaterial
          color="#eef3fa"
          transmission={0.78}
          thickness={0.3}
          roughness={0.08}
          metalness={0}
          transparent
          opacity={0.28}
        />
      </mesh>
      <spotLight
        position={[0, 2.4, 0.4]}
        angle={0.38}
        penumbra={0.65}
        intensity={14}
        color="#fff4e6"
        castShadow
      />
    </group>
  );
}

function StoreArt() {
  const textures = useTexture([
    ASSETS.bannerHero,
    ASSETS.bannerLeft,
    ASSETS.bannerRight,
    ASSETS.bannerRear,
    ASSETS.jewel1,
    ASSETS.jewel2,
    ASSETS.jewel3,
    ASSETS.jewel4,
    ASSETS.jewel5,
    ASSETS.jewel6,
    ASSETS.jewel7,
  ]);

  useEffect(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
    });
  }, [textures]);

  const [
    bannerHero,
    bannerLeft,
    bannerRight,
    bannerRear,
    jewel1,
    jewel2,
    jewel3,
    jewel4,
    jewel5,
    jewel6,
    jewel7,
  ] = textures;

  return (
    <group>
      {/* Back wall hero banner */}
      <FramedArt
        map={bannerHero}
        width={4.4}
        height={2.35}
        position={[0, 2.25, -8.78]}
      />

      {/* Side wall lifestyle banners */}
      <FramedArt
        map={bannerLeft}
        width={2.4}
        height={3.1}
        position={[-5.85, 2.3, -4.2]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <FramedArt
        map={bannerRight}
        width={2.4}
        height={3.1}
        position={[5.85, 2.3, 1.8]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <FramedArt
        map={bannerRear}
        width={2.8}
        height={1.7}
        position={[0, 2.6, 8.85]}
        rotation={[0, Math.PI, 0]}
      />

      {/* Cabinet shelf jewelry frames */}
      <FramedArt
        map={jewel6}
        width={0.85}
        height={0.85}
        position={[-4.55, 1.55, -3.4]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <FramedArt
        map={jewel7}
        width={0.85}
        height={0.85}
        position={[-4.55, 1.55, -1.2]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <FramedArt
        map={jewel5}
        width={0.9}
        height={0.9}
        position={[4.55, 1.55, 0.6]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <FramedArt
        map={jewel1}
        width={0.9}
        height={0.9}
        position={[4.55, 1.55, 2.8]}
        rotation={[0, -Math.PI / 2, 0]}
      />

      <DisplayCase position={[0, 0, -5.5]} mapA={jewel2} mapB={jewel3} />
      <DisplayCase position={[-2.4, 0, -2]} mapA={jewel4} mapB={jewel5} />
      <DisplayCase position={[2.4, 0, -2]} mapA={jewel1} mapB={jewel6} />

      <Pedestal position={[-3.2, 0, 3.2]} map={jewel5} />
      <Pedestal position={[0, 0, 4.2]} map={jewel2} />
      <Pedestal position={[3.2, 0, 3.2]} map={jewel3} />
    </group>
  );
}

function BoutiqueShell() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 18]} />
        <meshStandardMaterial color={C.sand} roughness={0.42} metalness={0.06} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[2.2, 14]} />
        <meshStandardMaterial color={C.serenity} roughness={0.9} metalness={0.02} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.15, 0.015, 0]}>
        <planeGeometry args={[0.035, 14]} />
        <meshStandardMaterial color={C.accent} metalness={0.85} roughness={0.28} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.15, 0.015, 0]}>
        <planeGeometry args={[0.035, 14]} />
        <meshStandardMaterial color={C.accent} metalness={0.85} roughness={0.28} />
      </mesh>

      <mesh position={[0, 2.2, -9]} receiveShadow>
        <boxGeometry args={[12, 4.4, 0.2]} />
        <meshStandardMaterial color={C.sandPure} roughness={0.75} />
      </mesh>
      <mesh position={[0, 2.2, 9]} receiveShadow>
        <boxGeometry args={[12, 4.4, 0.2]} />
        <meshStandardMaterial color={C.sandPure} roughness={0.75} />
      </mesh>
      <mesh position={[-6, 2.2, 0]} receiveShadow>
        <boxGeometry args={[0.2, 4.4, 18]} />
        <meshStandardMaterial color={C.sandLight} roughness={0.7} />
      </mesh>
      <mesh position={[6, 2.2, 0]} receiveShadow>
        <boxGeometry args={[0.2, 4.4, 18]} />
        <meshStandardMaterial color={C.sandLight} roughness={0.7} />
      </mesh>

      <mesh position={[0, 4.35, 0]}>
        <boxGeometry args={[12, 0.15, 18]} />
        <meshStandardMaterial color="#ffffff" roughness={0.95} />
      </mesh>

      <mesh position={[-4.6, 0.9, -2]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 1.8, 4.5]} />
        <meshStandardMaterial color={C.sandLight} roughness={0.48} metalness={0.1} />
      </mesh>
      <mesh position={[-4.6, 1.82, -2]}>
        <boxGeometry args={[1.42, 0.04, 4.52]} />
        <meshStandardMaterial color={C.accent} roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[4.6, 0.9, 2]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 1.8, 4.5]} />
        <meshStandardMaterial color={C.sandLight} roughness={0.48} metalness={0.1} />
      </mesh>
      <mesh position={[4.6, 1.82, 2]}>
        <boxGeometry args={[1.42, 0.04, 4.52]} />
        <meshStandardMaterial color={C.accent} roughness={0.3} metalness={0.8} />
      </mesh>

      <mesh position={[0, 0.06, -8.88]}>
        <boxGeometry args={[11.6, 0.12, 0.04]} />
        <meshStandardMaterial color={C.oyster} roughness={0.6} />
      </mesh>
      <mesh position={[-5.88, 0.06, 0]}>
        <boxGeometry args={[0.04, 0.12, 17.6]} />
        <meshStandardMaterial color={C.oyster} roughness={0.6} />
      </mesh>
      <mesh position={[5.88, 0.06, 0]}>
        <boxGeometry args={[0.04, 0.12, 17.6]} />
        <meshStandardMaterial color={C.oyster} roughness={0.6} />
      </mesh>

      <pointLight position={[-3, 3.6, -4]} intensity={10} distance={11} color="#fff8f0" />
      <pointLight position={[3, 3.6, 2]} intensity={9} distance={11} color="#fff8f0" />
      <pointLight position={[0, 3.8, 6]} intensity={8} distance={10} color="#f5f0ff" />
      <pointLight position={[0, 3.2, -6]} intensity={7} distance={9} color="#ffe8d4" />
    </group>
  );
}

export function StoreScene({ exploring }: { exploring: boolean }) {
  return (
    <>
      <color attach="background" args={[C.sandPure]} />
      <fog attach="fog" args={[C.sandPure, 14, 28]} />
      <ambientLight intensity={0.62} color="#fffaf4" />
      <hemisphereLight args={["#ffffff", C.sand, 0.45]} />
      <directionalLight
        position={[5, 9, 3]}
        intensity={0.85}
        color="#fff8f0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <BoutiqueShell />
      <StoreArt />
      <FreeWalkControls enabled={exploring} />
    </>
  );
}
