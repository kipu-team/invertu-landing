import { Component, inject } from '@angular/core';
import { Idioma } from '../../idioma/idioma';
import { Reveal } from '../../directivas/reveal';

@Component({
  imports: [Reveal],
  selector: 'app-ayuda',
  styleUrl: './ayuda.css',
  templateUrl: './ayuda.html',
})
export class Ayuda {
  idioma = inject(Idioma);
}
