import { Component } from '@angular/core';
import {appLink} from '../../config/app-links';

@Component({
  imports: [],
  selector: 'app-hero',
  styleUrl: './hero.css',
  templateUrl: './hero.html',
})
export class Hero {
  registerUrl = appLink('register');
}
