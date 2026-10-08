import { useNexus } from '../../store.js';
import { useT } from '../../i18n/index.js';

const modeBtn = (on) => ({
  minHeight: 34, padding: '0 12px', background: on ? 'rgba(77,141,255,.22)' : 'none', border: 0,
  color: on ? '#e6edfb' : '#7d8fb4', font: '600 10px/1 Oxanium, sans-serif', letterSpacing: '.2em', cursor: 'pointer'
});

export default function ModeSwitch() {
  const mode = useNexus((s) => s.mode);
  const is2D = useNexus((s) => s.tier === '2d');
  const setMode = useNexus.getState().setMode;
  const t = useT();
  const hint = t(is2D ? 'hint.2d' : 'hint.' + mode);
  return (
    <div style={{ position: 'absolute', left: 22, bottom: 20, display: 'flex', flexDirection: 'column', gap: 10, pointerEvents: 'auto' }}>
      <div role="radiogroup" aria-label={t('mode.aria')} style={{ display: 'flex', border: '1px solid rgba(110,160,255,.22)', alignSelf: 'flex-start' }}>
        <button role="radio" aria-checked={mode === 'exploration'} onClick={() => setMode('exploration')} style={modeBtn(mode === 'exploration')}>{t('mode.exploration')}</button>
        <button role="radio" aria-checked={mode === 'system'} onClick={() => setMode('system')} style={modeBtn(mode === 'system')}>{t('mode.system')}</button>
      </div>
      <div style={{ font: '500 10px/1.5 Oxanium, sans-serif', letterSpacing: '.14em', color: '#6f82a8', maxWidth: 'min(340px, calc(100vw - 470px))' }}>{hint}</div>
    </div>
  );
}
