import { useNexus } from '../store.js';
import { useContent } from '../data/index.js';
import { useT } from '../i18n/index.js';
import { sfx } from '../hooks/useSound.js';
import { chipBtn, pad2 } from '../utils/styles.js';

const item = (extra) => ({ font: '500 12px/1.35 Manrope, sans-serif', ...extra });
const caption = { font: '600 9px/1 Oxanium, sans-serif', letterSpacing: '.24em', color: '#8597ba' };
const connector = { height: 14, width: 1, background: '#4d8dff', alignSelf: 'center' };

export default function Architecture() {
  const archId = useNexus((s) => s.archId);
  const archSel = useNexus((s) => s.archSel);
  const set = useNexus.setState;
  const { ARCH } = useContent();
  const t = useT();
  const arch = ARCH.find((a) => a.id === archId) || ARCH[0];
  const select = (k) => set({ archSel: k });

  const selBox = (k, extra) => ({
    background: archSel === k ? 'rgba(77,141,255,.16)' : 'rgba(77,141,255,.04)',
    border: '1px solid ' + (archSel === k ? '#6fe3ff' : 'rgba(110,160,255,.25)'),
    color: '#e6edfb', cursor: 'pointer', textAlign: 'left', transition: 'all .25s',
    boxShadow: archSel === k ? '0 0 22px rgba(111,227,255,.18)' : 'none', ...extra
  });
  const hpart = (k, extra) => ({ onClick: () => select(k), style: selBox(k, { padding: 12, display: 'flex', flexDirection: 'column', gap: 6, ...extra }) });

  let note = arch.summary || '';
  if (archSel) {
    if (archSel[0] === 'L' && arch.layers) note = arch.layers[+archSel.slice(1)]?.note || note;
    else if (archSel[0] === 'M' && arch.modules) note = arch.modules[+archSel.slice(1)]?.note || note;
    else if (arch.notes) note = arch.notes[archSel] || note;
  } else note = note + t('arch.clickHint');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div role="tablist" aria-label={t('arch.tabs')} style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {ARCH.map((a) => (
          <button key={a.id} role="tab" aria-selected={a.id === arch.id} onClick={() => { set({ archId: a.id, archSel: null }); sfx('click'); }} style={chipBtn(a.id === arch.id)}>
            {a.tab}
          </button>
        ))}
      </div>
      <div>
        <div style={{ font: '600 18px/1.3 Oxanium, sans-serif', letterSpacing: '.14em' }}>{arch.title}</div>
        <p style={{ margin: '6px 0 0', font: '400 13.5px/1.5 Manrope, sans-serif', color: '#9aabc9' }}>{arch.summary}</p>
      </div>

      {arch.kind === 'stack' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          {arch.layers.map((L, k) => (
            <div key={L.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
              <button
                onClick={() => select('L' + k)}
                style={selBox('L' + k, { display: 'grid', gridTemplateColumns: 'minmax(0,auto) minmax(0,1fr)', gap: 14, alignItems: 'center', padding: '14px 16px', marginLeft: (k % 2) * 10, marginRight: ((k + 1) % 2) * 10 })}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 10, font: '600 11px/1 Oxanium, sans-serif', letterSpacing: '.22em' }}>
                  <span style={{ opacity: 0.5 }}>{pad2(k + 1)}</span>{L.name}
                </span>
                <span style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 10px', justifyContent: 'flex-end' }}>
                  {L.items.map((i) => <span key={i} style={{ font: '500 12px/1.4 Manrope, sans-serif', color: '#b3c0da' }}>{i}</span>)}
                </span>
              </button>
              {k < arch.layers.length - 1 && (
                <div style={{ width: 1, height: 16, alignSelf: 'center', background: archSel === 'L' + k || archSel === 'L' + (k + 1) ? '#6fe3ff' : '#2a3c66' }} />
              )}
            </div>
          ))}
        </div>
      )}

      {arch.kind === 'hex' && (() => {
        const hx = {
          clients: hpart('clients', { alignItems: 'center' }),
          inbound: hpart('inbound'),
          core: hpart('core', { alignItems: 'center', textAlign: 'center', padding: 16, borderRadius: 999, borderColor: archSel === 'core' ? '#6fe3ff' : '#4d8dff' }),
          outbound: hpart('outbound'),
          deploy: hpart('deploy', { alignItems: 'center' })
        };
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button {...hx.clients}>
              <span style={caption}>{t('arch.clients')}</span>
              <span style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px', justifyContent: 'center' }}>
                {arch.clients.map((i) => <span key={i} style={item({ lineHeight: 1.4 })}>{i}</span>)}
              </span>
            </button>
            <div style={connector} />
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.3fr) minmax(0,1fr)', gap: 8, alignItems: 'stretch' }}>
              <button {...hx.inbound}>
                <span style={{ ...caption, lineHeight: 1.3, letterSpacing: '.2em' }}>{t('arch.inbound')}</span>
                {arch.inbound.map((i) => <span key={i} style={item()}>{i}</span>)}
              </button>
              <div style={{ border: '1px dashed rgba(110,160,255,.4)', padding: 12, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'stretch' }}>
                <span style={{ ...caption, color: '#4d8dff', textAlign: 'center' }}>{t('arch.ports')}</span>
                <button {...hx.core}>
                  <span style={{ font: '600 10px/1 Oxanium, sans-serif', letterSpacing: '.24em', color: '#6fe3ff' }}>{t('arch.core')}</span>
                  {arch.core.map((i) => <span key={i} style={item()}>{i}</span>)}
                </button>
              </div>
              <button {...hx.outbound}>
                <span style={{ ...caption, lineHeight: 1.3, letterSpacing: '.2em' }}>{t('arch.outbound')}</span>
                {arch.outbound.map((i) => <span key={i} style={item()}>{i}</span>)}
              </button>
            </div>
            <div style={connector} />
            <button {...hx.deploy}>
              <span style={caption}>{t('arch.deploy')}</span>
              <span style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px', justifyContent: 'center' }}>
                {arch.deploy.map((i) => <span key={i} style={item({ lineHeight: 1.4 })}>{i}</span>)}
              </span>
            </button>
          </div>
        );
      })()}

      {arch.kind === 'modular' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
            {arch.channels.map((c) => (
              <span key={c} style={{ font: '600 10px/1 Oxanium, sans-serif', letterSpacing: '.18em', padding: '8px 12px', border: '1px solid rgba(110,160,255,.25)', color: '#b3c0da' }}>{c}</span>
            ))}
          </div>
          <div style={connector} />
          <div style={{ border: '1px solid rgba(110,160,255,.3)', padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8, font: '600 9px/1.4 Oxanium, sans-serif', letterSpacing: '.24em' }}>
              <span style={{ color: '#4d8dff' }}>{t('arch.monolith')}</span>
              <span style={{ color: '#6f82a8' }}>{t('arch.hexPerModule')}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 8 }}>
              {arch.modules.map((m, k) => (
                <button key={m.name} onClick={() => select('M' + k)} style={selBox('M' + k, { padding: 12, display: 'flex', flexDirection: 'column', gap: 8, borderStyle: m.mine ? 'solid' : 'dashed', opacity: m.mine ? 1 : 0.7 })}>
                  <span style={{ display: 'flex', justifyContent: 'space-between', gap: 6, alignItems: 'center', width: '100%' }}>
                    <span style={{ font: '600 10px/1.2 Oxanium, sans-serif', letterSpacing: '.2em' }}>{m.name}</span>
                    <span style={{ font: '600 8px/1 Oxanium, sans-serif', letterSpacing: '.16em', padding: '3px 5px', color: m.mine ? '#02040b' : '#9aabc9', background: m.mine ? '#6fe3ff' : 'transparent', border: m.mine ? 0 : '1px solid #33456e', whiteSpace: 'nowrap' }}>{m.tag}</span>
                  </span>
                  <span style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 10px' }}>
                    {m.items.map((i) => <span key={i} style={{ font: '500 11.5px/1.4 Manrope, sans-serif', color: '#b3c0da' }}>{i}</span>)}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div style={connector} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 8 }}>
            {[[t('arch.persistence'), arch.infra], [t('arch.testing'), arch.tests]].map(([t, list]) => (
              <div key={t} style={{ border: '1px solid rgba(110,160,255,.2)', padding: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={caption}>{t}</span>
                <span style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 10px' }}>
                  {list.map((i) => <span key={i} style={{ font: '600 12px/1.4 Oxanium, sans-serif' }}>{i}</span>)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div aria-live="polite" style={{ display: 'flex', gap: 12, padding: '12px 14px', background: 'rgba(77,141,255,.07)', border: '1px solid rgba(77,141,255,.3)' }}>
        <span style={{ font: '600 9px/1.7 Oxanium, sans-serif', letterSpacing: '.24em', color: '#4d8dff', flex: 'none' }}>{t('arch.inspector')}</span>
        <span style={{ font: '400 13px/1.55 Manrope, sans-serif', color: '#d3dcef', textWrap: 'pretty' }}>{note}</span>
      </div>
    </div>
  );
}
