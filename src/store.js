import { create } from 'zustand';
import { gsap } from 'gsap';
import { CONFIG } from './config.js';
import { PROJECTS } from './data/projectsData.js';
import { nexus } from './utils/nexus.js';
import { sfx, setSoundEnabled } from './hooks/useSound.js';
import { flyTo, focusSector, overview, snapRig } from './animations/flyTo.js';

let toastTimer = null;
let probePromise = Promise.resolve('2d');
export const setProbePromise = (p) => { probePromise = p; };

// isMobile: HUD táctil (dock, bottom sheet, joystick); incluye teléfonos en horizontal.
// compact: no cabe la barra de herramientas completa → menú ⋯ (tablets, portátiles pequeños).
function viewport() {
  if (typeof window === 'undefined') return { isMobile: false, compact: false };
  const w = window.innerWidth, h = window.innerHeight;
  return { isMobile: w < 760 || h < 500, compact: w < 1100 || h < 500 };
}

export const useNexus = create((set, get) => ({
  phase: 'boot', // boot | world
  bootLines: [],
  bootDone: false,
  bootExit: false,
  arrived: false,
  panel: null,
  pid: null,
  mode: 'exploration',
  tier: 'high',
  sound: false,
  reduced: false,
  ...viewport(),
  intro: true, // tarjeta de presentación visible (se puede cerrar)
  filter: 'ALL',
  cat: 1,
  tech: null,
  archId: 'overview',
  archSel: null,
  term: [
    { t: 'sys', s: 'LSM // LAB TERMINAL v1.0' },
    { t: 'out', s: 'Escribe "help" para ver los comandos.' }
  ],
  secret: false,
  secretMsg: '',
  toast: null,
  settings: false,

  // ---------- enter ----------
  enter(quick = false, instant = false) {
    const s = get();
    if (s.phase !== 'boot' || s.bootExit) return;
    sfx('teleport');
    set({ bootExit: true });
    gsap.delayedCall(instant ? 0 : 0.75, async () => {
      await probePromise;
      set({ phase: 'world' });
      const st = get();
      const fly = !quick && !instant && !st.reduced && st.tier !== '2d';
      if (fly) nexus.introPending = true;
      else { snapRig(); get().arrive(quick); }
    });
  },
  arrive(quick) {
    nexus.introPending = false;
    set({ arrived: true });
    if (quick) { set({ mode: 'system' }); get().openPanel('projects'); }
  },

  // ---------- panels ----------
  openPanel(id) {
    set({ panel: id, settings: false, archSel: null });
    sfx('open');
    focusSector(id, get().isMobile);
    nexus.selected = id === 'about' ? 's-about' : null;
    nexus.coreGoal = id === 'contact' ? 0xff6fb8 : id === 'lab' ? 0xa594ff : 0x4d8dff;
  },
  openProject(pid) {
    set({ panel: 'project', pid, settings: false });
    sfx('activate');
    flyTo(pid, pid === 'simav' ? 14 : 11, 0.32);
    nexus.selected = pid;
    const p = PROJECTS.find((x) => x.id === pid);
    if (p) nexus.coreGoal = p.color;
  },
  openArch(archId) {
    set({ panel: 'arch', archId, archSel: null });
    overview(get().isMobile);
    sfx('open');
  },
  closePanel() {
    set({ panel: null });
    nexus.selected = null;
    nexus.coreGoal = 0x4d8dff;
    sfx('close');
  },
  goHome() {
    get().closePanel();
    overview(get().isMobile);
  },
  activate(id) {
    const map = { 's-about': 'about', 's-systems': 'systems', 's-lab': 'lab', 's-contact': 'contact' };
    if (id.startsWith('s-')) get().openPanel(map[id]);
    else get().openProject(id);
  },

  // ---------- modos / ajustes ----------
  setMode(m) {
    set({ mode: m, settings: false });
    sfx('click');
    if (m === 'system' && !get().panel) get().openPanel('projects');
    if (m === 'system') overview(get().isMobile);
  },
  toggleMode() { get().setMode(get().mode === 'system' ? 'exploration' : 'system'); },
  setTier(t) {
    set({ tier: t });
    const s = get();
    if (t === '2d' && s.phase === 'world' && !s.arrived) { snapRig(); get().arrive(false); }
    if (t !== '2d' && s.phase === 'world' && s.arrived) snapRig();
  },
  toggleSound() {
    const on = !get().sound;
    set({ sound: on });
    setSoundEnabled(on);
  },
  toggleMotion() { set({ reduced: !get().reduced }); },
  toggleSettings() { set({ settings: !get().settings }); },
  setViewport() {
    const v = viewport(), s = get();
    if (v.isMobile !== s.isMobile || v.compact !== s.compact) set(v);
  },
  setIntro(intro) { set({ intro }); sfx(intro ? 'open' : 'close'); },

  openResume() {
    if (CONFIG.resumeUrl) window.open(CONFIG.resumeUrl, '_blank', 'noopener');
    else get().showToast('CV PENDIENTE · ARCHIVO AÚN NO VINCULADO');
    sfx('click');
  },
  showToast(msg) {
    clearTimeout(toastTimer);
    set({ toast: msg });
    toastTimer = setTimeout(() => set({ toast: null }), 3400);
  },

  // ---------- secret room ----------
  openSecret() { set({ secret: true, secretMsg: '' }); sfx('close'); },
  closeSecret() { set({ secret: false }); },
  setSecretMsg(secretMsg) { set({ secretMsg }); }
}));
