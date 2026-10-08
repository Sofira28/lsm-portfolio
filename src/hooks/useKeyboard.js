import { useEffect } from 'react';
import { useNexus } from '../store.js';
import { nexus } from '../utils/nexus.js';

const SECTIONS = ['about', 'projects', 'systems', 'arch', 'lab', 'contact'];

// Esc cierra · Enter inicia en el boot · 1–6 secciones · M modo · WASD/QE/Shift al rig.
export function useKeyboard() {
  useEffect(() => {
    const down = (e) => {
      const s = useNexus.getState();
      const tag = e.target?.tagName || '';
      const typing = tag === 'INPUT' || tag === 'TEXTAREA';
      if (e.key === 'Escape') {
        if (s.secret) s.closeSecret();
        else if (s.panel) s.closePanel();
        return;
      }
      if (typing) return;
      if (s.phase === 'boot') {
        if (e.key === 'Enter' && s.bootDone) { e.preventDefault(); s.enter(false); }
        return;
      }
      nexus.keys[e.code] = true;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= 6) s.openPanel(SECTIONS[n - 1]);
      if (e.key === 'm' || e.key === 'M') s.toggleMode();
    };
    const up = (e) => { nexus.keys[e.code] = false; };
    const blur = () => { nexus.keys = {}; };
    addEventListener('keydown', down);
    addEventListener('keyup', up);
    addEventListener('blur', blur);
    return () => {
      removeEventListener('keydown', down);
      removeEventListener('keyup', up);
      removeEventListener('blur', blur);
    };
  }, []);
}
