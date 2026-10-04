import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- Se añade min-h-screen para garantizar que cubra toda la altura de la ventana -->
    <div class="flex flex-col md:flex-row min-h-screen w-full bg-surface">
      <h1 class="sr-only">EmpleosPro - Portal de Empleos</h1>

      <!-- Mitad Candidatos -->
      <div class="group flex-1 md:hover:flex-[1.1] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-center px-8 md:px-16 py-24 md:py-0 relative overflow-hidden bg-primary-50 text-text-main focus-within:ring-4 focus-within:ring-primary-500 focus-within:z-10">
        
        <!-- Decoración Fondo -->
        <div class="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-700 motion-reduce:transition-none">
          <div class="absolute -top-24 -left-24 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float motion-reduce:animate-none"></div>
        </div>

        <div class="relative z-10 max-w-xl md:ml-auto md:mr-8 lg:mr-16 w-full">
          <!-- Area clickeable principal que cubre toda la mitad -->
          <a routerLink="/plazas" class="absolute inset-0 z-10 rounded-none focus:outline-none focus-visible:ring-inset focus-visible:ring-4 focus-visible:ring-primary-600" aria-label="Ver plazas abiertas para candidatos"></a>
          
          <div class="relative z-20 pointer-events-none">
            <div class="opacity-0 motion-safe:animate-fade-in-up" style="animation-delay: 0.1s">
              <span class="inline-block px-3 py-1 rounded-full bg-white text-primary-700 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">Para candidatos</span>
            </div>
            
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 opacity-0 motion-safe:animate-fade-in-up" style="animation-delay: 0.2s">
              Encuentra tu próximo empleo
            </h2>
            
            <p class="text-lg md:text-xl text-text-muted mb-8 opacity-0 motion-safe:animate-fade-in-up max-w-md" style="animation-delay: 0.3s">
              Explora las plazas abiertas y aplica en minutos, sin crear cuenta.
            </p>
            
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 opacity-0 motion-safe:animate-fade-in-up" style="animation-delay: 0.4s">
              <span class="pointer-events-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 group-hover:bg-primary-700 transition-colors shadow-sm">
                Ver plazas
                <svg class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform motion-reduce:transition-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              
              <!-- Enlace secundario con mayor z-index para ser clickeable -->
              <a routerLink="/talento" class="pointer-events-auto relative z-30 text-sm font-medium text-primary-700 hover:text-primary-800 transition-colors px-2 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md">
                Unirme a la bolsa de talento
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Mitad Empresas -->
      <div class="group flex-1 md:hover:flex-[1.1] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-center px-8 md:px-16 py-24 md:py-0 relative overflow-hidden bg-text-main text-white focus-within:ring-4 focus-within:ring-primary-400 focus-within:z-10">
        
        <!-- Decoración Fondo -->
        <div class="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-700 motion-reduce:transition-none">
          <div class="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-primary-600 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-float motion-reduce:animate-none" style="animation-delay: -5s"></div>
        </div>

        <div class="relative z-10 max-w-xl md:mr-auto md:ml-8 lg:ml-16 w-full">
          <!-- Area clickeable principal -->
          <a routerLink="/admin/login" class="absolute inset-0 z-10 rounded-none focus:outline-none focus-visible:ring-inset focus-visible:ring-4 focus-visible:ring-primary-400" aria-label="Ingresar al portal de empresas"></a>
          
          <div class="relative z-20 pointer-events-none">
            <div class="opacity-0 motion-safe:animate-fade-in-up" style="animation-delay: 0.2s">
              <span class="inline-block px-3 py-1 rounded-full bg-slate-800 text-primary-200 border border-slate-700 text-xs font-semibold uppercase tracking-wider mb-6">Para empresas</span>
            </div>
            
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 opacity-0 motion-safe:animate-fade-in-up" style="animation-delay: 0.3s">
              Encuentra al talento que necesitas
            </h2>
            
            <p class="text-lg md:text-xl text-slate-300 mb-8 opacity-0 motion-safe:animate-fade-in-up max-w-md" style="animation-delay: 0.4s">
              Publica plazas, recibe postulaciones y filtra tu bolsa de talento en un solo lugar.
            </p>
            
            <div class="flex flex-col sm:flex-row items-start gap-4 opacity-0 motion-safe:animate-fade-in-up" style="animation-delay: 0.5s">
              <span class="pointer-events-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-text-main bg-white group-hover:bg-gray-50 transition-colors shadow-sm">
                Ingresar
                <svg class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform motion-reduce:transition-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  `
})
export class HomeComponent {}
