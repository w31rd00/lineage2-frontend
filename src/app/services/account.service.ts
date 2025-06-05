import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'http://localhost:8080/account'; // Adjust as needed

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getBalance(): Observable<{ balance: number }> {
    const headers = this.getHeaders();
    return this.http.get<{ balance: number }>(`${this.apiUrl}/balance`, { headers });
  }

  addBalance(amount: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<{ balance: number }>(`${this.apiUrl}/add-balance`, { amount }, { headers });
  }

  changePassword(data: ChangePasswordRequest): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/change-password`, data, { headers })
  }


  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return headers;
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
