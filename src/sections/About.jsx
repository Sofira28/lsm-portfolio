import { useNexus } from '../store.js';
import { PROFILE } from '../data/projectsData.js';

const PRINCIPLES = [
  ['PROBLEMA PRIMERO', 'Gold Deluxe nació de una pregunta concreta: ¿cuánto oro se pierde sin explicación?'],
  ['ARQUITECTURA', 'Hexagonal en SIMAV y ZYTIME; límites verificados con import-linter y ArchUnit.'],
  ['CURIOSIDAD', 'De un bot para parejas a un prototipo de horror en Unity: formatos distintos para aprender cosas distintas.'],
  ['APRENDIZAJE', 'Python, Java, JavaScript y Kotlin a lo largo de seis proyectos; cada stack elegido por el problema.']
];

const logBtn = (c) => ({
  display: 'flex', justifyContent: 'space-between', gap: 12, textAlign: 'left', background: 'none',
  border: '1px solid ' + c, padding: '10px 12px', color: '#e6edfb', cursor: 'pointer', font: 'inherit'
});

export default function About() {
  const openProject = useNexus.getState().openProject;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '112px minmax(0,1fr)', gap: 16, alignItems: 'end' }}>
        
          <img
            src="/about.jpeg"
            alt="Linda Sofia Moreno"
            style={{width:'100%', aspectRatio:'3/4', objectFit: 'cover', border: '1px solid rgba(110,160,255,.3)', display:'block'  }}
          />
       
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h2 style={{ margin: 0, font: '600 17px/1.5 Oxanium, sans-serif', letterSpacing: '.34em' }}>L I N D A<br />S O F I A<br />M O R E N O</h2>
          <div style={{ font: '600 10px/1 Oxanium, sans-serif', letterSpacing: '.3em', color: '#4d8dff' }}>{PROFILE.role}</div>
        </div>
      </div>

      <p style={{ margin: 0, font: '500 22px/1.35 Oxanium, sans-serif', letterSpacing: '.02em', color: '#e6edfb', textWrap: 'balance' }}>“{PROFILE.statement}”</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, font: '400 14.5px/1.65 Manrope, sans-serif', color: '#c2cee6' }}>
        <p style={{ margin: 0, textWrap: 'pretty' }}>Estudio Ingeniería de Sistemas. Antes de escribir código quiero entender el problema: dónde se pierde el material, por qué se duplica una reserva, cómo viaja un pedido de la mesa a la cocina.</p>
        <p style={{ margin: 0, textWrap: 'pretty' }}>Por eso varios de mis proyectos empiezan con una especificación y terminan con pruebas. En el medio hay arquitectura hexagonal, datos geoespaciales, sincronización en tiempo real, apps Android y bots de Discord.</p>
        <p style={{ margin: 0, textWrap: 'pretty' }}>Y cuando termino, construyo cosas como esta: un universo para mostrarlo.</p>
      </div>

      <div>
        <div className="kicker mb">AREAS</div>
        <div className="grid-cells" style={{ gridTemplateColumns: 'repeat(2,minmax(0,1fr))' }}>
          {PROFILE.areas.map((a) => (
            <div key={a.name} style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ font: '600 10px/1.2 Oxanium, sans-serif', letterSpacing: '.2em' }}>{a.name}</span>
              <span style={{ font: '400 12px/1.45 Manrope, sans-serif', color: '#9aabc9' }}>{a.note}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="kicker mb">OPERATING PRINCIPLES</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {PRINCIPLES.map(([k, v], i) => (
            <div key={k} style={{ display: 'grid', gridTemplateColumns: '120px minmax(0,1fr)', gap: 12, padding: '10px 0', borderTop: '1px solid rgba(110,160,255,.14)', borderBottom: i === PRINCIPLES.length - 1 ? '1px solid rgba(110,160,255,.14)' : 0 }}>
              <span style={{ font: '600 10px/1.5 Oxanium, sans-serif', letterSpacing: '.18em' }}>{k}</span>
              <span style={{ font: '400 13px/1.5 Manrope, sans-serif', color: '#b3c0da' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="kicker mb">EXPERIENCE LOG</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, font: '400 13px/1.5 Manrope, sans-serif', color: '#b3c0da' }}>
          <button onClick={() => openProject('zytime')} style={logBtn('rgba(165,148,255,.3)')}>
            <span><b style={{ fontFamily: 'Oxanium', letterSpacing: '.14em', fontSize: 11 }}>ZYTIME</b> — Backend en equipo colaborativo (PR #13, PR #17)</span>
            <span style={{ font: '600 9px/1.6 Oxanium, sans-serif', letterSpacing: '.2em', color: '#a594ff' }}>TEAM</span>
          </button>
          <button onClick={() => openProject('simav')} style={logBtn('rgba(255,127,192,.3)')}>
            <span><b style={{ fontFamily: 'Oxanium', letterSpacing: '.14em', fontSize: 11 }}>SIMAV</b> — Dentro de la organización MNT-2026</span>
            <span style={{ font: '600 9px/1.6 Oxanium, sans-serif', letterSpacing: '.2em', color: '#ff7fc0' }}>ORG</span>
          </button>
          <div style={{ padding: '10px 12px', border: '1px dashed rgba(110,160,255,.3)', font: '500 11px/1.5 ui-monospace, Menlo, monospace', color: '#8597ba' }}>
            [ PLACEHOLDER · experiencia laboral / prácticas por agregar ]
          </div>
        </div>
      </div>
    </div>
  );
}
