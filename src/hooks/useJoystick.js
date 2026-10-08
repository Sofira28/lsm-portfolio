import { useRef } from 'react';
import { nexus } from '../utils/nexus.js';

// Joystick virtual (mobile, modo exploración): escribe en nexus.joy, el rig lo lee cada frame.
export function useJoystick() {
  const knobRef = useRef(null);
  const rectRef = useRef(null);

  const move = (e) => {
    const r = rectRef.current;
    if (!r) return;
    let x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    let y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    const l = Math.hypot(x, y);
    if (l > 1) { x /= l; y /= l; }
    nexus.joy = { x, y };
    if (knobRef.current) knobRef.current.style.transform = `translate(${x * 32}px,${y * 32}px)`;
  };
  const up = () => {
    rectRef.current = null;
    nexus.joy = { x: 0, y: 0 };
    if (knobRef.current) knobRef.current.style.transform = 'translate(0,0)';
  };
  const down = (e) => {
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* noop */ }
    rectRef.current = e.currentTarget.getBoundingClientRect();
    move(e);
  };

  return { knobRef, handlers: { onPointerDown: down, onPointerMove: move, onPointerUp: up, onPointerCancel: up } };
}
