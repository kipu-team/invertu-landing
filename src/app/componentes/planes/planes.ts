import { Component, inject } from '@angular/core';
import { appLink } from '../../config/app-links';
import { Idioma } from '../../idioma/idioma';
import { Reveal } from '../../directivas/reveal';


@Component({
  imports: [Reveal],
  selector: 'app-planes',
  styleUrl: './planes.css',
  templateUrl: './planes.html',
})
export class Planes {
  idioma = inject(Idioma);
  registerUrl = appLink('register');
}
