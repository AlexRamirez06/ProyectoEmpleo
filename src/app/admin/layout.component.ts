import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen flex flex-col md:flex-row bg-background">
      <!-- Sidebar temporal -->
      <aside class="w-full md:w-64 bg-surface border-r border-gray-200 flex flex-col">
        <div class="h-16 flex items-center px-6 border-b border-gray-200">
          <span class="font-bold text-lg text-primary-700">Panel de Empresa</span>
        </div>
        <nav class="flex-1 p-4 space-y-1">
          <a href="/admin" class="block px-3 py-2 rounded-md bg-primary-50 text-primary-700 font-medium text-sm">
            Mis Ofertas
          </a>
          <a href="/" class="block px-3 py-2 rounded-md text-text-muted hover:bg-gray-50 hover:text-text-main font-medium text-sm transition-colors mt-auto">
            &larr; Volver al portal
          </a>
        </nav>
      </aside>

      <main class="flex-1 overflow-auto">
        <router-outlet />
      </main>
    </div>
  `,
  styles: ``
})
export class AdminLayoutComponent {}
