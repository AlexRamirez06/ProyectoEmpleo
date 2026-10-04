import { Component, inject, signal, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BrandComponent } from '../../core/components/brand.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, BrandComponent, NgClass],
  template: `
    <div class="flex flex-col md:flex-row min-h-screen w-full bg-background relative">
      
      <!-- Panel de marca (Izquierda) -->
      <!-- Usa vt-panel-empresas para conectar la transición con la mitad oscura de la página de inicio -->
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
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

      <!-- Panel del Formulario (Derecha) -->
      <div class="flex-1 flex flex-col justify-center px-6 py-12 md:px-12 lg:px-24 bg-background md:bg-surface rounded-t-3xl md:rounded-none -mt-6 md:mt-0 relative z-10">
        <div class="w-full max-w-md mx-auto">
          
          <div class="mb-8 opacity-0 motion-safe:animate-fade-in-up" style="animation-delay: 0.4s">
            <h2 class="text-2xl md:text-3xl font-bold text-text-main mb-2">Bienvenido de nuevo</h2>
            <p class="text-text-muted">Ingresa con la cuenta de tu empresa.</p>
          </div>

          @if (showDemoError()) {
            <div class="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-start animate-shake" role="alert" aria-live="assertive">
              <svg class="w-5 h-5 mr-3 shrink-0 mt-0.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm font-medium">Correo o contraseña incorrectos. Revisa tus datos e inténtalo de nuevo.</span>
            </div>
          }

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6 opacity-0 motion-safe:animate-fade-in-up" style="animation-delay: 0.5s">
            
            <!-- Correo -->
            <div>
              <label for="email" class="block text-sm font-medium text-text-main mb-1 transition-colors" [ngClass]="{'text-primary-600': isFocused('email')}">Correo electrónico</label>
              <input 
                #emailInput
                id="email" 
                type="email" 
                formControlName="email" 
                autocomplete="email"
                (focus)="setFocus('email')"
                (blur)="clearFocus('email')"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow transition-colors"
                [ngClass]="{'border-red-500 focus:ring-red-500 focus:border-red-500': showFieldError('email')}"
                [attr.aria-invalid]="showFieldError('email') ? 'true' : null"
                aria-describedby="email-error"
              >
              @if (showFieldError('email')) {
                <p id="email-error" class="mt-2 text-sm text-red-600 motion-safe:animate-fade-in-up" style="animation-delay: 0s; transform: translateY(5px);" role="alert">
                  Escribe un correo válido, como nombre&#64;empresa.com
                </p>
              }
            </div>

            <!-- Contraseña -->
            <div>
              <div class="flex justify-between items-center mb-1">
                <label for="password" class="block text-sm font-medium text-text-main transition-colors" [ngClass]="{'text-primary-600': isFocused('password')}">Contraseña</label>
                <button type="button" (click)="forgotPassword()" class="text-sm font-medium text-primary-600 hover:text-primary-700 focus:outline-none focus:underline focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div class="relative">
                <input 
                  id="password" 
                  [type]="showPassword() ? 'text' : 'password'" 
                  formControlName="password" 
                  autocomplete="current-password"
                  (focus)="setFocus('password')"
                  (blur)="clearFocus('password')"
                  class="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow transition-colors"
                  [ngClass]="{'border-red-500 focus:ring-red-500 focus:border-red-500': showFieldError('password')}"
                  [attr.aria-invalid]="showFieldError('password') ? 'true' : null"
                  aria-describedby="password-error"
                >
                <button 
                  type="button"
                  (click)="togglePassword()"
                  class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:text-primary-600 rounded-lg transition-colors"
                  [attr.aria-label]="showPassword() ? 'Ocultar contraseña' : 'Mostrar contraseña'"
                  [attr.aria-pressed]="showPassword()"
                >
                  @if (showPassword()) {
                    <svg class="w-5 h-5 motion-safe:animate-fade-in-up" style="animation-duration: 0.2s" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  } @else {
                    <svg class="w-5 h-5 motion-safe:animate-fade-in-up" style="animation-duration: 0.2s" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-2.43 0-4.64-.8-6.33-2.17m-1.21-1.83a9.95 9.95 0 01-1.002-3z" />
                    </svg>
                  }
                </button>
              </div>
              @if (showFieldError('password')) {
                <p id="password-error" class="mt-2 text-sm text-red-600 motion-safe:animate-fade-in-up" style="animation-delay: 0s; transform: translateY(5px);" role="alert">
                  La contraseña debe tener al menos 6 caracteres.
                </p>
              }
            </div>

            <!-- Mantener sesión -->
            <div class="flex items-center">
              <input id="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 transition-colors cursor-pointer">
              <label for="remember-me" class="ml-2 block text-sm text-text-main cursor-pointer">
                Mantener la sesión iniciada
              </label>
            </div>

            @if (forgotMessage()) {
              <div class="text-sm text-primary-700 bg-primary-50 border border-primary-100 p-3 rounded-md motion-safe:animate-fade-in-up" style="animation-delay: 0s; transform: translateY(5px);" role="alert" aria-live="polite">
                {{ forgotMessage() }}
              </div>
            }

            <!-- Submit -->
            <button 
              type="submit" 
              [disabled]="isLoading()"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              @if (isLoading()) {
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white motion-reduce:animate-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Ingresando...
              } @else if (isSuccess()) {
                <svg class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                ¡Listo!
              } @else {
                Iniciar sesión
              }
            </button>
          </form>

          <!-- Links debajo -->
          <div class="mt-8 pt-8 border-t border-gray-200 flex flex-col space-y-4 opacity-0 motion-safe:animate-fade-in-up" style="animation-delay: 0.6s">
            <a routerLink="/" class="text-sm font-medium text-text-muted hover:text-text-main transition-colors inline-flex items-center w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm">
              &larr; Volver al inicio
            </a>
            <a routerLink="/plazas" class="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors inline-flex items-center w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm hover:underline">
              ¿Buscas empleo? Ver plazas abiertas
            </a>
          </div>

        </div>
      </div>
    </div>
  `
})
export class LoginComponent implements AfterViewInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  showPassword = signal(false);
  isLoading = signal(false);
  isSuccess = signal(false);
  showDemoError = signal(false);
  forgotMessage = signal('');
  
  focusedField = signal<string | null>(null);

  ngAfterViewInit() {
    // Retraso para enfocar después de la View Transition (~500ms)
    setTimeout(() => {
      this.emailInput?.nativeElement.focus();
    }, 600);
  }

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  forgotPassword() {
    this.forgotMessage.set('Esta función estará disponible pronto.');
    setTimeout(() => this.forgotMessage.set(''), 4000);
  }

  setFocus(field: string) {
    this.focusedField.set(field);
  }

  clearFocus(field: string) {
    if (this.focusedField() === field) {
      this.focusedField.set(null);
    }
  }

  isFocused(field: string): boolean {
    return this.focusedField() === field;
  }

  showFieldError(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    this.showDemoError.set(false);

    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading.set(true);

    // Animación de carga artificial
    setTimeout(() => {
      this.isLoading.set(false);
      
      const { email } = this.loginForm.value;
      if (email === 'error@demo.com') {
        this.showDemoError.set(true);
      } else {
        this.isSuccess.set(true);
        setTimeout(() => {
          this.router.navigate(['/admin']);
        }, 600);
      }
    }, 1200);
  }
}
