// TypeScript
import {  inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = () => {
  const token = inject(TokenService).getToken();
  const router = inject(Router);
  if (!token) {
    router.navigate(['/login']).then(r => console.log(r));
    return false;
  }
  return true;
};
