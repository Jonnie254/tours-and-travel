import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAdd,
  faDotCircle,
  faHome,
  faSignOut,
  faUser,
  faUserDoctor,
  faGlobeAfrica,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-users-sidenav',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './users-sidenav.component.html',
  styleUrl: './users-sidenav.component.css',
})
export class UsersSidenavComponent {
  constructor(private authService: AuthService, private router: Router) {}
  logout() {
    localStorage.clear();
    this.authService.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
  faHome = faHome;
  faUser = faUser;
  faUserDoctor = faUserDoctor;
  faAdd = faAdd;
  faDotCircle = faDotCircle;
  faSignOut = faSignOut;
  faGlobeAfrica = faGlobeAfrica;
}
