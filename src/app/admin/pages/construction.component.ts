import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-construction',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex flex-col items-center justify-center py-20 px-4 text-center animate-slide-in-right motion-reduce:animate-none">
      <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <svg class="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-text-main mb-2">Pantalla en construcción</h2>
      <p class="text-text-muted mb-8 max-w-md">Estamos trabajando en la sección de <strong>{{ title }}</strong>. Estará disponible muy pronto.</p>
      @if (title !== 'Panel') {
        <a routerLink="/admin" class="btn btn-primary" data-motion="back">
          <svg class="btn__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Volver al panel</span>
        </a>
      }
    </div>
  `
})
export class ConstructionComponent {
  route = inject(ActivatedRoute);
  title = this.route.snapshot.data['title'] || 'Panel';
}
