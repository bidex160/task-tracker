import { Routes, mapToCanActivate } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: mapToCanActivate([AuthGuard]),
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
];
