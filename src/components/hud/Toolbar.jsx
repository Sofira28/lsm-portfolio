import { useEffect, useRef } from 'react';
import { useNexus } from '../../store.js';
import { CONFIG } from '../../config.js';
import { GITHUB_URL } from '../../data/index.js';
import { nexus } from '../../utils/nexus.js';
import { TIER_NEXT } from '../../hooks/usePerfTier.js';
import { useT, toggleLang } from '../../i18n/index.js';

// Completa en escritorio ancho; en pantallas compactas: CV · GH · ⋯ (ajustes en SettingsPopover).
export default function Toolbar() {
  const isMobile = useNexus((s) => s.isMobile);
  const compact = useNexus((s) => s.compact);
  const sound = useNexus((s) => s.sound);
  const reduced = useNexus((s) => s.reduced);
  const tier = useNexus((s) => s.tier);
  const settings = useNexus((s) => s.settings);
  const S = useNexus.getState();
  const t = useT();
  const fpsRef = useRef(null);
  useEffect(() => {
    nexus.fpsEl = fpsRef.current;
    return () => { nexus.fpsEl = null; };
  });

  return (
    <div style={{ position: 'absolute', top: isMobile ? 12 : 18, right: isMobile ? 12 : 20, display: 'flex', alignItems: 'center', gap: 6, pointerEvents: 'auto' }}>
      {!compact ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button className="btn-resume" onClick={S.openResume}>{t('set.resume')}</button>
          <a className="btn-link" href={GITHUB_URL} target="_blank" rel="noopener">GITHUB ↗</a>
          <span style={{ width: 1, height: 20, background: 'rgba(110,160,255,.2)', margin: '0 4px' }} />
          <button className="btn-tool" onClick={toggleLang} aria-label={t('lang.aria')} style={{ color: '#6fe3ff' }}>{t('lang.switch')}</button>
          <button className="btn-tool" onClick={S.toggleSound} aria-pressed={sound}>{t(sound ? 'set.soundOn' : 'set.soundOff')}</button>
          <button className="btn-tool" onClick={S.toggleMotion} aria-pressed={reduced}>{t(reduced ? 'set.motionReduced' : 'set.motionFull')}</button>
          <button className="btn-tool" onClick={() => S.setTier(TIER_NEXT[tier])} title={t('set.renderTitle')}>{t('set.render', { tier: t('tier.' + tier) })}</button>
          {CONFIG.showFps && tier !== '2d' && (
            <span style={{ font: '500 10px/1 Oxanium, sans-serif', letterSpacing: '.18em', color: '#6f82a8', paddingLeft: 4 }}>
              FPS <span ref={fpsRef} style={{ color: '#9aabc9' }}>--</span>
            </span>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="btn-resume" onClick={S.openResume} aria-label={t('set.resumeAria')} style={{ height: 44, minWidth: 44, padding: '0 10px', letterSpacing: '.14em' }}>{t('set.resumeShort')}</button>
          <a className="btn-link" href={GITHUB_URL} target="_blank" rel="noopener" aria-label="GitHub" style={{ height: 44, minWidth: 44, padding: '0 10px', justifyContent: 'center', letterSpacing: '.14em' }}>GH ↗</a>
          {!isMobile && (
            <button className="btn-link" onClick={toggleLang} aria-label={t('lang.aria')} style={{ height: 44, padding: '0 12px', background: 'none', color: '#6fe3ff', cursor: 'pointer' }}>{t('lang.switch')}</button>
          )}
          <button
            onClick={S.toggleSettings}
            aria-label={t('set.aria')}
            aria-expanded={settings}
            style={{ width: 44, height: 44, background: 'none', border: '1px solid rgba(110,160,255,.25)', color: '#e6edfb', font: '600 14px/1 Oxanium, sans-serif', cursor: 'pointer' }}
          >
            ⋯
          </button>
        </div>
      )}
    </div>
  );
}

export function SettingsPopover() {
  const open = useNexus((s) => s.settings && s.compact);
  const isMobile = useNexus((s) => s.isMobile);
  const sound = useNexus((s) => s.sound);
  const reduced = useNexus((s) => s.reduced);
  const tier = useNexus((s) => s.tier);
  const mode = useNexus((s) => s.mode);
  const S = useNexus.getState();
  const t = useT();
  if (!open) return null;
  return (
    <div style={{ position: 'absolute', top: isMobile ? 64 : 70, right: isMobile ? 12 : 20, display: 'flex', flexDirection: 'column', gap: 6, padding: 10, background: 'rgba(5,9,22,.92)', border: '1px solid rgba(110,160,255,.22)', pointerEvents: 'auto', zIndex: 30, animation: 'nxIn .3s ease both' }}>
      <button className="btn-sheet" onClick={toggleLang} aria-label={t('lang.aria')} style={{ color: '#6fe3ff' }}>{t('lang.switch')}</button>
      <button className="btn-sheet" onClick={S.toggleSound}>{t(sound ? 'set.soundOn' : 'set.soundOff')}</button>
      <button className="btn-sheet" onClick={S.toggleMotion}>{t(reduced ? 'set.motionReduced' : 'set.motionFull')}</button>
      <button className="btn-sheet" onClick={() => S.setTier(TIER_NEXT[tier])}>{t('set.render', { tier: t('tier.' + tier) })}</button>
      <button className="btn-sheet" onClick={S.toggleMode}>{t('set.mode', { mode: t('mode.' + mode) })}</button>
    </div>
  );
}
