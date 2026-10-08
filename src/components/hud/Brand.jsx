import { useNexus } from '../../store.js';
import { useT } from '../../i18n/index.js';

// En móvil la línea de estado se reduce al modo para no chocar con CV / GH / ⋯.
export default function Brand() {
  const mode = useNexus((s) => s.mode);
  const isMobile = useNexus((s) => s.isMobile);
  const t = useT();
  const modeLabel = t('mode.' + mode);
  return (
    <div style={{ position: 'absolute', top: isMobile ? 14 : 20, left: isMobile ? 14 : 22, display: 'flex', flexDirection: 'column', gap: isMobile ? 6 : 7, pointerEvents: 'auto' }}>
      <button
        onClick={() => useNexus.getState().goHome()}
        aria-label={t('brand.aria')}
        style={{ background: 'none', border: 0, padding: 0, color: '#e6edfb', font: (isMobile ? '600 13px' : '600 15px') + '/1 Oxanium, sans-serif', letterSpacing: isMobile ? '.22em' : '.3em', cursor: 'pointer', textAlign: 'left', whiteSpace: 'nowrap' }}
      >
        LSM <span style={{ color: '#4d8dff' }}>//</span> NEXUS
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, font: (isMobile ? '500 9px' : '500 10px') + '/1 Oxanium, sans-serif', letterSpacing: isMobile ? '.16em' : '.2em', color: '#9aabc9', whiteSpace: 'nowrap' }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5ff0b0', boxShadow: '0 0 8px #5ff0b0', animation: 'nxPulse 2.4s ease-in-out infinite' }} />
        {isMobile ? (
          <span>{modeLabel}</span>
        ) : (
          <>
            <span>{t('brand.online')}</span>
            <span style={{ color: '#33456e' }}>|</span>
            <span>{t('set.mode', { mode: modeLabel })}</span>
          </>
        )}
      </div>
    </div>
  );
}
