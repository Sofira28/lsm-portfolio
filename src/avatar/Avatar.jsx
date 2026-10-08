import { Component, Suspense, useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { CONFIG } from '../config.js';
import { useNexus } from '../store.js';
import { nexus } from '../utils/nexus.js';
import { HitTarget, animTime } from '../worlds/helpers.jsx';

// Plataforma central + CORE (anillos giroscopio + icosaedro) + avatar.
// El color del Core interpola hacia el del proyecto/sección activo (nexus.coreGoal).
export default function Avatar() {
  const seg = useRef(null);
  const gyro = useRef([]);
  const ico = useRef(null);
  const coreIn = useRef(null);
  const light = useRef(null);
  const coreColor = useMemo(() => new THREE.Color(0x4d8dff), []);
  const goal = useMemo(() => new THREE.Color(), []);
  const metal = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x0b1328, metalness: 0.75, roughness: 0.35 }), []);
  const coreMat = useMemo(() => new THREE.MeshBasicMaterial({ color: 0x4d8dff, transparent: true, opacity: 0.9 }), []);
  const icoMat = useMemo(() => new THREE.MeshBasicMaterial({ color: 0x4d8dff, wireframe: true }), []);
  const segMat = useMemo(() => new THREE.MeshBasicMaterial({ color: 0x6fe3ff, transparent: true, opacity: 0.55, side: THREE.DoubleSide }), []);

  useFrame(() => {
    const { t, dt } = animTime();
    seg.current.rotation.z = t * 0.08;
    gyro.current.forEach((m, k) => {
      if (!m) return;
      m.rotation.z = t * (0.2 + k * 0.12) * (k % 2 ? -1 : 1);
      m.rotation.y += dt * 0.05 * (k + 1);
    });
    ico.current.rotation.set(t * 0.4, t * 0.6, 0);
    ico.current.position.y = 4.3 + Math.sin(t * 1.2) * 0.08;
    coreIn.current.position.y = ico.current.position.y;
    coreColor.lerp(goal.set(nexus.coreGoal), 0.05);
    coreMat.color.copy(coreColor);
    icoMat.color.copy(coreColor);
    light.current.color.copy(coreColor);
  });

  return (
    <group>
      <pointLight ref={light} color={0x4d8dff} intensity={40} distance={28} decay={2} position={[0, 3, 0]} />
      <mesh material={metal} position-y={-0.25}>
        <cylinderGeometry args={[4.2, 4.7, 0.5, 64]} />
      </mesh>
      <mesh material={metal} position-y={-0.6}>
        <cylinderGeometry args={[5.6, 5.9, 0.2, 64]} />
      </mesh>
      <mesh material={coreMat} rotation-x={Math.PI / 2} position-y={0.01}>
        <torusGeometry args={[4.25, 0.035, 8, 160]} />
      </mesh>
      <group ref={seg} rotation-x={-Math.PI / 2} position-y={-0.48}>
        {Array.from({ length: 12 }, (_, k) => (
          <mesh key={k} material={segMat}>
            <ringGeometry args={[5.0, 5.18, 2, 1, (k * Math.PI) / 6, Math.PI / 9]} />
          </mesh>
        ))}
      </group>
      <group position-y={1.7}>
        {[2.3, 2.6, 2.9].map((rr, k) => (
          <mesh key={k} ref={(m) => { gyro.current[k] = m; }} material={coreMat} rotation={[Math.PI / 2 + k * 0.5, k * 0.7, 0]}>
            <torusGeometry args={[rr, 0.014, 6, 160]} />
          </mesh>
        ))}
      </group>
      <mesh ref={ico} material={icoMat} position-y={4.3}>
        <icosahedronGeometry args={[0.42, 0]} />
      </mesh>
      <mesh ref={coreIn} position-y={4.3}>
        <sphereGeometry args={[0.16, 16, 12]} />
        <meshBasicMaterial color={0xe6edfb} />
      </mesh>

      {CONFIG.avatarUrl ? (
        <AvatarBoundary fallback={<HoloAvatar />}>
          <Suspense fallback={<HoloAvatar />}>
            <GLBAvatar url={CONFIG.avatarUrl} />
          </Suspense>
        </AvatarBoundary>
      ) : (
        <HoloAvatar />
      )}

      <HitTarget id="s-about" position-y={1.5}>
        <cylinderGeometry args={[1.2, 1.2, 3.5, 12]} />
      </HitTarget>
    </group>
  );
}

// Scan ring que recorre el avatar de abajo hacia arriba.
function ScanRing() {
  const scan = useRef(null);
  useFrame(() => {
    const f = (animTime().t * 0.35) % 1;
    scan.current.position.y = 0.2 + f * 2.8;
    scan.current.material.opacity = 0.45 * (1 - f);
  });
  return (
    <mesh ref={scan}>
      <cylinderGeometry args={[0.75, 0.75, 0.02, 40, 1, true]} />
      <meshBasicMaterial color={0x6fe3ff} transparent opacity={0.5} side={THREE.DoubleSide} />
    </mesh>
  );
}

function useBob() {
  const av = useRef(null);
  useFrame(() => { av.current.position.y = Math.sin(animTime().t * 0.9) * 0.04; });
  return av;
}

// Placeholder: cápsula holográfica + pelo burdeos + gafas (reemplazar por avatar.glb).
function HoloAvatar() {
  const av = useBob();
  const holo = useMemo(() => new THREE.MeshBasicMaterial({ color: 0x6fe3ff, wireframe: true, transparent: true, opacity: 0.3 }), []);
  const solid = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x0a1430, metalness: 0.3, roughness: 0.6, transparent: true, opacity: 0.9 }), []);
  const hair = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x7a1f2e, roughness: 0.7 }), []);
  return (
    <group ref={av}>
      <mesh material={solid} position-y={1.2}><capsuleGeometry args={[0.48, 1.4, 6, 18]} /></mesh>
      <mesh material={holo} position-y={1.2}><capsuleGeometry args={[0.52, 1.4, 6, 18]} /></mesh>
      <mesh material={solid} position-y={2.62}><sphereGeometry args={[0.34, 24, 16]} /></mesh>
      <mesh material={holo} position-y={2.62}><sphereGeometry args={[0.37, 16, 12]} /></mesh>
      <mesh material={hair} position-y={2.66} rotation-x={-0.25}>
        <sphereGeometry args={[0.4, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
      </mesh>
      <mesh material={hair} position={[0, 2.15, -0.2]}><capsuleGeometry args={[0.3, 0.7, 4, 12]} /></mesh>
      <group position={[0, 2.66, 0.33]}>
        {[-0.13, 0.13].map((x) => (
          <mesh key={x} position-x={x}>
            <torusGeometry args={[0.09, 0.012, 6, 24]} />
            <meshBasicMaterial color={0x6fe3ff} />
          </mesh>
        ))}
      </group>
      <ScanRing />
    </group>
  );
}

// avatar.glb (anime 3D estilizado) — escala normalizada a ~3 u de alto sobre la plataforma.
// Si el GLB trae animaciones, reproduce en bucle la de idle (cualquiera que no sea la T-Pose).
function GLBAvatar({ url }) {
  const av = useBob();
  const reduced = useNexus((s) => s.reduced);
  const { scene, animations } = useGLTF(url);
  const model = useMemo(() => {
    const m = cloneSkinned(scene); // clone() normal rompe el esqueleto de los SkinnedMesh
    m.traverse((o) => {
      if (o.isSkinnedMesh) o.frustumCulled = false;
      if (o.isMesh) o.material = Array.isArray(o.material) ? o.material.map(opaque) : opaque(o.material);
    });
    const box = new THREE.Box3().setFromObject(m);
    const h = box.max.y - box.min.y || 1;
    const s = 3 / h;
    m.scale.setScalar(s);
    m.position.y = -box.min.y * s;
    return m;
  }, [scene]);
  const { actions, names } = useAnimations(animations, model);

  useEffect(() => {
    const idle = names.find((n) => !/t-?pose/i.test(n)) || names[0];
    const action = idle && actions[idle];
    if (!action) return;
    action.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.4).play();
    return () => { action.fadeOut(0.3); };
  }, [actions, names]);

  // Reduced motion: el avatar queda quieto en su pose de idle.
  useEffect(() => {
    Object.values(actions).forEach((a) => { if (a) a.paused = reduced; });
  }, [actions, reduced]);

  return (
    <group ref={av}>
      <primitive object={model} />
      <ScanRing />
    </group>
  );
}

// Los GLB convertidos desde FBX suelen salir con alphaMode BLEND / opacidad 0 y el avatar
// se ve transparente. Se fuerza opaco; pelo/pestañas usan recorte (alphaTest) en vez de blend.
// Los materiales que ya vienen en MASK (alphaTest > 0: ojos, boca, pestañas) se respetan.
const ALPHA_CARDS = /hair|lash|brow|eye|mouth|pelo|pesta|ceja/i;
function opaque(mat) {
  const c = mat.clone(); // no mutar el material cacheado por useGLTF
  c.alphaTest = c.alphaTest > 0 ? c.alphaTest : c.map && ALPHA_CARDS.test(c.name) ? 0.5 : 0;
  c.transparent = false;
  c.opacity = 1;
  c.depthWrite = true;
  c.needsUpdate = true;
  return c;
}

// Descarga + parseo del GLB en cuanto se importa este módulo (App lo precarga durante el boot).
if (CONFIG.avatarUrl) useGLTF.preload(CONFIG.avatarUrl);

class AvatarBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(e) { console.warn('[nexus] avatar.glb no disponible, usando placeholder: ' + (e?.message || e)); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}
