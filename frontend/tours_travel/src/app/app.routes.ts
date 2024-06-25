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
// import { authGuard } from './guards/auth.guard';

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
      { path: 'tour', component: CreateTourComponent },
    ],
  },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent },
];
