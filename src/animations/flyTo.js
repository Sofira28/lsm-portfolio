// Objetivos de cámara: sólo fijan metas; el rig (useCameraRig) amortigua hacia ellas.
import { nexus } from '../utils/nexus.js';
import { sfx } from '../hooks/useSound.js';

export function flyTo(id, dist, pitch) {
  const a = nexus.anchors[id];
  if (!a) return;
  const r = nexus.rig;
  r.gTarget.copy(a);
  let yaw = Math.atan2(a.x, a.z);
  while (yaw - r.gYaw > Math.PI) yaw -= Math.PI * 2;
  while (yaw - r.gYaw < -Math.PI) yaw += Math.PI * 2;
  r.gYaw = yaw; r.gDist = dist; r.gPitch = pitch;
  sfx('teleport');
}

export function overview(isMobile) {
  const r = nexus.rig;
  r.gTarget.set(0, 2, 0);
  r.gDist = isMobile ? 58 : 44;
  r.gPitch = 0.55;
}

export function focusSector(id, isMobile) {
  const r = nexus.rig;
  if (id === 'about') { r.gTarget.set(0, 2, 0); r.gDist = 8.5; r.gPitch = 0.14; }
  else if (id === 'projects' || id === 'arch') overview(isMobile);
  else if (id === 'systems') flyTo('s-systems', 15, 0.2);
  else if (id === 'lab') flyTo('s-lab', 13, 0.25);
  else if (id === 'contact') flyTo('s-contact', 16, 0.2);
}

export function snapRig() {
  const r = nexus.rig;
  r.yaw = r.gYaw; r.pitch = r.gPitch; r.dist = r.gDist; r.target.copy(r.gTarget);
}

export function rigPos(r = nexus.rig) {
  const cp = Math.cos(r.pitch);
  return {
    x: r.target.x + r.dist * cp * Math.sin(r.yaw),
    y: r.target.y + r.dist * Math.sin(r.pitch),
    z: r.target.z + r.dist * cp * Math.cos(r.yaw)
  };
}
