import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from '../interface/userlogins';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token: string = localStorage.getItem('token') || '';
  headers: HttpHeaders = new HttpHeaders({
    Authorization: this.token,
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) {}
  createUser(signUpObj: User): Observable<any> {
    return this.http.post<{
      success: boolean;
      message: string;
      data: null;
    }>('http://localhost:3000/user/create', signUpObj);
  }
  getuserProfile(): Observable<any> {
    return this.http.get<{
      user: { id: string; name: string; email: string };
    }>(`http://localhost:3000/user/profile/`, { headers: this.headers });
  }
  getAllUsers(): Observable<User[]> {
    return this.http
      .get<{ success: boolean; message: string; data: User[] }>(
        `http://localhost:3000/user/all`
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
  updateUser(user: User): Observable<any> {
    return this.http.put<{
      success: boolean;
      message: string;
      data: null;
    }>(`http://localhost:3000/user/update/${user.id}`, user);
  }
  deleteUser(user_id: string): Observable<any> {
    return this.http.delete<{
      success: boolean;
      message: string;
      data: null;
    }>(`http://localhost:3000/user/delete/${user_id}`);
  }
}
