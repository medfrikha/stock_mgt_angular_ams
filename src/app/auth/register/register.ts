import { Component } from '@angular/core';
import { AuthService } from '../auth';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  userName = '';
  email = '';
  password = '';
  role = '[USER]';
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    const user = {
      userName: this.userName,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.auth.register(user).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/providers']);
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Registration failed';
      }
    });
  }
}
