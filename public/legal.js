// Header y footer de las páginas legales: iguales a los de la landing.
// El idioma es el mismo que se eligió en la landing (clave invertu-language).
(function () {
  var CLAVE = 'invertu-language';

  // Misma URL que APP_URL en src/app/config/app-links.ts. Si cambia allá, cámbiala aquí.
  var APP_URL = 'http://invertu-frontend-kipu.s3-website-us-east-1.amazonaws.com';

  var TEXTOS = {
    es: {
      home: 'Inicio', benefits: 'Beneficios', assistant: 'Asistente', testimonials: 'Testimonios',
      plans: 'Planes', help: 'Ayuda', navLabel: 'Navegación principal', homeLabel: 'InvertU, ir al inicio',
      logoAlt: 'Logo de InvertU', login: 'Iniciar sesión', signup: 'Crear cuenta gratis',
      langLabel: 'Cambiar idioma', menuOpen: 'Abrir menú', menuClose: 'Cerrar menú',
      footerNav: 'Pie de página', contact: 'Contacto', city: 'Lima, Perú', social: 'Redes sociales',
      terms: 'Términos y condiciones', privacy: 'Política de privacidad',
      copy: '© 2026 InvertU. Empoderando el futuro financiero estudiantil.'
    },
    en: {
      home: 'Home', benefits: 'Benefits', assistant: 'Assistant', testimonials: 'Testimonials',
      plans: 'Plans', help: 'Help', navLabel: 'Main navigation', homeLabel: 'InvertU, go to home',
      logoAlt: 'InvertU logo', login: 'Sign in', signup: 'Create free account',
      langLabel: 'Change language', menuOpen: 'Open menu', menuClose: 'Close menu',
      footerNav: 'Footer', contact: 'Contact', city: 'Lima, Peru', social: 'Social media',
      terms: 'Terms and conditions', privacy: 'Privacy policy',
      copy: "© 2026 InvertU. Empowering students' financial future."
    }
  };

  function leer() {
    try {
      var guardado = localStorage.getItem(CLAVE);
      if (guardado === 'es' || guardado === 'en') return guardado;
    } catch (e) {
      // Sin localStorage se usa español
    }
    return 'es';
  }

  function enlaceApp(ruta) {
    return APP_URL.replace(/\/$/, '') + ruta;
  }

  function cabecera(t, idioma) {
    return '' +
      '<div class="container header-inner">' +
        '<a href="./" class="brand" aria-label="' + t.homeLabel + '">' +
          '<img src="img/logo.png" class="brand-logo" alt="' + t.logoAlt + '">' +
        '</a>' +
        '<nav class="main-nav" id="main-nav" aria-label="' + t.navLabel + '">' +
          '<a href="./">' + t.home + '</a>' +
          '<a href="./#beneficios">' + t.benefits + '</a>' +
          '<a href="./#asistente">' + t.assistant + '</a>' +
          '<a href="./#testimonios">' + t.testimonials + '</a>' +
          '<a href="./#planes">' + t.plans + '</a>' +
          '<a href="./#ayuda">' + t.help + '</a>' +
        '</nav>' +
        '<div class="header-ctas">' +
          '<a href="' + enlaceApp('/iniciar-sesion') + '" class="btn btn-ghost header-login">' + t.login + '</a>' +
          '<a href="' + enlaceApp('/registro') + '" class="btn btn-primary header-signup">' + t.signup + '</a>' +
          '<div class="lang-menu" id="lang-menu">' +
            '<button type="button" class="lang-toggle" id="lang-toggle" aria-haspopup="true" aria-expanded="false" aria-controls="lang-list" aria-label="' + t.langLabel + '">' +
              '<i class="fa-solid fa-globe" aria-hidden="true"></i>' +
              '<span>' + idioma.toUpperCase() + '</span>' +
              '<i class="fa-solid fa-chevron-down lang-chevron" aria-hidden="true"></i>' +
            '</button>' +
            '<ul class="lang-list" id="lang-list" role="list" hidden>' +
              '<li><button type="button" class="lang-btn" data-set="es" lang="es" aria-pressed="' + (idioma === 'es') + '"><span class="lang-code" aria-hidden="true">ES</span> Español</button></li>' +
              '<li><button type="button" class="lang-btn" data-set="en" lang="en" aria-pressed="' + (idioma === 'en') + '"><span class="lang-code" aria-hidden="true">EN</span> English</button></li>' +
            '</ul>' +
          '</div>' +
          '<button type="button" class="menu-toggle" id="menu-toggle" aria-controls="main-nav" aria-expanded="false" aria-label="' + t.menuOpen + '">' +
            '<i class="fa-solid fa-bars" aria-hidden="true"></i>' +
          '</button>' +
        '</div>' +
      '</div>';
  }

  function pie(t) {
    return '' +
      '<div class="container footer">' +
        '<div class="footer-top">' +
          '<div class="footer-info">' +
            '<a href="./" class="footer-brand">InvertU</a>' +
            '<p class="footer-contact">' +
              '<span class="visually-hidden">' + t.contact + '</span>' +
              '<a href="mailto:invertuoficial@gmail.com"><i class="fa-solid fa-envelope" aria-hidden="true"></i>invertuoficial@gmail.com</a>' +
              '<span><i class="fa-solid fa-location-dot" aria-hidden="true"></i><span>' + t.city + '</span></span>' +
            '</p>' +
          '</div>' +
          '<nav class="footer-nav" aria-label="' + t.footerNav + '">' +
            '<a href="./">' + t.home + '</a>' +
            '<a href="./#beneficios">' + t.benefits + '</a>' +
            '<a href="./#asistente">' + t.assistant + '</a>' +
            '<a href="./#planes">' + t.plans + '</a>' +
            '<a href="./#ayuda">' + t.help + '</a>' +
          '</nav>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<small>' + t.copy + '</small>' +
          '<div class="footer-legal">' +
            '<a href="terminos.html">' + t.terms + '</a>' +
            '<a href="privacidad.html">' + t.privacy + '</a>' +
          '</div>' +
          '<ul class="footer-social" role="list" aria-label="' + t.social + '">' +
            '<li><a href="https://www.instagram.com/invertu_oficial/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a></li>' +
            '<li><a href="https://www.tiktok.com/@kipu_team" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i class="fa-brands fa-tiktok" aria-hidden="true"></i></a></li>' +
            '<li><a href="https://www.linkedin.com/in/invertu-oficial" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></a></li>' +
          '</ul>' +
        '</div>' +
      '</div>';
  }

  function dibujar() {
    var idioma = leer();
    var t = TEXTOS[idioma];

    document.documentElement.lang = idioma;
    var titulo = document.documentElement.getAttribute('data-title-' + idioma);
    if (titulo) document.title = titulo;

    document.getElementById('site-header').innerHTML = cabecera(t, idioma);
    document.getElementById('site-footer').innerHTML = pie(t);

    var menuIdioma = document.getElementById('lang-menu');
    var botonIdioma = document.getElementById('lang-toggle');
    var listaIdioma = document.getElementById('lang-list');
    var menuToggle = document.getElementById('menu-toggle');
    var nav = document.getElementById('main-nav');

    function cerrarIdioma() {
      listaIdioma.hidden = true;
      botonIdioma.setAttribute('aria-expanded', 'false');
    }

    botonIdioma.addEventListener('click', function () {
      var abrir = listaIdioma.hidden;
      listaIdioma.hidden = !abrir;
      botonIdioma.setAttribute('aria-expanded', String(abrir));
    });

    listaIdioma.querySelectorAll('.lang-btn').forEach(function (boton) {
      boton.addEventListener('click', function () {
        try {
          localStorage.setItem(CLAVE, boton.dataset.set);
        } catch (e) {
          // Sin localStorage el idioma no se recuerda
        }
        dibujar();
      });
    });

    menuToggle.addEventListener('click', function () {
      var abierto = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(abierto));
      menuToggle.setAttribute('aria-label', abierto ? t.menuClose : t.menuOpen);
    });

    document.addEventListener('click', function (evento) {
      if (!menuIdioma.contains(evento.target)) cerrarIdioma();
    });

    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape') cerrarIdioma();
    });
  }

  dibujar();
})();
