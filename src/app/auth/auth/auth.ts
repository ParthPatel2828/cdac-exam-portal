import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToasterService } from '../../common/toaster-service/toaster.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  // signal for toggling forms
  isLogin = signal<boolean>(true);
  isLoading = signal<boolean>(false);

  // Login form
  loginStudentId = signal<string>('');
  loginPassword = signal<string>('');

  // Register form
  registerEmail = signal<string>('');
  registerStudentId = signal<string>('');
  registerPassword = signal<string>('');

  constructor(
    private authService: AuthService,
    private toasterService: ToasterService,
    private router: Router
  ) {}

  toggleForm(type: 'login' | 'register') {
    this.isLogin.set(type === 'login');
    // Reset forms
    this.resetForms();
  }

  private resetForms() {
    this.loginStudentId.set('');
    this.loginPassword.set('');
    this.registerEmail.set('');
    this.registerStudentId.set('');
    this.registerPassword.set('');
  }

  async onLogin() {
    const studentId = this.loginStudentId().trim();
    const password = this.loginPassword().trim();

    if (!studentId || !password) {
      this.toasterService.error('Please enter Student ID and Password');
      return;
    }

    this.isLoading.set(true);

    try {
      const result = await this.authService.login(studentId, password);
      if (result.success) {
        this.toasterService.success(result.message);
        // Redirect to exam portal
        setTimeout(() => {
          this.router.navigate(['/exam']);
        }, 500);
      } else {
        this.toasterService.error(result.message);
      }
    } catch (error) {
      this.toasterService.error('An error occurred during login');
    } finally {
      this.isLoading.set(false);
    }
  }

  async onRegister() {
    const email = this.registerEmail().trim();
    const studentId = this.registerStudentId().trim();
    const password = this.registerPassword().trim();

    if (!email || !studentId || !password) {
      this.toasterService.error('Please fill in all fields');
      return;
    }

    if (!this.isValidEmail(email)) {
      this.toasterService.error('Please enter a valid email address');
      return;
    }

    this.isLoading.set(true);

    try {
      const result = await this.authService.register(email, studentId, password);
      if (result.success) {
        this.toasterService.success(result.message);
        // Redirect to exam portal
        setTimeout(() => {
          this.router.navigate(['/exam']);
        }, 500);
      } else {
        this.toasterService.error(result.message);
      }
    } catch (error) {
      this.toasterService.error('An error occurred during registration');
    } finally {
      this.isLoading.set(false);
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

