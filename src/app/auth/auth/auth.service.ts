import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  studentId: string;
  email?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = new BehaviorSubject<User | null>(this.getStoredUser());
  public currentUser$ = this.currentUser.asObservable();

  private isAuthenticated = new BehaviorSubject<boolean>(this.hasStoredUser());
  public isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor() {}

  private getStoredUser(): User | null {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  }

  private hasStoredUser(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  login(studentId: string, password: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      // Simulate API call
      setTimeout(() => {
        if (studentId && password) {
          const user: User = { studentId };
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', 'fake-token-' + Date.now());
          this.currentUser.next(user);
          this.isAuthenticated.next(true);
          resolve({ success: true, message: 'Login successful!' });
        } else {
          resolve({ success: false, message: 'Invalid credentials!' });
        }
      }, 500);
    });
  }

  register(email: string, studentId: string, password: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      // Simulate API call
      setTimeout(() => {
        if (email && studentId && password) {
          const user: User = { studentId, email };
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', 'fake-token-' + Date.now());
          this.currentUser.next(user);
          this.isAuthenticated.next(true);
          resolve({ success: true, message: 'Registration successful! Redirecting to exam...' });
        } else {
          resolve({ success: false, message: 'Please fill all fields!' });
        }
      }, 500);
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUser.next(null);
    this.isAuthenticated.next(false);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated.value;
  }

  getCurrentUser(): User | null {
    return this.currentUser.value;
  }
}
