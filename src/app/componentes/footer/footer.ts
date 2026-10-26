import { Component } from '@angular/core';
import { appLink } from '../../config/app-links';


@Component({
  imports: [],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {
  termsUrl = appLink('terms');
  privacyUrl = appLink('privacy');
}
