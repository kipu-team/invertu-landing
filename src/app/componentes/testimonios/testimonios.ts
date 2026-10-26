import { Component, inject } from '@angular/core';
import { Idioma } from '../../idioma/idioma';

@Component({
  imports: [],
  selector: 'app-testimonios',
  styleUrl: './testimonios.css',
  templateUrl: './testimonios.html',
})
export class Testimonios {
  idioma = inject(Idioma);
}
