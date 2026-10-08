import { useNexus } from '../../store.js';
import { MENU, activeMenu } from '../../utils/menu.js';

export default function MobileDock() {
  const act = useNexus((s) => activeMenu(s.panel));
  const openPanel = useNexus.getState().openPanel;
  return (
    <nav aria-label="Menú NEXUS" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, display: 'grid', gridTemplateColumns: 'repeat(6,minmax(0,1fr))', background: 'rgba(4,8,20,.92)', borderTop: '1px solid rgba(110,160,255,.2)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', pointerEvents: 'auto', zIndex: 25 }}>
      {MENU.map((m) => {
        const on = act === m.id;
        return (
          <button
            key={m.id}
            onClick={() => openPanel(m.id)}
            aria-current={on ? 'page' : undefined}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, minHeight: 56, background: 'none', border: 0, borderTop: on ? '2px solid #6fe3ff' : '2px solid transparent', color: on ? '#e6edfb' : '#8597ba', font: '600 9px/1 Oxanium, sans-serif', letterSpacing: '.14em', cursor: 'pointer', padding: 0 }}
          >
            <span style={{ color: '#4d6290', fontSize: 8 }}>{m.num}</span>
            <span>{m.short}</span>
          </button>
        );
      })}
    </nav>
  );
}
