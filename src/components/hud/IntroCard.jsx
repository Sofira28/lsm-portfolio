import { useNexus } from '../../store.js';
import { PROFILE, PROJECTS } from '../../data/projectsData.js';
import { pad2 } from '../../utils/styles.js';

const glass = {
  position: 'absolute', display: 'flex', flexDirection: 'column', background: 'rgba(5,9,22,.78)',
  border: '1px solid rgba(110,160,255,.2)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', pointerEvents: 'auto'
};

// Tarjeta de presentación. ✕ la oculta y deja un botón INFO para volver a abrirla.
export default function IntroCard() {
  const isMobile = useNexus((s) => s.isMobile);
  const intro = useNexus((s) => s.intro);
  const { openPanel, setIntro } = useNexus.getState();

  if (!intro) {
    return (
      <button
        className="btn-outline"
        onClick={() => setIntro(true)}
        aria-label="Mostrar presentación"
        style={{ position: 'absolute', right: isMobile ? 12 : 28, bottom: isMobile ? 69 : 28, background: 'rgba(5,9,22,.78)', pointerEvents: 'auto', animation: 'nxFade .4s ease both' }}
      >
        <span style={{ color: '#6fe3ff' }}>ⓘ</span> INFO
      </button>
    );
  }

  const style = isMobile
    ? { ...glass, left: 12, right: 12, top: 72, maxWidth: 440, maxHeight: 'calc(100% - 72px - 69px)', overflowY: 'auto', padding: 16, gap: 10, animation: 'nxIn .9s .2s cubic-bezier(.2,.8,.2,1) both' }
    : { ...glass, right: 28, bottom: 28, width: 380, maxHeight: 'calc(100% - 100px)', overflowY: 'auto', padding: 22, gap: 12, background: 'rgba(5,9,22,.7)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', animation: 'nxIn .9s .3s cubic-bezier(.2,.8,.2,1) both' };

  return (
    <section aria-label="Introducción" style={style}>
      <button
        onClick={() => setIntro(false)}
        aria-label="Ocultar presentación"
        style={{ position: 'absolute', top: 4, right: 4, width: 44, height: 44, background: 'none', border: 0, color: '#9aabc9', font: '600 14px/1 Oxanium, sans-serif', cursor: 'pointer' }}
      >
        ✕
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, font: '600 9px/1 Oxanium, sans-serif', letterSpacing: '.28em', color: '#6fe3ff', paddingRight: 40 }}>
        <span style={{ width: 18, height: 1, background: '#6fe3ff' }} />NEXUS INITIALIZED
      </div>
      <h1 style={{ margin: 0, font: (isMobile ? '600 16px' : '600 19px') + '/1.35 Oxanium, sans-serif', letterSpacing: isMobile ? '.24em' : '.32em', color: '#e6edfb' }}>{PROFILE.name}</h1>
      <div style={{ font: '600 11px/1 Oxanium, sans-serif', letterSpacing: '.3em', color: '#4d8dff' }}>{PROFILE.role}</div>
      <p style={{ margin: 0, font: (isMobile ? '500 14px/1.5' : '500 15px/1.55') + ' Manrope, sans-serif', color: '#c7d3ea', textWrap: 'pretty' }}>
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
