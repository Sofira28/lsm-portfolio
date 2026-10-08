import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Edged, animTime, useLite } from './helpers.jsx';

// PIZZERÍA FUTURISTA — 4 estaciones (mesero, cocina, caja, admin) y un pedido viajando en tiempo real.
const STATIONS = [[-1.1, -1.1, 0x6fe3ff], [1.1, -1.1, 0xff9b6a], [1.1, 1.1, 0xe7b85c], [-1.1, 1.1, 0xa594ff]];

export default function PizzaWorld({ color }) {
  const lite = useLite();
  const order = useRef(null);
  const pulse = useRef(null);
  const boxGeo = useMemo(() => new THREE.BoxGeometry(0.7, 0.55, 0.7), []);
  const boxMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x151a2c, metalness: 0.6, roughness: 0.5 }), []);
  const pts = useMemo(() => [STATIONS[0], STATIONS[1], STATIONS[2], [0, 0]].map(([x, z]) => new THREE.Vector3(x, 0.95, z)), []);

  useFrame(() => {
    const { t } = animTime();
    const u = ((t * 0.32) % 1) * 3, sI = Math.floor(u), f = u - sI;
    const e = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;
    order.current.position.lerpVectors(pts[sI], pts[sI + 1], e);
    order.current.position.y += Math.sin(f * Math.PI) * 0.4;
    const p = (t * 0.6) % 1;
    pulse.current.scale.setScalar(0.1 + p * 2.3);
    pulse.current.material.opacity = 0.6 * (1 - p);
  });

  return (
    <group>
      <mesh position-y={0.03}>
        <cylinderGeometry args={[2.3, 2.3, 0.06, 6]} />
        <meshStandardMaterial color={0x141022} metalness={0.5} roughness={0.5} />
      </mesh>
      {STATIONS.map(([x, z, c]) => (
        <group key={c}>
          <Edged geometry={boxGeo} material={boxMat} color={c} opacity={0.95} lite={lite} position={[x, 0.33, z]} />
          <mesh rotation-x={-Math.PI / 2} position={[x, 0.62, z]}>
            <planeGeometry args={[0.5, 0.5]} />
            <meshBasicMaterial color={c} transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
      <mesh ref={order}>
        <sphereGeometry args={[0.13, 16, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh ref={pulse} rotation-x={Math.PI / 2} position-y={0.1}>
        <torusGeometry args={[1, 0.015, 6, 96]} />
        <meshBasicMaterial color={0x6fe3ff} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
