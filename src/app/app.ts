import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Navbar} from './componentes/navbar/navbar';
import {Hero} from './componentes/hero/hero';
import {Beneficios} from './componentes/beneficios/beneficios';
import {Asistente} from './componentes/asistente/asistente';
import {Testimonios} from './componentes/testimonios/testimonios';
import {Planes} from './componentes/planes/planes';
import {Ayuda} from './componentes/ayuda/ayuda';
import {CtaFinal} from './componentes/cta-final/cta-final';
import {Footer} from './componentes/footer/footer';

@Component({
  imports: [RouterOutlet, Navbar, Hero, Beneficios, Asistente, Testimonios, Planes, Ayuda, CtaFinal,
  Footer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('invertu-landing');
}
