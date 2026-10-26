import { Component, inject } from '@angular/core';
import { appLink } from '../../config/app-links';
import { Idioma } from '../../idioma/idioma';


@Component({
  imports: [],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {
  idioma = inject(Idioma);
  termsUrl = appLink('terms');
  privacyUrl = appLink('privacy');
}
