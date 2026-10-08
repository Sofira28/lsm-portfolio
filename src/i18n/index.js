// Idioma de la página (ES / EN). Store propio y sin dependencias del resto de la app,
// para que cualquier módulo (incluido store.js y data/) pueda importarlo sin ciclos.
import { create } from 'zustand';
import { UI } from './ui.js';

export const LANGS = ['es', 'en'];
const KEY = 'nx-lang';

function initialLang() {
  try {
    const saved = localStorage.getItem(KEY);
    if (LANGS.includes(saved)) return saved;
  } catch { /* sin storage */ }
  const nav = (typeof navigator !== 'undefined' && navigator.language) || 'es';
  return nav.toLowerCase().startsWith('es') ? 'es' : 'en';
}

const useLangStore = create(() => ({ lang: initialLang() }));

export const getLang = () => useLangStore.getState().lang;
export const useLang = () => useLangStore((s) => s.lang);
export const onLangChange = (fn) => useLangStore.subscribe((s, prev) => { if (s.lang !== prev.lang) fn(s.lang); });

export function setLang(lang) {
  if (!LANGS.includes(lang) || lang === getLang()) return;
  try { localStorage.setItem(KEY, lang); } catch { /* sin storage */ }
  useLangStore.setState({ lang });
  syncDocument(lang);
}
export const toggleLang = () => setLang(getLang() === 'es' ? 'en' : 'es');

// <html lang> y meta description según el idioma.
export function syncDocument(lang = getLang()) {
  document.documentElement.lang = lang;
  document.querySelector('meta[name="description"]')?.setAttribute('content', translate(lang, 'meta.description'));
}

// t('clave', { n: 6 }) → texto del idioma actual; {n} se sustituye. Si falta la clave, se usa la de ES.
function translate(lang, key, vars) {
  let s = UI[lang][key] ?? UI.es[key] ?? key;
  if (vars) for (const k in vars) s = s.replaceAll('{' + k + '}', vars[k]);
  return s;
}
export const t = (key, vars) => translate(getLang(), key, vars);

// Hook para componentes: re-renderiza al cambiar de idioma.
export function useT() {
  const lang = useLang();
  return (key, vars) => translate(lang, key, vars);
}
