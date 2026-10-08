import { useNexus } from '../store.js';
import { useContent } from '../data/index.js';
import { useT } from '../i18n/index.js';

const logBtn = (c) => ({
  display: 'flex', justifyContent: 'space-between', gap: 12, textAlign: 'left', background: 'none',
  border: '1px solid ' + c, padding: '10px 12px', color: '#e6edfb', cursor: 'pointer', font: 'inherit'
});

export default function About() {
  const openProject = useNexus.getState().openProject;
  const { PROFILE, ABOUT, PROJECTS } = useContent();
  const t = useT();
  const projectName = (id) => PROJECTS.find((p) => p.id === id)?.name || id;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '112px minmax(0,1fr)', gap: 16, alignItems: 'end' }}>
        <img
          src="/about.jpeg"
          alt={t('about.photoAlt')}
          style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', border: '1px solid rgba(110,160,255,.3)', display: 'block' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h2 style={{ margin: 0, font: '600 clamp(13px,4.2vw,17px)/1.5 Oxanium, sans-serif', letterSpacing: 'clamp(.16em,1vw,.34em)' }}>L I N D A<br />S O F I A<br />M O R E N O</h2>
          <div style={{ font: '600 10px/1 Oxanium, sans-serif', letterSpacing: '.3em', color: '#4d8dff' }}>{PROFILE.role}</div>
        </div>
      </div>

      <p style={{ margin: 0, font: '500 22px/1.35 Oxanium, sans-serif', letterSpacing: '.02em', color: '#e6edfb', textWrap: 'balance' }}>“{PROFILE.statement}”</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, font: '400 14.5px/1.65 Manrope, sans-serif', color: '#c2cee6' }}>
        {ABOUT.paragraphs.map((p) => <p key={p} style={{ margin: 0, textWrap: 'pretty' }}>{p}</p>)}
      </div>

      <div>
        <div className="kicker mb">{t('about.areas')}</div>
        <div className="grid-cells" style={{ gridTemplateColumns: 'repeat(2,minmax(0,1fr))' }}>
          {PROFILE.areas.map((a) => (
            <div key={a.name} style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ font: '600 10px/1.2 Oxanium, sans-serif', letterSpacing: '.2em' }}>{a.name}</span>
              <span style={{ font: '400 12px/1.45 Manrope, sans-serif', color: '#9aabc9' }}>{a.note}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="kicker mb">{t('about.principles')}</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {ABOUT.principles.map(([k, v], i) => (
            <div key={k} style={{ display: 'grid', gridTemplateColumns: '120px minmax(0,1fr)', gap: 12, padding: '10px 0', borderTop: '1px solid rgba(110,160,255,.14)', borderBottom: i === ABOUT.principles.length - 1 ? '1px solid rgba(110,160,255,.14)' : 0 }}>
              <span style={{ font: '600 10px/1.5 Oxanium, sans-serif', letterSpacing: '.18em' }}>{k}</span>
              <span style={{ font: '400 13px/1.5 Manrope, sans-serif', color: '#b3c0da' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="kicker mb">{t('about.log')}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, font: '400 13px/1.5 Manrope, sans-serif', color: '#b3c0da' }}>
          {ABOUT.log.map((e) => (
            <button key={e.id} onClick={() => openProject(e.id)} style={logBtn(e.color + '4d')}>
              <span><b style={{ fontFamily: 'Oxanium', letterSpacing: '.14em', fontSize: 11 }}>{projectName(e.id)}</b> — {e.text}</span>
              <span style={{ font: '600 9px/1.6 Oxanium, sans-serif', letterSpacing: '.2em', color: e.color }}>{e.tag}</span>
            </button>
          ))}
          {ABOUT.pending && (
            <div style={{ padding: '10px 12px', border: '1px dashed rgba(110,160,255,.3)', font: '500 11px/1.5 ui-monospace, Menlo, monospace', color: '#8597ba' }}>
              {ABOUT.pending}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
