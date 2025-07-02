import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequestDto, LoginResponseDto, UserCreateRequestDto } from '../models/auth.models';
import { Router } from '@angular/router'; // Import Router

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5230/api';

  constructor(private http: HttpClient, private router: Router) { } // Inject Router

  login(credentials: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.apiUrl}/Users/login`, credentials);
  }

  register(userData: UserCreateRequestDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Users`, userData);
  }

  saveUserSession(response: LoginResponseDto): void {
    localStorage.setItem('currentUser', JSON.stringify(response));
    localStorage.setItem('authToken', response.token);
  }

  getCurrentUser(): LoginResponseDto | null {
    const userString = localStorage.getItem('currentUser');
    return userString ? JSON.parse(userString) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']); // Redirect to login after logout
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}