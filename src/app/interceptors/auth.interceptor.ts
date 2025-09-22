// src/app/interceptors/auth.interceptor.ts
import {HttpContextToken, HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import {catchError, throwError} from 'rxjs';
import {Router} from '@angular/router';
export const SKIP_AUTH = new HttpContextToken<boolean>(() => false);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (req.context.get(SKIP_AUTH)) {
    return next(req);
  }
  const token = tokenService.getToken();
  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

 // return next(req);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        // Token expiré ou non autorisé
        tokenService.clearToken();
        router.navigate(['/login']).then(r => console.log(r)); // redirige vers login
      }
      return throwError(() => err);
    })
  );
};
