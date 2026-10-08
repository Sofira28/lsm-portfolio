// Vuelo de entrada: z=700 → posición orbital en 3.4 s a través del túnel. Guard a 6 s que fuerza la llegada.
import { gsap } from 'gsap';
import { useNexus } from '../store.js';
import { nexus } from '../utils/nexus.js';
import { snapRig } from './flyTo.js';
import { sfx } from '../hooks/useSound.js';

export function startIntro() {
  nexus.introPending = false;
  const I = { u: 0 };
  nexus.intro = I;
  sfx('teleport');
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    tween.kill();
    clearTimeout(guard);
    nexus.intro = null;
    snapRig();
    useNexus.getState().arrive(false);
  };
  const tween = gsap.to(I, { u: 1, duration: 3.4, ease: 'none', onComplete: finish });
  const guard = setTimeout(finish, 6000);
  return finish;
}

export const easeInOutCubic = (u) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);
