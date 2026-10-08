import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { nexus, worldTransform, worldScale } from '../utils/nexus.js';
import { HitTarget } from './helpers.jsx';

// Pedestal común: disco metálico + anillo del color del mundo + hit sphere. Hover/selección = scale 1.1.
export default function World({ project, index, children }) {
  const g = useRef(null);
  const ringM = useRef(null);
  const st = useRef({ s: worldScale(project.id) });
  const { ang, pos } = worldTransform(index);
  const base = worldScale(project.id);

  useFrame(() => {
    const on = project.id === nexus.selected || project.id === nexus.hoverId;
    const goal = base * (on ? 1.1 : 1);
    st.current.s += (goal - st.current.s) * 0.1;
    g.current.scale.setScalar(st.current.s);
    ringM.current.opacity += ((on ? 0.95 : 0.3) - ringM.current.opacity) * 0.1;
  });

  return (
    <group ref={g} position={pos} rotation-y={ang} scale={base}>
      <mesh position-y={-0.09}>
        <cylinderGeometry args={[2.8, 3.05, 0.18, 48]} />
        <meshStandardMaterial color={0x0a1226} metalness={0.75} roughness={0.4} />
      </mesh>
      <mesh rotation-x={Math.PI / 2}>
        <torusGeometry args={[3.35, 0.025, 6, 120]} />
        <meshBasicMaterial ref={ringM} color={project.color} transparent opacity={0.3} />
      </mesh>
      <HitTarget id={project.id} position-y={1.6}>
        <sphereGeometry args={[4.2, 12, 8]} />
      </HitTarget>
      {children}
    </group>
  );
}
