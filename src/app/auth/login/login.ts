import { Component } from '@angular/core';
import { AuthService } from '../auth.js';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [CommonModule, FormsModule, RouterLink],

})
export class LoginComponent {
  email = '';
  password = '';
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}


  login() {
    this.auth.login({email:this.email, password:this.password}).subscribe({
      next: (res: any) => {
        // Save JWT token
        localStorage.setItem('token', res.token);

        // Navigate to protected page
        this.router.navigate(['/providers']);
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }
}