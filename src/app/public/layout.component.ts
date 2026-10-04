import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrandComponent } from '../core/components/brand.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, BrandComponent],
  template: `
    <!-- La estructura principal es una columna flex de alto completo -->
    <div class="min-h-screen flex flex-col bg-background relative overflow-x-hidden">
      
      <!-- Encabezado minimalista superpuesto -->
      <!-- Usa px-6 sm:px-8 md:px-16 para alinear exactamente con el contenido de las mitades de inicio -->
      <header class="absolute top-0 w-full z-20 pointer-events-none">
        <div class="w-full h-24 flex items-center px-6 sm:px-8 md:px-16">
          <a href="/" class="pointer-events-auto inline-block rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" aria-label="Ir al inicio">
            <!-- El logo queda fijo a la izquierda, que siempre es clara (bg-primary-50), por lo que lightText=false asegura buen contraste en móvil y escritorio -->
            <app-brand class="vt-brand-logo inline-block" [lightText]="false" />
          </a>
        </div>
      </header>

      <!-- Contenido de las páginas -->
      <main class="flex-1 flex flex-col w-full">
        <router-outlet />
      </main>

      <!-- Pie de página discreto inferior, con su propio fondo oscuro para que el texto cruce bien y se lea perfecto (AA) -->
      <footer class="w-full bg-slate-900 border-t border-slate-800 py-6 mt-auto shrink-0 z-30">
        <div class="w-full px-6 text-center">
          <p class="text-sm font-medium text-slate-400">
            &copy; 2026 EmpleosPro. Portal de talento.
          </p>
        </div>
      </footer>
      
    </div>
  `,
  styles: ``
})
export class PublicLayoutComponent {}
