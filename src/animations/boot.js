// Timeline del boot: líneas de terminal cada 230–370 ms (GSAP).
// Cada línea guarda una clave de i18n (y el perfil gráfico), así se traduce aunque cambie el idioma.
import { gsap } from 'gsap';
import { useNexus } from '../store.js';
import { sfx } from '../hooks/useSound.js';

export function bootLines(tier) {
  return [
    { k: 'boot.1', t: 'in' },
    { k: 'boot.2', t: 'in' },
    { k: 'boot.3', t: 'in' },
    { k: 'boot.4', t: 'in' },
    { k: 'boot.5', t: 'in' },
    { k: 'boot.6', t: 'in' },
    { k: 'boot.profile', tier, t: 'dim' },
    { k: 'boot.status', t: 'ok' }
  ];
}

export function runBoot(tier, reduced) {
  const L = bootLines(tier);
  const set = useNexus.setState;
  if (reduced) { set({ bootLines: L, bootDone: true }); return () => {}; }
  const tl = gsap.timeline();
  let at = 0.6;
  L.forEach((ln, i) => {
    tl.call(() => { set((s) => ({ bootLines: [...s.bootLines, ln] })); sfx('tick'); }, null, at);
    if (i < L.length - 1) at += i === L.length - 2 ? 0.48 : 0.23 + Math.random() * 0.14;
  });
  tl.call(() => set({ bootDone: true }), null, at + 0.52);
  return () => tl.kill();
}
