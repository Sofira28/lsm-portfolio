export const MENU = [
  { id: 'about', label: 'ABOUT', num: '01', short: 'ABOUT' },
  { id: 'projects', label: 'PROJECTS', num: '02', short: 'WORK' },
  { id: 'systems', label: 'SYSTEMS', num: '03', short: 'SKILLS' },
  { id: 'arch', label: 'ARCHITECTURE', num: '04', short: 'ARCH' },
  { id: 'lab', label: 'LAB', num: '05', short: 'LAB' },
  { id: 'contact', label: 'CONTACT', num: '06', short: 'LINK' }
];
export const panelWidth = (panel) => (panel === 'systems' || panel === 'arch' ? 680 : 480);
export const activeMenu = (panel) => (panel === 'project' ? 'projects' : panel);
