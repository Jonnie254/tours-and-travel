import { Booking } from "./booking";

export interface Tour {
  id: string;
  destination: string;
  duration: number;
  price: number;
  tourType: string;
  description?: string;
  isDeleted: boolean;
  createdAt: Date;
  bookings: Booking[];
  startDates: Date[];
  startLocation: string;
}
