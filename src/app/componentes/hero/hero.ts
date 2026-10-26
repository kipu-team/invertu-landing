import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { appLink } from '../../config/app-links';
import { Idioma } from '../../idioma/idioma';

// Datos de ejemplo del panel animado (los montos están en céntimos)
const RETRASO = 3000; // tiempo entre movimientos
const DURACION_CONTEO = 800; // duración de la animación de los números
const BARRA_MAX = 40000;

interface EstadoPanel {
  income: number;
  contributions: number;
  goal: number;
  categories: Record<string, number>;
}

interface Movimiento {
  key: string;
  icon: string;
  type: 'expense' | 'income' | 'goal';
  category?: string;
  amount: number;
  goal?: number;
}

const INICIO: EstadoPanel = {
  income: 154000,
  contributions: 32000,
  goal: 68,
  categories: { food: 38000, transport: 18000, subscriptions: 14000, leisure: 20000 },
};

const MOVIMIENTOS: Movimiento[] = [
  { key: 'dash.moveLunch', icon: 'fa-utensils', type: 'expense', category: 'food', amount: 1500 },
  { key: 'dash.moveBus', icon: 'fa-bus', type: 'expense', category: 'transport', amount: 400 },
  { key: 'dash.moveStreaming', icon: 'fa-tv', type: 'expense', category: 'subscriptions', amount: 2490 },
  { key: 'dash.moveTip', icon: 'fa-hand-holding-dollar', type: 'income', amount: 5000 },
  { key: 'dash.moveLaptop', icon: 'fa-piggy-bank', type: 'goal', amount: 3000, goal: 70 },
  { key: 'dash.moveMovies', icon: 'fa-film', type: 'expense', category: 'leisure', amount: 2000 },
  { key: 'dash.moveCoffee', icon: 'fa-mug-hot', type: 'expense', category: 'food', amount: 800 },
];

function copiar(estado: EstadoPanel): EstadoPanel {
  return { ...estado, categories: { ...estado.categories } };
}

// Todos los números que muestra el panel, calculados a partir del estado
function valores(estado: EstadoPanel): Record<string, number> {
  const gastos = Object.values(estado.categories).reduce((suma, valor) => suma + valor, 0);
  return {
    income: estado.income,
    expenses: gastos,
    contributions: estado.contributions,
    available: estado.income - gastos - estado.contributions,
    goal: estado.goal,
    ...estado.categories,
  };
}

@Component({
  imports: [],
  selector: 'app-hero',
  styleUrl: './hero.css',
  templateUrl: './hero.html',
})
export class Hero {
  idioma = inject(Idioma);
  registerUrl = appLink('register');

  private destruir = inject(DestroyRef);
  private panel = viewChild.required<ElementRef<HTMLElement>>('panel');

  readonly reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  estado = signal<EstadoPanel>(copiar(INICIO));
  mostrado = signal<Record<string, number>>(valores(INICIO)); // números que se ven (animados)
  movimiento = signal<Movimiento>(MOVIMIENTOS[0]);
  paso = signal(0);
  saliendo = signal(false);
  entrando = signal(false);
  animado = signal(false);

  private objetivos = new Map<string, number>();
  private intervalo: ReturnType<typeof setInterval> | null = null;
  private temporizadores = new Set<ReturnType<typeof setTimeout>>();
  private enPantalla = false;

  constructor() {
    afterNextRender(() => {
      if (this.reducirMovimiento) return;
      const panel = this.panel().nativeElement;

      // El panel solo avanza mientras se ve en pantalla
      const reproduccion = new IntersectionObserver(
        ([entrada]) => {
          this.enPantalla = entrada.isIntersecting;
          this.actualizarReproduccion();
        },
        { threshold: 0.2 },
      );
      reproduccion.observe(panel);

      // Animación de entrada de las barras
      const entrada = new IntersectionObserver(
        ([e], observador) => {
          if (!e.isIntersecting) return;
          this.animado.set(true);
          observador.disconnect();
        },
        { threshold: 0.3 },
      );
      entrada.observe(panel);

      const alCambiarVisibilidad = () => this.actualizarReproduccion();
      document.addEventListener('visibilitychange', alCambiarVisibilidad);

      this.destruir.onDestroy(() => {
        reproduccion.disconnect();
        entrada.disconnect();
        document.removeEventListener('visibilitychange', alCambiarVisibilidad);
      });
    });

    this.destruir.onDestroy(() => {
      this.detener();
      this.temporizadores.forEach((id) => clearTimeout(id));
    });
  }

  // Formato de dinero (los montos están en céntimos)
  monto(centimos: number): string {
    return (centimos / 100).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  dinero(centimos: number): string {
    return `S/ ${this.monto(centimos)}`;
  }

  altura(categoria: string): number {
    return Math.min(this.estado().categories[categoria] / BARRA_MAX, 1) * 100;
  }

  private actualizarReproduccion() {
    if (this.enPantalla && !document.hidden) {
      this.iniciar();
    } else {
      this.detener();
    }
  }

  private iniciar() {
    if (this.intervalo || this.reducirMovimiento) return;
    this.intervalo = setInterval(() => this.siguientePaso(), RETRASO);
  }

  private detener() {
    if (this.intervalo) clearInterval(this.intervalo);
    this.intervalo = null;
  }

  private siguientePaso() {
    let paso = this.paso() + 1;
    let estado = copiar(this.estado());

    if (paso >= MOVIMIENTOS.length) {
      paso = 0;
      estado = copiar(INICIO);
    } else {
      const mov = MOVIMIENTOS[paso];
      if (mov.type === 'expense' && mov.category) estado.categories[mov.category] += mov.amount;
      if (mov.type === 'income') estado.income += mov.amount;
      if (mov.type === 'goal') {
        estado.contributions += mov.amount;
        estado.goal = mov.goal ?? estado.goal;
      }
    }

    this.paso.set(paso);
    this.estado.set(estado);
    this.mostrarMovimiento(MOVIMIENTOS[paso]);

    for (const [clave, valor] of Object.entries(valores(estado))) {
      this.contarHasta(clave, valor);
    }
  }

  // El movimiento actual sale, cambia el texto y vuelve a entrar
  private mostrarMovimiento(mov: Movimiento) {
    this.entrando.set(false);
    this.saliendo.set(true);
    const id = setTimeout(() => {
      this.temporizadores.delete(id);
      this.movimiento.set(mov);
      this.saliendo.set(false);
      this.entrando.set(true);
    }, 300);
    this.temporizadores.add(id);
  }

  // Anima un número desde su valor actual hasta el nuevo
  private contarHasta(clave: string, destino: number) {
    const inicio = this.mostrado()[clave];
    this.objetivos.set(clave, destino);

    if (this.reducirMovimiento || inicio === destino) {
      this.fijar(clave, destino);
      return;
    }

    const comienzo = performance.now();
    const cuadro = (ahora: number) => {
      if (this.objetivos.get(clave) !== destino) return;
      const progreso = Math.min((ahora - comienzo) / DURACION_CONTEO, 1);
      const suave = 1 - Math.pow(1 - progreso, 3);
      this.fijar(clave, Math.round(inicio + (destino - inicio) * suave));
      if (progreso < 1) requestAnimationFrame(cuadro);
    };
    requestAnimationFrame(cuadro);
  }

  private fijar(clave: string, valor: number) {
    this.mostrado.update((actual) => ({ ...actual, [clave]: valor }));
  }
}
