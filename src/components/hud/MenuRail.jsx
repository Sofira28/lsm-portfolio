import { useNexus } from '../../store.js';
import { MENU, activeMenu } from '../../utils/menu.js';

export default function MenuRail() {
  const act = useNexus((s) => activeMenu(s.panel));
  const openPanel = useNexus.getState().openPanel;
  return (
    <nav aria-label="Menú NEXUS" style={{ position: 'absolute', left: 22, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 2, pointerEvents: 'auto' }}>
      <div style={{ font: '600 9px/1 Oxanium, sans-serif', letterSpacing: '.28em', color: '#4d8dff', marginBottom: 10 }}>SYSTEM MENU</div>
      {MENU.map((m) => {
        const on = act === m.id;
        return (
          <button
            key={m.id}
            onClick={() => openPanel(m.id)}
            aria-current={on ? 'page' : undefined}
            style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 0, padding: '8px 0', cursor: 'pointer', color: on ? '#e6edfb' : '#8597ba', font: '600 11px/1 Oxanium, sans-serif', letterSpacing: '.26em', textAlign: 'left', transition: 'color .25s' }}
          >
            <span style={{ display: 'block', height: 1, width: on ? 26 : 12, background: on ? '#6fe3ff' : '#33456e', transition: 'width .35s, background .35s', boxShadow: on ? '0 0 8px #6fe3ff' : 'none' }} />
            <span style={{ color: '#4d6290', fontSize: 9 }}>{m.num}</span>
            <span>{m.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
