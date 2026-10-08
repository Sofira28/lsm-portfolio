import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SECTORS } from '../../utils/nexus.js';
import { HitTarget, animTime } from '../helpers.jsx';

// SECTOR 05 — antena de contacto emitiendo ondas magenta.
export default function ContactAntenna() {
  const waves = useRef([]);
  const { pos, rad } = SECTORS['s-contact'];

  useFrame(() => {
    const { t } = animTime();
    waves.current.forEach((w, k) => {
      if (!w) return;
      const u = (t * 0.4 + k / 3) % 1;
      w.scale.setScalar(0.6 + u * 3.4);
      w.material.opacity = 0.6 * (1 - u);
      w.position.y = 6.6 + u * 1.5;
    });
  });

  return (
    <>
      <group position={pos}>
        <mesh position-y={2.5}>
          <cylinderGeometry args={[0.08, 0.14, 7, 12]} />
          <meshStandardMaterial color={0x1a2440} metalness={0.8} roughness={0.5} />
        </mesh>
        <mesh position-y={6.4} rotation-x={Math.PI * 0.85}>
          <sphereGeometry args={[1.2, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.35]} />
          <meshStandardMaterial color={0x18223c} metalness={0.8} roughness={0.5} side={THREE.DoubleSide} />
        </mesh>
        {[0, 1, 2].map((k) => (
          <mesh key={k} ref={(m) => { waves.current[k] = m; }} position-y={6.6} rotation-x={Math.PI / 2}>
            <torusGeometry args={[1, 0.02, 6, 64]} />
            <meshBasicMaterial color={0xff6fb8} transparent opacity={0.6} />
          </mesh>
        ))}
      </group>
      <HitTarget id="s-contact" position={[pos[0], pos[1] + 2, pos[2]]}>
        <sphereGeometry args={[rad, 10, 8]} />
      </HitTarget>
    </>
  );
}
