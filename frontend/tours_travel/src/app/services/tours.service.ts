import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Tour } from '../interface/tour';

@Injectable({
  providedIn: 'root',
})
export class ToursService {
  constructor(private http: HttpClient) {}
  createTour(tour: Tour): Observable<any> {
    return this.http.post<{
      success: boolean;
      message: string;
      data: null;
    }>('http://localhost:3000/tour/create', tour);
  }
  getAllTours(): Observable<Tour[]> {
    return this.http
      .get<{ success: boolean; message: string; data: Tour[] }>(
        `http://localhost:3000/tour/getall`
      )
      .pipe(
        map((response: { success: any; data: any }) => {
          if (response.success && response.data) {
            return response.data;
          } else {
            return [];
          }
        }),
        catchError((error) => {
          console.error('Error fetching users:', error);
          return throwError(error);
        })
      );
  }
  getTourById(
    id: string
  ): Observable<{ success: boolean; message: string; data: Tour }> {
    return this.http.get<{ success: boolean; message: string; data: Tour }>(
      `http://localhost:3000/tour/get/${id}`
    );
  }

  deleteTour(id: string): Observable<any> {
    return this.http.delete<{
      success: boolean;
      message: string;
      data: null;
    }>(`http://localhost:3000/tour/delete/${id}`);
  }
}
