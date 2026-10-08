import { useNexus } from '../../store.js';

const modeBtn = (on) => ({
  minHeight: 34, padding: '0 12px', background: on ? 'rgba(77,141,255,.22)' : 'none', border: 0,
  color: on ? '#e6edfb' : '#7d8fb4', font: '600 10px/1 Oxanium, sans-serif', letterSpacing: '.2em', cursor: 'pointer'
});

export default function ModeSwitch() {
  const mode = useNexus((s) => s.mode);
  const is2D = useNexus((s) => s.tier === '2d');
  const setMode = useNexus.getState().setMode;
  const hint = is2D
    ? 'PERFORMANCE MODE · usa el menú o toca un nodo del mapa'
    : mode === 'system'
      ? 'SYSTEM MODE · navegación por menú · teclas 1–6 · M para cambiar'
      : 'WASD mover · Q/E altura · arrastra para mirar · rueda zoom · clic en un mundo · 1–6 secciones';
  return (
    <div style={{ position: 'absolute', left: 22, bottom: 20, display: 'flex', flexDirection: 'column', gap: 10, pointerEvents: 'auto' }}>
      <div role="radiogroup" aria-label="Modo de navegación" style={{ display: 'flex', border: '1px solid rgba(110,160,255,.22)', alignSelf: 'flex-start' }}>
        <button role="radio" aria-checked={mode === 'exploration'} onClick={() => setMode('exploration')} style={modeBtn(mode === 'exploration')}>EXPLORATION</button>
        <button role="radio" aria-checked={mode === 'system'} onClick={() => setMode('system')} style={modeBtn(mode === 'system')}>SYSTEM</button>
      </div>
      <div style={{ font: '500 10px/1.5 Oxanium, sans-serif', letterSpacing: '.14em', color: '#6f82a8', maxWidth: 'min(340px, calc(100vw - 470px))' }}>{hint}</div>
    </div>
  );
}
