import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterPayload {
  UserName: string;
  Email: string;
  Password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  register(payload: RegisterPayload): Observable<any> {
    // Adjust the endpoint if your backend uses a different one for registration
    return this.http.post(`${this.baseUrl}/register`, payload);
  }

  login(payload: { Email: string; Password: string }): Observable<any> {
  return this.http.post(`${this.baseUrl}/login`, payload);
}
}