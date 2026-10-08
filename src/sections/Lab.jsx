import { useEffect, useRef, useState } from 'react';
import { useNexus } from '../store.js';
import { useContent } from '../data/index.js';
import { useT } from '../i18n/index.js';
import { runCmd, techCount } from '../utils/terminal.js';
import { pad2 } from '../utils/styles.js';

const TCOL = { in: '#e6edfb', out: '#a9b8d6', dim: '#6f82a8', ok: '#5ff0b0', err: '#ff8fb5', sys: '#6fe3ff' };

export default function Lab() {
  const term = useNexus((s) => s.term);
  const isMobile = useNexus((s) => s.isMobile);
  const { PROJECTS } = useContent();
  const t = useT();
  const [input, setInput] = useState('');
  const boxRef = useRef(null);
  const inputRef = useRef(null);
  const quick = t('term.quick').split(' ');

  useEffect(() => { if (boxRef.current) boxRef.current.scrollTop = 1e6; }, [term]);
  useEffect(() => {
    if (isMobile) return;
    const id = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 400);
    return () => clearTimeout(id);
  }, [isMobile]);

  const run = (c) => { runCmd(c); setInput(''); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="grid-cells" style={{ gridTemplateColumns: 'repeat(3,minmax(0,1fr))' }}>
        {[[pad2(PROJECTS.length), t('lab.projects')], [String(techCount()), t('lab.tech')], ['04', t('lab.langs')]].map(([v, k]) => (
          <div key={k} style={{ padding: '10px 12px' }}>
            <div style={{ font: '600 22px/1 Oxanium, sans-serif' }}>{v}</div>
            <div style={{ font: '600 8px/1.4 Oxanium, sans-serif', letterSpacing: '.22em', color: '#8597ba', marginTop: 4 }}>{k}</div>
          </div>
        ))}
      </div>

      <div onClick={() => inputRef.current?.focus({ preventScroll: true })} style={{ background: '#01030a', border: '1px solid rgba(110,160,255,.25)', display: 'flex', flexDirection: 'column', height: 'min(46vh,380px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderBottom: '1px solid rgba(110,160,255,.14)', font: '600 9px/1 Oxanium, sans-serif', letterSpacing: '.22em', color: '#6f82a8' }}>
          <span>{t('lab.user')}</span><span>TTY-01</span>
        </div>
        <div ref={boxRef} role="log" aria-live="polite" style={{ flex: 1, overflowY: 'auto', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 3 }}>
          {term.map((ln, i) => (
            <div key={i} style={{ font: '500 12.5px/1.5 ui-monospace, Menlo, Consolas, monospace', color: TCOL[ln.t] || '#a9b8d6', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{ln.s}</div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderTop: '1px solid rgba(110,160,255,.14)' }}>
          <span style={{ font: '600 12px/1 ui-monospace, Menlo, Consolas, monospace', color: '#6fe3ff' }}>&gt;</span>
          <input
            ref={inputRef}
            className="term-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); run(input); } }}
            aria-label={t('lab.inputAria')}
            spellCheck="false"
            autoComplete="off"
            autoCapitalize="off"
            placeholder={quick[0]}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {quick.map((c) => <button key={c} className="btn-cmd" onClick={() => run(c)}>{c}</button>)}
      </div>
      <div style={{ font: '500 11px/1.5 Manrope, sans-serif', color: '#6f82a8' }}>
        {t('lab.hint')} <span style={{ fontFamily: 'ui-monospace, Menlo, monospace', color: '#9aabc9' }}>ls</span>.
      </div>
    </div>
  );
}
