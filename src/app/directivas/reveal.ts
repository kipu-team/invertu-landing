import { afterNextRender, DestroyRef, Directive, ElementRef, inject } from '@angular/core';

// Hace que el elemento aparezca con una animación la primera vez que se ve en pantalla.
@Directive({
  selector: '[appReveal]',
})
export class Reveal {
  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private destruir = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const el = this.el;
      const hermanos = Array.from(el.parentElement?.children ?? []).filter((h) =>
        h.matches('.benefit-card, .price-card, .trust-card'),
      );
      const orden = hermanos.indexOf(el);
      if (orden > 0) el.style.transitionDelay = `${orden * 0.1}s`;

      el.classList.add('reveal');

      const observador = new IntersectionObserver(
        ([entrada]) => {
          if (!entrada.isIntersecting) return;
          el.classList.add('is-visible');
          observador.disconnect();
        },
        { threshold: 0.15 },
      );
      observador.observe(el);

      const limpiar = (evento: TransitionEvent) => {
        if (evento.target !== el || evento.propertyName !== 'opacity') return;
        if (!el.classList.contains('is-visible')) return;
        el.classList.remove('reveal', 'is-visible');
        el.style.transitionDelay = '';
        el.removeEventListener('transitionend', limpiar);
      };
      el.addEventListener('transitionend', limpiar);

      this.destruir.onDestroy(() => {
        observador.disconnect();
        el.removeEventListener('transitionend', limpiar);
      });
    });
  }
}
