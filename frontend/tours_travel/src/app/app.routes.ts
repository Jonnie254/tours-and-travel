import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UsersHomedashboardComponent } from './components/users-homedashboard/users-homedashboard.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
// import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'userdashboard',
    component: UsersHomedashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'bookings',
        component: BookingsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
  {
    path: 'admindashboard',
    component: AdminDashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'bookings',
        component: BookingsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      { path: 'users', component: AdminUsersComponent },
    ],
  },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
];
