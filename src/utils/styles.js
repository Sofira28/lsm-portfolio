// Estilos dinámicos reutilizados (los estáticos viven en styles/nexus.css).
export const TYPE_COLOR = { PERSONAL: '#6fe3ff', TEAM: '#a594ff', ORGANIZATION: '#ff7fc0' };

export const badge = (c) => ({
  font: '600 9px/1 Oxanium, sans-serif', letterSpacing: '.2em', padding: '4px 7px',
  color: c, border: '1px solid ' + c + '66', whiteSpace: 'nowrap'
});

export const chipBtn = (on, c = '#6fe3ff') => ({
  minHeight: 34, padding: '0 11px', background: on ? c + '22' : 'none',
  border: '1px solid ' + (on ? c : 'rgba(110,160,255,.22)'), color: on ? '#e6edfb' : '#9aabc9',
  font: '600 10px/1 Oxanium, sans-serif', letterSpacing: '.16em', cursor: 'pointer', transition: 'all .2s'
});

export const pad2 = (n) => String(n).padStart(2, '0');
