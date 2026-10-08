import { useNexus } from '../../store.js';

export default function Brand() {
  const mode = useNexus((s) => s.mode);
  return (
    <div style={{ position: 'absolute', top: 20, left: 22, display: 'flex', flexDirection: 'column', gap: 7, pointerEvents: 'auto' }}>
      <button
        onClick={() => useNexus.getState().goHome()}
        aria-label="LSM Nexus — volver a la vista general"
        style={{ background: 'none', border: 0, padding: 0, color: '#e6edfb', font: '600 15px/1 Oxanium, sans-serif', letterSpacing: '.3em', cursor: 'pointer', textAlign: 'left' }}
      >
        LSM <span style={{ color: '#4d8dff' }}>//</span> NEXUS
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, font: '500 10px/1 Oxanium, sans-serif', letterSpacing: '.2em', color: '#9aabc9' }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5ff0b0', boxShadow: '0 0 8px #5ff0b0', animation: 'nxPulse 2.4s ease-in-out infinite' }} />
        <span>SYSTEM: ONLINE</span>
        <span style={{ color: '#33456e' }}>|</span>
        <span>MODE: {mode === 'system' ? 'SYSTEM' : 'EXPLORATION'}</span>
      </div>
    </div>
  );
}
