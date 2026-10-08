import { useNexus } from '../../store.js';
import { PROFILE, PROJECTS } from '../../data/projectsData.js';
import { pad2 } from '../../utils/styles.js';

export default function IntroCard() {
  const isMobile = useNexus((s) => s.isMobile);
  const { openPanel } = useNexus.getState();
  const style = isMobile
    ? { position: 'absolute', left: 12, right: 12, top: 76, padding: 16, display: 'flex', flexDirection: 'column', gap: 10, background: 'rgba(5,9,22,.78)', border: '1px solid rgba(110,160,255,.2)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', pointerEvents: 'auto', animation: 'nxIn .9s .2s cubic-bezier(.2,.8,.2,1) both' }
    : { position: 'absolute', right: 28, bottom: 28, width: 380, padding: 22, display: 'flex', flexDirection: 'column', gap: 12, background: 'rgba(5,9,22,.7)', border: '1px solid rgba(110,160,255,.2)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', pointerEvents: 'auto', animation: 'nxIn .9s .3s cubic-bezier(.2,.8,.2,1) both' };
  return (
    <section aria-label="Introducción" style={style}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, font: '600 9px/1 Oxanium, sans-serif', letterSpacing: '.28em', color: '#6fe3ff' }}>
        <span style={{ width: 18, height: 1, background: '#6fe3ff' }} />NEXUS INITIALIZED
      </div>
      <h1 style={{ margin: 0, font: '600 19px/1.35 Oxanium, sans-serif', letterSpacing: '.32em', color: '#e6edfb' }}>{PROFILE.name}</h1>
      <div style={{ font: '600 11px/1 Oxanium, sans-serif', letterSpacing: '.3em', color: '#4d8dff' }}>{PROFILE.role}</div>
      <p style={{ margin: 0, font: '500 15px/1.55 Manrope, sans-serif', color: '#c7d3ea', textWrap: 'pretty' }}>
        Construyo sistemas, experiencias y productos digitales — web, backend, mobile, IA y tiempo real.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {PROFILE.areas.map((a) => <span key={a.name} className="tag">{a.name}</span>)}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
        <button className="btn-primary" onClick={() => openPanel('projects')}>[ ACCESS PROJECTS · {pad2(PROJECTS.length)} ]</button>
        <button className="btn-outline" onClick={() => openPanel('about')}>ABOUT</button>
      </div>
    </section>
  );
}
