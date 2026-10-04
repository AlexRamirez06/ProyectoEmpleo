import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrandComponent } from '../core/components/brand.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, BrandComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-background relative">
      <!-- Encabezado minimalista superpuesto -->
      <header class="absolute top-0 w-full z-20 pointer-events-none">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center">
          <a href="/" class="pointer-events-auto inline-block rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" aria-label="Ir al inicio">
            <app-brand />
          </a>
        </div>
      </header>

      <!-- El main debe ocupar 100vh para que el layout dividido funcione perfecto -->
      <main class="flex-1 flex flex-col min-h-screen">
        <router-outlet />
      </main>

      <!-- Pie de página superpuesto -->
      <footer class="absolute bottom-0 w-full z-20 pointer-events-none pb-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p class="text-sm font-medium text-slate-400 drop-shadow-sm mix-blend-difference opacity-80">
            &copy; 2026 EmpleosPro. Portal de talento.
          </p>
        </div>
      </footer>
    </div>
  `,
  styles: ``
})
export class PublicLayoutComponent {}
