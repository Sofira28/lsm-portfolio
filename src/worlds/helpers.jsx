import { useMemo } from 'react';
import { EdgesGeometry, Object3D } from 'three';
import { useNexus } from '../store.js';
import { nexus } from '../utils/nexus.js';
import { sfx } from '../hooks/useSound.js';

// En LITE no se dibujan aristas (como en la referencia).
export const useLite = () => useNexus((s) => s.tier !== 'high');

// Tiempo de animación: con reduced motion las animaciones quedan congeladas en t=1.
export const animTime = () => nexus.anim;

// Malla con aristas luminosas opcionales.
export function Edged({ geometry, material, color, opacity = 0.6, lite, children, ...props }) {
  const edges = useMemo(() => (lite ? null : new EdgesGeometry(geometry)), [geometry, lite]);
  return (
    <mesh geometry={geometry} material={material} {...props}>
      {edges && (
        <lineSegments geometry={edges}>
          <lineBasicMaterial color={color} transparent opacity={opacity} />
        </lineSegments>
      )}
      {children}
    </mesh>
  );
}

// Equivalente a Object3D.lookAt sin padre (coordenadas locales del grupo).
const dummy = new Object3D();
export function lookAtQuat(pos, target) {
  dummy.position.set(...pos);
  dummy.lookAt(...target);
  return dummy.quaternion.clone();
}

// Malla invisible para raycast (hover / click).
export function HitTarget({ id, children, ...props }) {
  const onOver = (e) => {
    e.stopPropagation();
    if (!useNexus.getState().arrived || nexus.intro) return;
    if (nexus.hoverId !== id) {
      nexus.hoverId = id;
      if (nexus.canvasEl) nexus.canvasEl.style.cursor = 'pointer';
      sfx('hover');
    }
  };
  const onOut = () => {
    if (nexus.hoverId === id) { nexus.hoverId = null; if (nexus.canvasEl) nexus.canvasEl.style.cursor = 'grab'; }
  };
  const onClick = (e) => {
    e.stopPropagation();
    if (e.delta > 6 || !useNexus.getState().arrived || nexus.intro) return;
    useNexus.getState().activate(id);
  };
  return (
    <mesh {...props} onPointerOver={onOver} onPointerOut={onOut} onClick={onClick}>
      {children}
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}
