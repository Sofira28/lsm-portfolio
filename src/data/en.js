// LSM // NEXUS — ENGLISH content. Same structure, ids and order as es.js.
// Key fields (type, repo.state, arch, id, color) are not translated.
export const PROFILE = {
  name: 'LINDA SOFIA MORENO',
  role: 'SYSTEMS ENGINEER',
  tagline: 'BUILD SYSTEMS. CREATE WORLDS.',
  statement: 'I build systems, experiences and digital products.',
  intro: 'I build systems, experiences and digital products — web, backend, mobile, AI and real time.',
  areas: [
    { name: 'FULL STACK', note: 'Gold Deluxe · Cartoon Pizza · SIMAV' },
    { name: 'CLOUD / DEVOPS', note: 'Docker · Podman · Render · Vercel · GitHub Actions' },
    { name: 'MOBILE', note: 'IbagameApp · Kotlin · Android SDK 34' },
    { name: 'CREATIVE TECHNOLOGY', note: 'Evermoon · Unity experiments · LSM // NEXUS' }
  ],
  github: 'https://github.com/Sofira28'
};

export const ABOUT = {
  paragraphs: [
    "I study Systems Engineering. Before writing code I want to understand the problem: where material gets lost, why a booking gets duplicated, how an order travels from the table to the kitchen.",
    'That is why several of my projects start with a specification and end with tests. In between there is hexagonal architecture, geospatial data, real-time sync, Android apps and Discord bots.',
    'And when I am done, I build things like this: a universe to show it.'
  ],
  principles: [
    ['PROBLEM FIRST', 'Gold Deluxe started from a concrete question: how much gold is lost without explanation?'],
    ['ARCHITECTURE', 'Hexagonal in SIMAV and ZYTIME; boundaries enforced with import-linter and ArchUnit.'],
    ['CURIOSITY', 'From a bot for couples to a horror prototype in Unity: different formats to learn different things.'],
    ['LEARNING', 'Python, Java, JavaScript and Kotlin across six projects; each stack chosen for the problem.']
  ],
  log: [
    { id: 'zytime', text: 'Backend in a collaborative team (PR #13, PR #17)', tag: 'TEAM', color: '#a594ff' },
    { id: 'simav', text: 'Within the MNT-2026 organization', tag: 'ORG', color: '#ff7fc0' }
  ],
  pending: '[ PENDING · work experience / internships to add ]'
};

export const PROJECTS = [
  {
    id: 'gold', code: 'EXP.001', name: 'GOLD DELUXE', type: 'PERSONAL', kind: 'WEB SYSTEM · DJANGO', world: 'INDUSTRIAL DATA WORLD', color: '#e7b85c',
    tagline: 'Web system to track and reconcile gold materials across a production line.',
    problem: 'The company had no way to know how much material was being lost without explanation.',
    solution: 'It records the material that goes in and out of the PREPARERS team — rose/red, yellow and white gold plus solder — and computes an independent reconciliation per material when each work shift closes. Original records cannot be altered and everything is audited.',
    flow: ['MATERIAL IN', 'PROCESS', 'MATERIAL OUT', 'RECONCILIATION', 'AUDIT'],
    sections: [
      { title: 'THE RECONCILIATION SEPARATES', items: ['justified shrinkage', 'smelting', 'zuñido', 'material still held by the team', 'unexplained loss'] },
      { title: 'MODULES', items: ['users', 'recorder', 'supervisor', 'material catalogs', 'work shifts', 'evidence', 'attachments', 'requests', 'reconciliation', 'auditing'] }
    ],
    stack: [
      { g: 'CORE', items: ['Python 3.12', 'Django 6', 'PostgreSQL 16', 'psycopg'] },
      { g: 'FILES & REPORTS', items: ['openpyxl', 'ReportLab', 'Pillow'] },
      { g: 'RUNTIME', items: ['Podman / Docker'] },
      { g: 'QUALITY', items: ['pytest', 'pytest-django', 'Hypothesis', 'coverage', 'import-linter', 'ruff', 'GitHub Actions'] }
    ],
    role: 'Personal project', method: 'Specification Driven Development (SDD)',
    repo: { state: 'PRIVATE', note: 'Private personal repository. Access on request.' }, arch: 'gold'
  },
  {
    id: 'evermoon', code: 'EXP.002', name: 'EVERMOON', type: 'PERSONAL', kind: 'DISCORD APPLICATION', world: 'EVERMOON MOON', color: '#c7b8ff',
    tagline: 'Discord bot that creates a private space for each couple.',
    problem: 'Give each couple a place of their own inside Discord for letters, memories, dates, music, plans, surprises and games.',
    solution: 'A bot with couple pairing and separate spaces: letters, a memory album, surprises, dates, a playlist with YouTube links, a plans list, 5 games, points and badges. 3 visual themes, in Spanish and English.',
    flow: ['DISCORD', 'INTERACTIONS', 'SERVICES', 'DATABASE'],
    sections: [
      { title: 'FEATURES', items: ['couple pairing', 'letters', 'memory album', 'surprises', 'dates', 'playlist (YouTube)', 'plans list', '5 games', 'points', 'badges', '3 visual themes', 'Spanish / English'] },
      { title: 'PRIVACY', items: ['each couple’s data kept separate', '/privacy command', 'privacy policy', 'terms of use'] }
    ],
    stack: [
      { g: 'RUNTIME', items: ['JavaScript', 'Node.js 20', 'discord.js 14'] },
      { g: 'DATA', items: ['SQL', 'Supabase', 'PostgreSQL', 'SQL migrations'] },
      { g: 'CONFIG & TESTS', items: ['dotenv', 'node:test'] }
    ],
    role: 'Personal project', method: null,
    repo: { state: 'PRIVATE', note: 'Private personal repository. Access on request.' }, arch: 'evermoon'
  },
  {
    id: 'pizza', code: 'EXP.003', name: 'CARTOON PIZZA', type: 'PERSONAL', kind: 'RESTAURANT PLATFORM · REAL-TIME', world: 'FUTURISTIC PIZZERIA', color: '#ff9b6a',
    tagline: 'Management system for a restaurant: cartoon-pizza-api + cartoon-pizza-web.',
    problem: 'Coordinate the order flow from the table to the kitchen and the register in real time, without reloading the page.',
    solution: 'Four roles — WAITER, KITCHEN, CASHIER and ADMIN — kept in sync with Socket.IO. The admin reviews sales, statistics, users, menu and tables.',
    flow: ['TABLE', 'KITCHEN', 'CASH', 'COMPLETED'],
    sections: [
      { title: 'ROLES', items: ['WAITER', 'KITCHEN', 'CASHIER', 'ADMIN'] },
      { title: 'THE ADMIN REVIEWS', items: ['sales', 'statistics', 'users', 'menu', 'tables'] }
    ],
    stack: [
      { g: 'BACKEND · cartoon-pizza-api', items: ['JavaScript / Node.js', 'Express 5', 'MongoDB', 'Mongoose', 'Socket.IO', 'JWT', 'Zod', 'Passport', 'Google OAuth', 'rate limiting', 'node:test', 'supertest', 'GitHub Actions', 'Render'] },
      { g: 'FRONTEND · cartoon-pizza-web', items: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Socket.IO client', 'SheetJS', 'jsPDF', 'Vercel'] }
    ],
    role: 'Personal project', method: null,
    repo: { state: 'PRIVATE', note: 'Private personal repositories (api + web). Access on request.' }, arch: 'pizza'
  },
  {
    id: 'ibagame', code: 'EXP.004', name: 'IBAGAMEAPP', type: 'PERSONAL', kind: 'ANDROID APP · GAMIFIED TOURISM', world: 'IBAGUÉ', color: '#62e0aa',
    tagline: 'Gamified tourism Android app for Ibagué, Colombia.',
    problem: 'Encourage tourists and residents to discover the culture and food of Tolima.',
    solution: 'Scan QR codes at tourist and cultural spots — 70–150 points per place — with challenges, routes, achievements, rewards and levels.',
    flow: ['ROUTES', 'LANDMARKS', 'QR SCANNER', 'ACHIEVEMENTS'],
    sections: [
      { title: 'PLACES (EXAMPLES)', items: ['Conservatorio del Tolima', 'Parque Centenario', 'Museo de Arte del Tolima'] },
      { title: 'SCREENS', items: ['login', 'sign up', 'home', 'challenges', 'culture maps', 'food maps', 'routes', 'QR scanner', 'achievements', 'rewards', 'profile'] }
    ],
    stack: [
      { g: 'APP', items: ['Kotlin', 'Android SDK 34', 'Gradle Kotlin DSL', 'Material Design'] },
      { g: 'BACKEND SERVICES', items: ['Firebase Authentication', 'Cloud Firestore'] },
      { g: 'CAMERA & SCAN', items: ['CameraX', 'ML Kit', 'ZXing'] }
    ],
    role: 'Personal project', method: null,
    repo: { state: 'PRIVATE', note: 'Private personal repository. Access on request.' }, arch: null
  },
  {
    id: 'simav', code: 'EXP.005', name: 'SIMAV', type: 'ORGANIZATION', kind: 'ROAD INTELLIGENCE PLATFORM · AI', world: 'SIMAV CITY', color: '#4d8dff',
    tagline: 'Road intelligence platform: detects and manages road damage from photographs.',
    problem: 'Prioritizing road repairs requires knowing where the damage is, what kind it is and how severe it is.',
    solution: 'Photos from a phone or vehicle camera with GPS location. An AI classifies damage type and severity (ASTM D6433 criteria); the backend stores the photo only if it finds deterioration with enough confidence. The dashboard shows everything on a map to prioritize repairs and generate reports.',
    flow: ['CAMERA', 'IMAGE', 'AI VISION', 'CLASSIFICATION', 'SEVERITY', 'POSTGIS', 'MAP', 'PRIORITIZATION'],
    sections: [
      { title: 'DETECTS', items: ['potholes', 'cracks', 'road deterioration'] },
      { title: 'SYSTEM HIGHLIGHTS', items: ['hexagonal architecture', 'multi-tenant', 'severity based on ASTM D6433', 'Gemini with Groq as fallback', 'light / dark / night themes', 'custom charts'] }
    ],
    stack: [
      { g: 'BACKEND', items: ['Python 3.12', 'FastAPI', 'SQLAlchemy async', 'PostgreSQL', 'PostGIS', 'Alembic', 'JWT', 'Argon2', 'Google Gemini', 'Groq', 'ReportLab', 'Docker', 'Supabase', 'Render', 'pytest', 'ruff', 'mypy'] },
      { g: 'FRONTEND', items: ['JavaScript / JSX', 'React 18', 'Vite', 'React Router', 'CSS', 'Vercel'] },
      { g: 'LANDING', items: ['Astro', 'TypeScript', 'HTML', 'CSS'] }
    ],
    role: 'Built within the MNT-2026 organization', method: null,
    site: 'https://landing-project-neon.vercel.app',
    repo: { state: 'ORGANIZATION', url: 'https://github.com/MNT-2026', note: 'MNT-2026 organization project on GitHub.' }, arch: 'simav'
  },
  {
    id: 'zytime', code: 'EXP.006', name: 'ZYTIME', type: 'TEAM', kind: 'SCHEDULING PLATFORM · BACKEND', world: 'CONTROL ROOM', color: '#7ae3ff',
    tagline: 'Scheduling platform for service businesses. My part: the backend.',
    problem: 'Prevent double bookings and reduce manual schedule management.',
    solution: 'Each business sets up services, hours and professionals; customers book through a web app, WhatsApp or an AI assistant. Collaborative project — my contribution was mainly to the backend, in Java.',
    flow: ['BUSINESS', 'SERVICES', 'PROFESSIONALS', 'SCHEDULE', 'AVAILABILITY', 'BOOKING'],
    sections: [
      { title: 'PR #17 — TRANSACTIONAL BOOKINGS', items: ['book · view · cancel · reschedule', 'PostgreSQL exclusion constraint', 'ETag / If-Match', 'idempotency inside the transaction', 'duration, price and cancellation policy locked at booking time'] },
      { title: 'PR #13 — SERVICES, PROFESSIONALS AND HOURS', items: ['business profile', 'services · professionals · hours', 'time blocks', 'availability calculation', 'current actor', 'Problem Details errors', 'correlation ID', 'idempotency store'] },
      { title: 'I ALSO WROTE', items: ['specification', 'business setup plan', 'tests', 'API documentation'] }
    ],
    stack: [
      { g: 'BACKEND', items: ['Java', 'Spring Boot', 'PostgreSQL 18', 'Flyway', 'Hibernate', 'OpenAPI'] },
      { g: 'TESTING', items: ['JUnit 5', 'Mockito', 'Testcontainers', 'ArchUnit'] },
      { g: 'ARCHITECTURE', items: ['modular monolith', 'hexagonal architecture'] }
    ],
    role: 'Backend — collaborative team (PR #13, PR #17)', method: null,
    repo: { state: 'TEAM', note: 'Team repository. Link pending confirmation.' }, arch: 'zytime'
  }
];

// [technology, ids of the projects where it was used]
export const SKILLS = [
  { name: 'FRONTEND', techs: [['HTML', 'pizza simav'], ['CSS', 'pizza simav'], ['JavaScript', 'evermoon pizza simav'], ['TypeScript', 'simav'], ['React 18', 'simav'], ['Vite', 'simav'], ['React Router', 'simav'], ['Astro', 'simav'], ['Bootstrap', 'pizza'], ['Socket.IO client', 'pizza'], ['SheetJS', 'pizza'], ['jsPDF', 'pizza']] },
  { name: 'BACKEND', techs: [['Python', 'gold simav'], ['Java', 'zytime'], ['Node.js', 'evermoon pizza'], ['Django', 'gold'], ['FastAPI', 'simav'], ['Spring Boot', 'zytime'], ['Express', 'pizza'], ['discord.js', 'evermoon'], ['Socket.IO', 'pizza'], ['JWT', 'pizza simav'], ['Passport · Google OAuth', 'pizza'], ['Zod', 'pizza'], ['Argon2', 'simav']] },
  { name: 'DATABASE', techs: [['SQL', 'evermoon'], ['PostgreSQL', 'gold evermoon simav zytime'], ['PostGIS', 'simav'], ['MongoDB', 'pizza'], ['Mongoose', 'pizza'], ['Supabase', 'evermoon simav'], ['Cloud Firestore', 'ibagame'], ['SQLAlchemy async', 'simav'], ['Alembic', 'simav'], ['Hibernate', 'zytime'], ['Flyway', 'zytime'], ['psycopg', 'gold']] },
  { name: 'MOBILE', techs: [['Kotlin', 'ibagame'], ['Android SDK 34', 'ibagame'], ['Gradle Kotlin DSL', 'ibagame'], ['CameraX', 'ibagame'], ['ZXing', 'ibagame'], ['Material Design', 'ibagame'], ['Firebase Authentication', 'ibagame']] },
  { name: 'DEPLOY', techs: [['Docker', 'gold simav'], ['Podman', 'gold'], ['Render', 'pizza simav'], ['Vercel', 'pizza simav'], ['GitHub Actions', 'gold pizza']] },
  { name: 'AI', techs: [['Google Gemini', 'simav'], ['Groq', 'simav'], ['ML Kit', 'ibagame']] },
  { name: 'TESTING', techs: [['pytest', 'gold simav'], ['pytest-django', 'gold'], ['Hypothesis', 'gold'], ['coverage', 'gold'], ['JUnit 5', 'zytime'], ['Mockito', 'zytime'], ['Testcontainers', 'zytime'], ['ArchUnit', 'zytime'], ['supertest', 'pizza'], ['node:test', 'evermoon pizza']] },
  { name: 'ARCHITECTURE', techs: [['Hexagonal architecture', 'simav zytime'], ['Modular monolith', 'zytime'], ['SDD', 'gold'], ['OpenAPI', 'zytime'], ['Multi-tenant', 'simav'], ['Real time', 'pizza'], ['Auditing', 'gold'], ['Idempotency · ETag', 'zytime']] },
  { name: 'TOOLS', techs: [['ruff', 'gold simav'], ['mypy', 'simav'], ['import-linter', 'gold'], ['ReportLab', 'gold simav'], ['openpyxl', 'gold'], ['Pillow', 'gold'], ['dotenv', 'evermoon']] }
];

export const ARCH = [
  { id: 'overview', tab: 'OVERVIEW', title: 'GENERAL SHAPE OF A SYSTEM', kind: 'stack', summary: 'The pattern that repeats across the projects: each layer with one responsibility.',
    layers: [
      { name: 'FRONTEND', items: ['React · Vite', 'Astro', 'HTML / CSS / JS · Bootstrap', 'Android (Kotlin)'], note: 'An interface for each role: the SIMAV dashboard, Cartoon Pizza roles, the IbagameApp app.' },
      { name: 'API', items: ['FastAPI', 'Django', 'Express 5', 'Spring Boot'], note: 'HTTP contracts with authentication (JWT, Argon2, Passport) and validation (Zod).' },
      { name: 'SERVICES', items: ['domain', 'business rules', 'real time'], note: 'Where the rules live: reconciliation, severity, availability, order flow.' },
      { name: 'DATABASE', items: ['PostgreSQL', 'PostGIS', 'MongoDB', 'Supabase', 'Firestore'], note: 'Persistence chosen for the problem: geospatial, document or relational with migrations.' }
    ] },
  { id: 'simav', tab: 'SIMAV', title: 'HEXAGONAL ARCHITECTURE', kind: 'hex', summary: 'The domain does not depend on FastAPI, the database or the AI provider.',
    clients: ['React 18 + Vite · dashboard', 'Astro · landing', 'Phone / vehicle camera'],
    inbound: ['FastAPI REST', 'JWT + Argon2', 'Multi-tenant'],
    core: ['Road damage: type and severity', 'ASTM D6433 criteria', 'Store photo only with enough confidence'],
    outbound: ['SQLAlchemy async → PostgreSQL + PostGIS', 'Alembic', 'Google Gemini (Groq fallback)', 'ReportLab', 'Supabase'],
    deploy: ['Docker', 'Render', 'Vercel', 'pytest · ruff · mypy'],
    notes: { clients: 'Clients: the dashboard (React 18 + Vite), the landing page (Astro) and photo capture with GPS.', inbound: 'Inbound adapters: the FastAPI API, JWT authentication with Argon2 and multi-tenant isolation.', core: 'Domain core: damage type, severity per ASTM D6433 and the rule of storing the photo only when there is deterioration with enough confidence.', outbound: 'Outbound adapters: geospatial persistence (PostgreSQL + PostGIS via SQLAlchemy async, Alembic migrations), vision with Gemini and Groq as fallback, reports with ReportLab, Supabase.', deploy: 'Deploy and quality: Docker, Render, Vercel; pytest, ruff and mypy.' } },
  { id: 'zytime', tab: 'ZYTIME', title: 'MODULAR MONOLITH + HEXAGONAL', kind: 'modular', summary: 'Team project. Highlighted: the modules I contributed to on the backend.',
    channels: ['Web app', 'WhatsApp', 'AI assistant'],
    modules: [
      { name: 'BUSINESS SETUP', tag: 'PR #13 · LINDA', mine: true, items: ['business profile', 'services', 'professionals', 'hours', 'time blocks', 'availability'], note: 'PR #13: business profile, services, professionals, hours, time blocks and availability calculation.' },
      { name: 'BOOKING', tag: 'PR #17 · LINDA', mine: true, items: ['book', 'view', 'cancel', 'reschedule'], note: 'PR #17: transactional bookings with a PostgreSQL exclusion constraint, ETag / If-Match and idempotency inside the transaction. Duration, price and cancellation policy are locked at booking time.' },
      { name: 'CROSS-CUTTING', tag: 'PR #13 · LINDA', mine: true, items: ['current actor', 'Problem Details', 'correlation ID', 'idempotency store'], note: 'Cross-cutting pieces from PR #13: current actor, Problem Details errors, correlation ID and idempotency store.' },
      { name: 'OTHER MODULES', tag: 'TEAM', mine: false, items: ['rest of the platform'], note: 'The rest of the system was built by the team.' }
    ],
    infra: ['PostgreSQL 18', 'Flyway', 'Hibernate', 'OpenAPI'],
    tests: ['JUnit 5', 'Mockito', 'Testcontainers', 'ArchUnit'] },
  { id: 'gold', tab: 'GOLD DELUXE', title: 'DJANGO + POSTGRESQL + AUDITING + TESTING', kind: 'stack', summary: 'Immutable records and a per-material reconciliation at the close of each work shift.',
    layers: [
      { name: 'ROLES', items: ['users', 'recorder', 'supervisor'], note: 'Who records and who supervises each material movement.' },
      { name: 'DJANGO 6 MODULES', items: ['material catalogs', 'work shifts', 'evidence', 'attachments', 'requests'], note: 'Domain modules in Django 6 on Python 3.12.' },
      { name: 'RECONCILIATION', items: ['justified shrinkage', 'smelting', 'zuñido', 'held by the team', 'unexplained loss'], note: 'Independent reconciliation per material when each work shift closes.' },
      { name: 'AUDIT', items: ['original records cannot be altered', 'everything audited'], note: 'Original records cannot be altered; every change is audited.' },
      { name: 'POSTGRESQL 16', items: ['psycopg', 'openpyxl · ReportLab · Pillow'], note: 'Persistence in PostgreSQL 16; files and reports with openpyxl, ReportLab and Pillow.' },
      { name: 'QUALITY GATE', items: ['pytest', 'Hypothesis', 'import-linter', 'ruff', 'GitHub Actions'], note: 'pytest, pytest-django, Hypothesis, coverage, import-linter and ruff on GitHub Actions. SDD methodology.' }
    ] },
  { id: 'evermoon', tab: 'EVERMOON', title: 'DISCORD + SERVICES + SUPABASE', kind: 'stack', summary: 'A bot with data kept separate per couple.',
    layers: [
      { name: 'DISCORD', items: ['discord.js 14', 'Node.js 20'], note: 'The client is Discord; the bot runs on Node.js 20 with discord.js 14.' },
      { name: 'INTERACTIONS', items: ['commands', '/privacy', 'ES / EN'], note: 'User interactions, including /privacy, in Spanish and English.' },
      { name: 'SERVICES', items: ['letters', 'memories', 'dates', 'playlist', 'plans', 'games', 'points · badges'], note: 'Each feature of the couple space as a service.' },
      { name: 'DATABASE', items: ['Supabase', 'PostgreSQL', 'SQL migrations'], note: 'Each couple’s data kept separate. SQL migrations; tests with node:test.' }
    ] },
  { id: 'pizza', tab: 'CARTOON PIZZA', title: 'FRONTEND + REST API + SOCKET.IO + MONGODB', kind: 'stack', summary: 'Two repositories and one real-time channel.',
    layers: [
      { name: 'FRONTEND · WEB', items: ['HTML / CSS / JS', 'Bootstrap', 'SheetJS · jsPDF', 'Vercel'], note: 'cartoon-pizza-web: role-based views, export with SheetJS and jsPDF, deployed on Vercel.' },
      { name: 'REST API', items: ['Express 5', 'Zod', 'JWT · Passport · Google OAuth', 'rate limiting', 'Render'], note: 'cartoon-pizza-api: Express 5 with Zod validation, authentication and rate limiting, deployed on Render.' },
      { name: 'SOCKET.IO', items: ['table → kitchen → cash', 'no reloads'], note: 'Socket.IO keeps orders in sync across roles in real time.' },
      { name: 'MONGODB', items: ['Mongoose'], note: 'Persistence in MongoDB with Mongoose. Tests with node:test and supertest on GitHub Actions.' }
    ] }
];
