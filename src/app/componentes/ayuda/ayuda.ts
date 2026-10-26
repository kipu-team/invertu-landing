import { Component, inject } from '@angular/core';
import { Idioma } from '../../idioma/idioma';

@Component({
  imports: [],
  selector: 'app-ayuda',
  styleUrl: './ayuda.css',
  templateUrl: './ayuda.html',
})
export class Ayuda {
  idioma = inject(Idioma);
}
