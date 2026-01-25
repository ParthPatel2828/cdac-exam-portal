import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { Auth } from './auth/auth/auth';
import { ExamLayout } from './common/exam-layout/exam-layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'exam',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Auth,
  },
  {
    path: 'exam',
    component: ExamLayout,
    canActivate: [authGuard]
  }
];
