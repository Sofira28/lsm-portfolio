import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Edged, animTime, lookAtQuat, useLite } from './helpers.jsx';

// LUNA EVERMOON — luna con cráteres, cartas orbitando y halo.
const CRATERS = [[0.6, 0.5, 1.4], [-0.8, 0.9, 1.2], [0.2, -0.6, 1.5]];

export default function EvermoonWorld() {
  const lite = useLite();
  const moon = useRef(null);
  const orb = useRef(null);
  const cardGeo = useMemo(() => new THREE.PlaneGeometry(0.42, 0.58), []);
  const cardMat = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xf4b8da, transparent: true, opacity: 0.45, side: THREE.DoubleSide }), []);
  const cards = useMemo(() => Array.from({ length: 8 }, (_, k) => {
    const a = (k / 8) * Math.PI * 2;
    const p = [Math.cos(a) * 2.6, Math.sin(a * 2) * 0.4, Math.sin(a) * 2.6];
    return { p, q: lookAtQuat(p, [0, p[1], 0]) };
  }), []);
  const craters = useMemo(() => CRATERS.map(([x, y, z]) => {
    const p = [x, 2.4 + y, z];
    return { p, q: lookAtQuat(p, [x * 3, 2.4 + y * 3, z * 3]) };
  }), []);

  useFrame(() => {
    const { t } = animTime();
    orb.current.rotation.y = t * 0.22;
    moon.current.position.y = 2.4 + Math.sin(t * 0.8) * 0.12;
  });

  return (
    <group>
      <mesh ref={moon} position-y={2.4}>
        <sphereGeometry args={[1.6, 48, 32]} />
        <meshStandardMaterial color={0xe2dbff} roughness={0.95} metalness={0} emissive={0x3b2f70} emissiveIntensity={0.45} />
      </mesh>
      {craters.map((c, i) => (
        <mesh key={i} position={c.p} quaternion={c.q}>
          <circleGeometry args={[0.22, 24]} />
          <meshBasicMaterial color={0xb7a8ec} transparent opacity={0.6} />
        </mesh>
      ))}
      <group ref={orb} position-y={2.4}>
        {cards.map((c, i) => (
          <Edged key={i} geometry={cardGeo} material={cardMat} color={0xffd6ec} opacity={0.9} lite={lite} position={c.p} quaternion={c.q} />
        ))}
      </group>
      <mesh rotation-x={1.2} position-y={2.4}>
        <torusGeometry args={[2.1, 0.018, 6, 128]} />
        <meshBasicMaterial color={0xc7b8ff} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
