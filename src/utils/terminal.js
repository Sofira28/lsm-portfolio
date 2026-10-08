// Comandos de la terminal de LSM // LAB. Acepta los comandos en inglés y en español;
// las respuestas salen en el idioma actual.
import { useNexus } from '../store.js';
import { content } from '../data/index.js';
import { t } from '../i18n/index.js';
import { sfx } from '../hooks/useSound.js';

export const techCount = () => new Set(content().SKILLS.flatMap((k) => k.techs.map((x) => x[0]))).size;

// alias en español → comando canónico
const CMD_ALIAS = {
  ayuda: 'help', 'sobre-mi': 'about', sobremi: 'about', 'sobre mí': 'about', 'sobre mi': 'about', proyectos: 'projects', 'ls proyectos': 'projects',
  habilidades: 'skills', datos: 'stats', contacto: 'contact', cv: 'resume', 'hoja de vida': 'resume', limpiar: 'clear',
  'ls projects': 'projects', whoami: 'about', 'ls -la': 'ls -a',
  'cd .secret_room': 'secret', 'cd .secret_room/': 'secret', 'cd .sala_secreta': 'secret', 'cd .sala_secreta/': 'secret',
  'open door': 'secret', 'abrir puerta': 'secret', unity: 'secret',
  'sudo coffee': 'coffee', 'sudo cafe': 'coffee', 'sudo café': 'coffee'
};
const SECTION_ALIAS = {
  about: 'about', 'sobre-mi': 'about', sobremi: 'about', projects: 'projects', proyectos: 'projects',
  systems: 'systems', skills: 'systems', sistemas: 'systems', habilidades: 'systems',
  arch: 'arch', architecture: 'arch', arquitectura: 'arch', lab: 'lab', contact: 'contact', contacto: 'contact'
};

export function runCmd(raw) {
  const S = useNexus.getState();
  const { PROFILE, PROJECTS, SKILLS } = content();
  const c = raw.trim(), low = c.toLowerCase();
  if (!c) return;
  const cmd = CMD_ALIAS[low] || low;
  if (cmd === 'clear') { useNexus.setState({ term: [] }); return; }
  const out = [{ t: 'in', s: '> ' + c }];
  const push = (s, tone = 'out') => out.push({ s, t: tone });
  const pushLines = (s, tone) => s.split('\n').forEach((l) => push(l, tone));
  let after = null;
  const openArg = low.startsWith('open ') ? low.slice(5).trim() : low.startsWith('abrir ') ? low.slice(6).trim() : null;

  if (cmd === 'help') {
    pushLines(t('term.help'));
    push(t('term.hidden'), 'dim');
  } else if (cmd === 'about') {
    push(PROFILE.name + ' — ' + PROFILE.role, 'ok');
    push(PROFILE.statement);
    push(t('term.openAbout'), 'dim');
  } else if (cmd === 'projects') {
    PROJECTS.forEach((p) => push(p.code + '  ' + (p.name + '              ').slice(0, 15) + t('type.' + p.type)));
    push(t('term.openWorld'), 'dim');
  } else if (cmd === 'skills') {
    SKILLS.forEach((k) => push((k.name + '                ').slice(0, 17) + t('term.nodes', { n: k.techs.length })));
    push(t('term.openSystems'), 'dim');
  } else if (cmd === 'stats') {
    pushLines(t('term.stats', { projects: String(PROJECTS.length).padStart(2, '0'), tech: techCount() }));
  } else if (cmd === 'github') {
    push(PROFILE.github, 'ok');
    push(t('term.privateRepos'), 'dim');
    window.open(PROFILE.github, '_blank', 'noopener');
  } else if (cmd === 'contact') {
    push('GITHUB    ' + PROFILE.github.replace(/^https?:\/\//, ''), 'ok');
    push(t('term.email'), 'dim');
    push(t('term.linkedin'), 'dim');
    after = () => S.openPanel('contact');
  } else if (cmd === 'resume') {
    S.openResume();
    push(t('term.cv'), 'dim');
  } else if (cmd === 'ls') push(t('term.ls'));
  else if (cmd === 'ls -a') push(t('term.lsa'));
  else if (cmd === 'secret') {
    push(t('term.secret'), 'dim');
    after = () => S.openSecret();
  } else if (cmd === 'coffee') {
    push(t('term.coffee1'), 'ok');
    push(t('term.coffee2'), 'ok');
    sfx('activate');
  } else if (low.startsWith('sudo')) push(t('term.denied'), 'err');
  else if (openArg !== null) {
    const n = parseInt(openArg, 10), sec = SECTION_ALIAS[openArg];
    const p = n >= 1 && n <= PROJECTS.length ? PROJECTS[n - 1] : PROJECTS.find((x) => x.id === openArg || x.name.toLowerCase() === openArg);
    if (p) { push(t('term.openProject', { code: p.code, name: p.name }), 'ok'); after = () => S.openProject(p.id); }
    else if (sec) { push(t('term.openSection', { name: openArg.toUpperCase() }), 'ok'); after = () => S.openPanel(sec); }
    else push(t('term.unknown', { a: openArg }), 'err');
  } else push(t('term.notFound', { c }), 'err');

  useNexus.setState((s) => ({ term: [...s.term, ...out].slice(-80) }));
  sfx('click');
  if (after) setTimeout(after, 500);
}
