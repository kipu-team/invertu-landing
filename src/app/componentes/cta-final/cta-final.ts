import { Component, inject } from '@angular/core';
import { appLink } from '../../config/app-links';
import { Idioma } from '../../idioma/idioma';
import { Reveal } from '../../directivas/reveal';


@Component({
  imports: [Reveal],
  selector: 'app-cta-final',
  styleUrl: './cta-final.css',
  templateUrl: './cta-final.html',
})
export class CtaFinal {
  idioma = inject(Idioma);
  registerUrl = appLink('register');
  loginUrl = appLink('login');
}
