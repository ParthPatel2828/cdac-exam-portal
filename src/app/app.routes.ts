import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'exam',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/auth/auth').then((m) => m.Auth),
  },
  {
    path: 'exam',
    loadComponent: () =>
      import('./common/exam-layout/exam-layout').then((m) => m.ExamLayout),
    canActivate: [authGuard]
  }
];
