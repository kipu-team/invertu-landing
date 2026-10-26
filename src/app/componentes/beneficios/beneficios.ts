import { Component } from '@angular/core';
import { appLink } from '../../config/app-links';
@Component({
  imports: [],
  selector: 'app-beneficios',
  styleUrl: './beneficios.css',
  templateUrl: './beneficios.html',
})
export class Beneficios {
  registerUrl = appLink('register');
}
