# LSM // NEXUS

Portafolio 3D interactivo de **Linda Sofia Moreno — Systems Engineer**.

En lugar de una página con secciones, el portafolio es un pequeño universo digital: en el centro está mi avatar sobre una plataforma, y a su alrededor orbitan seis mundos, uno por cada proyecto. Cada mundo representa visualmente lo que hace el proyecto, y desde ahí se puede abrir su detalle: problema, solución, flujo del sistema, arquitectura, stack y mi rol.

Hecho con React, Vite, Three.js, React Three Fiber y GSAP.

## Cómo explorar

### Inicio
- **[ ENTER NEXUS ]** (o `Enter`): vuela a través del túnel hasta el universo.
- **QUICK ACCESS → PROJECTS**: entra directo a la lista de proyectos, sin animación.

### Moverse por el universo

| Acción | Escritorio | Móvil |
|---|---|---|
| Mirar alrededor | Arrastrar con el mouse | Arrastrar con un dedo |
| Acercar / alejar | Rueda del mouse | Pellizcar |
| Desplazarse | `W A S D` o flechas (`Shift` = más rápido) | Joystick en pantalla |
| Subir / bajar | `E` / `Q` | — |
| Abrir un mundo o sector | Clic sobre él | Tocarlo |

### Secciones
Desde el menú lateral (o el dock inferior en móvil), o con las teclas `1`–`6`:

1. **About**: quién soy, áreas, principios y experiencia.
2. **Projects**: base de datos de los seis proyectos, con filtros por tipo.
3. **Systems**: constelación de tecnologías y en qué proyectos las usé.
4. **Architecture**: diagramas de arquitectura de cada proyecto; haz clic en cualquier pieza para ver su nota.
5. **Lab**: una terminal interactiva. Escribe `help` para empezar… y no todo aparece en el listado.
6. **Contact**: GitHub, email, LinkedIn y CV.

`Esc` cierra el panel abierto. `M` cambia entre los dos modos:
- **Exploration**: navegas libremente por el universo.
- **System**: la cámara orbita sola y navegas desde el menú.

### Ajustes
La página está disponible **en español y en inglés**: usa el botón **ENGLISH / ESPAÑOL** en la pantalla de inicio, en la barra superior o en el menú ⋯ en móvil. Al entrar por primera vez se elige el idioma del navegador, y después se recuerda tu elección.

En la barra superior también puedes activar el **sonido**, reducir el **movimiento** y cambiar el **perfil de render**:
- **3D ALTO** (3D HIGH): experiencia completa.
- **3D LIGERO** (3D LITE): menos efectos, para equipos modestos.
- **2D**: mapa orbital sin 3D.

La página elige el perfil automáticamente según tu equipo y baja de nivel si detecta que va lento.

## Ejecutar en local

```bash
npm install
npm run dev
```
