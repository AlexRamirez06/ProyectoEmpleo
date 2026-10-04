import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrandComponent } from '../../core/components/brand.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, BrandComponent],
  template: `
    <div class="flex flex-col md:flex-row min-h-screen w-full bg-background relative">
      
      <!-- Panel de marca (Izquierda) -->
      <div class="vt-panel-empresas flex-none md:w-[45%] lg:w-[40%] bg-text-main text-white px-8 py-10 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden z-20">
        <!-- Decoración Fondo -->
        <div class="absolute inset-0 pointer-events-none opacity-40 motion-reduce:transition-none">
          <div class="absolute top-20 left-10 w-64 h-64 bg-primary-700 rounded-full mix-blend-screen filter blur-[80px] opacity-60 animate-float motion-reduce:animate-none"></div>
          <div class="absolute bottom-20 right-10 w-96 h-96 bg-primary-500 rounded-full mix-blend-overlay filter blur-[100px] opacity-40 animate-float motion-reduce:animate-none" style="animation-delay: -3s"></div>
        </div>

        <div class="relative z-10 w-full max-w-sm mx-auto md:max-w-none md:mx-0">
          <app-brand class="vt-brand-logo inline-block mb-10 md:mb-24" [lightText]="true" />
          
          <div class="hidden md:block opacity-0 motion-safe:animate-fade-in-up" style="animation-delay: 0.3s">
            <h1 class="text-3xl lg:text-4xl font-extrabold tracking-tight mb-8">
              Gestiona tu talento en un solo lugar
            </h1>
            
            <ul class="space-y-6 text-slate-300">
              <li class="flex items-start">
                <svg class="w-6 h-6 text-primary-400 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-lg">Publica plazas en minutos</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 text-primary-400 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012-2v2M7 7h10" />
                </svg>
                <span class="text-lg">Recibe postulaciones ordenadas</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 text-primary-400 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span class="text-lg">Filtra tu bolsa de talento</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Panel del Formulario (Derecha) con Router Outlet -->
      <div class="vt-auth-form flex-1 flex flex-col justify-center px-6 py-12 md:px-12 lg:px-24 bg-background md:bg-surface rounded-t-3xl md:rounded-none -mt-6 md:mt-0 relative z-10 overflow-x-hidden">
        <router-outlet></router-outlet>
      </div>

    </div>
  `
})
export class AuthLayoutComponent {}
