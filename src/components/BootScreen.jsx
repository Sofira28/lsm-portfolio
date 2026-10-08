import { useNexus } from '../store.js';
import { TIER_LABEL, TIER_NEXT } from '../hooks/usePerfTier.js';

const LINE_COLOR = { ok: '#5ff0b0', dim: '#6f82a8', in: '#a9c4ff' };

export default function BootScreen() {
  const bootLines = useNexus((s) => s.bootLines);
  const bootDone = useNexus((s) => s.bootDone);
  const bootExit = useNexus((s) => s.bootExit);
  const sound = useNexus((s) => s.sound);
  const tier = useNexus((s) => s.tier);
  const { enter, toggleSound, setTier } = useNexus.getState();

  return (
    <div
      role="dialog"
      aria-label="Inicio del sistema"
      style={{
        position: 'absolute', inset: 0, zIndex: 50, display: 'flex', overflowY: 'auto', padding: 24,
        background: 'radial-gradient(ellipse at center, rgba(3,6,16,.55) 0%, rgba(2,4,11,.9) 70%)',
        transition: 'opacity .75s ease, transform .9s cubic-bezier(.6,0,.2,1), filter .75s',
        opacity: bootExit ? 0 : 1, transform: bootExit ? 'scale(1.12)' : 'none', filter: bootExit ? 'blur(12px)' : 'none',
        pointerEvents: bootExit ? 'none' : 'auto'
      }}
    >
      <div style={{ width: 'min(560px,100%)', margin: 'auto', display: 'flex', flexDirection: 'column', gap: 'clamp(16px,4vh,28px)' }}>
        <div aria-live="polite" style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 'min(190px,30vh)', font: '500 13px/1.5 ui-monospace, Menlo, Consolas, monospace' }}>
          {bootLines.map((b, i) => (
            <div key={i} style={{ color: LINE_COLOR[b.t], letterSpacing: '.06em', animation: 'nxFade .3s ease both' }}>{b.s}</div>
          ))}
          {!bootDone && <span style={{ display: 'inline-block', width: 8, height: 15, background: '#6fe3ff', animation: 'nxBlink 1s steps(1) infinite' }} />}
        </div>

        {bootDone && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, animation: 'nxIn .9s cubic-bezier(.2,.8,.2,1) both' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <span style={{ font: '700 clamp(56px,12vw,104px)/0.9 Oxanium, sans-serif', letterSpacing: '.14em', color: '#e6edfb' }}>LSM</span>
              <span style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,#4d8dff,transparent)', transformOrigin: 'left', animation: 'nxLine 1.2s .3s cubic-bezier(.2,.8,.2,1) both' }} />
            </div>
            <div style={{ font: '600 clamp(12px,2.4vw,15px)/1.4 Oxanium, sans-serif', letterSpacing: '.42em', color: '#e6edfb' }}>
              L I N D A &nbsp; S O F I A &nbsp; M O R E N O
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8, font: '600 11px/1 Oxanium, sans-serif', letterSpacing: '.32em' }}>
              <span style={{ color: '#4d8dff' }}>SYSTEMS ENGINEER</span>
              <span style={{ color: '#6f82a8' }}>BUILD SYSTEMS. CREATE WORLDS.</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
              <button
                className="btn-primary"
                onClick={() => enter(false)}
                style={{ minHeight: 52, padding: '0 26px', font: '700 13px/1 Oxanium, sans-serif', letterSpacing: '.3em', boxShadow: '0 0 30px rgba(77,141,255,.35)' }}
              >
                [ ENTER NEXUS ]
              </button>
              <button
                className="btn-outline"
                onClick={() => enter(true)}
                style={{ minHeight: 52, padding: '0 18px', color: '#c7d3ea' }}
              >
                QUICK ACCESS → PROJECTS
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, font: '500 11px/1.5 Manrope, sans-serif', color: '#6f82a8' }}>
              <span>Enter ↵ para iniciar</span>
              <button onClick={toggleSound} style={linkBtn}>{sound ? 'SOUND: ON' : 'SOUND: OFF'}</button>
              <button onClick={() => setTier(TIER_NEXT[tier])} style={linkBtn}>RENDER: {TIER_LABEL[tier]}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const linkBtn = {
  background: 'none', border: 0, padding: 0, color: '#9aabc9', font: 'inherit', cursor: 'pointer',
  textDecoration: 'underline', textUnderlineOffset: 3
};
