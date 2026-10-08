// Selección de perfil de render: heurística de hardware + probe GPU mínimo (sin escena 3D durante el boot).
import { CONFIG } from '../config.js';

export const TIER_LABEL = { high: '3D HIGH', lite: '3D LITE', '2d': '2D' };
export const TIER_NEXT = { high: 'lite', lite: '2d', '2d': 'high' };
export const isAutoPerf = () => (CONFIG.perfMode || 'auto') === 'auto';

export function detectTier() {
  const pm = CONFIG.perfMode || 'auto';
  if (pm !== 'auto') return pm;
  let gl = null;
  try {
    const c = document.createElement('canvas');
    gl = c.getContext('webgl2') || c.getContext('webgl');
  } catch { /* sin webgl */ }
  if (!gl) return '2d';
  try {
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const rn = String(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
    if (/swiftshader|llvmpipe|softpipe|software|basic render|mesa offscreen/i.test(rn)) return '2d';
  } catch { /* noop */ }
  try { gl.getExtension('WEBGL_lose_context')?.loseContext(); } catch { /* noop */ }
  const cores = navigator.hardwareConcurrency || 4, mem = navigator.deviceMemory || 4;
  if (cores <= 2 || mem <= 1) return '2d';
  if (matchMedia('(pointer: coarse)').matches || cores <= 4 || mem <= 2) return 'lite';
  return 'high';
}

// Renderer 64×64, 1 esfera, 1 warmup + 3 renders con readPixels.
export async function probeTier(tier) {
  if (tier === '2d') return '2d';
  try {
    const T = await import('three');
    const r = new T.WebGLRenderer({ antialias: false });
    r.setSize(64, 64, false);
    const sc = new T.Scene(), cam = new T.PerspectiveCamera(50, 1, 0.1, 10);
    cam.position.z = 3;
    sc.add(new T.AmbientLight(0xffffff, 1));
    sc.add(new T.Mesh(new T.SphereGeometry(1, 24, 16), new T.MeshStandardMaterial({ color: 0x4d8dff })));
    const gl = r.getContext(), px = new Uint8Array(4), w0 = performance.now();
    r.render(sc, cam); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
    const warm = performance.now() - w0;
    const b0 = performance.now();
    for (let k = 0; k < 3; k++) { r.render(sc, cam); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px); }
    const avg = (performance.now() - b0) / 3;
    r.dispose();
    try { r.forceContextLoss(); } catch { /* noop */ }
    let t = tier;
    if (isAutoPerf()) {
      if (avg > 30 || warm > 1200) t = '2d';
      else if (avg > 12 || warm > 400) t = 'lite';
    }
    return t;
  } catch (e) {
    console.warn('[nexus] probe failed: ' + (e?.message || e));
    return '2d';
  }
}
