import { useNexus } from '../store.js';
import { PROJECTS } from '../data/projectsData.js';

// PERFORMANCE MODE: mapa orbital 2D (sin loop rAF), los 6 mundos como botones.
export default function OrbitalMap2D() {
  const pid = useNexus((s) => s.pid);
  const panel = useNexus((s) => s.panel);
  const { openProject, openPanel } = useNexus.getState();
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 45%, #0a1734 0%, #040817 55%, #02040b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: 'min(78vmin,640px)', aspectRatio: '1' }}>
        <div style={{ position: 'absolute', inset: '12%', border: '1px solid rgba(110,160,255,.22)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', inset: '30%', border: '1px dashed rgba(110,160,255,.16)', borderRadius: '50%' }} />
        <button
          onClick={() => openPanel('about')}
          aria-label="LSM Core — About"
          style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 120, height: 120, borderRadius: '50%', background: '#071230', border: '1px solid #4d8dff', color: '#e6edfb', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, boxShadow: '0 0 40px rgba(77,141,255,.25)' }}
        >
          <span style={{ font: '700 22px/1 Oxanium, sans-serif', letterSpacing: '.2em' }}>LSM</span>
          <span style={{ font: '600 8px/1 Oxanium, sans-serif', letterSpacing: '.24em', color: '#6fe3ff' }}>CORE</span>
        </button>
        {PROJECTS.map((p, i) => {
          const a = (i / PROJECTS.length) * Math.PI * 2 - Math.PI / 2;
          const on = pid === p.id && panel === 'project';
          return (
            <button
              key={p.id}
              onClick={() => openProject(p.id)}
              style={{ position: 'absolute', left: 50 + Math.cos(a) * 38 + '%', top: 50 + Math.sin(a) * 38 + '%', transform: 'translate(-50%,-50%)', minWidth: 120, minHeight: 52, padding: '8px 12px', background: 'rgba(5,10,26,.85)', border: '1px solid ' + (on ? p.color : p.color + '66'), color: '#e6edfb', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, cursor: 'pointer', boxShadow: '0 0 24px ' + p.color + '22' }}
            >
              <span style={{ font: '600 9px/1 Oxanium, sans-serif', letterSpacing: '.22em', color: '#9aabc9' }}>{p.code}</span>
              <span style={{ font: '600 12px/1.2 Oxanium, sans-serif', letterSpacing: '.14em' }}>{p.name}</span>
            </button>
          );
        })}
      </div>
      <div style={{ position: 'absolute', left: '50%', bottom: 90, transform: 'translateX(-50%)', font: '600 10px/1 Oxanium, sans-serif', letterSpacing: '.24em', color: '#8597ba', whiteSpace: 'nowrap' }}>
        PERFORMANCE MODE · 2D ORBITAL MAP
      </div>
    </div>
  );
}
