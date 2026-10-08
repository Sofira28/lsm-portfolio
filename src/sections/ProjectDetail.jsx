import { Fragment, useEffect, useState } from 'react';
import { useNexus } from '../store.js';
import { PROFILE, PROJECTS } from '../data/projectsData.js';
import { TYPE_COLOR, badge, pad2 } from '../utils/styles.js';

export default function ProjectDetail() {
  const pid = useNexus((s) => s.pid);
  const reduced = useNexus((s) => s.reduced);
  const { openProject, openPanel, openArch } = useNexus.getState();
  const [flowStep, setFlowStep] = useState(0);

  // La señal recorre el SYSTEM FLOW cada 900 ms.
  useEffect(() => {
    setFlowStep(0);
    const id = setInterval(() => setFlowStep((n) => n + 1), 900);
    return () => clearInterval(id);
  }, [pid]);

  const cur = PROJECTS.find((x) => x.id === pid);
  if (!cur) return null;
  const i = PROJECTS.indexOf(cur), n = cur.flow.length;
  const a = reduced ? n : flowStep % (n + 2);
  const pv = PROJECTS[(i + PROJECTS.length - 1) % PROJECTS.length];
  const nx = PROJECTS[(i + 1) % PROJECTS.length];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
          <span style={badge(TYPE_COLOR[cur.type])}>{cur.type} PROJECT</span>
          <span style={{ font: '600 9px/1 Oxanium, sans-serif', letterSpacing: '.2em', color: '#8597ba' }}>{cur.kind}</span>
        </div>
        <h2 style={{ margin: 0, font: '600 34px/1.05 Oxanium, sans-serif', letterSpacing: '.12em', color: '#e6edfb', textShadow: '0 0 24px ' + cur.color + '55' }}>{cur.name}</h2>
        <div style={{ height: 2, width: 120, background: 'linear-gradient(90deg,' + cur.color + ', transparent)' }} />
        <p style={{ margin: 0, font: '500 16px/1.5 Manrope, sans-serif', color: '#dbe4f5', textWrap: 'pretty' }}>{cur.tagline}</p>
        <div style={{ font: '600 9px/1 Oxanium, sans-serif', letterSpacing: '.22em', color: '#6f82a8' }}>WORLD · {cur.world}</div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {cur.arch && <button className="btn-primary" onClick={() => openArch(cur.arch)} style={{ fontSize: 10 }}>[ VIEW ARCHITECTURE ]</button>}
        <a className="btn-outline" href={PROFILE.github} target="_blank" rel="noopener" style={{ fontSize: 10, borderColor: 'rgba(110,160,255,.3)' }}>
          [ GITHUB ]{' '}
          <span style={{ font: '600 8px/1 Oxanium, sans-serif', letterSpacing: '.18em', padding: '3px 6px', background: 'rgba(255,255,255,.06)', color: cur.repo.state === 'PRIVATE' ? '#ffb38a' : '#9aabc9' }}>{cur.repo.state}</span>
        </a>
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 12px', border: '1px dashed rgba(110,160,255,.25)', font: '400 12px/1.5 Manrope, sans-serif', color: '#9aabc9' }}>
        <span style={{ font: '600 9px/1.7 Oxanium, sans-serif', letterSpacing: '.2em', color: '#6f82a8', flex: 'none' }}>REPO</span>
        <span>{cur.repo.note}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 16 }}>
        <div>
          <div className="kicker" style={{ color: '#ff7fc0', marginBottom: 8 }}>PROBLEM</div>
          <p style={bodyText}>{cur.problem}</p>
        </div>
        <div>
          <div className="kicker" style={{ color: '#5ff0b0', marginBottom: 8 }}>SOLUTION</div>
          <p style={bodyText}>{cur.solution}</p>
        </div>
      </div>

      <div>
        <div className="kicker mb">SYSTEM FLOW</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}>
          {cur.flow.map((f, k) => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                font: '600 10px/1 Oxanium, sans-serif', letterSpacing: '.16em', padding: '9px 10px',
                border: '1px solid ' + (k === a ? cur.color : k < a ? cur.color + '66' : 'rgba(110,160,255,.2)'),
                background: k === a ? cur.color + '26' : 'transparent', color: k <= a ? '#e6edfb' : '#7d8fb4',
                boxShadow: k === a ? '0 0 18px ' + cur.color + '44' : 'none', transition: 'all .4s'
              }}>
                <span style={{ opacity: 0.55, marginRight: 6 }}>{pad2(k + 1)}</span>{f}
              </div>
              {k < n - 1 && <span style={{ font: '600 12px/1 Oxanium, sans-serif', color: k < a ? cur.color : '#33456e', transition: 'color .4s' }}>→</span>}
            </div>
          ))}
        </div>
      </div>

      {cur.sections.map((sec) => (
        <div key={sec.title}>
          <div className="kicker mb">{sec.title}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {sec.items.map((it) => <span key={it} className="chip-item">{it}</span>)}
          </div>
        </div>
      ))}

      <div>
        <div className="kicker mb">STACK</div>
        <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(110,160,255,.14)' }}>
          {cur.stack.map((g) => (
            <div key={g.g} style={{ display: 'grid', gridTemplateColumns: '110px minmax(0,1fr)', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(110,160,255,.14)' }}>
              <span style={{ font: '600 9px/1.6 Oxanium, sans-serif', letterSpacing: '.18em', color: '#8597ba' }}>{g.g}</span>
              <span style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px' }}>
                {g.items.map((t) => <Fragment key={t}><span style={{ font: '600 12px/1.5 Oxanium, sans-serif', letterSpacing: '.04em', color: '#e6edfb' }}>{t}</span></Fragment>)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-cells" style={{ gridTemplateColumns: 'repeat(2,minmax(0,1fr))' }}>
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={cellKey}>MY ROLE</span>
          <span style={{ font: '500 13px/1.45 Manrope, sans-serif' }}>{cur.role}</span>
        </div>
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={cellKey}>METHOD</span>
          <span style={{ font: '500 13px/1.45 Manrope, sans-serif' }}>{cur.method || '—'}</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <button className="btn-nav" onClick={() => openProject(pv.id)}>← {pv.name}</button>
        <button className="btn-nav bare" onClick={() => openPanel('projects')}>DATABASE</button>
        <button className="btn-nav" onClick={() => openProject(nx.id)}>{nx.name} →</button>
      </div>
    </div>
  );
}

const bodyText = { margin: 0, font: '400 14px/1.6 Manrope, sans-serif', color: '#c7d3ea', textWrap: 'pretty' };
const cellKey = { font: '600 9px/1 Oxanium, sans-serif', letterSpacing: '.24em', color: '#8597ba' };
