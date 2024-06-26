import { Component } from '@angular/core';
import { Tour } from '../../interface/tour';
import { ToursService } from '../../services/tours.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tour-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tour-detail.component.html',
  styleUrl: './tour-detail.component.css',
})
export class TourDetailComponent {
  tour: Tour | undefined;

  constructor(private tourService: ToursService) {}

  fetchTourById(tour_id: string) {
    this.tourService.getTourById(tour_id).subscribe(
      (response) => {
        if (response.success) {
          this.tour = response.data;
        } else {
          console.error('Failed to fetch tour:', response.message);
        }
      },
      (error) => {
        console.error('Failed to fetch tour:', error);
      }
    );
  }
}
