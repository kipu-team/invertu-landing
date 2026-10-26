import { Service, signal } from '@angular/core';
import { TEXTOS_ES } from './textos-es';
import { TEXTOS_EN } from './textos-en';

const CLAVE_GUARDADO = 'invertu-language';

@Service()
export class Idioma {
  idioma = signal<'es' | 'en'>(this.leerGuardado());

  constructor() {
    document.documentElement.lang = this.idioma();
  }

  cambiar(nuevo: 'es' | 'en') {
    this.idioma.set(nuevo);
    document.documentElement.lang = nuevo;
    try {
      localStorage.setItem(CLAVE_GUARDADO, nuevo);
    } catch {
      // Sin localStorage el idioma no se recuerda
    }
  }

  t(clave: string): string {
    const lista = this.idioma() === 'es' ? TEXTOS_ES : TEXTOS_EN;
    return lista[clave] ?? clave;
  }

  private leerGuardado(): 'es' | 'en' {
    try {
      const guardado = localStorage.getItem(CLAVE_GUARDADO);
      if (guardado === 'es' || guardado === 'en') return guardado;
    } catch {
      // Sin localStorage se usa español
    }
    return 'es';
  }
}
