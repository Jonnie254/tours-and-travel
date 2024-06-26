import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToursService } from '../../services/tours.service';
import { CommonModule } from '@angular/common';
import { error } from 'console';

@Component({
  selector: 'app-create-tour',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-tour.component.html',
  styleUrl: './create-tour.component.css',
})
export class CreateTourComponent {
  createFormError: boolean = false;
  createFormSuccess: boolean = false;
  createFormMessage: string = '';
  spinnerVisible: boolean = false;
  clearMessages() {
    this.createFormSuccess = false;
    this.createFormError = false;
    this.createFormMessage = '';
  }
  tourForm: FormGroup = new FormGroup({});
  displayProperties = {
    name: true,
    description: true,
    price: true,
    location: true,
    images: true,
    startDateTime: true,
    endDateTime: true,
    tourType: true,
  };

  constructor(private fb: FormBuilder, private tourService: ToursService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.tourForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      location: ['', Validators.required],
      images: [''],
      startDateTime: ['', [Validators.required, this.validateDateInPast]],
      endDateTime: ['', Validators.required],
      tourType: ['', Validators.required],
    });
  }
  imageurl: string = '';
  getImagesUrl(event: any) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'tours_travel');
      formData.append('cloud_name', 'do9a5sjgi');
      this.imageurl = '';
      this.showSpinner();

      fetch('https://api.cloudinary.com/v1_1/do9a5sjgi/image/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          this.imageurl = result.url;
          this.tourForm.patchValue({ images: this.imageurl });
          setTimeout(() => {
            this.hideSpinner();
          }, 2000);
        })
        .catch((error) => {
          console.error('Error:', error);
          this.hideSpinner();
        });
    }
  }
  showSpinner() {
    this.spinnerVisible = true;
  }

  hideSpinner() {
    this.spinnerVisible = false;
  }

  validateDateInPast(control: { value: string | number | Date }) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      return { dateInPast: true };
    }
    return null;
  }

  // Convenience getter for easy access to form fields in the template
  get f() {
    return this.tourForm.controls;
  }

  onSubmit() {
    if (this.tourForm.valid) {
      const formData = this.tourForm.value;
      this.tourService.createTour(formData).subscribe({
        next: (response) => {
          this.createFormSuccess = true;
          this.createFormError = false;
          this.createFormMessage = 'Tour created successfully';
          setTimeout(() => {
            this.clearMessages();
          }, 3000);
          this.tourForm.reset();
        },
        error: (error: any) => {
          this.createFormError = true;
          this.createFormSuccess = false;
          this.createFormMessage = 'Error creating tour';
          setTimeout(() => {
            this.clearMessages();
          }, 3000);
        },
      });
    } else {
    }
  }
}
