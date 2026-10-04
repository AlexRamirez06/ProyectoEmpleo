import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: '',
        loadComponent: () => import('./admin/layout.component').then(m => m.AdminLayoutComponent),
        children: [
          { path: 'dashboard', loadComponent: () => import('./admin/dashboard.component').then(m => m.DashboardComponent) },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
      },
      {
        path: '',
        loadComponent: () => import('./admin/auth/auth-layout.component').then(m => m.AuthLayoutComponent),
        children: [
          { path: 'login', loadComponent: () => import('./admin/auth/login.component').then(m => m.LoginComponent) },
          { path: 'registro', loadComponent: () => import('./admin/auth/register.component').then(m => m.RegisterComponent) }
        ]
      }
    ]
  },
  {
    path: '',
    loadComponent: () => import('./public/layout.component').then(m => m.PublicLayoutComponent),
    children: [
      { path: '', loadComponent: () => import('./public/home/home.component').then(m => m.HomeComponent) },
      { path: 'plazas/bolsa-de-talento', loadComponent: () => import('./public/jobs/talent-pool.component').then(m => m.TalentPoolComponent) },
      { path: 'plazas', loadComponent: () => import('./public/jobs/job-list.component').then(m => m.JobListComponent) }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./public/not-found.component').then(m => m.NotFoundComponent)
  }
];
