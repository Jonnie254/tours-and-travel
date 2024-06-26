import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UsersHomedashboardComponent } from './components/users-homedashboard/users-homedashboard.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CreateTourComponent } from './components/create-tour/create-tour.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ToursComponent } from './components/tours/tours.component';
import { authGuard } from './guards/auth.guard';
import { AdminEdiUserComponent } from './components/admin-edi-user/admin-edi-user.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'landingPage', component: LandingPageComponent },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'userdashboard',
    component: UsersHomedashboardComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [authGuard] },
      {
        path: 'bookings',
        component: BookingsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'tours',
        component: ToursComponent,
        canActivate: [authGuard],
      },
      {
        path: 'tours/:id',
        component: ToursComponent,
        canActivate: [authGuard],
      },

      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'admindashboard',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'admin-home',
        component: AdminEdiUserComponent,
        canActivate: [authGuard],
      },
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
      {
        path: 'users',
        component: AdminUsersComponent,
        canActivate: [authGuard],
      },
      {
        path: 'create-tour',
        component: CreateTourComponent,
        canActivate: [authGuard],
      },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent },
];
