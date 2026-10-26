import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './componentes/navbar/navbar';
import { Hero } from './componentes/hero/hero';
import { Beneficios } from './componentes/beneficios/beneficios';
import { Asistente } from './componentes/asistente/asistente';
import { Testimonios } from './componentes/testimonios/testimonios';
import { Planes } from './componentes/planes/planes';
import { Ayuda } from './componentes/ayuda/ayuda';
import { CtaFinal } from './componentes/cta-final/cta-final';
import { Footer } from './componentes/footer/footer';
import { Aviso } from './aviso/aviso';
import { Idioma } from './idioma/idioma';

@Component({
  imports: [RouterOutlet, Navbar, Hero, Beneficios, Asistente, Testimonios, Planes, Ayuda, CtaFinal, Footer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  aviso = inject(Aviso);
  idioma = inject(Idioma);

  // Mientras APP_URL esté vacía, los botones de la app tienen href="#":
  // en vez de ir a ninguna parte, se muestra "Disponible muy pronto".
  @HostListener('document:click', ['$event'])
  avisarSiLaAppNoEstaLista(evento: MouseEvent) {
    const enlace = (evento.target as HTMLElement).closest('a');
    if (enlace?.getAttribute('href') === '#') {
      evento.preventDefault();
      this.aviso.mostrar(this.idioma.t('cta.soon'));
    }
  }
}
