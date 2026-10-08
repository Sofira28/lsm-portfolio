// Contenido por idioma. Los componentes usan useContent(); el código fuera de React, content().
import { getLang, useLang } from '../i18n/index.js';
import * as es from './es.js';
import * as en from './en.js';

const CONTENT = { es, en };

export const content = () => CONTENT[getLang()];
export const useContent = () => CONTENT[useLang()];

// Datos que no cambian con el idioma (ids, códigos, nombres, colores): mundos 3D, anclas, mapa 2D.
export const PROJECT_META = es.PROJECTS.map(({ id, code, name, type, color }) => ({ id, code, name, type, color }));
export const SKILL_META = es.SKILLS.map(({ techs }) => ({ techs }));
export const GITHUB_URL = es.PROFILE.github;

// Aviso en desarrollo si es.js y en.js dejan de tener los mismos proyectos en el mismo orden.
if (import.meta.env.DEV) {
  const ids = (c) => c.PROJECTS.map((p) => p.id).join() + '|' + c.ARCH.map((a) => a.id).join() + '|' + c.SKILLS.length;
  if (ids(es) !== ids(en)) console.warn('[nexus] es.js y en.js no tienen la misma estructura (ids/orden de PROJECTS, ARCH o SKILLS).');
}
