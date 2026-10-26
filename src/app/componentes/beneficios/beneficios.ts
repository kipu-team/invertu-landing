import { Component, inject } from '@angular/core';
import { appLink } from '../../config/app-links';
import { Idioma } from '../../idioma/idioma';
@Component({
  imports: [],
  selector: 'app-beneficios',
  styleUrl: './beneficios.css',
  templateUrl: './beneficios.html',
})
export class Beneficios {
  idioma = inject(Idioma);
  registerUrl = appLink('register');
}
