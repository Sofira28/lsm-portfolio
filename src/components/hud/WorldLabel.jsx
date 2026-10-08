import { useNexus } from '../../store.js';
import { PROJECT_META } from '../../data/index.js';
import { useT } from '../../i18n/index.js';
import { nexus } from '../../utils/nexus.js';

// [id, código, clave i18n del nombre]
const SECTORS = [
  ['s-about', 'SECTOR 03', 'label.about'],
  ['s-systems', 'SECTOR 02', 'label.systems'],
  ['s-lab', 'SECTOR 04', 'label.lab'],
  ['s-contact', 'SECTOR 05', 'label.contact']
];

// Capa HTML de labels proyectados; las posiciones las escribe LabelProjector (dentro del Canvas).
export default function WorldLabelLayer() {
  const visible = useNexus((s) => s.arrived && s.tier !== '2d');
  const activate = useNexus.getState().activate;
  const t = useT();
  const labels = PROJECT_META.map((p) => ({ id: p.id, code: p.code, name: p.name }))
    .concat(SECTORS.map(([id, code, key]) => ({ id, code, name: t(key) })));
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden', display: visible ? 'block' : 'none' }}>
      {labels.map((l) => (
        <button
          key={l.id}
          ref={(el) => {
            if (el) nexus.labelEls.set(l.id, el);
            else nexus.labelEls.delete(l.id);
          }}
          className="world-label"
          onClick={() => activate(l.id)}
          aria-label={t('label.open', { name: l.name })}
        >
          <span style={{ font: '600 9px/1 Oxanium, sans-serif', letterSpacing: '.22em', color: '#6fe3ff' }}>{l.code}</span>
          <span style={{ font: '600 11px/1 Oxanium, sans-serif', letterSpacing: '.18em' }}>{l.name}</span>
        </button>
      ))}
    </div>
  );
}
