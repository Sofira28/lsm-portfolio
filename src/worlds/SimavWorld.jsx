import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Edged, animTime, useLite } from './helpers.jsx';

// CIUDAD SIMAV — ciudad, núcleo IA, hotspots de daño vial, vehículo escaneando y radar.
const HOTSPOTS = [[-1.6, 0.36], [1.2, 0.36], [-0.36, -1.4], [-0.36, 1.6]];

export default function SimavWorld({ color }) {
  const lite = useLite();
  const core = useRef(null);
  const car = useRef(null);
  const radar = useRef(null);
  const hs = useRef([]);
  const bm = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x0b1630, metalness: 0.6, roughness: 0.4 }), []);
  const blocks = useMemo(() => {
    let seed = 7;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    const out = [];
    for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) {
      if (i === 2 || j === 3) continue;
      const h = 0.25 + rnd() * 1.5;
      out.push({ geo: new THREE.BoxGeometry(0.5, h, 0.5), pos: [(i - 2.5) * 0.72, h / 2 + 0.02, (j - 2.5) * 0.72] });
    }
    return out;
  }, []);
  const lines = useMemo(() => HOTSPOTS.map(([x, z]) => new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, 0.15, z), new THREE.Vector3(0, 3, 0)]),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.25 })
  )), [color]);

  useFrame(() => {
    const { t } = animTime();
    core.current.rotation.set(t * 0.3, t * 0.5, 0);
    hs.current.forEach((s, k) => s && s.scale.setScalar(1 + Math.sin(t * 3 + k * 1.7) * 0.45));
    car.current.position.x = -2.2 + ((t * 0.25) % 1) * 4.4;
    car.current.position.z = 0.36;
    const p = (t * 0.35) % 1;
    radar.current.scale.setScalar(0.2 + p * 2.6);
    radar.current.material.opacity = 0.6 * (1 - p);
  });

  return (
    <group>
      {blocks.map((b, i) => <Edged key={i} geometry={b.geo} material={bm} color={color} opacity={0.45} lite={lite} position={b.pos} />)}
      <mesh ref={core} position-y={3}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshBasicMaterial color={color} transparent opacity={0.85} wireframe />
      </mesh>
      <mesh position-y={3}>
        <sphereGeometry args={[0.2, 16, 12]} />
        <meshBasicMaterial color={0x6fe3ff} />
      </mesh>
      {HOTSPOTS.map(([x, z], k) => (
        <group key={k}>
          <mesh ref={(m) => { hs.current[k] = m; }} position={[x, 0.15, z]}>
            <sphereGeometry args={[0.1, 12, 8]} />
            <meshBasicMaterial color={0xff5fb4} />
          </mesh>
          <primitive object={lines[k]} />
        </group>
      ))}
      <mesh ref={car} position-y={0.1}>
        <boxGeometry args={[0.24, 0.12, 0.13]} />
        <meshBasicMaterial color={0xe6edfb} />
      </mesh>
      <mesh ref={radar} rotation-x={Math.PI / 2} position-y={0.05}>
        <torusGeometry args={[1, 0.012, 6, 96]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
