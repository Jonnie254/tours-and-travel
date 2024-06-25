import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAdd,
  faDotCircle,
  faHome,
  faSignOut,
  faUser,
  faUserDoctor,
  faMapLocation,
  faGlobeAfrica,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-sidenav',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './admin-sidenav.component.html',
  styleUrl: './admin-sidenav.component.css',
})
export class AdminSidenavComponent {
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
  faMapLocation = faMapLocation;
  faDotCircle = faDotCircle;
  faSignOut = faSignOut;
  faGlobeAfrica = faGlobeAfrica;
}
