import { Tour } from './tour';

export interface Booking {
  id: string;
  bookingDate: Date;
  status: string;
  userId: string;
  tourId: string;
  tour: Tour;
}
