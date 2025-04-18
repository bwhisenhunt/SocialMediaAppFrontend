import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL: string = "https://localhost:7025/api/auth";

  constructor(private http: HttpClient) { }

  signUp(newUser: User): Observable<any> {
    return this.http.post(`${this.baseURL}/register`, newUser);
  }

  login(email: string, password: string): Observable<any> {
    const queryParams = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.get(`${this.baseURL}/login`, { params: queryParams, responseType: 'text' })
      .pipe(
        tap(response => localStorage.setItem('myPostToken', response))
      );
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseURL}/users/${userId}`);
  }

  updateUser(updatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.baseURL}/users/${updatedUser.id}`, updatedUser);
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseURL}/auth/is-authenticated`);
  }

  logout(): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/auth/logout`);
  }
}