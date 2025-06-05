import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface BugReportRequest {
  username: string,
  email: string,
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl = 'http://localhost:8080/general'; // Adjust as needed

  constructor(
    private http: HttpClient
  ) { }

  submitBugReport(data: BugReportRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bug-report`, data);
  }
}
