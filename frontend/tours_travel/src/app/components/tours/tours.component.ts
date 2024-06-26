import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { Tour } from '../../interface/tour';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.css',
})
export class ToursComponent {
  tours: Tour[] = [];

  constructor(private tourService: ToursService) {
    this.fetchTours();
  }

  fetchTours() {
    this.tourService.getAllTours().subscribe(
      (tours: Tour[]) => {
        this.tours = tours;
      },
      (error) => {
        console.error('Failed to fetch tours:', error);
      }
    );
  }
}
