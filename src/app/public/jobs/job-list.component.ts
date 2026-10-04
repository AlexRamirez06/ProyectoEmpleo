import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrandComponent } from '../../core/components/brand.component';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [RouterLink, BrandComponent],
  template: `
    <div class="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <app-brand class="mb-8" />
      <h1 class="text-3xl font-bold text-text-main mb-4">Plazas abiertas</h1>
      <p class="text-text-muted mb-8 text-center max-w-md">Pantalla en construcción. Pronto podrás ver las plazas aquí.</p>
      <a routerLink="/" class="text-primary-600 hover:text-primary-700 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md p-2">&larr; Volver al inicio</a>
    </div>
  `
})
export class JobListComponent {}
