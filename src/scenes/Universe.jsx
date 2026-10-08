import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useNexus } from '../store.js';
import { PROJECT_META as PROJECTS } from '../data/index.js';
import { nexus } from '../utils/nexus.js';
import { isAutoPerf } from '../hooks/usePerfTier.js';
import { useCameraRig } from '../hooks/useCameraRig.js';
import { startIntro } from '../animations/enter.js';
import Avatar from '../avatar/Avatar.jsx';
import Tunnel from './Tunnel.jsx';
import World from '../worlds/World.jsx';
import GoldWorld from '../worlds/GoldWorld.jsx';
import EvermoonWorld from '../worlds/EvermoonWorld.jsx';
import PizzaWorld from '../worlds/PizzaWorld.jsx';
import IbagameWorld from '../worlds/IbagameWorld.jsx';
import SimavWorld from '../worlds/SimavWorld.jsx';
import ZytimeWorld from '../worlds/ZytimeWorld.jsx';
import Constellation3D from '../worlds/sectors/Constellation3D.jsx';
import Lab from '../worlds/sectors/Lab.jsx';
import ContactAntenna from '../worlds/sectors/ContactAntenna.jsx';

const WORLD_COMPONENTS = { gold: GoldWorld, evermoon: EvermoonWorld, pizza: PizzaWorld, ibagame: IbagameWorld, simav: SimavWorld, zytime: ZytimeWorld };

// Canvas R3F: luces, estrellas, grid polar, fog, plataforma, mundos y sectores.
export default function Universe() {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        flat
        dpr={1}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        camera={{ fov: 55, near: 0.1, far: 3000, position: [0, 5, 700] }}
        style={{ display: 'block', width: '100%', height: '100%', touchAction: 'none', outline: 'none' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

function Scene() {
  useCameraRig();
  return (
    <>
      <color attach="background" args={['#02040b']} />
      <fogExp2 attach="fog" args={['#02040b', 0.0105]} />
      <ambientLight color={0x3a4a7a} intensity={1.1} />
      <directionalLight color={0xa9c8ff} intensity={1.6} position={[12, 22, 14]} />
      <directionalLight color={0x9b7cff} intensity={0.7} position={[-20, 6, -18]} />
      <Backdrop />
      <Avatar />
      {PROJECTS.map((p, i) => {
        const W = WORLD_COMPONENTS[p.id];
        return (
          <World key={p.id} project={p} index={i}>
            {W && <W color={p.color} />}
          </World>
        );
      })}
      <Constellation3D />
      <Lab />
      <ContactAntenna />
      <Tunnel />
      <LabelProjector />
      <Warmup />
      <RenderLoop />
    </>
  );
}

// Antes del primer frame: compila shaders en paralelo (compileAsync) y sube las texturas a la GPU,
// para que el vuelo de entrada no se congele. Después arranca el túnel si hay vuelo pendiente.
function Warmup() {
  const { gl, scene, camera } = useThree();
  useEffect(() => {
    let alive = true;
    nexus.warm = false;
    const go = () => {
      if (!alive || nexus.warm) return;
      nexus.warm = true;
      if (nexus.introPending) startIntro();
    };
    const guard = setTimeout(go, 3000);
    (async () => {
      try {
        scene.traverse((o) => {
          if (!o.material) return;
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
            for (const k in m) if (m[k]?.isTexture) gl.initTexture(m[k]);
          });
        });
        await gl.compileAsync(scene, camera);
      } catch (e) { console.warn('[nexus] warmup: ' + (e?.message || e)); }
      go();
    })();
    return () => { alive = false; clearTimeout(guard); };
  }, [gl, scene, camera]);
  return null;
}

// Nube de puntos en cáscara esférica (estrellas y polvo).
function makePoints(n, rMin, rMax) {
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const u = Math.random() * 2 - 1, th = Math.random() * Math.PI * 2, rr = rMin + Math.random() * (rMax - rMin), s = Math.sqrt(1 - u * u);
    a[i * 3] = rr * s * Math.cos(th);
    a[i * 3 + 1] = rr * u * 0.7;
    a[i * 3 + 2] = rr * s * Math.sin(th);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(a, 3));
  return g;
}

function Backdrop() {
  const hi = useNexus((s) => s.tier === 'high');
  const dust = useRef(null);
  const planet = useRef(null);
  const stars = useMemo(() => makePoints(hi ? 3800 : 600, 450, 1300), [hi]);
  const stars2 = useMemo(() => makePoints(500, 450, 1300), []);
  const dustGeo = useMemo(() => makePoints(700, 6, 70), []);
  const grid = useMemo(() => {
    const g = new THREE.PolarGridHelper(46, 24, 10, 96, 0x1d3a7a, 0x0f2148);
    g.position.y = -1.3;
    g.material.transparent = true;
    g.material.opacity = 0.55;
    return g;
  }, []);

  useFrame(() => {
    const { t } = nexus.anim;
    if (dust.current) dust.current.rotation.y = t * 0.01;
    planet.current.rotation.y = t * 0.004;
  });

  return (
    <>
      <points geometry={stars}>
        <pointsMaterial size={2.6} color={0xd6e2ff} transparent opacity={0.9} depthWrite={false} fog={false} />
      </points>
      {hi && (
        <points geometry={stars2}>
          <pointsMaterial size={4} color={0x9fb8ff} transparent opacity={0.7} depthWrite={false} fog={false} />
        </points>
      )}
      {hi && (
        <points ref={dust} geometry={dustGeo}>
          <pointsMaterial size={0.12} color={0x6fe3ff} transparent opacity={0.5} depthWrite={false} />
        </points>
      )}
      <mesh ref={planet} position={[-260, 30, -420]}>
        <sphereGeometry args={[70, 64, 48]} />
        <meshStandardMaterial color={0x0d1d4a} roughness={0.9} metalness={0} fog={false} />
      </mesh>
      <mesh position={[-260, 30, -420]} rotation={[1.3, 0.3, 0]}>
        <torusGeometry args={[110, 0.6, 4, 160]} />
        <meshBasicMaterial color={0x4d8dff} transparent opacity={0.35} fog={false} />
      </mesh>
      <mesh position={[300, -40, -320]}>
        <sphereGeometry args={[16, 48, 32]} />
        <meshStandardMaterial color={0x2b1f55} roughness={0.9} fog={false} />
      </mesh>
      <primitive object={grid} />
    </>
  );
}

// Proyecta las anclas 3D a la capa HTML de labels; se ocultan si caen sobre zonas del HUD.
function LabelProjector() {
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera, size }) => {
    const s = useNexus.getState();
    if (!s.arrived) return;
    const W = size.width, H = size.height;
    nexus.labelEls.forEach((el, id) => {
      const an = nexus.anchors[id];
      const hide = () => { el.style.transform = 'translate3d(-9999px,0,0)'; };
      if (!an) return hide();
      v.copy(an);
      v.y += nexus.labelOff[id] || 4;
      const d = v.distanceTo(camera.position);
      v.project(camera);
      if (v.z > 1 || Math.abs(v.x) > 1.2 || Math.abs(v.y) > 1.2) return hide();
      const x = (v.x * 0.5 + 0.5) * W, y = (-v.y * 0.5 + 0.5) * H, ly = y - 20;
      const inHud = s.isMobile
        ? ly < 72 || y > H - 64 || (s.intro && !s.panel && ly < 340)
        : ly < 72 || (x < 250 && Math.abs(y - H / 2) < 190) || (x < 400 && y > H - 100) || (s.intro && !s.panel && x > W - 440 && y > H - 340);
      if (inHud) return hide();
      el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) translate(-50%,-100%)`;
      const sel = id === nexus.selected || id === nexus.hoverId;
      el.style.opacity = sel ? 1 : Math.max(0.3, Math.min(0.95, 1 - (d - 30) / 70));
      el.style.borderColor = sel ? nexus.colors[id] || '#6fe3ff' : 'rgba(110,160,255,.28)';
      el.style.zIndex = sel ? 2 : 1;
    });
  });
  return null;
}

// Render manual (prioridad 1) + watchdog de rendimiento: HIGH → LITE → 2D con toast.
function RenderLoop() {
  const setDpr = useThree((s) => s.setDpr);
  const tier = useNexus((s) => s.tier);
  const w = useRef({ last: 0, longN: 0, lowN: 0, slowN: 0, good: 0, fc: 0, ft: 0 });

  useEffect(() => { setDpr(1); w.current.good = 0; }, [tier, setDpr]);

  const downgrade = () => {
    const S = useNexus.getState();
    if (S.tier === 'high') { S.setTier('lite'); S.showToast('toast.lite'); }
    else { S.setTier('2d'); S.showToast('toast.2d'); }
  };

  useFrame(({ gl, scene, camera }, delta) => {
    const W = w.current;
    if (!nexus.warm) { W.last = 0; return; }
    const s = useNexus.getState(), now = performance.now();
    const raw = W.last ? now - W.last : 0;
    W.last = now;
    if (raw > 200 && !document.hidden) W.longN++; else W.longN = 0;
    if (W.longN >= 2 && isAutoPerf()) { W.longN = 0; downgrade(); return; }

    W.fc++; W.ft += Math.min(0.05, delta);
    if (W.ft >= 0.5) {
      const fps = Math.round(W.fc / W.ft);
      W.fc = 0; W.ft = 0;
      if (nexus.fpsEl) nexus.fpsEl.textContent = fps;
      if (isAutoPerf() && s.arrived) {
        W.lowN = fps < (s.tier === 'high' ? 28 : 16) ? W.lowN + 1 : 0;
        if (W.lowN >= 8) { W.lowN = 0; downgrade(); return; }
      }
    }

    const r0 = performance.now();
    gl.render(scene, camera);
    const rt = performance.now() - r0;
    if (rt > 120) { W.slowN++; W.good = 0; } else { W.slowN = 0; W.good++; }
    if (W.slowN >= 3 && isAutoPerf()) { W.slowN = 0; downgrade(); return; }
    if (s.tier === 'high' && W.good === 90 && (window.devicePixelRatio || 1) > 1) setDpr(Math.min(window.devicePixelRatio, 1.75));
  }, 1);

  return null;
}
