import { useNexus } from '../../store.js';

export default function Toast() {
  const toast = useNexus((s) => s.toast);
  if (!toast) return null;
  return (
    <div
      role="status"
      key={toast}
      style={{ position: 'absolute', left: '50%', top: 76, transform: 'translateX(-50%)', zIndex: 70, padding: '12px 16px', background: 'rgba(5,9,22,.94)', border: '1px solid #4d8dff', font: '600 10px/1.5 Oxanium, sans-serif', letterSpacing: '.18em', color: '#e6edfb', maxWidth: '88vw', textAlign: 'center', animation: 'nxIn .35s ease both' }}
    >
      {toast}
    </div>
  );
}
