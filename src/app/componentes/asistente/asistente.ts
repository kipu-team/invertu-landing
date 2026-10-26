import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Idioma } from '../../idioma/idioma';
import { Reveal } from '../../directivas/reveal';

@Component({
  imports: [Reveal],
  selector: 'app-asistente',
  styleUrl: './asistente.css',
  templateUrl: './asistente.html',
})
export class Asistente {
  idioma = inject(Idioma);

  pregunta = signal(1); // 1, 2 o 3
  escribiendo = signal(false); // muestra los puntitos "escribiendo..."
  versionPregunta = signal(0); // cada cambio recrea la burbuja para repetir su animación
  versionRespuesta = signal(0);
  rebota = signal(false); // la mascota hace un salto

  private reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  private temporizador?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.temporizador));
  }

  elegir(numero: number) {
    this.pregunta.set(numero);
    this.versionPregunta.update((v) => v + 1);

    if (!this.reducirMovimiento) {
      this.rebota.set(false);
      setTimeout(() => this.rebota.set(true));
    }

    // Primero "escribe" y después aparece la respuesta
    clearTimeout(this.temporizador);
    this.escribiendo.set(true);
    this.temporizador = setTimeout(
      () => {
        this.escribiendo.set(false);
        this.versionRespuesta.update((v) => v + 1);
      },
      this.reducirMovimiento ? 300 : 1100,
    );
  }

  alTerminarAnimacion(evento: AnimationEvent) {
    if (evento.animationName.includes('mascot-bounce')) this.rebota.set(false);
  }
}
