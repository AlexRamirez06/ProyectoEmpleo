import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./admin/layout.component').then(m => m.AdminLayoutComponent),
    children: [
      { path: 'login', loadComponent: () => import('./admin/auth/login.component').then(m => m.LoginComponent) },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    loadComponent: () => import('./public/layout.component').then(m => m.PublicLayoutComponent),
    children: [
      { path: '', loadComponent: () => import('./public/home/home.component').then(m => m.HomeComponent) },
      { path: 'plazas', loadComponent: () => import('./public/jobs/job-list.component').then(m => m.JobListComponent) }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
