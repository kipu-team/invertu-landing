import { Component } from '@angular/core';
import { appLink } from '../../config/app-links';
@Component({
  imports: [],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  loginUrl = appLink('login');
  registerUrl = appLink('register');
}
