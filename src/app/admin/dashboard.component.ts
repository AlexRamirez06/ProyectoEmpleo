import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="p-8">
      <h1 class="text-3xl font-bold text-text-main mb-4">Panel de la empresa</h1>
      <p class="text-text-muted mb-8 max-w-md">Pantalla en construcción. Pronto verás tus ofertas de empleo aquí.</p>
      <a routerLink="/admin/login" class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-sm transition-colors">
        Cerrar sesión
      </a>
    </div>
  `
})
export class DashboardComponent {}
