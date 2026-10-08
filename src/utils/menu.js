// Secciones del menú; los textos salen de i18n ('menu.<id>' y 'dock.<id>' para la versión corta del dock móvil).
export const MENU = [
  { id: 'about', num: '01' },
  { id: 'projects', num: '02' },
  { id: 'systems', num: '03' },
  { id: 'arch', num: '04' },
  { id: 'lab', num: '05' },
  { id: 'contact', num: '06' }
];
export const panelWidth = (panel) => (panel === 'systems' || panel === 'arch' ? 680 : 480);
export const activeMenu = (panel) => (panel === 'project' ? 'projects' : panel);
