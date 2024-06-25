import { Booking } from "./booking";
export interface Tour {
  id?: string;
  name: string;
  description?: string;
  price: number;
  location: string;
  images: string;
  startDateTime: Date;
  endDateTime: Date;
  tourType: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  bookings?: Booking[];
}
