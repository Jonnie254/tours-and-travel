import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static isLoggedIn: any;
  private baseUrl = 'http://localhost:3000/auth';
  private user_id: string = '';

  constructor(private http: HttpClient) {}
  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        map(
          (response: {
            success: any;
            message: any;
            data: { token: string; id: string };
          }) => {
            if (response.success) {
              localStorage.setItem('user_id', response.data.id);
              localStorage.setItem('token', response.data.token);
            }
            return response;
          }
        )
      );
  }
  getUserID(): string {
    return this.user_id;
  }
}
