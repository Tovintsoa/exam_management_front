import {Injectable} from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {Observable} from 'rxjs';
import { SKIP_AUTH } from '../interceptors/auth.interceptor';
import { API_URL } from '../constants/api.constants';

export interface LoginPlayoad {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root'}
)
export class AuthService {

  constructor(private http: HttpClient) {}
  login(payload: LoginPlayoad): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API_URL}/auth`, payload, { context: new HttpContext().set(SKIP_AUTH, true)});
  }


}
