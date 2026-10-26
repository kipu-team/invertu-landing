import { Component, inject } from '@angular/core';
import { Idioma } from '../../idioma/idioma';

@Component({
  imports: [],
  selector: 'app-asistente',
  styleUrl: './asistente.css',
  templateUrl: './asistente.html',
})
export class Asistente {
  idioma = inject(Idioma);
}
