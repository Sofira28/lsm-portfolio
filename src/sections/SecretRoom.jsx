import { useRef } from 'react';
import { useNexus } from '../store.js';
import { sfx } from '../hooks/useSound.js';

const DOOR_MSG = 'La puerta no abre… todavía. Esta habitación es un guiño a un prototipo de horror 3D que construí en Unity.';
const NOTE_MSG = 'NOTA — UNITY // 3D HORROR. Un experimento personal: habitación oscura, linterna, puerta, nota. Lo hice para explorar ambientación e interacción en tiempo real. [ Detalles técnicos y capturas por agregar ]';

export default function SecretRoom() {
  const open = useNexus((s) => s.secret);
  const msg = useNexus((s) => s.secretMsg);
  const { closeSecret, setSecretMsg } = useNexus.getState();
  const flashRef = useRef(null);
  if (!open) return null;

  const onMove = (e) => {
    const el = flashRef.current;
    if (!el) return;
    el.style.setProperty('--fx', e.clientX + 'px');
    el.style.setProperty('--fy', e.clientY + 'px');
  };

  return (
    <div role="dialog" aria-label="Área secreta" onPointerMove={onMove} style={{ position: 'absolute', inset: 0, zIndex: 60, background: '#050404', overflow: 'hidden', animation: 'nxFade 1.2s ease both', cursor: 'crosshair' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '32%', background: 'linear-gradient(180deg,#0d0b0a,#141110)', borderTop: '1px solid #1f1a17' }} />
      <button
        onClick={() => { setSecretMsg(DOOR_MSG); sfx('close'); }}
        aria-label="Puerta"
        style={{ position: 'absolute', left: '50%', bottom: '32%', transform: 'translateX(-50%)', width: 'min(200px,36vw)', height: 'min(380px,52vh)', background: 'linear-gradient(90deg,#1a1411,#241b16)', border: '10px solid #0e0b09', cursor: 'pointer', padding: 0 }}
      >
        <span style={{ position: 'absolute', right: 16, top: '52%', width: 10, height: 10, borderRadius: '50%', background: '#5a4b3a' }} />
        <span style={{ position: 'absolute', left: 0, right: 0, bottom: -10, height: 3, background: '#c9a56a', opacity: 0.25 }} />
      </button>
      <button
        onClick={() => setSecretMsg(NOTE_MSG)}
        aria-label="Nota en el suelo"
        style={{ position: 'absolute', left: 'calc(50% + min(170px,30vw))', bottom: '18%', width: 86, height: 62, background: '#d8cfbd', border: 0, transform: 'rotate(-8deg)', cursor: 'pointer', padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}
      >
        <span style={{ height: 2, width: '80%', background: '#7d7466' }} />
        <span style={{ height: 2, width: '60%', background: '#7d7466' }} />
        <span style={{ height: 2, width: '70%', background: '#7d7466' }} />
      </button>
      <div ref={flashRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle 210px at var(--fx,50%) var(--fy,60%), rgba(0,0,0,0) 0%, rgba(0,0,0,.6) 55%, rgba(1,1,2,.97) 100%)' }} />
      <div style={{ position: 'absolute', top: 20, left: 22, right: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span style={{ font: '600 10px/1 Oxanium, sans-serif', letterSpacing: '.3em', color: '#7d6e5c' }}>.SECRET_ROOM // UNITY</span>
        <button onClick={closeSecret} style={{ minHeight: 44, padding: '0 14px', background: 'none', border: '1px solid #3a302a', color: '#c9b9a3', font: '600 10px/1 Oxanium, sans-serif', letterSpacing: '.2em', cursor: 'pointer' }}>EXIT ✕</button>
      </div>
      {msg && (
        <div key={msg} style={{ position: 'absolute', left: '50%', bottom: '6%', transform: 'translateX(-50%)', width: 'min(520px,88vw)', padding: '16px 18px', background: 'rgba(20,16,13,.92)', border: '1px solid #3a302a', color: '#d8cfbd', font: '400 14px/1.6 Manrope, sans-serif', animation: 'nxIn .5s ease both', textWrap: 'pretty' }}>
          {msg}
        </div>
      )}
    </div>
  );
}
