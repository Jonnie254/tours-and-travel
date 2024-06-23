export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
  userId: string;
  tourId: string;
}
