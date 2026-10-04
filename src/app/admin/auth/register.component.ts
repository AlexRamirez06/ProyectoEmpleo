import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="w-full max-w-md mx-auto relative">
      
      <div class="mb-8 animate-slide-in-left" style="animation-delay: 0.1s">
        <h2 class="text-2xl md:text-3xl font-bold text-text-main mb-2">Registra tu empresa</h2>
        <p class="text-text-muted">Crea la cuenta para tu equipo de reclutamiento.</p>
      </div>

      <div class="p-8 border-2 border-dashed border-gray-200 rounded-xl text-center bg-gray-50 animate-slide-in-left" style="animation-delay: 0.3s">
        <p class="text-text-muted font-medium">Formulario en construcción</p>
      </div>

      <!-- Separador y Enlace a Login -->
      <div class="mt-8 pt-8 border-t border-gray-200 text-center animate-slide-in-left" style="animation-delay: 0.4s">
        <a routerLink="/admin/login" class="link-animated text-sm">
          ¿Ya tienes cuenta? Inicia sesión
          <span class="link-animated__arrow">&rarr;</span>
        </a>
      </div>

    </div>
  `
})
export class RegisterComponent {}
