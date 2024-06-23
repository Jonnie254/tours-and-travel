import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UsersHomedashboardComponent } from './components/users-homedashboard/users-homedashboard.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'userdashboard',
    component: UsersHomedashboardComponent,
    canActivate: [authGuard], // Protect this route
    children: [
      { path: 'home', component: HomeComponent, canActivate: [authGuard] },
      {
        path: 'bookings',
        component: BookingsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuard],
      },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
