import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  studentId: string;
  email?: string;
  password?: string;
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
        // Validate against stored users
        const users = this.getStoredUsers();
        const matched = users.find(u => u.studentId === studentId && u.password === password);

        if (matched) {
          const user: User = { studentId: matched.studentId, email: matched.email };
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', 'fake-token-' + Date.now());
          this.currentUser.next(user);
          this.isAuthenticated.next(true);
          resolve({ success: true, message: 'Login successful!' });
        } else {
          resolve({ success: false, message: 'Invalid Student ID or Password!' });
        }
      }, 500);
    });
  }

  register(email: string, studentId: string, password: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      // Simulate API call
      setTimeout(() => {
        if (!email || !studentId || !password) {
          resolve({ success: false, message: 'Please fill all fields!' });
          return;
        }

        const users = this.getStoredUsers();

        // Prevent duplicate registrations
        const exists = users.some(u => u.studentId === studentId || (u.email && u.email === email));
        if (exists) {
          resolve({ success: false, message: 'User with this Student ID or Email already exists.' });
          return;
        }

        const newUser: User = { studentId, email, password };
        users.push(newUser);
        this.saveUsers(users);

        resolve({ success: true, message: 'Registration successful! Please login to continue.' });
      }, 500);
    });
  }

  private getStoredUsers(): User[] {
    const raw = localStorage.getItem('users');
    try {
      return raw ? JSON.parse(raw) as User[] : [];
    } catch (e) {
      return [];
    }
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
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
