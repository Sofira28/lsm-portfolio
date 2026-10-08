import { useNexus } from '../store.js';
import { PROJECTS, SKILLS } from '../data/projectsData.js';
import { sfx } from '../hooks/useSound.js';
import { chipBtn, pad2 } from '../utils/styles.js';

// TECHNOLOGY CONSTELLATION — SVG 560×560, 9 hubs en radio 160. Sin porcentajes.
export default function Systems() {
  const cat = useNexus((s) => s.cat);
  const tech = useNexus((s) => s.tech);
  const openProject = useNexus.getState().openProject;
  const set = useNexus.setState;
  const cx = 280, cy = 280;
  const lines = [], dots = [], hubs = [];

  SKILLS.forEach((c, i) => {
    const a = (i / SKILLS.length) * Math.PI * 2 - Math.PI / 2, ca = Math.cos(a), sa = Math.sin(a);
    const hx = cx + ca * 160, hy = cy + sa * 160, on = i === cat;
    lines.push({ k: 'h' + i, x1: cx, y1: cy, x2: hx, y2: hy, style: { stroke: on ? '#6fe3ff' : '#22355e', strokeWidth: on ? 1.4 : 1, transition: 'stroke .3s' } });
    c.techs.forEach((t, j) => {
      const b = a + (j / c.techs.length) * Math.PI * 2, rr = 34 + (j % 3) * 11;
      const x = hx + Math.cos(b) * rr, y = hy + Math.sin(b) * rr, ts = on && tech === t[0];
      if (on) lines.push({ k: 't' + i + '-' + j, x1: hx, y1: hy, x2: x, y2: y, style: { stroke: '#4d8dff', strokeWidth: 0.8, opacity: 0.6 } });
      dots.push({
        k: i + '-' + j, x: +x.toFixed(1), y: +y.toFixed(1), r: ts ? 6 : on ? 4 : 2.4, name: t[0],
        onClick: () => set({ cat: i, tech: t[0] }),
        style: { fill: ts ? '#ffffff' : on ? '#6fe3ff' : '#4a5f8f', cursor: 'pointer', transition: 'all .3s' }
      });
    });
    hubs.push({
      i, name: c.name, x: +hx.toFixed(1), y: +hy.toFixed(1), lx: +(cx + ca * 252).toFixed(1), ly: +(cy + sa * 252 + 4).toFixed(1), r: on ? 10 : 7, on,
      style: { fill: on ? '#0b1f4a' : '#071230', stroke: on ? '#6fe3ff' : '#4d8dff', strokeWidth: on ? 2 : 1, transition: 'all .3s' },
      tStyle: { fill: on ? '#e6edfb' : '#8597ba', font: '600 11px Oxanium, sans-serif', letterSpacing: '2px', textAnchor: ca > 0.3 ? 'start' : ca < -0.3 ? 'end' : 'middle', transition: 'fill .3s' }
    });
  });

  const pickCat = (i) => { set({ cat: i, tech: null }); sfx('click'); };
  const sc = SKILLS[cat] || { name: '', techs: [] };
  const tsel = sc.techs.find((t) => t[0] === tech);
  const usedIn = tsel ? tsel[1].split(' ').map((id) => PROJECTS.find((p) => p.id === id)).filter(Boolean) : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ margin: 0, font: '400 13.5px/1.55 Manrope, sans-serif', color: '#b3c0da', textWrap: 'pretty' }}>
        Sin porcentajes: cada tecnología está conectada a los proyectos donde la usé. Selecciona una categoría y luego una tecnología.
      </p>
      <svg viewBox="0 0 560 560" role="img" aria-label="Constelación de tecnologías" style={{ width: '100%', maxWidth: 520, alignSelf: 'center', height: 'auto', display: 'block' }}>
        {lines.map((l) => <line key={l.k} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} style={l.style} />)}
        {dots.map((d) => <circle key={d.k} cx={d.x} cy={d.y} r={d.r} style={d.style} onClick={d.onClick}><title>{d.name}</title></circle>)}
        <circle cx="280" cy="280" r="26" style={{ fill: '#071230', stroke: '#4d8dff', strokeWidth: 1 }} />
        <text x="280" y="285" style={{ fill: '#e6edfb', font: '700 13px Oxanium, sans-serif', letterSpacing: '3px', textAnchor: 'middle' }}>LSM</text>
        {hubs.map((h) => (
          <g key={h.name} onClick={() => pickCat(h.i)} style={{ cursor: 'pointer' }}>
            <circle cx={h.x} cy={h.y} r={h.r} style={h.style} />
            <text x={h.lx} y={h.ly} style={h.tStyle}>{h.name}</text>
          </g>
        ))}
      </svg>

      <div role="tablist" aria-label="Categorías" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {hubs.map((h) => (
          <button key={h.name} role="tab" aria-selected={h.on} onClick={() => pickCat(h.i)} style={chipBtn(h.on)}>{h.name}</button>
        ))}
      </div>

      <div style={{ borderTop: '1px solid rgba(110,160,255,.16)', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
          <span style={{ font: '600 13px/1 Oxanium, sans-serif', letterSpacing: '.24em' }}>{sc.name}</span>
          <span style={{ font: '600 9px/1 Oxanium, sans-serif', letterSpacing: '.2em', color: '#6f82a8' }}>{pad2(sc.techs.length)} NODES</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {sc.techs.map((t) => (
            <button
              key={t[0]}
              aria-pressed={tech === t[0]}
              onClick={() => { set({ tech: tech === t[0] ? null : t[0] }); sfx('click'); }}
              style={{ ...chipBtn(tech === t[0]), font: '600 11.5px/1 Oxanium, sans-serif', letterSpacing: '.06em' }}
            >
              {t[0]}
            </button>
          ))}
        </div>
        {tsel && (
          <div key={tsel[0]} style={{ padding: 12, border: '1px solid rgba(111,227,255,.35)', background: 'rgba(111,227,255,.05)', display: 'flex', flexDirection: 'column', gap: 10, animation: 'nxIn .35s ease both' }}>
            <span style={{ font: '600 9px/1 Oxanium, sans-serif', letterSpacing: '.24em', color: '#6fe3ff' }}>{tsel[0]} · USED IN</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {usedIn.map((p) => (
                <button key={p.id} className="btn-small" onClick={() => openProject(p.id)}>{p.code} {p.name} →</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
