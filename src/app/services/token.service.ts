import {Injectable} from '@angular/core';
const TOKEN_KEY = 'auth_token';

@Injectable({ providedIn: 'root' })

export class TokenService {
  setToken(token: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  }
  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  }
  clearToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.removeItem(TOKEN_KEY);
    } return null;

  }


}
