import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {TokenService} from '../../../services/token.service';
import {Router} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header-common',
  templateUrl: './header.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  dropdownOpen = false;

  constructor(private tokenService: TokenService, private router: Router) {
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.dropdownOpen = false;
    this.tokenService.clearToken();
    this.router.navigate(['/login']).then(r => console.log(r));
  }
}
