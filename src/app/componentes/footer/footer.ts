import { Component, inject } from '@angular/core';
import { Idioma } from '../../idioma/idioma';


@Component({
  imports: [],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {
  idioma = inject(Idioma);
  // Páginas estáticas de la propia landing (carpeta public/), relativas al base href
  termsUrl = 'terminos.html';
  privacyUrl = 'privacidad.html';
}
