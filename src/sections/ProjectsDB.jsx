import { useNexus } from '../store.js';
import { useContent } from '../data/index.js';
import { useT } from '../i18n/index.js';
import { TYPE_COLOR, badge, chipBtn, pad2 } from '../utils/styles.js';

const FILTERS = ['ALL', 'PERSONAL', 'TEAM', 'ORGANIZATION'];

export default function ProjectsDB() {
  const filter = useNexus((s) => s.filter);
  const openProject = useNexus.getState().openProject;
  const { PROJECTS } = useContent();
  const t = useT();
  const counts = { ALL: PROJECTS.length };
  PROJECTS.forEach((p) => { counts[p.type] = (counts[p.type] || 0) + 1; });
  const rows = PROJECTS.filter((p) => filter === 'ALL' || p.type === filter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <div className="kicker">{t('db.kicker')}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 8 }}>
            <span style={{ font: '600 56px/0.9 Oxanium, sans-serif', letterSpacing: '.02em' }}>{pad2(PROJECTS.length)}</span>
            <span style={{ font: '600 11px/1 Oxanium, sans-serif', letterSpacing: '.24em', color: '#9aabc9' }}>{t('db.indexed1')}<br />{t('db.indexed2')}</span>
          </div>
        </div>
        <div style={{ font: '400 12px/1.5 Manrope, sans-serif', color: '#8597ba', maxWidth: 170, textAlign: 'right' }}>{t('db.pick')}</div>
      </div>

      <div role="group" aria-label={t('db.filterAria')} style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {FILTERS.map((f) => (
          <button key={f} onClick={() => useNexus.setState({ filter: f })} aria-pressed={filter === f} style={chipBtn(filter === f, TYPE_COLOR[f] || '#6fe3ff')}>
            {t('type.' + f)} <span style={{ opacity: 0.6 }}>{pad2(counts[f] || 0)}</span>
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(110,160,255,.16)' }}>
        {rows.map((p) => (
          <button key={p.id} className="proj-row" onClick={() => openProject(p.id)}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, font: '600 10px/1 Oxanium, sans-serif', letterSpacing: '.14em', color: '#8597ba' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: p.color, boxShadow: '0 0 10px ' + p.color, flex: 'none' }} />
              {p.code.replace('EXP.', '')}
            </span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 5, minWidth: 0 }}>
              <span style={{ font: '600 14px/1.1 Oxanium, sans-serif', letterSpacing: '.2em' }}>{p.name}</span>
              <span style={{ font: '400 12.5px/1.4 Manrope, sans-serif', color: '#9aabc9', textWrap: 'pretty' }}>{p.tagline}</span>
            </span>
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
              <span style={badge(TYPE_COLOR[p.type])}>{t('type.' + p.type)}</span>
              <span style={{ font: '600 9px/1 Oxanium, sans-serif', letterSpacing: '.2em', color: '#6fe3ff' }}>{t('db.view')}</span>
            </span>
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, font: '500 11px/1.5 Manrope, sans-serif', color: '#8597ba' }}>
        <span><b style={legend('#6fe3ff')}>{t('type.PERSONAL')}</b> {t('db.legendPersonal')}</span>
        <span><b style={legend('#a594ff')}>{t('type.TEAM')}</b> {t('db.legendTeam')}</span>
        <span><b style={legend('#ff7fc0')}>{t('type.ORGANIZATION')}</b> MNT-2026</span>
      </div>
    </div>
  );
}

const legend = (c) => ({ color: c, fontFamily: 'Oxanium', letterSpacing: '.16em', fontSize: 10 });
