import { Component, inject } from '@angular/core';
import { appLink } from '../../config/app-links';
import { Idioma } from '../../idioma/idioma';
@Component({
  imports: [],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  idioma = inject(Idioma);
  loginUrl = appLink('login');
  registerUrl = appLink('register');
}
