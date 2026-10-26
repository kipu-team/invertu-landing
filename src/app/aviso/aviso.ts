import { Service, signal } from '@angular/core';

@Service()
export class Aviso {
  texto = signal('');
  visible = signal(false);
  private temporizador?: ReturnType<typeof setTimeout>;

  mostrar(mensaje: string) {
    this.texto.set(mensaje);
    this.visible.set(true);
    clearTimeout(this.temporizador);
    this.temporizador = setTimeout(() => this.visible.set(false), 2600);
  }
}
