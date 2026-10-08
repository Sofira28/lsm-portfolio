import { useNexus } from '../store.js';
import { PROJECT_META as PROJECTS } from '../data/index.js';
import { useT } from '../i18n/index.js';

// PERFORMANCE MODE: mapa orbital 2D (sin loop rAF), los 6 mundos como botones.
export default function OrbitalMap2D() {
  const pid = useNexus((s) => s.pid);
  const panel = useNexus((s) => s.panel);
  const { openProject, openPanel } = useNexus.getState();
  const t = useT();
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 45%, #0a1734 0%, #040817 55%, #02040b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: 'min(86vmin,640px)', aspectRatio: '1' }}>
        <div style={{ position: 'absolute', inset: '12%', border: '1px solid rgba(110,160,255,.22)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', inset: '30%', border: '1px dashed rgba(110,160,255,.16)', borderRadius: '50%' }} />
        <button
          onClick={() => openPanel('about')}
          aria-label={t('map.coreAria')}
          style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 'clamp(72px,18vmin,120px)', height: 'clamp(72px,18vmin,120px)', borderRadius: '50%', background: '#071230', border: '1px solid #4d8dff', color: '#e6edfb', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, boxShadow: '0 0 40px rgba(77,141,255,.25)' }}
        >
          <span style={{ font: '700 clamp(16px,3.4vmin,22px)/1 Oxanium, sans-serif', letterSpacing: '.2em' }}>LSM</span>
          <span style={{ font: '600 8px/1 Oxanium, sans-serif', letterSpacing: '.24em', color: '#6fe3ff' }}>{t('map.core')}</span>
        </button>
        {PROJECTS.map((p, i) => {
          const a = (i / PROJECTS.length) * Math.PI * 2 - Math.PI / 2;
          const on = pid === p.id && panel === 'project';
          return (
            <button
              key={p.id}
              onClick={() => openProject(p.id)}
              style={{ position: 'absolute', left: 50 + Math.cos(a) * 38 + '%', top: 50 + Math.sin(a) * 38 + '%', transform: 'translate(-50%,-50%)', minWidth: 'clamp(84px,22vmin,120px)', minHeight: 44, padding: '6px 8px', background: 'rgba(5,10,26,.85)', border: '1px solid ' + (on ? p.color : p.color + '66'), color: '#e6edfb', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, cursor: 'pointer', boxShadow: '0 0 24px ' + p.color + '22' }}
            >
              <span style={{ font: '600 9px/1 Oxanium, sans-serif', letterSpacing: '.22em', color: '#9aabc9' }}>{p.code}</span>
              <span style={{ font: '600 clamp(10px,2.2vmin,12px)/1.2 Oxanium, sans-serif', letterSpacing: '.12em', textAlign: 'center' }}>{p.name}</span>
            </button>
          );
        })}
      </div>
      <div style={{ position: 'absolute', left: '50%', bottom: 80, transform: 'translateX(-50%)', font: '600 10px/1.5 Oxanium, sans-serif', letterSpacing: '.24em', color: '#8597ba', width: 'max-content', maxWidth: '90vw', textAlign: 'center' }}>
        {t('map.footer')}
      </div>
    </div>
  );
}
