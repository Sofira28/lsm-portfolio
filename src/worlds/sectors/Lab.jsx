import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SECTORS } from '../../utils/nexus.js';
import { HitTarget, animTime } from '../helpers.jsx';

// SECTOR 04 — LSM // LAB: caja de aristas violeta, cubos flotando y una terminal.
export default function Lab() {
  const cubes = useRef([]);
  const { pos, rad } = SECTORS['s-lab'];
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(4, 3, 4)), []);
  const cubeData = useMemo(() => Array.from({ length: 7 }, () => [(Math.random() - 0.5) * 2.6, 0.6 + Math.random() * 2, (Math.random() - 0.5) * 2.6]), []);

  useFrame(() => {
    const { t, dt } = animTime();
    cubes.current.forEach((c, k) => {
      if (!c) return;
      c.rotation.set(t * 0.5 + k, t * 0.4, 0);
      if (dt) c.position.y += Math.sin(t * 1.3 + k) * 0.003;
    });
  });

  return (
    <>
      <group position={pos}>
        <lineSegments geometry={edges} position-y={1.5}>
          <lineBasicMaterial color={0xa594ff} />
        </lineSegments>
        {cubeData.map((p, k) => (
          <mesh key={k} ref={(m) => { cubes.current[k] = m; }} position={p}>
            <boxGeometry args={[0.35, 0.35, 0.35]} />
            <meshStandardMaterial color={0x2b2160} emissive={0x6a52ff} emissiveIntensity={0.5} metalness={0.4} roughness={0.5} />
          </mesh>
        ))}
        <mesh position={[0, 1.6, 2.01]}>
          <planeGeometry args={[1.6, 1]} />
          <meshBasicMaterial color={0x6fe3ff} transparent opacity={0.25} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <HitTarget id="s-lab" position={[pos[0], pos[1] + 2, pos[2]]}>
        <sphereGeometry args={[rad, 10, 8]} />
      </HitTarget>
    </>
  );
}
