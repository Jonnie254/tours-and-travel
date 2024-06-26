import { Component } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { Tour } from '../../interface/tour';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admintour-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admintour-view.component.html',
  styleUrls: ['./admintour-view.component.css'],
})
export class AdmintourViewComponent {
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

  deleteTour(id: string) {
    this.tourService.deleteTour(id).subscribe(
      (response) => {
        if (response.success) {
          this.fetchTours();
        } else {
          console.error('Failed to delete tour:', response.message);
        }
      },
      (error) => {
        console.error('Failed to delete tour:', error);
      }
    );
  }
}
