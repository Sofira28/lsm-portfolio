import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Edged, animTime, useLite } from './helpers.jsx';

// INDUSTRIAL DATA WORLD — máquinas, lingotes por material, báscula y conciliación.
const BLOCKS = [[-0.9, 0.6, -0.6, 1.1, 1.2, 1], [0.55, 0.45, -0.8, 0.9, 0.9, 0.8], [0.15, 1, 0.2, 0.6, 2, 0.6]];
const INGOTS = [0xe8a090, 0xf0c050, 0xe9e7ef, 0x9aa0a8];

export default function GoldWorld({ color }) {
  const lite = useLite();
  const disp = useRef(null);
  const cubes = useRef([]);
  const metal = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x1a1d27, metalness: 0.85, roughness: 0.32 }), []);
  const geos = useMemo(() => ({
    blocks: BLOCKS.map((b) => new THREE.BoxGeometry(b[3], b[4], b[5])),
    panel: new THREE.PlaneGeometry(1.3, 0.8)
  }), []);
  const panelMat = useMemo(() => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.14, side: THREE.DoubleSide }), [color]);

  useFrame(() => {
    const { t } = animTime();
    cubes.current.forEach((c, k) => {
      const u = (t * 0.22 + k / 3) % 1;
      c.position.set(-2.2 + u * 4.4, 0.35 + Math.sin(u * Math.PI) * 0.9, 0.95);
      c.rotation.y = t;
    });
    disp.current.rotation.z = t;
  });

  return (
    <group>
      {BLOCKS.map((b, i) => (
        <Edged key={i} geometry={geos.blocks[i]} material={metal} color={color} opacity={0.75} lite={lite} position={[b[0], b[1], b[2]]} />
      ))}
      {INGOTS.map((c, k) => (
        <mesh key={c} position={[-1.25 + k * 0.62, 0.21, 1.55]}>
          <cylinderGeometry args={[0.22, 0.22, 0.42, 24]} />
          <meshStandardMaterial color={c} metalness={0.95} roughness={0.22} emissive={c} emissiveIntensity={0.12} />
        </mesh>
      ))}
      <mesh material={metal} position={[1.6, 0.06, 1.1]}>
        <cylinderGeometry args={[0.55, 0.6, 0.12, 32]} />
      </mesh>
      <mesh ref={disp} rotation-x={-Math.PI / 2} position={[1.6, 0.13, 1.1]}>
        <ringGeometry args={[0.3, 0.45, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.85} side={THREE.DoubleSide} />
      </mesh>
      <Edged geometry={geos.panel} material={panelMat} color={color} opacity={0.9} lite={lite} position={[0, 2.9, 0.6]} />
      {[0, 1, 2].map((k) => (
        <mesh key={k} ref={(m) => { cubes.current[k] = m; }}>
          <boxGeometry args={[0.14, 0.14, 0.14]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}
