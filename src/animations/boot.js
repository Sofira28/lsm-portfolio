// Timeline del boot: líneas de terminal cada 230–370 ms (GSAP).
import { gsap } from 'gsap';
import { useNexus } from '../store.js';
import { sfx } from '../hooks/useSound.js';

const PROFILE = { high: '3D · HIGH', lite: '3D · LITE', '2d': '2D · PERFORMANCE' };

export function bootLines(tier) {
  return [
    ['> BOOTING SYSTEM...', 'in'],
    ['> INITIALIZING NEXUS...', 'in'],
    ['> LOADING CORE...', 'in'],
    ['> LOADING PROJECTS... 06 FOUND', 'in'],
    ['> LOADING SKILLS...', 'in'],
    ['> CONNECTING...', 'in'],
    ['RENDER PROFILE ....... ' + PROFILE[tier], 'dim'],
    ['SYSTEM STATUS ........ ONLINE', 'ok']
  ].map(([s, t]) => ({ s, t }));
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
