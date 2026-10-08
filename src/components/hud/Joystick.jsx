import { useJoystick } from '../../hooks/useJoystick.js';

export default function Joystick() {
  const { knobRef, handlers } = useJoystick();
  return (
    <div
      {...handlers}
      aria-label="Joystick virtual"
      style={{ position: 'absolute', left: 18, bottom: 86, width: 112, height: 112, borderRadius: '50%', border: '1px solid rgba(110,160,255,.35)', background: 'rgba(5,10,26,.45)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', pointerEvents: 'auto', touchAction: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div ref={knobRef} style={{ width: 46, height: 46, borderRadius: '50%', background: 'rgba(77,141,255,.35)', border: '1px solid #6fe3ff', transition: 'transform .08s' }} />
    </div>
  );
}
