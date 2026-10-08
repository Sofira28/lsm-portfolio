import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { animTime } from './helpers.jsx';

// IBAGUÉ — mapa con rejilla, ruta, pines de lugares y un teléfono escaneando QR.
const ROUTE = [[-1.8, 1.6], [-1.2, -0.8], [0, -0.2], [0.9, -1.1], [1.6, 0.2], [0.4, 1.1]];

export default function IbagameWorld({ color }) {
  const pins = useRef([]);
  const phone = useRef(null);
  const screen = useRef(null);
  const rp = useMemo(() => ROUTE.map(([x, z]) => new THREE.Vector3(x, 0.11, z)), []);
  const grid = useMemo(() => {
    const g = new THREE.GridHelper(4.2, 12, color, 0x14403a);
    g.position.y = 0.085;
    g.material.transparent = true;
    g.material.opacity = 0.55;
    return g;
  }, [color]);
  const route = useMemo(() => new THREE.Line(new THREE.BufferGeometry().setFromPoints(rp), new THREE.LineBasicMaterial({ color })), [rp, color]);
  const pinAt = [rp[1], rp[3], rp[5]];

  useFrame(() => {
    const { t } = animTime();
    pins.current.forEach((p, k) => {
      if (!p) return;
      const y = Math.sin(t * 2 + k) * 0.06;
      p.cone.position.y = 0.35 + y;
      p.ball.position.y = 0.62 + y;
    });
    phone.current.position.y = 1.2 + Math.sin(t) * 0.08;
    screen.current.material.opacity = 0.3 + Math.sin(t * 3) * 0.1;
  });

  return (
    <group>
      <mesh position-y={0.04}>
        <boxGeometry args={[4.2, 0.08, 4.2]} />
        <meshStandardMaterial color={0x0a1d1c} metalness={0.3} roughness={0.8} />
      </mesh>
      <primitive object={grid} />
      <primitive object={route} />
      {pinAt.map((v, k) => (
        <group key={k}>
          <mesh ref={(m) => { pins.current[k] = { ...(pins.current[k] || {}), cone: m }; }} rotation-x={Math.PI} position={[v.x, 0.35, v.z]}>
            <coneGeometry args={[0.13, 0.42, 16]} />
            <meshBasicMaterial color={color} />
          </mesh>
          <mesh ref={(m) => { pins.current[k] = { ...(pins.current[k] || {}), ball: m }; }} position={[v.x, 0.62, v.z]}>
            <sphereGeometry args={[0.12, 16, 12]} />
            <meshBasicMaterial color={0xe6edfb} />
          </mesh>
        </group>
      ))}
      <mesh ref={phone} position={[1.7, 1.2, 1.5]} rotation-y={-0.5}>
        <boxGeometry args={[0.62, 1.1, 0.06]} />
        <meshStandardMaterial color={0x0d1222} metalness={0.7} roughness={0.5} />
        <mesh ref={screen} position-z={0.035}>
          <planeGeometry args={[0.52, 0.96]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>
      </mesh>
    </group>
  );
}
