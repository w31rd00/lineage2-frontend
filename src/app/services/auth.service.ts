// src/app/services/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

interface SignUpRequest {
  username: string;
  email: string;
  password: string;
}

interface SignInRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: any;
}

interface JWTPayload {
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth'; // Adjust to your backend URL

  constructor(
    private http: HttpClient, 
    private router: Router
  ) {}

  signUp(data: SignUpRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/sign-up`, data);
  }

  signIn(data: SignInRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/sign-in`, data);
  }

  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('auth_token');
    if (!token) return false;

    try {
      const decoded = jwtDecode<JWTPayload>(token);
      const now = Date.now() / 1000;
      return decoded.exp > now;
    } catch (e) {
      return false;
    }
  }

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, {
      token,
      newPassword
    });
  }

  parseErrorMessage(error: any): string {
    let result: string;
    if (error.message) {
      result = error.message;
    } else if (error.title) {
      result = error.title;
    } else {
      result = 'Unexpected Error.'
    }
    return result;
  }
  
}
