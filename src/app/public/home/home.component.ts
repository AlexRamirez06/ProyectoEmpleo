import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- Quitamos el min-h-screen y usamos flex-1 para que se ajuste al espacio que deja el footer -->
    <div class="flex flex-col md:flex-row flex-1 w-full bg-surface relative overflow-hidden">
      <h1 class="sr-only">EmpleosPro - Portal de Empleos</h1>

      <!-- Mitad Candidatos -->
      <!-- En celular se ve primero (arriba) -->
      <div class="group/half flex-1 md:hover:flex-[1.1] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-center px-6 sm:px-8 md:px-16 py-24 md:py-0 relative bg-primary-50 text-text-main focus-within:ring-4 focus-within:ring-primary-500 focus-within:z-10 overflow-hidden">
        
        <!-- Decoración Fondo (formas sutiles) -->
        <div class="absolute inset-0 pointer-events-none opacity-40 md:group-hover/half:opacity-70 transition-opacity duration-700 motion-reduce:transition-none">
          <div class="absolute -top-32 -left-32 w-[32rem] h-[32rem] bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-80 animate-float motion-reduce:animate-none"></div>
          <div class="absolute bottom-0 right-0 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float motion-reduce:animate-none" style="animation-delay: -2s"></div>
        </div>

        <div class="relative z-10 w-full max-w-xl mx-auto md:ml-auto md:mr-8 lg:mr-16">
          <a routerLink="/plazas" class="absolute inset-0 z-10" aria-hidden="true" tabindex="-1"></a>
          
          <div class="relative z-20 pointer-events-none">
            <div class="opacity-0 motion-safe:animate-fade-in-up" style="animation-delay: 0.1s">
              <span class="inline-block px-3 py-1 rounded-full bg-white text-primary-700 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm border border-primary-100">Para candidatos</span>
            </div>
            
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 opacity-0 motion-safe:animate-fade-in-up" style="animation-delay: 0.2s">
              Encuentra tu próximo empleo
            </h2>
            
            <p class="text-lg md:text-xl text-text-muted mb-8 opacity-0 motion-safe:animate-fade-in-up max-w-md" style="animation-delay: 0.3s">
              Explora las plazas abiertas y aplica en minutos.
            </p>
            
            <div class="flex flex-col items-start gap-5 opacity-0 motion-safe:animate-fade-in-up" style="animation-delay: 0.4s">
              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <!-- Botón Principal -->
                <a routerLink="/plazas" class="btn btn-primary pointer-events-auto" data-motion="forward">
                  <span>Ver plazas abiertas</span>
                  <svg class="btn__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                
                <!-- Enlace Secundario -->
                <a routerLink="/plazas/bolsa-de-talento" class="link-animated pointer-events-auto z-30">
                  Unirme a la bolsa de talento
                  <span class="link-animated__arrow">&rarr;</span>
                </a>
              </div>
              
              <!-- Texto de apoyo -->
              <p class="text-sm text-text-muted max-w-md opacity-0 motion-safe:animate-fade-in-up" style="animation-delay: 0.5s">
                ¿No ves una plaza para ti? Deja tu perfil y te tendremos en cuenta en futuras vacantes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Mitad Empresas -->
      <div class="vt-panel-empresas group/half flex-1 md:hover:flex-[1.1] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-center px-6 sm:px-8 md:px-16 py-24 md:py-0 relative bg-text-main text-white focus-within:ring-4 focus-within:ring-primary-400 focus-within:z-10 overflow-hidden">
        
        <!-- Decoración Fondo -->
        <div class="absolute inset-0 pointer-events-none opacity-30 md:group-hover/half:opacity-50 transition-opacity duration-700 motion-reduce:transition-none">
          <div class="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-primary-700 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-float motion-reduce:animate-none" style="animation-delay: -4s"></div>
          <div class="absolute top-20 left-20 w-48 h-48 bg-primary-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-float motion-reduce:animate-none"></div>
        </div>

        <div class="relative z-10 w-full max-w-xl mx-auto md:mr-auto md:ml-8 lg:ml-16">
          <a routerLink="/admin/login" class="absolute inset-0 z-10" aria-hidden="true" tabindex="-1"></a>
          
          <div class="relative z-20 pointer-events-none">
            <div class="opacity-0 motion-safe:animate-fade-in-up" style="animation-delay: 0.2s">
              <span class="inline-block px-3 py-1 rounded-full bg-slate-800 text-primary-200 border border-slate-700 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">Para empresas</span>
            </div>
            
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 opacity-0 motion-safe:animate-fade-in-up" style="animation-delay: 0.3s">
              Encuentra al talento que necesitas
            </h2>
            
            <p class="text-lg md:text-xl text-slate-300 mb-8 opacity-0 motion-safe:animate-fade-in-up max-w-md" style="animation-delay: 0.4s">
              Publica plazas, recibe postulaciones y filtra tu bolsa de talento en un solo lugar.
            </p>
            
            <div class="flex flex-col items-start gap-3 opacity-0 motion-safe:animate-fade-in-up" style="animation-delay: 0.5s">
              <a routerLink="/admin/login" class="btn btn-inverse pointer-events-auto" data-motion="forward">
                <span>Ingresar como empresa</span>
                <svg class="btn__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              
              <p class="text-sm text-slate-400 mt-2 max-w-md opacity-0 motion-safe:animate-fade-in-up" style="animation-delay: 0.6s">
                Acceso para el equipo de reclutamiento de tu empresa.
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  `
})
export class HomeComponent { }
