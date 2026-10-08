// Comandos de la terminal de LSM // LAB.
import { useNexus } from '../store.js';
import { PROFILE, PROJECTS, SKILLS } from '../data/projectsData.js';
import { sfx } from '../hooks/useSound.js';

export const techCount = () => new Set(SKILLS.flatMap((k) => k.techs.map((t) => t[0]))).size;

const SECTION_ALIAS = { about: 'about', projects: 'projects', systems: 'systems', skills: 'systems', arch: 'arch', architecture: 'arch', lab: 'lab', contact: 'contact' };

export function runCmd(raw) {
  const S = useNexus.getState();
  const c = raw.trim(), low = c.toLowerCase();
  if (!c) return;
  if (low === 'clear') { useNexus.setState({ term: [] }); return; }
  const out = [{ t: 'in', s: '> ' + c }];
  const push = (s, t = 'out') => out.push({ s, t });
  let after = null;

  if (low === 'help') {
    ['about      quién soy', 'projects   base de datos de proyectos', 'skills     constelación de tecnologías', 'stats      números del sistema', 'github     perfil público', 'contact    canales de contacto', 'resume     descargar CV', 'open <n>   abrir proyecto 1–6 o sección', 'clear      limpiar terminal'].forEach((x) => push(x));
    push('Algunos directorios están ocultos.', 'dim');
  } else if (low === 'about' || low === 'whoami') {
    push(PROFILE.name + ' — ' + PROFILE.role, 'ok');
    push(PROFILE.statement);
    push('→ open about', 'dim');
  } else if (low === 'projects' || low === 'ls projects') {
    PROJECTS.forEach((p) => push(p.code + '  ' + (p.name + '              ').slice(0, 15) + p.type));
    push('→ open 1..6 para entrar a un mundo', 'dim');
  } else if (low === 'skills') {
    SKILLS.forEach((k) => push((k.name + '              ').slice(0, 16) + k.techs.length + ' nodes'));
    push('→ open systems', 'dim');
  } else if (low === 'stats') {
    push('PROJECTS ....... ' + String(PROJECTS.length).padStart(2, '0'));
    push('TECH NODES ..... ' + techCount());
    push('MAIN LANGUAGES . Python · JavaScript · Java · Kotlin');
    push('ARCH STYLES .... hexagonal · monolito modular · capas');
  } else if (low === 'github') {
    push(PROFILE.github, 'ok');
    push('Nota: los repositorios personales son privados.', 'dim');
    window.open(PROFILE.github, '_blank', 'noopener');
  } else if (low === 'contact') {
    push('GITHUB    github.com/Sofira28', 'ok');
    push('EMAIL     [ placeholder ]', 'dim');
    push('LINKEDIN  [ placeholder ]', 'dim');
    after = () => S.openPanel('contact');
  } else if (low === 'resume' || low === 'cv') {
    S.openResume();
    push('Solicitando CV...', 'dim');
  } else if (low === 'ls') push('about.txt   projects/   skills/   lab/');
  else if (low === 'ls -a' || low === 'ls -la') push('.   ..   .secret_room/   about.txt   projects/   skills/   lab/');
  else if (low === 'cd .secret_room' || low === 'cd .secret_room/' || low === 'open door' || low === 'unity') {
    push('Abriendo .secret_room ... trae linterna.', 'dim');
    after = () => S.openSecret();
  } else if (low === 'sudo coffee') {
    push('☕ ACCESS GRANTED', 'ok');
    push('Developer fuel detected.', 'ok');
    sfx('activate');
  } else if (low.startsWith('sudo')) push('Permission denied. Buen intento.', 'err');
  else if (low.startsWith('open ')) {
    const a = low.slice(5).trim(), n = parseInt(a, 10), sec = SECTION_ALIAS[a];
    const p = n >= 1 && n <= PROJECTS.length ? PROJECTS[n - 1] : PROJECTS.find((x) => x.id === a || x.name.toLowerCase() === a);
    if (p) { push('ACCESS PROJECT ' + p.code + ' ' + p.name, 'ok'); after = () => S.openProject(p.id); }
    else if (sec) { push('OPEN SYSTEM ' + a.toUpperCase(), 'ok'); after = () => S.openPanel(sec); }
    else push('open: destino desconocido "' + a + '"', 'err');
  } else push('command not found: ' + c + ' · prueba "help"', 'err');

  useNexus.setState((s) => ({ term: [...s.term, ...out].slice(-80) }));
  sfx('click');
  if (after) setTimeout(after, 500);
}
