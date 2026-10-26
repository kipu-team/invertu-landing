import { NgTemplateOutlet } from '@angular/common';
import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { appLink } from '../../config/app-links';
import { Idioma } from '../../idioma/idioma';

@Component({
  imports: [NgTemplateOutlet],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  idioma = inject(Idioma);
  private el = inject(ElementRef);
  private destruir = inject(DestroyRef);

  loginUrl = appLink('login');
  registerUrl = appLink('register');

  menuIdiomaAbierto = signal(false); // lista ES/EN
  menuAbierto = signal(false); // menú hamburguesa (móvil)
  seccionActiva = signal('inicio'); // link resaltado según el scroll
  esMovil = signal(window.matchMedia('(max-width: 1100px)').matches);

  constructor() {
    // En pantallas chicas el selector de idioma se muestra dentro del menú
    const consulta = window.matchMedia('(max-width: 1100px)');
    const alCambiar = () => {
      this.esMovil.set(consulta.matches);
      if (!consulta.matches) this.menuAbierto.set(false);
    };
    consulta.addEventListener('change', alCambiar);

    afterNextRender(() => {
      // Resalta el link de la sección que se está viendo
      const observador = new IntersectionObserver(
        (entradas) => {
          for (const entrada of entradas) {
            if (!entrada.isIntersecting) continue;
            this.seccionActiva.set(entrada.target.id === 'hero' ? 'inicio' : entrada.target.id);
          }
        },
        { rootMargin: '-40% 0px -50% 0px' },
      );
      document.querySelectorAll('section[id]').forEach((seccion) => observador.observe(seccion));
      this.destruir.onDestroy(() => observador.disconnect());
    });

    this.destruir.onDestroy(() => consulta.removeEventListener('change', alCambiar));
  }

  alternarMenu() {
    this.menuAbierto.update((abierto) => !abierto);
  }

  cerrarMenu() {
    this.menuAbierto.set(false);
  }

  // "Inicio" y el logo suben hasta arriba de la página
  irAlInicio(evento: Event) {
    evento.preventDefault();
    this.cerrarMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  alternarMenuIdioma() {
    this.menuIdiomaAbierto.update((abierto) => !abierto);
  }

  elegir(lang: 'es' | 'en') {
    this.idioma.cambiar(lang);
    this.menuIdiomaAbierto.set(false);
  }

  @HostListener('document:click', ['$event'])
  cerrarSiClicFuera(evento: MouseEvent) {
    const menu = this.el.nativeElement.querySelector('#lang-menu');
    if (menu && !menu.contains(evento.target)) {
      this.menuIdiomaAbierto.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  cerrarConEscape() {
    this.menuIdiomaAbierto.set(false);
    if (this.menuAbierto()) {
      this.menuAbierto.set(false);
      this.el.nativeElement.querySelector('#menu-toggle')?.focus();
    }
  }
}
