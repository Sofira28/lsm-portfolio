import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Edged, animTime, lookAtQuat, useLite } from './helpers.jsx';

// CONTROL ROOM — pantallas en arco, consola, reloj y slots de agenda que se reservan.
export default function ZytimeWorld({ color }) {
  const lite = useLite();
  const tick = useRef(null);
  const panelGeo = useMemo(() => new THREE.PlaneGeometry(0.72, 0.48), []);
  const panels = useMemo(() => Array.from({ length: 7 }, (_, k) => {
    const a = (k / 6 - 0.5) * Math.PI * 1.1;
    const p = [Math.sin(a) * 1.9, 1.15 + (k % 2) * 0.55, -Math.cos(a) * 1.9 + 0.3];
    return { p, q: lookAtQuat(p, [0, p[1], 0.3]), m: new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.22, side: THREE.DoubleSide }) };
  }), [color]);
  const slots = useMemo(() => Array.from({ length: 6 }, () => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.25 })), [color]);

  useFrame(() => {
    const { t } = animTime();
    const a = t * 0.9;
    tick.current.position.set(Math.cos(a) * 0.8, 2.4 + Math.sin(a) * 0.8, 0.2);
    const on = Math.floor(t * 1.1) % 6;
    slots.forEach((m, k) => { m.opacity = k === on ? 0.95 : 0.2; });
    panels.forEach((p, k) => { p.m.opacity = 0.18 + Math.max(0, Math.sin(t * 1.5 + k)) * 0.15; });
  });

  return (
    <group>
      {panels.map((p, k) => <Edged key={k} geometry={panelGeo} material={p.m} color={color} opacity={0.9} lite={lite} position={p.p} quaternion={p.q} />)}
      <mesh position={[0, 0.2, -0.2]}>
        <boxGeometry args={[1.6, 0.35, 0.5]} />
        <meshStandardMaterial color={0x111a30} metalness={0.7} roughness={0.5} />
      </mesh>
      <mesh position={[0, 2.4, 0.2]}>
        <torusGeometry args={[0.8, 0.025, 6, 96]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
      <mesh ref={tick}>
        <sphereGeometry args={[0.08, 12, 8]} />
        <meshBasicMaterial color={0xe6edfb} />
      </mesh>
      {slots.map((m, k) => (
        <mesh key={k} material={m} position={[-0.85 + k * 0.34, 0.06, 1.2]}>
          <boxGeometry args={[0.26, 0.08, 0.26]} />
        </mesh>
      ))}
    </group>
  );
}
