import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Idioma } from '../../idioma/idioma';
import { Reveal } from '../../directivas/reveal';

const RETRASO_AUTO = 6000; // cada cuánto avanza solo
const UMBRAL_DESLIZAR = 40; // píxeles para contar un deslizamiento con el dedo

@Component({
  imports: [Reveal],
  selector: 'app-testimonios',
  styleUrl: './testimonios.css',
  templateUrl: './testimonios.html',
})
export class Testimonios {
  idioma = inject(Idioma);

  private host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private destruir = inject(DestroyRef);
  private pista = viewChild.required<ElementRef<HTMLElement>>('pista');
  private reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  paginas = signal(1);
  actual = signal(0);
  puntos = computed(() => Array.from({ length: this.paginas() }, (_, i) => i));

  private porVista = 1;
  private tocarInicioX = 0;
  private temporizadorAuto?: ReturnType<typeof setInterval>;
  private temporizadorScroll?: ReturnType<typeof setTimeout>;
  private temporizadorResize?: ReturnType<typeof setTimeout>;

  constructor() {
    afterNextRender(() => {
      this.calcularPaginas();
      this.iniciarAuto();
    });

    this.destruir.onDestroy(() => {
      this.detenerAuto();
      clearTimeout(this.temporizadorScroll);
      clearTimeout(this.temporizadorResize);
    });
  }

  // Texto accesible de cada puntito: "Mostrar grupo 1 de 3"
  textoPunto(indice: number): string {
    return this.idioma
      .t('testimonials.dot')
      .replace('{n}', String(indice + 1))
      .replace('{total}', String(this.paginas()));
  }

  anterior() {
    this.irA(this.paginaActual() - 1);
    this.iniciarAuto();
  }

  siguiente() {
    this.irA(this.paginaActual() + 1);
    this.iniciarAuto();
  }

  irAPunto(indice: number) {
    this.irA(indice);
    this.iniciarAuto();
  }

  teclaPuntos(evento: KeyboardEvent) {
    if (evento.key !== 'ArrowRight' && evento.key !== 'ArrowLeft') return;
    evento.preventDefault();
    const siguiente = this.irA(this.paginaActual() + (evento.key === 'ArrowRight' ? 1 : -1));
    (evento.currentTarget as HTMLElement).querySelectorAll('button')[siguiente]?.focus();
  }

  alDesplazar() {
    clearTimeout(this.temporizadorScroll);
    this.temporizadorScroll = setTimeout(() => this.actual.set(this.paginaActual()), 80);
  }

  @HostListener('window:resize')
  alRedimensionar() {
    clearTimeout(this.temporizadorResize);
    this.temporizadorResize = setTimeout(() => this.calcularPaginas(), 150);
  }

  // El carrusel se detiene mientras el usuario lo está usando
  alEntrarMouse(evento: PointerEvent) {
    if (evento.pointerType === 'mouse') this.detenerAuto();
  }

  alSalirMouse(evento: PointerEvent) {
    if (evento.pointerType === 'mouse') this.iniciarAuto();
  }

  detenerAuto() {
    clearInterval(this.temporizadorAuto);
  }

  alPerderFoco(evento: FocusEvent) {
    if (!this.host.contains(evento.relatedTarget as Node | null)) this.iniciarAuto();
  }

  alTocar(evento: TouchEvent) {
    this.detenerAuto();
    this.tocarInicioX = evento.touches[0].clientX;
  }

  alSoltar(evento: TouchEvent) {
    const delta = evento.changedTouches[0].clientX - this.tocarInicioX;
    if (Math.abs(delta) > UMBRAL_DESLIZAR) {
      this.irA(this.paginaActual() + (delta < 0 ? 1 : -1));
    }
    this.iniciarAuto();
  }

  private iniciarAuto() {
    this.detenerAuto();
    if (this.reducirMovimiento) return;
    this.temporizadorAuto = setInterval(() => {
      if (this.paginas() > 1) this.irA(this.paginaActual() + 1);
    }, RETRASO_AUTO);
  }

  private tarjetas(): HTMLElement[] {
    return Array.from(this.pista().nativeElement.querySelectorAll<HTMLElement>('.testimonial-card'));
  }

  // Ancho de una tarjeta más el espacio entre tarjetas
  private paso(): number {
    const pista = this.pista().nativeElement;
    const espacio = parseFloat(getComputedStyle(pista).columnGap) || 0;
    return this.tarjetas()[0].getBoundingClientRect().width + espacio;
  }

  private paginaActual(): number {
    const pista = this.pista().nativeElement;
    const maxScroll = pista.scrollWidth - pista.clientWidth;
    if (pista.scrollLeft >= maxScroll - 2) return this.paginas() - 1;
    return Math.round(pista.scrollLeft / (this.paso() * this.porVista));
  }

  private irA(pagina: number): number {
    const total = this.paginas();
    const destino = (pagina + total) % total;
    this.pista().nativeElement.scrollTo({
      left: destino * this.porVista * this.paso(),
      behavior: this.reducirMovimiento ? 'auto' : 'smooth',
    });
    return destino;
  }

  private calcularPaginas() {
    const pista = this.pista().nativeElement;
    this.porVista = Math.max(1, Math.round(pista.clientWidth / this.paso()));
    this.paginas.set(Math.ceil(this.tarjetas().length / this.porVista));
    this.actual.set(this.paginaActual());
  }
}
