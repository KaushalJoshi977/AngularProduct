import { ApplicationConfig, provideZonelessChangeDetection, inject } from '@angular/core'; 
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, HttpErrorResponse } from '@angular/common/http';
import { routes } from './app.routes';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

// Functional Interceptor for JWT + Error Handling
export const authInterceptor = (req: any, next: any) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  
  let cloned = req;
  if (token) {
    cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(cloned).pipe(
    catchError((error: HttpErrorResponse) => {
      // If backend returns 401 (Token expired/invalid), clear and redirect
      if (error.status === 401) {
        localStorage.removeItem('token');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};

export const appConfig: ApplicationConfig = {
  providers: [
    // RENAME THIS HERE:
    provideZonelessChangeDetection(), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};