import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useNexus } from '../store.js';
import { nexus } from '../utils/nexus.js';

// Túnel de anillos azules/violetas para la transición de entrada + burst de ~600 partículas cyan.
export default function Tunnel() {
  const hi = useNexus((s) => s.tier === 'high');
  const group = useRef(null);
  const rings = useRef([]);
  const matA = useMemo(() => new THREE.MeshBasicMaterial({ color: 0x4d8dff, transparent: true, opacity: 0.18, fog: false }), []);
  const matB = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xa594ff, transparent: true, opacity: 0.12, fog: false }), []);
  const n = hi ? 46 : 22;

  useFrame(() => {
    const I = nexus.intro;
    group.current.visible = !!I;
    if (!I) return;
    const t = nexus.anim.t;
    rings.current.forEach((m, k) => { if (m) m.rotation.z = t * (k % 2 ? 0.3 : -0.2); });
    matA.opacity = 0.2 + Math.sin(Math.min(1, I.u * 1.25) * Math.PI) * 0.7;
    matB.opacity = matA.opacity * 0.7;
  });

  return (
    <>
      <group ref={group} visible={false}>
        {Array.from({ length: n }, (_, k) => (
          <mesh key={k} ref={(m) => { rings.current[k] = m; }} position={[0, 5, 70 + k * 13]} material={k % 7 === 3 ? matB : matA}>
            <torusGeometry args={[k % 4 === 0 ? 8 : 7, k % 4 === 0 ? 0.06 : 0.03, 6, 72]} />
          </mesh>
        ))}
      </group>
      <Burst />
    </>
  );
}

function Burst() {
  const camera = useThree((s) => s.camera);
  const ref = useRef(null);
  const st = useRef(null);
  const { geo, vel } = useMemo(() => {
    const N = 600, a = new Float32Array(N * 3), v = [];
    for (let i = 0; i < N; i++) {
      const d = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(Math.random());
      a.set([d.x * 2, d.y * 1.2, d.z], i * 3);
      v.push(d);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(a, 3));
    return { geo: g, vel: v };
  }, []);

  useEffect(() => {
    if (!nexus.introPending && !nexus.intro) return;
    ref.current.position.copy(camera.position).add(new THREE.Vector3(0, 0, -6));
    ref.current.visible = true;
    st.current = { t: 0 };
  }, [camera]);

  useFrame((_, delta) => {
    const B = st.current;
    if (!B) return;
    const dt = Math.min(0.05, delta);
    B.t += dt;
    const pa = geo.attributes.position;
    for (let i = 0; i < vel.length; i++) {
      pa.array[i * 3] += vel[i].x * dt * 9;
      pa.array[i * 3 + 1] += vel[i].y * dt * 9;
      pa.array[i * 3 + 2] += vel[i].z * dt * 9;
    }
    pa.needsUpdate = true;
    ref.current.material.opacity = Math.max(0, 1 - B.t / 1.1);
    if (B.t > 1.1) { ref.current.visible = false; st.current = null; }
  });

  return (
    <points ref={ref} geometry={geo} visible={false}>
      <pointsMaterial size={0.06} color={0x6fe3ff} transparent opacity={1} depthWrite={false} fog={false} />
    </points>
  );
}
