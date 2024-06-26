import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ToursComponent } from '../tours/tours.component';
import { AdmintourViewComponent } from '../admintour-view/admintour-view.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [
    NavbarComponent,
    ToursComponent,
    AdmintourViewComponent,
    CommonModule,
  ],
})
export class HomeComponent {}
