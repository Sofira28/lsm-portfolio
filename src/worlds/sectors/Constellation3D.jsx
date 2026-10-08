import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SKILLS } from '../../data/projectsData.js';
import { SECTORS } from '../../utils/nexus.js';
import { HitTarget, animTime } from '../helpers.jsx';

// SECTOR 02 — constelación de skills: 9 hubs, techs alrededor de cada uno.
export default function Constellation3D() {
  const cg = useRef(null);
  const { pos, rad } = SECTORS['s-systems'];
  const { lineGeo, ptsGeo, hubs } = useMemo(() => {
    const lp = [], tp = [], hubs = [];
    SKILLS.forEach((c, i) => {
      const a = (i / SKILLS.length) * Math.PI * 2;
      const hp = new THREE.Vector3(Math.cos(a) * 4.6, Math.sin(a * 2) * 1.2, Math.sin(a) * 4.6);
      lp.push(0, 0, 0, hp.x, hp.y, hp.z);
      hubs.push(hp.toArray());
      c.techs.forEach((t, j) => {
        const b = (j / c.techs.length) * Math.PI * 2;
        const q = hp.clone().add(new THREE.Vector3(Math.cos(b) * 1.3, Math.sin(b) * 1.3 * 0.8, Math.sin(b + i) * 0.9));
        tp.push(q.x, q.y, q.z);
        lp.push(hp.x, hp.y, hp.z, q.x, q.y, q.z);
      });
    });
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lp, 3));
    const ptsGeo = new THREE.BufferGeometry();
    ptsGeo.setAttribute('position', new THREE.Float32BufferAttribute(tp, 3));
    return { lineGeo, ptsGeo, hubs };
  }, []);

  useFrame(() => { cg.current.rotation.y = animTime().t * 0.06; });

  return (
    <>
      <group ref={cg} position={pos}>
        <lineSegments geometry={lineGeo}>
          <lineBasicMaterial color={0x4d8dff} transparent opacity={0.35} />
        </lineSegments>
        <points geometry={ptsGeo}>
          <pointsMaterial size={0.22} color={0xe6edfb} />
        </points>
        {hubs.map((p, i) => (
          <mesh key={i} position={p}>
            <octahedronGeometry args={[0.28]} />
            <meshBasicMaterial color={0x6fe3ff} />
          </mesh>
        ))}
        <mesh>
          <icosahedronGeometry args={[0.6, 1]} />
          <meshBasicMaterial color={0x4d8dff} transparent opacity={0.8} wireframe />
        </mesh>
      </group>
      <HitTarget id="s-systems" position={[pos[0], pos[1] + 2, pos[2]]}>
        <sphereGeometry args={[rad, 10, 8]} />
      </HitTarget>
    </>
  );
}
