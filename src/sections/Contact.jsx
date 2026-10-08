import { useNexus } from '../store.js';
import { CONFIG } from '../config.js';
import { PROFILE } from '../data/projectsData.js';

const stat = (live) => ({
  font: '600 8px/1 Oxanium, sans-serif', letterSpacing: '.18em', padding: '4px 6px',
  color: live ? '#5ff0b0' : '#ffb38a', border: '1px solid ' + (live ? '#5ff0b055' : '#ffb38a55'), whiteSpace: 'nowrap'
});

export default function Contact() {
  const openResume = useNexus.getState().openResume;
  const { emailAddress: email, linkedinUrl: li, resumeUrl: cv } = CONFIG;
  const contacts = [
    { label: 'GITHUB', value: PROFILE.github.replace(/^https?:\/\//, ''), href: PROFILE.github, live: true },
    { label: 'EMAIL', value: email || '[ PLACEHOLDER · email ]', href: email ? 'mailto:' + email : '', live: !!email },
    { label: 'LINKEDIN', value: li ? li.replace(/^https?:\/\/(www\.)?/, '') : '[ PLACEHOLDER · LinkedIn ]', href: li || '', live: !!li },
    { label: 'CV / RESUME', value: cv ? 'Descargar PDF' : '[ PLACEHOLDER · archivo CV ]', href: cv || '', live: !!cv }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h2 style={{ margin: 0, font: '600 26px/1.15 Oxanium, sans-serif', letterSpacing: '.14em' }}>ESTABLISH<br />CONNECTION</h2>
        <p style={{ margin: '10px 0 0', font: '400 14px/1.55 Manrope, sans-serif', color: '#b3c0da' }}>
          Prácticas, primer empleo o un proyecto: escríbeme por cualquiera de estos canales.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(110,160,255,.16)' }}>
        {contacts.map((c) => (
          <div key={c.label} style={{ display: 'grid', gridTemplateColumns: '96px minmax(0,1fr) auto', gap: 12, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(110,160,255,.16)' }}>
            <span style={{ font: '600 10px/1.3 Oxanium, sans-serif', letterSpacing: '.2em', color: '#9aabc9' }}>{c.label}</span>
            {c.live ? (
              <a href={c.href} target="_blank" rel="noopener" style={{ font: '600 13px/1.4 Oxanium, sans-serif', letterSpacing: '.06em', color: '#e6edfb', overflowWrap: 'anywhere' }}>{c.value} ↗</a>
            ) : (
              <span style={{ font: '500 11.5px/1.4 ui-monospace, Menlo, monospace', color: '#8597ba' }}>{c.value}</span>
            )}
            <span style={stat(c.live)}>{c.live ? 'ONLINE' : 'PENDING'}</span>
          </div>
        ))}
      </div>
      <button className="btn-primary" onClick={openResume} style={{ minHeight: 48, letterSpacing: '.22em' }}>[ DOWNLOAD RESUME ]</button>
      <div style={{ font: '500 11px/1.5 Manrope, sans-serif', color: '#6f82a8' }}>
        Los repositorios personales son privados; el perfil de GitHub muestra la actividad pública.
      </div>
    </div>
  );
}
