import { Component } from '@angular/core';
import { appLink } from '../../config/app-links';


@Component({
  imports: [],
  selector: 'app-cta-final',
  styleUrl: './cta-final.css',
  templateUrl: './cta-final.html',
})
export class CtaFinal {
  registerUrl = appLink('register');
  loginUrl = appLink('login');
}
