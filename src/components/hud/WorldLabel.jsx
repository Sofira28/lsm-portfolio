import { useNexus } from '../../store.js';
import { PROJECTS } from '../../data/projectsData.js';
import { nexus } from '../../utils/nexus.js';

const LABELS = PROJECTS.map((p) => ({ id: p.id, code: p.code, name: p.name, aria: 'Abrir ' + p.name })).concat([
  { id: 's-about', code: 'SECTOR 03', name: 'LSM · AVATAR', aria: 'Abrir About' },
  { id: 's-systems', code: 'SECTOR 02', name: 'SKILLS / SYSTEMS', aria: 'Abrir Skills' },
  { id: 's-lab', code: 'SECTOR 04', name: 'LSM // LAB', aria: 'Abrir Lab' },
  { id: 's-contact', code: 'SECTOR 05', name: 'CONTACT', aria: 'Abrir Contact' }
]);

// Capa HTML de labels proyectados; las posiciones las escribe LabelProjector (dentro del Canvas).
export default function WorldLabelLayer() {
  const visible = useNexus((s) => s.arrived && s.tier !== '2d');
  const activate = useNexus.getState().activate;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden', display: visible ? 'block' : 'none' }}>
      {LABELS.map((l) => (
        <button
          key={l.id}
          ref={(el) => {
            if (el) nexus.labelEls.set(l.id, el);
            else nexus.labelEls.delete(l.id);
          }}
          className="world-label"
          onClick={() => activate(l.id)}
          aria-label={l.aria}
        >
          <span style={{ font: '600 9px/1 Oxanium, sans-serif', letterSpacing: '.22em', color: '#6fe3ff' }}>{l.code}</span>
          <span style={{ font: '600 11px/1 Oxanium, sans-serif', letterSpacing: '.18em' }}>{l.name}</span>
        </button>
      ))}
    </div>
  );
}
