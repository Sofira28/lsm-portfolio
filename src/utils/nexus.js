// Estado mutable de alta frecuencia compartido entre HUD y Canvas (no provoca renders de React).
// Sin dependencia de three: este módulo se carga antes que el Canvas (code-split).
class Vector3 {
  constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
  set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
  copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
  lerp(v, a) { this.x += (v.x - this.x) * a; this.y += (v.y - this.y) * a; this.z += (v.z - this.z) * a; return this; }
}
import { PROJECT_META as PROJECTS } from '../data/index.js';

export const WORLD_RADIUS = 19;
export const WORLD_Y = [1.2, 3.4, 0.4, 2.4, 2.6, 1.0];

export function worldTransform(i) {
  const ang = (i / 6) * Math.PI * 2 + Math.PI / 6;
  return { ang, pos: [Math.sin(ang) * WORLD_RADIUS, WORLD_Y[i], Math.cos(ang) * WORLD_RADIUS] };
}
export const worldScale = (id) => (id === 'simav' ? 1.35 : 1);

export const SECTORS = {
  's-systems': { pos: [-32, 11, -24], labelOff: 4.2, rad: 6 },
  's-lab': { pos: [31, 3, -25], labelOff: 4, rad: 4 },
  's-contact': { pos: [0, 2, -40], labelOff: 6.8, rad: 5 }
};

const anchors = { 's-about': new Vector3(0, 1.6, 0) };
const labelOff = { 's-about': 3.5 };
const colors = {};
PROJECTS.forEach((p, i) => {
  const { pos } = worldTransform(i), s = worldScale(p.id);
  anchors[p.id] = new Vector3(pos[0], pos[1] + 1.4 * s, pos[2]);
  labelOff[p.id] = 3.6 * s;
  colors[p.id] = p.color;
});
Object.entries(SECTORS).forEach(([id, s]) => {
  anchors[id] = new Vector3(s.pos[0], s.pos[1] + 1, s.pos[2]);
  labelOff[id] = s.labelOff;
});

export const nexus = {
  rig: {
    yaw: 0, pitch: 0.3, dist: 32, target: new Vector3(0, 2, 0),
    gYaw: 0, gPitch: 0.3, gDist: 32, gTarget: new Vector3(0, 2, 0)
  },
  keys: {},
  joy: { x: 0, y: 0 },
  hoverId: null,
  selected: null,
  anchors,
  labelOff,
  colors,
  labelEls: new Map(), // id -> HTMLElement (WorldLabel)
  coreGoal: 0x4d8dff, // color objetivo del Core (hex)
  warm: false, // shaders compilados + texturas en GPU; hasta entonces no se renderiza
  introPending: false, // la cámara debe volar por el túnel al montar el Canvas
  intro: null, // { u } mientras dura el vuelo de entrada
  anim: { t: 0, dt: 0 }, // tiempo de animación (congelado con reduced motion)
  time: 0,
  fpsEl: null
};
