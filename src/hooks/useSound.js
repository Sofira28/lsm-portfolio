// WebAudio: drone ambiental 55/82/110 Hz con lowpass + blips. Off por defecto.
let ac = null, master = null, amb = null, enabled = false;

function ensureAudio() {
  if (!ac) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ac = new AC();
    master = ac.createGain();
    master.gain.value = 0.6;
    master.connect(ac.destination);
  }
  if (ac.state === 'suspended') ac.resume();
}

function blip(f, d, type, v, f2) {
  const t = ac.currentTime, o = ac.createOscillator(), g = ac.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f, t);
  o.frequency.exponentialRampToValueAtTime(f2 || f * 1.5, t + d);
  g.gain.setValueAtTime(v, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + d);
  o.connect(g); g.connect(master);
  o.start(t); o.stop(t + d + 0.05);
}

export function sfx(k) {
  if (!enabled || !ac) return;
  try {
    if (k === 'tick') blip(1800, 0.03, 'square', 0.012);
    else if (k === 'hover') blip(1400, 0.04, 'sine', 0.015);
    else if (k === 'click') blip(900, 0.05, 'triangle', 0.03);
    else if (k === 'open') blip(420, 0.16, 'triangle', 0.04, 820);
    else if (k === 'close') blip(700, 0.14, 'triangle', 0.03, 380);
    else if (k === 'activate') { blip(660, 0.1, 'sine', 0.04); setTimeout(() => ac && blip(990, 0.18, 'sine', 0.04), 90); }
    else if (k === 'teleport') blip(160, 0.9, 'sine', 0.05, 1300);
  } catch { /* audio no disponible */ }
}

function startAmbient() {
  if (!ac || amb) return;
  const g = ac.createGain(), lp = ac.createBiquadFilter();
  lp.type = 'lowpass'; lp.frequency.value = 520;
  g.gain.value = 0;
  g.gain.linearRampToValueAtTime(0.035, ac.currentTime + 2);
  lp.connect(g); g.connect(master);
  const os = [55, 82.4, 110.3].map((f, i) => {
    const o = ac.createOscillator();
    o.type = i === 2 ? 'triangle' : 'sine';
    o.frequency.value = f; o.detune.value = i * 4;
    o.connect(lp); o.start();
    return o;
  });
  amb = { g, os };
}

function stopAmbient() {
  if (!amb) return;
  const { g, os } = amb;
  try {
    g.gain.linearRampToValueAtTime(0, ac.currentTime + 0.4);
    os.forEach((o) => o.stop(ac.currentTime + 0.5));
  } catch { /* noop */ }
  amb = null;
}

export function setSoundEnabled(on) {
  enabled = on;
  if (on) { ensureAudio(); startAmbient(); sfx('activate'); }
  else stopAmbient();
}
