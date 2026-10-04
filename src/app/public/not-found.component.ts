import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrandComponent } from '../core/components/brand.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, BrandComponent],
  template: `
    <div class="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <app-brand class="mb-8" />
      <h1 class="text-4xl font-bold text-text-main mb-2">404</h1>
      <h2 class="text-xl font-semibold text-text-muted mb-8">Página no encontrada</h2>
      <a routerLink="/" class="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors">
        Volver al inicio
      </a>
    </div>
  `
})
export class NotFoundComponent {}
