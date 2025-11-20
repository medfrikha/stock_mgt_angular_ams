import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.js';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const requiredRole = route.data['role'] as string;

    if (this.auth.roles.includes(requiredRole)) {
      return true;
    }

    this.router.navigate(['/forbidden']);
    return false;
  }
}