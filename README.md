# INVERTU LANDING

Landing page de InvertU, plataforma web de gestión financiera para estudiantes universitarios.
Presenta el propósito de la plataforma, sus beneficios, el asistente, testimonios, planes (Free y Premium), ayuda y los canales de contacto.

Esta es la versión en **Angular** de la landing. La versión original en HTML, CSS y JavaScript está en el repositorio `invertu-landing-page`.

## Estructura del proyecto

```
invertu-landing/
├── README.md
├── public/
│   └── img/                      Imágenes (logo, mascota, favicon...)
└── src/
    ├── index.html                Página base (fuentes, íconos y favicon)
    ├── styles.css                Estilos globales (variables, base, botones)
    └── app/
        ├── app.ts / app.html     Componente raíz: junta todas las secciones
        ├── componentes/
        │   ├── navbar/           Barra superior, menú móvil y selector de idioma
        │   ├── hero/             Portada con el panel animado
        │   ├── beneficios/       Beneficios y estadísticas
        │   ├── asistente/        Chat de ejemplo con el asistente
        │   ├── testimonios/      Carrusel de testimonios
        │   ├── planes/           Planes Free y Premium
        │   ├── ayuda/            Seguridad y preguntas frecuentes
        │   ├── cta-final/        Llamado final a crear cuenta
        │   └── footer/           Pie de página
        ├── idioma/
        │   ├── idioma.ts         Servicio que guarda el idioma y devuelve los textos
        │   ├── textos-es.ts      Textos en español
        │   └── textos-en.ts      Textos en inglés (mismas claves)
        ├── config/
        │   └── app-links.ts      Dirección de la app y rutas (login, registro...)
        ├── aviso/                Aviso flotante "Disponible muy pronto"
        └── directivas/
            └── reveal.ts         Animación al hacer scroll
```

Cada componente tiene su propio archivo `.html`, `.css` y `.ts`.

| Archivo | Propósito |
|---------|-----------|
| `src/styles.css` | Estilos que usa toda la página (variables de color, base, botones, contenedor) |
| `src/app/componentes/*/*.css` | Estilos de cada sección, incluido su responsive |
| `src/app/idioma/textos-es.ts` | Textos en español (se piden con `idioma.t('clave')`) |
| `src/app/idioma/textos-en.ts` | Textos en inglés (mismas claves que `textos-es.ts`) |
| `src/app/config/app-links.ts` | `APP_URL` y rutas a las que llevan los botones de la app |
| `public/img/` | Recursos gráficos locales |

---

## Cómo ejecutar el proyecto

Requisitos: Node.js y npm.

1. Clona el repositorio.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   ng serve
   ```
4. Abre `http://localhost:4200/` en tu navegador.

Para generar la versión de producción:

```bash
ng build
```

---

## Enlaces a la app

Los botones "Iniciar sesión", "Crear cuenta", "Términos y condiciones" y "Política de privacidad" se arman con la función `appLink` de `src/app/config/app-links.ts`.

- Cuando `APP_URL` está vacía, los botones muestran el aviso "La app estará disponible muy pronto".
- Cuando la app esté publicada, se escribe su URL en `APP_URL` **una sola vez** y todos los enlaces se actualizan.

---

## Reglas del equipo

Para mantener el proyecto ordenado y consistente, todos los integrantes deben seguir estas reglas:

### Organización de archivos
- **No crear carpetas nuevas** sin avisar antes al equipo.
- Usar **minúsculas y guiones** en los nombres de archivos.
  Correcto: `hero-banner.webp`
  Incorrecto: `HeroBanner.png`, `hero_banner.webp`
- Cada sección nueva se crea como componente con `ng g c componentes/nombre --skip-tests`.

### Textos e idiomas
- Todo texto visible va en `textos-es.ts` y en `textos-en.ts`, con la misma clave en ambos archivos.
- En el HTML se muestra con `{{ idioma.t('clave') }}`, y en atributos como `alt` o `aria-label` con `[attr.alt]="idioma.t('clave')"`.
- **Idiomas:** español e inglés, con selector en la barra superior.

### Estilos
- Los estilos de una sección van en el `.css` de su componente.
- Solo lo que se usa en toda la página va en `src/styles.css`.
- Nada de etiquetas `<style>` dentro del HTML.

### Íconos
- Usar **Font Awesome** (ya está enlazado en `src/index.html`).
- **No descargar íconos** ni agregar librerías externas sin consultar.

### Comunicación
- Cualquier cambio estructural (nuevas carpetas, dependencias, etc.) debe **avisarse al equipo** primero.

---

## Tecnologías utilizadas

- Angular (componentes standalone y signals)
- TypeScript
- HTML5
- CSS3
- Font Awesome (íconos)

---

## Convenciones de código

- **HTML**: etiquetas semánticas.
- **CSS**: nombres de clases en `kebab-case` (ej. `.hero-section`).
- **TypeScript**: variables y métodos en `camelCase`, clases en `PascalCase`, funciones descriptivas.
- **Commits**: mensaje corto que empieza con el tipo de cambio y un verbo en infinitivo (ej. `feat: agregar carrusel de testimonios`).

---

## Equipo

**Kipu Team**
- Cahuana Lopez Luz Margarita (u20241e017)
- Eustaquio Romani Bruno Misael (u20241d981)
- Hallasi Yucra Maria Fernanda (u202415759)
- Saldaña Melgar Matías (u20241e284)
- Vasquez Quispe Milene (u202419061)

---

## Contacto

invertuoficial@gmail.com

---

**Redes sociales oficiales:**

- Instagram: https://www.instagram.com/invertu_oficial/
- TikTok: https://www.tiktok.com/@kipu_team
- LinkedIn: https://www.linkedin.com/in/invertu-oficial
