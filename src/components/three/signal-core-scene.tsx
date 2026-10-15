"use client";

import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

import type { MotionMode } from "@/lib/motion";

const nodePositions: [number, number, number][] = [
  [-2.75, 0.45, 0],
  [2.75, -0.1, -0.1],
  [0.2, 2.55, -0.25],
  [-0.25, -2.55, 0.15],
];

function CoreGeometry({ mode }: { mode: MotionMode }) {
  const root = useRef<Group>(null);
  const orbit = useRef<Group>(null);

  useFrame(({ pointer, clock }) => {
    if (!root.current || mode !== "full") return;
    root.current.rotation.y += (pointer.x * 0.28 - root.current.rotation.y) * 0.035;
    root.current.rotation.x += (-pointer.y * 0.18 - root.current.rotation.x) * 0.035;
    if (orbit.current) orbit.current.rotation.z = clock.getElapsedTime() * 0.08;
  });

  return (
    <group ref={root} rotation={[0.08, -0.28, 0]}>
      <Float speed={mode === "full" ? 1.4 : 0} rotationIntensity={0.18} floatIntensity={0.25}>
        <mesh>
          <icosahedronGeometry args={[1.1, 6]} />
          <meshPhysicalMaterial
            color="#111212"
            metalness={1}
            roughness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>
        <mesh scale={1.34}>
          <icosahedronGeometry args={[1.1, 3]} />
          <MeshTransmissionMaterial
            color="#e8e9e6"
            transmission={0.94}
            thickness={0.65}
            roughness={0.16}
            chromaticAberration={0.02}
            anisotropy={0.18}
            samples={mode === "full" ? 5 : 2}
            resolution={mode === "full" ? 512 : 256}
          />
        </mesh>
      </Float>

      <group ref={orbit}>
        <mesh rotation={[1.15, 0.3, 0.22]}>
          <torusGeometry args={[2.05, 0.018, 12, 160]} />
          <meshStandardMaterial color="#252727" metalness={0.8} roughness={0.25} />
        </mesh>
        <mesh rotation={[0.15, 1.1, -0.65]}>
          <torusGeometry args={[2.62, 0.012, 10, 160]} />
          <meshStandardMaterial color="#777b7a" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {nodePositions.map((position, index) => (
        <group key={index} position={position}>
          <mesh>
            <sphereGeometry args={[0.12, 20, 20]} />
            <meshStandardMaterial color="#090a0a" metalness={1} roughness={0.15} />
          </mesh>
          <mesh scale={1.8}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.14} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function SignalCoreScene({ mode }: { mode: MotionMode }) {
  return (
    <div
      role="img"
      aria-label="Interaktive 3D-Darstellung eines KI-Agenten mit vier verbundenen Kanälen"
      className="h-full min-h-[24rem] w-full lg:min-h-[42rem]"
      data-testid="signal-core-canvas"
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 36 }}
        dpr={mode === "lite" ? 1 : [1, 1.5]}
        frameloop={mode === "lite" ? "demand" : "always"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[4, 5, 5]} intensity={5} color="#ffffff" />
        <directionalLight position={[-4, -2, 3]} intensity={2} color="#aeb5b3" />
        <pointLight position={[0, 0, 2]} intensity={2} color="#ffffff" />
        <CoreGeometry mode={mode} />
      </Canvas>
    </div>
  );
}
