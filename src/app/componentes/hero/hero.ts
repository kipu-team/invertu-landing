import { Component, inject } from '@angular/core';
import {appLink} from '../../config/app-links';
import { Idioma } from '../../idioma/idioma';

@Component({
  imports: [],
  selector: 'app-hero',
  styleUrl: './hero.css',
  templateUrl: './hero.html',
})
export class Hero {
  idioma = inject(Idioma);
  registerUrl = appLink('register');
}
