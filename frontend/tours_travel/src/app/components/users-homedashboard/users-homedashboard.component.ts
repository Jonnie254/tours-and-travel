import { Component } from '@angular/core';
import { UsersSidenavComponent } from '../users-sidenav/users-sidenav.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-users-homedashboard',
  standalone: true,
  templateUrl: './users-homedashboard.component.html',
  styleUrl: './users-homedashboard.component.css',
  imports: [
    UsersSidenavComponent,
    RouterOutlet,
    NavbarComponent,
    HomeComponent,
  ],
})
export class UsersHomedashboardComponent {}
