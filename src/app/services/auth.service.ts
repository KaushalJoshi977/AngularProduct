import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:8080/api/auth';

  // Signal to track authentication state
  isAuthenticated = signal<boolean>(!!localStorage.getItem('token'));

  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/login`, credentials, { responseType: 'text' })
      .pipe(tap(token => {
        localStorage.setItem('token', token);
        this.isAuthenticated.set(true);
      }));
  }

  register(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user, { responseType: 'text' });
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }
}