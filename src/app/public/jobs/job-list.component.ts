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
      <a routerLink="/" class="btn btn-ghost" data-motion="back">
        <svg class="btn__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Volver al inicio</span>
      </a>
    </div>
  `
})
export class JobListComponent {}
