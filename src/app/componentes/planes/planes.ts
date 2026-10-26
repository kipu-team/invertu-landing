import { Component } from '@angular/core';
import { appLink } from '../../config/app-links';


@Component({
  imports: [],
  selector: 'app-planes',
  styleUrl: './planes.css',
  templateUrl: './planes.html',
})
export class Planes {
  registerUrl = appLink('register');
}
