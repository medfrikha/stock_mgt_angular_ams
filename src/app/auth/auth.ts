import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { User } from '../models/user.model.js';

interface JwtPayload {
  sub: string;
  roles: string[];
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8085/api/v1/auth'; // update if needed
  private userSubject = new BehaviorSubject<User | null>(null);

  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }


  register(credentials: { email: string, password: string }) {
    return this.http.post(`${this.apiUrl}/register`, credentials);

  }
  login(credentials: { email: string, password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      map(response => {
        const token = response.token;
        const decoded = jwtDecode<JwtPayload>(token);

        const user: User = {
          email: decoded.sub,
          roles: decoded.roles,
          token
        };

        localStorage.setItem('auth', JSON.stringify(user));
        this.userSubject.next(user);

        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('auth');
    this.userSubject.next(null);
  }

  get token(): string | null {
    return this.userSubject.value?.token || null;
  }

  get roles(): string[] {
    return this.userSubject.value?.roles || [];
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  private loadUserFromStorage() {
    const saved = localStorage.getItem('auth');
    if (saved) {
      this.userSubject.next(JSON.parse(saved));
    }
  }
}