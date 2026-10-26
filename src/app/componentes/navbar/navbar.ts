import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { appLink } from '../../config/app-links';
import { Idioma } from '../../idioma/idioma';
@Component({
  imports: [],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  idioma = inject(Idioma);
  private el = inject(ElementRef);
  loginUrl = appLink('login');
  registerUrl = appLink('register');

  menuIdiomaAbierto = signal(false);

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
  }
}
