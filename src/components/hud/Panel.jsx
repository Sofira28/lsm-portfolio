import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNexus } from '../../store.js';
import { PROJECT_META as PROJECTS } from '../../data/index.js';
import { useT } from '../../i18n/index.js';
import { panelWidth } from '../../utils/menu.js';
import About from '../../sections/About.jsx';
import ProjectsDB from '../../sections/ProjectsDB.jsx';
import ProjectDetail from '../../sections/ProjectDetail.jsx';
import Systems from '../../sections/Systems.jsx';
import Architecture from '../../sections/Architecture.jsx';
import Lab from '../../sections/Lab.jsx';
import Contact from '../../sections/Contact.jsx';

// [código, clave i18n del título]
const TITLES = {
  about: ['SECTOR 03', 'panel.about'],
  projects: ['SECTOR 01', 'panel.projects'],
  systems: ['SECTOR 02', 'panel.systems'],
  arch: ['panel.archCode', 'panel.arch'],
  lab: ['SECTOR 04', 'panel.lab'],
  contact: ['SECTOR 05', 'panel.contact']
};

const BODY = { about: About, projects: ProjectsDB, project: ProjectDetail, systems: Systems, arch: Architecture, lab: Lab, contact: Contact };

export default function Panel() {
  const panel = useNexus((s) => s.panel);
  const pid = useNexus((s) => s.pid);
  const isMobile = useNexus((s) => s.isMobile);
  const reduced = useNexus((s) => s.reduced);
  const closePanel = useNexus.getState().closePanel;
  const bodyRef = useRef(null);
  const t = useT();

  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = 0; }, [panel, pid]);

  if (!panel) return null;
  const cur = PROJECTS.find((x) => x.id === pid);
  const [code, title] = panel === 'project' ? [cur?.code || '', cur?.name || ''] : (TITLES[panel] || ['', '']).map((k) => (k.includes('.') ? t(k) : k));
  const Body = BODY[panel];
  if (panel === 'project' && !cur) return null;

  const glass = {
    background: 'rgba(5,9,22,.82)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(110,160,255,.2)', display: 'flex', flexDirection: 'column', overflow: 'hidden',
    zIndex: 20, pointerEvents: 'auto', boxShadow: '0 30px 80px rgba(0,0,0,.5)'
  };
  const style = isMobile
    ? { ...glass, position: 'absolute', left: 0, right: 0, bottom: 57, height: '66%', borderRadius: '14px 14px 0 0', borderBottom: 0 }
    : { ...glass, position: 'absolute', top: 70, right: 20, bottom: 20, width: panelWidth(panel), maxWidth: 'calc(100vw - 240px)' };

  return (
    <motion.aside
      aria-label={title}
      style={style}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 18px 14px 20px', borderBottom: '1px solid rgba(110,160,255,.16)', flex: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, font: '600 10px/1 Oxanium, sans-serif', letterSpacing: '.24em', minWidth: 0 }}>
          <span style={{ color: '#6fe3ff' }}>{code}</span>
          <span style={{ color: '#33456e' }}>/</span>
          <span style={{ color: '#9aabc9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</span>
        </div>
        <button className="btn-tool" onClick={closePanel} aria-label={t('panel.close')} style={{ minWidth: 44, borderColor: 'rgba(110,160,255,.22)' }}>ESC ✕</button>
      </div>
      <div key={panel + '|' + pid} style={{ height: 1, background: 'linear-gradient(90deg,#4d8dff,transparent)', transformOrigin: 'left', animation: 'nxLine .8s cubic-bezier(.2,.8,.2,1) both', flex: 'none' }} />
      <div ref={bodyRef} style={{ flex: 1, overflowY: 'auto', padding: '22px 22px 32px' }}>
        <Body />
      </div>
    </motion.aside>
  );
}
