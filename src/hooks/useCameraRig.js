import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useNexus } from '../store.js';
import { nexus } from '../utils/nexus.js';
import { rigPos } from '../animations/flyTo.js';
import { easeInOutCubic } from '../animations/enter.js';
import { panelWidth } from '../utils/menu.js';

const zoom = (d) => { const r = nexus.rig; r.gDist = Math.max(5, Math.min(75, r.gDist * (1 + d))); };

// Rig orbital: arrastrar = yaw/pitch, rueda/pinch = zoom, WASD/QE/joystick = mover objetivo.
// Damping exponencial 1 - exp(-dt*3). setViewOffset desplaza el foco fuera del panel.
export function useCameraRig() {
  const gl = useThree((s) => s.gl);
  const off = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = gl.domElement;
    el.style.touchAction = 'none';
    el.style.cursor = 'grab';
    nexus.canvasEl = el;
    const ptrs = new Map();
    let pinch = null;
    const down = (e) => {
      try { el.setPointerCapture(e.pointerId); } catch { /* noop */ }
      ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
      pinch = null;
      if (useNexus.getState().settings) useNexus.setState({ settings: false });
    };
    const move = (e) => {
      const p = ptrs.get(e.pointerId);
      if (!p) return;
      const dx = e.clientX - p.x, dy = e.clientY - p.y;
      p.x = e.clientX; p.y = e.clientY;
      if (ptrs.size === 2) {
        const [a, b] = [...ptrs.values()];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (pinch) zoom((pinch - d) * 0.01);
        pinch = d;
        return;
      }
      if (useNexus.getState().phase !== 'world' || nexus.intro) return;
      const r = nexus.rig;
      r.gYaw -= dx * 0.005;
      r.gPitch = Math.max(-0.05, Math.min(1.25, r.gPitch + dy * 0.004));
    };
    const up = (e) => { ptrs.delete(e.pointerId); if (ptrs.size < 2) pinch = null; };
    const wheel = (e) => { e.preventDefault(); zoom(e.deltaY * 0.0012); };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('wheel', wheel, { passive: false });
    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
      el.removeEventListener('wheel', wheel);
      nexus.canvasEl = null;
      nexus.hoverId = null;
    };
  }, [gl]);

  useFrame((state, delta) => {
    const s = useNexus.getState();
    const cam = state.camera, r = nexus.rig;
    const W = state.size.width, H = state.size.height;
    const dt = Math.min(0.05, delta);
    nexus.time += dt;
    nexus.anim = s.reduced ? { t: 1, dt: 0 } : { t: nexus.time, dt };

    if (nexus.intro) {
      const u = Math.min(1, nexus.intro.u), e = easeInOutCubic(u), end = rigPos();
      cam.position.set(end.x * e, 5 + (end.y - 5) * e, 700 + (end.z - 700) * e);
      cam.fov = 55 + Math.sin(u * Math.PI) * 28;
      cam.lookAt(0, 2, 0);
    } else if (s.phase === 'world' && (s.arrived || !nexus.introPending)) {
      if (cam.fov !== 55) cam.fov = 55;
      const typing = document.activeElement && document.activeElement.tagName === 'INPUT';
      if (s.mode === 'exploration' && !typing) {
        const k = nexus.keys;
        let fx = nexus.joy.x, fz = -nexus.joy.y;
        if (k.KeyW || k.ArrowUp) fz += 1;
        if (k.KeyS || k.ArrowDown) fz -= 1;
        if (k.KeyA || k.ArrowLeft) fx -= 1;
        if (k.KeyD || k.ArrowRight) fx += 1;
        if (fx || fz) {
          const sp = (k.ShiftLeft || k.ShiftRight ? 30 : 15) * dt, sy = Math.sin(r.yaw), cy = Math.cos(r.yaw);
          r.gTarget.x += (-sy * fz + cy * fx) * sp;
          r.gTarget.z += (-cy * fz - sy * fx) * sp;
          const l = Math.hypot(r.gTarget.x, r.gTarget.z);
          if (l > 55) { r.gTarget.x *= 55 / l; r.gTarget.z *= 55 / l; }
        }
        if (k.KeyE) r.gTarget.y = Math.min(20, r.gTarget.y + 8 * dt);
        if (k.KeyQ) r.gTarget.y = Math.max(0, r.gTarget.y - 8 * dt);
      }
      if (s.mode === 'system' && !s.reduced) r.gYaw += dt * 0.05;
      const a = s.reduced ? 1 : 1 - Math.exp(-dt * 3);
      r.yaw += (r.gYaw - r.yaw) * a;
      r.pitch += (r.gPitch - r.pitch) * a;
      r.dist += (r.gDist - r.dist) * a;
      r.target.lerp(r.gTarget, a);
      const p = rigPos();
      cam.position.set(p.x, p.y, p.z);
      cam.lookAt(r.target.x, r.target.y, r.target.z);
    } else {
      cam.position.set(0, 5, 700 - Math.sin(nexus.time * 0.2) * 6);
      cam.lookAt(0, 2, 0);
    }

    const gx = s.panel && !s.isMobile ? (panelWidth(s.panel) + 20) / 2 : 0;
    const gy = s.panel && s.isMobile ? H * 0.33 : 0;
    const oa = s.reduced ? 1 : 1 - Math.exp(-dt * 4);
    off.current.x += (gx - off.current.x) * oa;
    off.current.y += (gy - off.current.y) * oa;
    cam.setViewOffset(W, H, off.current.x, off.current.y, W, H);
  }, -1);
}
