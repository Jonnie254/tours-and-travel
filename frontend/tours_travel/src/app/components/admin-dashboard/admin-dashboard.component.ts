import { Component } from '@angular/core';
import { UsersSidenavComponent } from '../users-sidenav/users-sidenav.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AdminSidenavComponent } from '../admin-sidenav/admin-sidenav.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
  imports: [
    UsersSidenavComponent,
    RouterLink,
    RouterOutlet,
    AdminSidenavComponent,
    HomeComponent,
  ],
})
export class AdminDashboardComponent {}
