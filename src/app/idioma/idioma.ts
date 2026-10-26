import { Service, signal } from '@angular/core';
import { TEXTOS_ES } from './textos-es';
import { TEXTOS_EN } from './textos-en';

@Service()
export class Idioma {
  idioma = signal<'es' | 'en'>('es');

  cambiar(nuevo: 'es' | 'en') {
    this.idioma.set(nuevo);
  }

  t(clave: string): string {
    const lista = this.idioma() === 'es' ? TEXTOS_ES : TEXTOS_EN;
    return lista[clave] ?? clave;
  }
}
