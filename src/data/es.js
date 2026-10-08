// LSM // NEXUS — contenido en ESPAÑOL. Edita aquí perfil, proyectos, habilidades y arquitecturas.
// en.js tiene la misma estructura: mismos ids y mismo orden. Los campos marcados como "clave"
// (type, repo.state, arch, id, color) no se traducen.
export const PROFILE = {
  name: 'LINDA SOFIA MORENO',
  role: 'INGENIERA DE SISTEMAS',
  tagline: 'CONSTRUYO SISTEMAS. CREO MUNDOS.',
  statement: 'Construyo sistemas, experiencias y productos digitales.',
  intro: 'Construyo sistemas, experiencias y productos digitales — web, backend, mobile, IA y tiempo real.',
  areas: [
    { name: 'FULL STACK', note: 'Gold Deluxe · Cartoon Pizza · SIMAV' },
    { name: 'NUBE / DEVOPS', note: 'Docker · Podman · Render · Vercel · GitHub Actions' },
    { name: 'MÓVIL', note: 'IbagameApp · Kotlin · Android SDK 34' },
    { name: 'TECNOLOGÍA CREATIVA', note: 'Evermoon · experimentos en Unity · LSM // NEXUS' }
  ],
  github: 'https://github.com/Sofira28'
};

export const ABOUT = {
  paragraphs: [
    'Estudio Ingeniería de Sistemas. Antes de escribir código quiero entender el problema: dónde se pierde el material, por qué se duplica una reserva, cómo viaja un pedido de la mesa a la cocina.',
    'Por eso varios de mis proyectos empiezan con una especificación y terminan con pruebas. En el medio hay arquitectura hexagonal, datos geoespaciales, sincronización en tiempo real, apps Android y bots de Discord.',
    'Y cuando termino, construyo cosas como esta: un universo para mostrarlo.'
  ],
  principles: [
    ['PROBLEMA PRIMERO', 'Gold Deluxe nació de una pregunta concreta: ¿cuánto oro se pierde sin explicación?'],
    ['ARQUITECTURA', 'Hexagonal en SIMAV y ZYTIME; límites verificados con import-linter y ArchUnit.'],
    ['CURIOSIDAD', 'De un bot para parejas a un prototipo de horror en Unity: formatos distintos para aprender cosas distintas.'],
    ['APRENDIZAJE', 'Python, Java, JavaScript y Kotlin a lo largo de seis proyectos; cada stack elegido por el problema.']
  ],
  log: [
    { id: 'zytime', text: 'Backend en equipo colaborativo (PR #13, PR #17)', tag: 'EQUIPO', color: '#a594ff' },
    { id: 'simav', text: 'Dentro de la organización MNT-2026', tag: 'ORG', color: '#ff7fc0' }
  ],
  pending: '[ PENDIENTE · experiencia laboral / prácticas por agregar ]'
};

export const PROJECTS = [
  {
    id: 'gold', code: 'EXP.001', name: 'GOLD DELUXE', type: 'PERSONAL', kind: 'SISTEMA WEB · DJANGO', world: 'MUNDO DE DATOS INDUSTRIALES', color: '#e7b85c',
    tagline: 'Sistema web para controlar y conciliar materiales de oro en una cadena de producción.',
    problem: 'La empresa no podía saber cuánto material se perdía sin explicación.',
    solution: 'Registra el material que entra y sale del equipo PREPARADORES — oro rosa/rojo, amarillo, blanco y soldadura — y calcula la conciliación independiente por material al cerrar cada jornada. Los registros originales no pueden alterarse y todo queda auditado.',
    flow: ['ENTRADA DE MATERIAL', 'PROCESO', 'SALIDA DE MATERIAL', 'CONCILIACIÓN', 'AUDITORÍA'],
    sections: [
      { title: 'LA CONCILIACIÓN SEPARA', items: ['merma justificada', 'fundición', 'zuñido', 'material que permanece en el equipo', 'pérdida sin explicar'] },
      { title: 'MÓDULOS', items: ['usuarios', 'registrador', 'supervisor', 'catálogos de materiales', 'jornadas', 'evidencias', 'adjuntos', 'solicitudes', 'conciliación', 'auditoría'] }
    ],
    stack: [
      { g: 'NÚCLEO', items: ['Python 3.12', 'Django 6', 'PostgreSQL 16', 'psycopg'] },
      { g: 'ARCHIVOS Y REPORTES', items: ['openpyxl', 'ReportLab', 'Pillow'] },
      { g: 'EJECUCIÓN', items: ['Podman / Docker'] },
      { g: 'CALIDAD', items: ['pytest', 'pytest-django', 'Hypothesis', 'coverage', 'import-linter', 'ruff', 'GitHub Actions'] }
    ],
    role: 'Proyecto personal', method: 'Desarrollo guiado por especificación (SDD)',
    repo: { state: 'PRIVATE', note: 'Repositorio personal privado. Acceso bajo solicitud.' }, arch: 'gold'
  },
  {
    id: 'evermoon', code: 'EXP.002', name: 'EVERMOON', type: 'PERSONAL', kind: 'APLICACIÓN DE DISCORD', world: 'LUNA EVERMOON', color: '#c7b8ff',
    tagline: 'Bot de Discord que crea un espacio privado para cada pareja.',
    problem: 'Dar a cada pareja un lugar propio dentro de Discord para cartas, recuerdos, fechas, música, planes, sorpresas y juegos.',
    solution: 'Un bot con conexión de pareja y espacios separados: cartas, álbum de recuerdos, sorpresas, fechas, playlist con enlaces a YouTube, lista de planes, 5 juegos, puntos e insignias. 3 temas visuales, en español e inglés.',
    flow: ['DISCORD', 'INTERACCIONES', 'SERVICIOS', 'BASE DE DATOS'],
    sections: [
      { title: 'FUNCIONES', items: ['conexión de pareja', 'cartas', 'álbum de recuerdos', 'sorpresas', 'fechas', 'playlist (YouTube)', 'lista de planes', '5 juegos', 'puntos', 'insignias', '3 temas visuales', 'español / inglés'] },
      { title: 'PRIVACIDAD', items: ['datos de cada pareja separados', 'comando /privacy', 'política de privacidad', 'términos de uso'] }
    ],
    stack: [
      { g: 'EJECUCIÓN', items: ['JavaScript', 'Node.js 20', 'discord.js 14'] },
      { g: 'DATOS', items: ['SQL', 'Supabase', 'PostgreSQL', 'migraciones SQL'] },
      { g: 'CONFIGURACIÓN Y PRUEBAS', items: ['dotenv', 'node:test'] }
    ],
    role: 'Proyecto personal', method: null,
    repo: { state: 'PRIVATE', note: 'Repositorio personal privado. Acceso bajo solicitud.' }, arch: 'evermoon'
  },
  {
    id: 'pizza', code: 'EXP.003', name: 'CARTOON PIZZA', type: 'PERSONAL', kind: 'PLATAFORMA PARA RESTAURANTES · TIEMPO REAL', world: 'PIZZERÍA FUTURISTA', color: '#ff9b6a',
    tagline: 'Sistema de gestión para un restaurante: cartoon-pizza-api + cartoon-pizza-web.',
    problem: 'Coordinar el flujo de pedidos desde la mesa hasta la cocina y la caja en tiempo real, sin recargar la página.',
    solution: 'Cuatro roles — MESERO, COCINA, CAJA y ADMINISTRADOR — sincronizados con Socket.IO. El administrador consulta ventas, estadísticas, usuarios, menú y mesas.',
    flow: ['MESA', 'COCINA', 'CAJA', 'COMPLETADO'],
    sections: [
      { title: 'ROLES', items: ['MESERO', 'COCINA', 'CAJA', 'ADMINISTRADOR'] },
      { title: 'EL ADMINISTRADOR CONSULTA', items: ['ventas', 'estadísticas', 'usuarios', 'menú', 'mesas'] }
    ],
    stack: [
      { g: 'BACKEND · cartoon-pizza-api', items: ['JavaScript / Node.js', 'Express 5', 'MongoDB', 'Mongoose', 'Socket.IO', 'JWT', 'Zod', 'Passport', 'Google OAuth', 'rate limiting', 'node:test', 'supertest', 'GitHub Actions', 'Render'] },
      { g: 'FRONTEND · cartoon-pizza-web', items: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Socket.IO client', 'SheetJS', 'jsPDF', 'Vercel'] }
    ],
    role: 'Proyecto personal', method: null,
    repo: { state: 'PRIVATE', note: 'Repositorios personales privados (api + web). Acceso bajo solicitud.' }, arch: 'pizza'
  },
  {
    id: 'ibagame', code: 'EXP.004', name: 'IBAGAMEAPP', type: 'PERSONAL', kind: 'APP ANDROID · TURISMO GAMIFICADO', world: 'IBAGUÉ', color: '#62e0aa',
    tagline: 'Aplicación Android de turismo gamificado en Ibagué.',
    problem: 'Motivar a turistas y residentes a conocer la cultura y gastronomía tolimense.',
    solution: 'Escaneo de códigos QR en lugares turísticos y culturales — 70–150 puntos por lugar — con retos, rutas, logros, premios y niveles.',
    flow: ['RUTAS', 'LUGARES', 'ESCÁNER QR', 'LOGROS'],
    sections: [
      { title: 'LUGARES (EJEMPLOS)', items: ['Conservatorio del Tolima', 'Parque Centenario', 'Museo de Arte del Tolima'] },
      { title: 'PANTALLAS', items: ['login', 'registro', 'inicio', 'retos', 'mapas de cultura', 'mapas de gastronomía', 'rutas', 'escáner QR', 'logros', 'premios', 'perfil'] }
    ],
    stack: [
      { g: 'APP', items: ['Kotlin', 'Android SDK 34', 'Gradle Kotlin DSL', 'Material Design'] },
      { g: 'SERVICIOS BACKEND', items: ['Firebase Authentication', 'Cloud Firestore'] },
      { g: 'CÁMARA Y ESCANEO', items: ['CameraX', 'ML Kit', 'ZXing'] }
    ],
    role: 'Proyecto personal', method: null,
    repo: { state: 'PRIVATE', note: 'Repositorio personal privado. Acceso bajo solicitud.' }, arch: null
  },
  {
    id: 'simav', code: 'EXP.005', name: 'SIMAV', type: 'ORGANIZATION', kind: 'PLATAFORMA DE INTELIGENCIA VIAL · IA', world: 'CIUDAD SIMAV', color: '#4d8dff',
    tagline: 'Plataforma de inteligencia vial: detecta y gestiona daños en las vías a partir de fotografías.',
    problem: 'Priorizar reparaciones viales necesita saber dónde está el daño, qué tipo es y qué tan grave es.',
    solution: 'Fotos de un celular o cámara de vehículo con ubicación GPS. Una IA clasifica tipo de daño y severidad (criterios ASTM D6433); el backend guarda la foto solo si encuentra deterioro con suficiente confianza. El panel muestra todo en un mapa para priorizar reparaciones y generar reportes.',
    flow: ['CÁMARA', 'IMAGEN', 'VISIÓN IA', 'CLASIFICACIÓN', 'SEVERIDAD', 'POSTGIS', 'MAPA', 'PRIORIZACIÓN'],
    sections: [
      { title: 'DETECTA', items: ['baches', 'grietas', 'deterioro vial'] },
      { title: 'CLAVES DEL SISTEMA', items: ['arquitectura hexagonal', 'multi-organización', 'severidad basada en ASTM D6433', 'Gemini con Groq como respaldo', 'temas light / dark / night', 'gráficos propios'] }
    ],
    stack: [
      { g: 'BACKEND', items: ['Python 3.12', 'FastAPI', 'SQLAlchemy async', 'PostgreSQL', 'PostGIS', 'Alembic', 'JWT', 'Argon2', 'Google Gemini', 'Groq', 'ReportLab', 'Docker', 'Supabase', 'Render', 'pytest', 'ruff', 'mypy'] },
      { g: 'FRONTEND', items: ['JavaScript / JSX', 'React 18', 'Vite', 'React Router', 'CSS', 'Vercel'] },
      { g: 'LANDING', items: ['Astro', 'TypeScript', 'HTML', 'CSS'] }
    ],
    role: 'Desarrollado dentro de la organización MNT-2026', method: null,
    site: 'https://landing-project-neon.vercel.app',
    repo: { state: 'ORGANIZATION', url: 'https://github.com/MNT-2026', note: 'Proyecto de la organización MNT-2026 en GitHub.' }, arch: 'simav'
  },
  {
    id: 'zytime', code: 'EXP.006', name: 'ZYTIME', type: 'TEAM', kind: 'PLATAFORMA DE AGENDAMIENTO · BACKEND', world: 'SALA DE CONTROL', color: '#7ae3ff',
    tagline: 'Plataforma de agenda para negocios de servicios. Mi parte: el backend.',
    problem: 'Evitar reservas dobles y reducir la gestión manual de agendas.',
    solution: 'Cada negocio configura servicios, horarios y profesionales; los clientes reservan por webapp, WhatsApp o asistente de IA. Proyecto colaborativo — mi contribución fue principalmente al backend, en Java.',
    flow: ['NEGOCIO', 'SERVICIOS', 'PROFESIONALES', 'HORARIO', 'DISPONIBILIDAD', 'RESERVA'],
    sections: [
      { title: 'PR #17 — RESERVAS TRANSACCIONALES', items: ['reservar · consultar · cancelar · reagendar', 'restricción de exclusión PostgreSQL', 'ETag / If-Match', 'idempotencia dentro de la transacción', 'duración, precio y política de cancelación fijados al reservar'] },
      { title: 'PR #13 — SERVICIOS, PROFESIONALES Y HORARIOS', items: ['perfil del negocio', 'servicios · profesionales · horarios', 'bloqueos de tiempo', 'cálculo de disponibilidad', 'actor actual', 'errores Problem Details', 'correlation ID', 'idempotency store'] },
      { title: 'TAMBIÉN ESCRIBÍ', items: ['especificación', 'plan de configuración del negocio', 'pruebas', 'documentación del API'] }
    ],
    stack: [
      { g: 'BACKEND', items: ['Java', 'Spring Boot', 'PostgreSQL 18', 'Flyway', 'Hibernate', 'OpenAPI'] },
      { g: 'PRUEBAS', items: ['JUnit 5', 'Mockito', 'Testcontainers', 'ArchUnit'] },
      { g: 'ARQUITECTURA', items: ['monolito modular', 'arquitectura hexagonal'] }
    ],
    role: 'Backend — equipo colaborativo (PR #13, PR #17)', method: null,
    repo: { state: 'TEAM', note: 'Repositorio del equipo. Enlace pendiente de confirmar.' }, arch: 'zytime'
  }
];

// [tecnología, ids de proyectos donde se usó]
export const SKILLS = [
  { name: 'FRONTEND', techs: [['HTML', 'pizza simav'], ['CSS', 'pizza simav'], ['JavaScript', 'evermoon pizza simav'], ['TypeScript', 'simav'], ['React 18', 'simav'], ['Vite', 'simav'], ['React Router', 'simav'], ['Astro', 'simav'], ['Bootstrap', 'pizza'], ['Socket.IO client', 'pizza'], ['SheetJS', 'pizza'], ['jsPDF', 'pizza']] },
  { name: 'BACKEND', techs: [['Python', 'gold simav'], ['Java', 'zytime'], ['Node.js', 'evermoon pizza'], ['Django', 'gold'], ['FastAPI', 'simav'], ['Spring Boot', 'zytime'], ['Express', 'pizza'], ['discord.js', 'evermoon'], ['Socket.IO', 'pizza'], ['JWT', 'pizza simav'], ['Passport · Google OAuth', 'pizza'], ['Zod', 'pizza'], ['Argon2', 'simav']] },
  { name: 'BASES DE DATOS', techs: [['SQL', 'evermoon'], ['PostgreSQL', 'gold evermoon simav zytime'], ['PostGIS', 'simav'], ['MongoDB', 'pizza'], ['Mongoose', 'pizza'], ['Supabase', 'evermoon simav'], ['Cloud Firestore', 'ibagame'], ['SQLAlchemy async', 'simav'], ['Alembic', 'simav'], ['Hibernate', 'zytime'], ['Flyway', 'zytime'], ['psycopg', 'gold']] },
  { name: 'MÓVIL', techs: [['Kotlin', 'ibagame'], ['Android SDK 34', 'ibagame'], ['Gradle Kotlin DSL', 'ibagame'], ['CameraX', 'ibagame'], ['ZXing', 'ibagame'], ['Material Design', 'ibagame'], ['Firebase Authentication', 'ibagame']] },
  { name: 'DESPLIEGUE', techs: [['Docker', 'gold simav'], ['Podman', 'gold'], ['Render', 'pizza simav'], ['Vercel', 'pizza simav'], ['GitHub Actions', 'gold pizza']] },
  { name: 'IA', techs: [['Google Gemini', 'simav'], ['Groq', 'simav'], ['ML Kit', 'ibagame']] },
  { name: 'PRUEBAS', techs: [['pytest', 'gold simav'], ['pytest-django', 'gold'], ['Hypothesis', 'gold'], ['coverage', 'gold'], ['JUnit 5', 'zytime'], ['Mockito', 'zytime'], ['Testcontainers', 'zytime'], ['ArchUnit', 'zytime'], ['supertest', 'pizza'], ['node:test', 'evermoon pizza']] },
  { name: 'ARQUITECTURA', techs: [['Arquitectura hexagonal', 'simav zytime'], ['Monolito modular', 'zytime'], ['SDD', 'gold'], ['OpenAPI', 'zytime'], ['Multi-organización', 'simav'], ['Tiempo real', 'pizza'], ['Auditoría', 'gold'], ['Idempotencia · ETag', 'zytime']] },
  { name: 'HERRAMIENTAS', techs: [['ruff', 'gold simav'], ['mypy', 'simav'], ['import-linter', 'gold'], ['ReportLab', 'gold simav'], ['openpyxl', 'gold'], ['Pillow', 'gold'], ['dotenv', 'evermoon']] }
];

export const ARCH = [
  { id: 'overview', tab: 'GENERAL', title: 'FORMA GENERAL DE UN SISTEMA', kind: 'stack', summary: 'El patrón que se repite en los proyectos: cada capa con una responsabilidad.',
    layers: [
      { name: 'FRONTEND', items: ['React · Vite', 'Astro', 'HTML / CSS / JS · Bootstrap', 'Android (Kotlin)'], note: 'Interfaz para cada rol: dashboard de SIMAV, roles de Cartoon Pizza, app de IbagameApp.' },
      { name: 'API', items: ['FastAPI', 'Django', 'Express 5', 'Spring Boot'], note: 'Contratos HTTP con autenticación (JWT, Argon2, Passport) y validación (Zod).' },
      { name: 'SERVICIOS', items: ['dominio', 'reglas de negocio', 'tiempo real'], note: 'Donde viven las reglas: conciliación, severidad, disponibilidad, flujo de pedidos.' },
      { name: 'BASE DE DATOS', items: ['PostgreSQL', 'PostGIS', 'MongoDB', 'Supabase', 'Firestore'], note: 'Persistencia elegida por el problema: geoespacial, documental o relacional con migraciones.' }
    ] },
  { id: 'simav', tab: 'SIMAV', title: 'ARQUITECTURA HEXAGONAL', kind: 'hex', summary: 'El dominio no depende de FastAPI, de la base de datos ni del proveedor de IA.',
    clients: ['React 18 + Vite · panel', 'Astro · landing', 'Celular / cámara de vehículo'],
    inbound: ['FastAPI REST', 'JWT + Argon2', 'Multi-organización'],
    core: ['Daño vial: tipo y severidad', 'Criterios ASTM D6433', 'Guardar foto solo con confianza suficiente'],
    outbound: ['SQLAlchemy async → PostgreSQL + PostGIS', 'Alembic', 'Google Gemini (Groq respaldo)', 'ReportLab', 'Supabase'],
    deploy: ['Docker', 'Render', 'Vercel', 'pytest · ruff · mypy'],
    notes: { clients: 'Clientes: el panel (React 18 + Vite), la landing (Astro) y la captura de fotografías con GPS.', inbound: 'Adaptadores de entrada: la API FastAPI, autenticación JWT con Argon2 y aislamiento multi-organización.', core: 'Núcleo de dominio: tipo de daño, severidad según ASTM D6433 y la regla de guardar la foto solo cuando hay deterioro con suficiente confianza.', outbound: 'Adaptadores de salida: persistencia geoespacial (PostgreSQL + PostGIS vía SQLAlchemy async, migraciones con Alembic), visión con Gemini y Groq como respaldo, reportes con ReportLab, Supabase.', deploy: 'Despliegue y calidad: Docker, Render, Vercel; pytest, ruff y mypy.' } },
  { id: 'zytime', tab: 'ZYTIME', title: 'MONOLITO MODULAR + HEXAGONAL', kind: 'modular', summary: 'Proyecto de equipo. Resaltado: los módulos donde contribuí en el backend.',
    channels: ['Webapp', 'WhatsApp', 'Asistente de IA'],
    modules: [
      { name: 'CONFIGURACIÓN DEL NEGOCIO', tag: 'PR #13 · LINDA', mine: true, items: ['perfil del negocio', 'servicios', 'profesionales', 'horarios', 'bloqueos de tiempo', 'disponibilidad'], note: 'PR #13: perfil del negocio, servicios, profesionales, horarios, bloqueos de tiempo y cálculo de disponibilidad.' },
      { name: 'RESERVAS', tag: 'PR #17 · LINDA', mine: true, items: ['reservar', 'consultar', 'cancelar', 'reagendar'], note: 'PR #17: reservas transaccionales con restricción de exclusión PostgreSQL, ETag / If-Match e idempotencia dentro de la transacción. Duración, precio y política de cancelación quedan fijados al reservar.' },
      { name: 'TRANSVERSAL', tag: 'PR #13 · LINDA', mine: true, items: ['actor actual', 'Problem Details', 'correlation ID', 'idempotency store'], note: 'Piezas transversales de PR #13: actor actual, errores Problem Details, correlation ID e idempotency store.' },
      { name: 'OTROS MÓDULOS', tag: 'EQUIPO', mine: false, items: ['resto de la plataforma'], note: 'El resto del sistema fue construido por el equipo.' }
    ],
    infra: ['PostgreSQL 18', 'Flyway', 'Hibernate', 'OpenAPI'],
    tests: ['JUnit 5', 'Mockito', 'Testcontainers', 'ArchUnit'] },
  { id: 'gold', tab: 'GOLD DELUXE', title: 'DJANGO + POSTGRESQL + AUDITORÍA + PRUEBAS', kind: 'stack', summary: 'Registros inmutables y una conciliación por material al cierre de cada jornada.',
    layers: [
      { name: 'ROLES', items: ['usuarios', 'registrador', 'supervisor'], note: 'Quién registra y quién supervisa cada movimiento de material.' },
      { name: 'MÓDULOS DJANGO 6', items: ['catálogos de materiales', 'jornadas', 'evidencias', 'adjuntos', 'solicitudes'], note: 'Módulos del dominio en Django 6 sobre Python 3.12.' },
      { name: 'CONCILIACIÓN', items: ['merma justificada', 'fundición', 'zuñido', 'en equipo', 'pérdida sin explicar'], note: 'Conciliación independiente por material al cerrar cada jornada.' },
      { name: 'AUDITORÍA', items: ['registros originales inalterables', 'todo auditado'], note: 'Los registros originales no pueden alterarse; cada cambio queda auditado.' },
      { name: 'POSTGRESQL 16', items: ['psycopg', 'openpyxl · ReportLab · Pillow'], note: 'Persistencia en PostgreSQL 16; archivos y reportes con openpyxl, ReportLab y Pillow.' },
      { name: 'CONTROL DE CALIDAD', items: ['pytest', 'Hypothesis', 'import-linter', 'ruff', 'GitHub Actions'], note: 'pytest, pytest-django, Hypothesis, coverage, import-linter y ruff en GitHub Actions. Metodología SDD.' }
    ] },
  { id: 'evermoon', tab: 'EVERMOON', title: 'DISCORD + SERVICIOS + SUPABASE', kind: 'stack', summary: 'Un bot con datos separados por pareja.',
    layers: [
      { name: 'DISCORD', items: ['discord.js 14', 'Node.js 20'], note: 'El cliente es Discord; el bot corre en Node.js 20 con discord.js 14.' },
      { name: 'INTERACCIONES', items: ['comandos', '/privacy', 'ES / EN'], note: 'Interacciones del usuario, incluido /privacy, en español e inglés.' },
      { name: 'SERVICIOS', items: ['cartas', 'recuerdos', 'fechas', 'playlist', 'planes', 'juegos', 'puntos · insignias'], note: 'Cada función del espacio de pareja como servicio.' },
      { name: 'BASE DE DATOS', items: ['Supabase', 'PostgreSQL', 'migraciones SQL'], note: 'Datos de cada pareja separados. Migraciones SQL; pruebas con node:test.' }
    ] },
  { id: 'pizza', tab: 'CARTOON PIZZA', title: 'FRONTEND + API REST + SOCKET.IO + MONGODB', kind: 'stack', summary: 'Dos repositorios y un canal en tiempo real.',
    layers: [
      { name: 'FRONTEND · WEB', items: ['HTML / CSS / JS', 'Bootstrap', 'SheetJS · jsPDF', 'Vercel'], note: 'cartoon-pizza-web: vistas por rol, exportación con SheetJS y jsPDF, desplegado en Vercel.' },
      { name: 'API REST', items: ['Express 5', 'Zod', 'JWT · Passport · Google OAuth', 'rate limiting', 'Render'], note: 'cartoon-pizza-api: Express 5 con validación Zod, autenticación y rate limiting, desplegado en Render.' },
      { name: 'SOCKET.IO', items: ['mesa → cocina → caja', 'sin recargar'], note: 'Socket.IO sincroniza los pedidos entre roles en tiempo real.' },
      { name: 'MONGODB', items: ['Mongoose'], note: 'Persistencia en MongoDB con Mongoose. Pruebas con node:test y supertest en GitHub Actions.' }
    ] }
];
