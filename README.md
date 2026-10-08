# Handoff: LSM // NEXUS — Portfolio 3D interactivo

## Overview
Portfolio profesional de **Linda Sofia Moreno — Systems Engineer** presentado como un universo digital 3D (estética anime sci‑fi / cyber blue). Dos objetivos simultáneos: **WOW factor** y **claridad para recruiters** (quién es, qué hace, stack y proyectos en < 10 s; CV, GitHub y contacto siempre a 1 clic).

## About the Design Files
Los archivos en `reference/` son **referencias de diseño hechas en HTML** (un prototipo funcional: `LSM Nexus.dc.html` + `nexus-data.js`). NO son código de producción para copiar tal cual. La tarea es **recrear este diseño en un proyecto nuevo con React + Vite + React Three Fiber (+ Drei)**, siguiendo la arquitectura propuesta abajo. Para abrir la referencia: servir la carpeta `reference/` con un servidor estático (`npx serve reference`) y abrir `LSM Nexus.dc.html`.

El prototipo usa estilos inline y un runtime propio (`support.js`); en la implementación real usar Tailwind o CSS modules + componentes React.

## Fidelity
**High‑fidelity** en UI/HUD (colores, tipografía, layout, copy, estados e interacciones finales).
**Mid‑fidelity** en 3D: los mundos están construidos con primitivas three.js como blockout. El avatar es un **placeholder** (cápsula holográfica + pelo burdeos + gafas) — debe reemplazarse por un modelo GLB estilizado (anime 3D) hecho en Blender a partir de la foto de Linda.

## Arquitectura recomendada
```
src/
├── data/projectsData.js      ← ya incluido (copia de nexus-data.js): PROFILE, PROJECTS, SKILLS, ARCH
├── scenes/Universe.jsx       ← Canvas R3F, luces, estrellas, grid polar, fog
├── scenes/Tunnel.jsx         ← túnel de anillos para la transición de entrada
├── avatar/Avatar.jsx         ← carga avatar.glb (useGLTF) + scan ring + Core
├── worlds/{Gold,Evermoon,Pizza,Ibagame,Simav,Zytime}World.jsx
├── worlds/sectors/{Constellation3D,Lab,ContactAntenna}.jsx
├── components/hud/{Brand,Toolbar,MenuRail,MobileDock,ModeSwitch,IntroCard,Toast,WorldLabel}.jsx
├── sections/{About,ProjectsDB,ProjectDetail,Systems,Architecture,Lab,Contact}.jsx
├── sections/SecretRoom.jsx
├── hooks/{useCameraRig,useKeyboard,useJoystick,usePerfTier,useSound}.js
├── animations/ (GSAP timelines: boot, enter, flyTo)
├── shaders/ (opcional: hologram, scanline)
└── utils/
```
Stack: React, Vite, three, @react-three/fiber, @react-three/drei (Html para labels, useGLTF, Stars/Points, PerformanceMonitor, AdaptiveDpr), GSAP para cámara/timelines, Framer Motion para paneles. Deploy: Vercel. Code‑split: cargar el Canvas (`React.lazy`) **solo después de ENTER NEXUS**.

## Flujo / Pantallas

### 1. Boot screen
- Fondo `#02040b` con radial `rgba(3,6,16,.55) → rgba(2,4,11,.9)`. Columna centrada `max-width 560px`.
- Líneas de terminal (mono 13px/1.5, color `#a9c4ff`, aparecen cada 230–370 ms):
  `> BOOTING SYSTEM...` · `> INITIALIZING NEXUS...` · `> LOADING CORE...` · `> LOADING PROJECTS... 06 FOUND` · `> LOADING SKILLS...` · `> CONNECTING...` · `RENDER PROFILE ....... 3D · HIGH|3D · LITE|2D · PERFORMANCE` (`#6f82a8`) · `SYSTEM STATUS ........ ONLINE` (`#5ff0b0`). Cursor bloque 8×15 `#6fe3ff` parpadeando.
- Luego (fade‑up .9 s cubic-bezier(.2,.8,.2,1)): **LSM** Oxanium 700 clamp(56px,12vw,104px) tracking .14em + línea gradiente `#4d8dff→transparent` que crece (scaleX); `L I N D A   S O F I A   M O R E N O` Oxanium 600 15px tracking .42em; `SYSTEMS ENGINEER` (#4d8dff) / `BUILD SYSTEMS. CREATE WORLDS.` (#6f82a8) 11px tracking .32em.
- Botones: **[ ENTER NEXUS ]** (bg `#4d8dff`, texto `#02040b`, 52px alto, Oxanium 700 13px tracking .3em, glow `0 0 30px rgba(77,141,255,.35)`, hover bg `#6fe3ff`) y **QUICK ACCESS → PROJECTS** (outline `rgba(110,160,255,.35)`) que entra directo en SYSTEM MODE con la base de datos abierta. Enter ↵ = ENTER NEXUS. Toggles SOUND y RENDER.
- **Durante el boot NO se renderiza 3D.** Se corre un probe GPU mínimo (renderer 64×64, 1 esfera, 1 warmup + 3 renders con `readPixels`) para elegir tier: avg > 30 ms o warmup > 1200 ms → 2D; avg > 12 ms o warmup > 400 ms → LITE; si no HIGH. Sin WebGL o renderer software (SwiftShader/llvmpipe) → 2D.

### 2. Enter transition
Overlay del boot: opacity 1→0, scale 1→1.12, blur 0→12px (.75–.9 s). Burst de ~600 partículas cyan frente a la cámara (1.1 s). Cámara de z=700 a la posición orbital en 3.4 s (easeInOutCubic) a través de un túnel de anillos azules/violetas; FOV 55→83→55. Reloj de pared + guard a 6 s que fuerza la llegada. Reduced motion → corte directo.

### 3. Universo 3D (HUD)
- Escena: fondo/fog `#02040b` (FogExp2 0.0105), estrellas (HIGH 3800+500, LITE 600), polvo cyan (solo HIGH), planeta lejano azul con anillo, luna violeta, PolarGrid azul a y=-1.3.
- Centro: plataforma doble metálica (`#0b1328`, metalness .75), anillo `#4d8dff`, anillo segmentado cyan rotando, **CORE**: 3 anillos giroscopio + icosaedro wireframe sobre la cabeza del avatar. El color del Core interpola al color del proyecto/sección activo.
- 6 mundos en anillo (radio 19, alturas 1.2/3.4/.4/2.4/2.6/1.0), cada uno sobre un disco con anillo de su color; hover/selección = scale 1.1 + anillo opacidad .95. SIMAV escala 1.35 (el mundo más impresionante).
- Sectores: Constelación de skills (-32,11,-24), Lab (31,3,-25), Antena de contacto (0,2,-40).
- **Labels de mundo** (HTML proyectado): caja `rgba(4,8,20,.6)` borde `rgba(110,160,255,.28)` → color del mundo al hover; código 9px cyan + nombre 11px tracking .18em. Se ocultan si caen sobre zonas del HUD.
- **HUD desktop**: brand arriba‑izq (`LSM // NEXUS` 15px tracking .3em, `//` azul; status `● SYSTEM: ONLINE | MODE: …` 10px); toolbar arriba‑der (`↓ RESUME` destacado, `GITHUB ↗`, SOUND, MOTION, RENDER, FPS); menú vertical izquierdo (`SYSTEM MENU`, items 01–06 ABOUT/PROJECTS/SYSTEMS/ARCHITECTURE/LAB/CONTACT con barra 12→26px activa cyan con glow); abajo‑izq switch EXPLORATION/SYSTEM + hint de controles; abajo‑der Intro card 380px (nombre, rol, statement, 4 áreas, `[ ACCESS PROJECTS · 06 ]`, ABOUT).
- **HUD mobile (<760px)**: top bar con CV / GH ↗ / ⋯ (popover con sound/motion/render/mode), dock inferior 6 columnas (ABOUT WORK SKILLS ARCH LAB LINK, 56px), joystick virtual 112px abajo‑izq (solo exploration), intro card arriba. Hit targets ≥ 44px.
- **Paneles**: desktop a la derecha (`top 70 / right 20 / bottom 20`, ancho 480; 680 para SYSTEMS y ARCHITECTURE), mobile bottom sheet 66% alto, radio 14px arriba. Glass `rgba(5,9,22,.82)` + blur 16px + borde `rgba(110,160,255,.2)` + sombra `0 30px 80px rgba(0,0,0,.5)`; entrada translateY 16→0 .45 s. Header: `CÓDIGO / TÍTULO` + `ESC ✕`; línea gradiente animada. Al abrir panel la cámara usa `setViewOffset` para desplazar el foco fuera del panel (x = (anchoPanel+20)/2 desktop, y = 33% alto en mobile).

### 4. Secciones (contenido en `projectsData.js`)
- **ABOUT (Sector 03)**: slot avatar 3:4 (rayado placeholder), nombre espaciado, cita “Construyo sistemas, experiencias y productos digitales.”, 3 párrafos (ver referencia), grid 2×2 de ÁREAS, OPERATING PRINCIPLES (4 filas), EXPERIENCE LOG (ZYTIME team, SIMAV org, placeholder de experiencia laboral). Cámara: primer plano del avatar.
- **PROJECT DATABASE (Sector 01)**: “06 PROJECTS INDEXED” (56px), filtros ALL/PERSONAL/TEAM/ORGANIZATION con conteo, filas (no cards): dot de color + número, nombre + tagline, badge de tipo + `VIEW PROJECT →`. Colores de tipo: PERSONAL `#6fe3ff`, TEAM `#a594ff`, ORGANIZATION `#ff7fc0`.
- **PROJECT DETAIL**: badge tipo + kind, nombre 34px con text-shadow del color, línea acento, tagline, WORLD; CTAs `[ VIEW ARCHITECTURE ]` (si existe) y `[ GITHUB ] <estado repo>` → perfil github.com/Sofira28; caja REPO con nota (privado / org / team, enlace pendiente); PROBLEM (#ff7fc0) / SOLUTION (#5ff0b0); SYSTEM FLOW con chips y flechas, una señal recorre los pasos cada 900 ms; secciones (módulos, funciones, PRs…); STACK por grupo; MY ROLE / METHOD; prev/next. Cámara vuela al mundo (yaw = atan2(x,z), dist 11, SIMAV 14).
- **TECHNOLOGY CONSTELLATION (Sector 02)**: SVG 560×560 — núcleo LSM, 9 hubs de categoría en radio 160, techs como puntos alrededor de cada hub; tabs de categoría; chips de tecnologías; al elegir una → “USED IN” con links a proyectos. **Sin porcentajes.**
- **ARCHITECTURE MODE**: tabs OVERVIEW/SIMAV/ZYTIME/GOLD DELUXE/EVERMOON/CARTOON PIZZA. Tres renderers: `stack` (capas apiladas con conectores, zig‑zag 10px), `hex` (Clients → Inbound | Ports{Domain core} | Outbound → Deploy), `modular` (canales → monolito con módulos; los de Linda sólidos con tag cyan “PR #13/#17 · LINDA”, “OTROS MÓDULOS · EQUIPO” punteado). Clic en cualquier parte → INSPECTOR con la nota.
- **LSM // LAB (Sector 04)**: stats derivados (06 proyectos, N tech nodes, 04 lenguajes), terminal (help, about, projects, skills, stats, github, contact, resume, open <n|sección>, ls, ls -a, clear, whoami, `sudo coffee` → “☕ ACCESS GRANTED / Developer fuel detected.”, `cd .secret_room` → Secret Room), botones de comandos rápidos.
- **SECRET ROOM**: overlay oscuro, linterna = radial-gradient que sigue al puntero (CSS vars), puerta y nota clicables con texto sobre el prototipo de horror en Unity (detalles por agregar). EXIT / Esc.
- **ESTABLISH CONNECTION (Sector 05)**: filas GITHUB (live), EMAIL, LINKEDIN, CV (placeholders “PENDING” hasta configurarlos), `[ DOWNLOAD RESUME ]`.

## Interacciones
- Desktop: WASD/flechas mover (Shift rápido), Q/E altura, arrastrar = orbitar (yaw/pitch, pitch -0.05…1.25), rueda zoom (5–75), clic en mundo/sector = abrir. Teclas 1–6 secciones, M modo, Esc cerrar. Mobile: joystick, arrastre 1 dedo, pinch zoom, tap.
- Cámara: damping exponencial `1 - exp(-dt*3)`. SYSTEM MODE: auto‑órbita lenta (0.05 rad/s) y navegación por menú.
- Watchdog de rendimiento: 2 frames > 200 ms seguidos o FPS bajo sostenido → HIGH→LITE→2D con toast. En 2D se detiene el loop rAF y se muestra un **mapa orbital 2D** con los 6 nodos como botones.
- Sonido (off por defecto, WebAudio): drone ambiental 55/82/110 Hz con lowpass, blips para tick/hover/click/open/close/activate/teleport.
- Accesibilidad: `prefers-reduced-motion` + toggle MOTION, focus-visible cyan, aria labels/roles (radiogroup, tablist, log, aria-current), contraste ≥ 4.5:1, navegación completa sin 3D.

## Estado
`phase (boot|world)`, `bootLines`, `bootDone`, `arrived`, `panel`, `pid`, `mode`, `tier (high|lite|2d)`, `sound`, `reduced`, `isMobile`, `filter`, `cat`, `tech`, `archId`, `archSel`, `term`, `secret`. Props configurables: `perfMode`, `skipBoot`, `forceReducedMotion`, `showFps`, `resumeUrl`, `emailAddress`, `linkedinUrl`.

## Design Tokens
- Fondo `#02040b`; panel `rgba(5,9,22,.82)`; celdas `#060b1d`; plataforma `#0b1328`
- Texto `#e6edfb` / secundario `#c7d3ea`, `#b3c0da`, `#9aabc9` / tenue `#8597ba`, `#6f82a8` / líneas `#33456e`, `#22355e`
- Azul eléctrico `#4d8dff` (primario) · Cyan `#6fe3ff` · Violeta `#a594ff` · Magenta `#ff6fb8`/`#ff7fc0` · OK `#5ff0b0` · Warning `#ffb38a`
- Bordes `rgba(110,160,255,.16–.35)`
- Mundos: Gold `#e7b85c`, Evermoon `#c7b8ff`, Pizza `#ff9b6a`, Ibagame `#62e0aa`, SIMAV `#4d8dff`, ZYTIME `#7ae3ff`
- Tipografía: **Oxanium** (display/sistema, 400–700, tracking .14–.42em, mayúsculas) + **Manrope** (cuerpo, 400–600, 12.5–16px, lh 1.5–1.65). Mono del sistema solo en terminal.
- Escala: 9 / 10 / 11 / 12.5 / 14 / 15 / 17 / 22 / 26 / 34 / 56 / 104 px. Radios: 0 (UI angular); 14px solo bottom sheet; 50% dots.
- Espaciado: 4 / 6 / 8 / 10 / 12 / 14 / 16 / 18 / 22 / 28 px.

## Assets pendientes
- `avatar.glb` (anime 3D estilizado de Linda: cabello largo ondulado burdeos, gafas redondas, chaqueta oscura, detalles luminosos sutiles, audífonos). Draco/meshopt, < 2 MB.
- Modelos GLB opcionales para cada mundo (los blockouts de la referencia definen composición y escala).
- CV en PDF, email, LinkedIn, enlaces de repos de equipo/organización si se pueden publicar.
- Capturas del proyecto Unity para la Secret Room.

## Files
- `reference/LSM Nexus.dc.html` — prototipo completo (template + lógica; la escena three.js está en los métodos `initScene`, `buildWorlds`, `w_*`, `tick`).
- `reference/nexus-data.js` — contenido real de proyectos, skills y arquitecturas.
- `reference/support.js` — runtime necesario solo para abrir la referencia.
- `src/data/projectsData.js` — mismo contenido, listo para usar en la app.

## Prompt sugerido para Claude Code
> Lee `design_handoff_lsm_nexus/README.md` y los archivos de `reference/`. Crea un proyecto React + Vite + React Three Fiber + Drei + GSAP que recree LSM // NEXUS siguiendo la arquitectura `src/` propuesta, usando `src/data/projectsData.js` como única fuente de contenido. Empieza por el boot + HUD + paneles (funcionales sin 3D), luego el Canvas lazy con el universo, después cada mundo. No inventes proyectos, tecnologías ni enlaces.
