import { Component, Suspense, lazy, useEffect } from 'react';
import { useNexus, setProbePromise } from './store.js';
import { CONFIG } from './config.js';
import { detectTier, probeTier } from './hooks/usePerfTier.js';
import { syncDocument } from './i18n/index.js';
import { useKeyboard } from './hooks/useKeyboard.js';
import { runBoot } from './animations/boot.js';
import { snapRig } from './animations/flyTo.js';
import BootScreen from './components/BootScreen.jsx';
import OrbitalMap2D from './components/OrbitalMap2D.jsx';
import Brand from './components/hud/Brand.jsx';
import Toolbar, { SettingsPopover } from './components/hud/Toolbar.jsx';
import MenuRail from './components/hud/MenuRail.jsx';
import MobileDock from './components/hud/MobileDock.jsx';
import ModeSwitch from './components/hud/ModeSwitch.jsx';
import IntroCard from './components/hud/IntroCard.jsx';
import Joystick from './components/hud/Joystick.jsx';
import Panel from './components/hud/Panel.jsx';
import Toast from './components/hud/Toast.jsx';
import WorldLabelLayer from './components/hud/WorldLabel.jsx';
import SecretRoom from './sections/SecretRoom.jsx';

// El chunk del Canvas (three + R3F + avatar.glb) se precarga durante el boot si el perfil es 3D,
// pero el Canvas sólo se monta después de ENTER NEXUS.
const loadUniverse = () => import('./scenes/Universe.jsx');
const Universe = lazy(loadUniverse);

class GLBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(e) {
    console.warn('[nexus] 3D init failed: ' + (e?.message || e));
    const S = useNexus.getState();
    S.setTier('2d');
    S.showToast('toast.no3d');
    if (!S.arrived) { snapRig(); S.arrive(false); }
  }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function App() {
  const phase = useNexus((s) => s.phase);
  const arrived = useNexus((s) => s.arrived);
  const tier = useNexus((s) => s.tier);
  const reduced = useNexus((s) => s.reduced);
  const isMobile = useNexus((s) => s.isMobile);
  const mode = useNexus((s) => s.mode);
  const panel = useNexus((s) => s.panel);
  const secret = useNexus((s) => s.secret);
  const intro = useNexus((s) => s.intro);
  useKeyboard();

  useEffect(() => {
    syncDocument();
    const reducedPref = !!CONFIG.forceReducedMotion || matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = detectTier();
    useNexus.setState({ reduced: reducedPref, tier: t });
    const probe = probeTier(t).then((r) => {
      if (r !== useNexus.getState().tier && CONFIG.perfMode === 'auto') useNexus.setState({ tier: r });
      if (useNexus.getState().tier !== '2d') loadUniverse().catch(() => { /* reintenta al montar */ });
      return r;
    });
    setProbePromise(probe);
    let stop = () => {};
    if (CONFIG.skipBoot) {
      useNexus.setState({ bootDone: true });
      setTimeout(() => useNexus.getState().enter(false, true), 50);
    } else stop = runBoot(t, reducedPref);
    const onResize = () => useNexus.getState().setViewport();
    addEventListener('resize', onResize);
    return () => { stop(); removeEventListener('resize', onResize); };
  }, []);

  const is2D = tier === '2d';
  const show3D = phase === 'world' && !is2D;

  return (
    <div className={'nx-root' + (reduced ? ' nx-reduced' : '')}>
      {show3D && (
        <GLBoundary>
          <Suspense fallback={null}>
            <Universe />
          </Suspense>
        </GLBoundary>
      )}
      {is2D && arrived && <OrbitalMap2D />}
      <WorldLabelLayer />

      <div aria-hidden="true" className="nx-scanlines" />
      <div aria-hidden="true" className="nx-vignette" />

      {arrived && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', animation: 'nxFade .8s ease both' }}>
          <Brand />
          <Toolbar />
          <SettingsPopover />
          {!isMobile && <MenuRail />}
          {!isMobile && <ModeSwitch />}
          {!panel && !secret && <IntroCard />}
          {isMobile && mode === 'exploration' && !panel && !intro && !is2D && <Joystick />}
          {isMobile && <MobileDock />}
          <Panel />
        </div>
      )}

      {phase === 'boot' && <BootScreen />}
      <SecretRoom />
      <Toast />
    </div>
  );
}
