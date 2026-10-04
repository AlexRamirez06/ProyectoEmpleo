import { Component, inject, signal, AfterViewInit, ElementRef, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BrandComponent } from '../../core/components/brand.component';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, BrandComponent, NgClass, NgStyle],
  template: `
    <!-- Estilos específicos para las animaciones del candado y el descifrado -->
    <style>
      @keyframes char-flip {
        0% { transform: translateY(4px) rotateX(90deg); opacity: 0; }
        100% { transform: translateY(0) rotateX(0deg); opacity: 1; }
      }
      .animate-char-flip {
        animation: char-flip 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
      }
      @keyframes countdown {
        from { stroke-dashoffset: 0; }
        to { stroke-dashoffset: 100.53; }
      }
      .animate-countdown {
        animation: countdown 10s linear forwards;
      }
      @media (prefers-reduced-motion: reduce) {
        .animate-char-flip {
          animation: none !important;
          transform: none !important;
          opacity: 1 !important;
        }
        .animate-countdown {
          animation: none !important;
          display: none !important;
        }
      }
    </style>

    <div class="w-full max-w-md mx-auto relative">
      
      <div class="mb-8 animate-slide-in-right" style="animation-delay: 0.1s">
        <h2 class="text-2xl md:text-3xl font-bold text-text-main mb-2">Inicia sesión</h2>
        <p class="text-text-muted">Ingresa con la cuenta de tu empresa.</p>
      </div>

      <!-- Mensajes de estado invisibles para lectores de pantalla -->
      <div aria-live="polite" class="sr-only">
        {{ passwordLiveMessage() }}
      </div>

      @if (showDemoError()) {
        <div class="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-start animate-shake" role="alert" aria-live="assertive">
          <svg class="w-5 h-5 mr-3 shrink-0 mt-0.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-sm font-medium">Correo o contraseña incorrectos. Revisa tus datos e inténtalo de nuevo.</span>
        </div>
      }

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6 animate-slide-in-right" [class.form-submitted]="isSubmitted()" style="animation-delay: 0.3s">
        
        <!-- Correo -->
        <div class="field" [class.is-invalid]="showFieldError('email')" [class.is-valid]="showFieldValid('email')">
          <div class="field__header">
            <label for="email" class="field__label">Correo electrónico</label>
          </div>
          <div class="field__control">
            <svg class="field__icon-left" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <input 
              #emailInput
              id="email" 
              type="email" 
              formControlName="email" 
              autocomplete="email"
              class="input has-icon-left"
              placeholder="nombre@empresa.com"
              aria-describedby="email-error"
            >
            <svg class="field__valid-check" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <p id="email-error" class="field__error" role="alert">
            <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Escribe un correo válido, como nombre&#64;empresa.com
          </p>
        </div>

        <!-- Contraseña -->
        <div class="field" [class.is-invalid]="showFieldError('password')" [class.is-valid]="showFieldValid('password')">
          <div class="field__header">
            <label for="password" class="field__label">Contraseña</label>
            <button type="button" (click)="forgotPassword()" class="text-sm font-medium text-primary-600 hover:text-primary-700 focus:outline-none focus:underline focus-visible:ring-[var(--ring-focus)] rounded-sm">
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          <div class="field__control">
            <svg class="field__icon-left" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            <input 
              id="password" 
              [type]="showPassword() ? 'text' : 'password'" 
              formControlName="password" 
              autocomplete="current-password"
              [ngClass]="{'opacity-0': isAnimatingPassword()}"
              class="input has-icon-left has-icon-right"
              placeholder="Mínimo 6 caracteres"
              aria-describedby="password-error"
            >
            
            <!-- Capa temporal para efecto de descifrado -->
            @if (isAnimatingPassword()) {
              <div class="absolute inset-y-0 left-10 right-14 flex items-center px-2 pointer-events-none overflow-hidden select-none" aria-hidden="true">
                @for (item of animatingChars(); track $index) {
                  <span class="inline-block animate-char-flip text-text-main" [style.animation-delay.ms]="item.delay">
                    {{ item.char }}
                  </span>
                }
              </div>
            }

            <!-- Botón Candado Animado (Icon right adaptado) -->
            <button 
              type="button"
              (click)="togglePassword()"
              class="absolute right-1 w-10 h-10 flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-[var(--ring-focus)] transition-all duration-300 hover:bg-gray-100 active:scale-95 group/lock z-10"
              [ngClass]="showPassword() ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'"
              [attr.aria-label]="showPassword() ? 'Ocultar contraseña' : 'Mostrar contraseña'"
              [attr.aria-pressed]="showPassword()"
              aria-controls="password"
            >
              <!-- Anillo de progreso para el auto-cierre -->
              @if (showPassword()) {
                <svg class="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 36 36" aria-hidden="true">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" stroke-width="1.5" class="opacity-20" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" stroke-width="1.5" class="animate-countdown" stroke-dasharray="100.53" />
                </svg>
              }
              
              <!-- Candado -->
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-5 h-5 transition-transform duration-300 group-hover/lock:scale-110 motion-reduce:transition-none" aria-hidden="true">
                <!-- Arco del candado -->
                <path 
                  d="M7 11V7a5 5 0 0110 0v4" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  class="transition-all duration-300 origin-[17px_11px] motion-reduce:transition-none"
                  [ngClass]="showPassword() ? '-translate-y-1 rotate-[20deg] opacity-80' : ''"
                />
                <!-- Cuerpo del candado -->
                <rect 
                  x="5" y="11" width="14" height="10" rx="2" 
                  stroke-width="2" 
                  fill="currentColor" 
                  [ngClass]="showPassword() ? 'fill-opacity-10 scale-105 transform-gpu' : 'fill-opacity-0'"
                  class="transition-all duration-300 origin-center motion-reduce:transition-none"
                />
                <!-- Cerradura centro -->
                <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
              </svg>
            </button>
            
            <svg class="field__valid-check !right-12" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <p id="password-error" class="field__error" role="alert">
            <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            La contraseña debe tener al menos 6 caracteres.
          </p>
        </div>

        <!-- Mantener sesión (Switch animado) -->
        <div>
          <label class="group relative flex items-center cursor-pointer min-h-[44px] w-fit outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 rounded-lg transition-colors">
            <input type="checkbox" role="switch" [checked]="rememberMe()" (change)="toggleRemember($event)" class="sr-only" [attr.aria-checked]="rememberMe()">
            
            <!-- Track -->
            <div class="relative w-11 h-6 rounded-full transition-colors duration-300 ease-in-out group-active:scale-95 shadow-inner flex-shrink-0 motion-reduce:transition-none" 
                 [ngClass]="rememberMe() ? 'bg-primary-600' : 'bg-gray-300 group-hover:bg-gray-400'">
              
              <!-- Anillo de pulso al encender -->
              @if (rememberMe()) {
                <div class="absolute inset-0 rounded-full border-2 border-primary-400 motion-safe:animate-[ping_0.5s_cubic-bezier(0,0,0.2,1)_forwards]"></div>
              }

              <!-- Thumb -->
              <div class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-sm flex items-center justify-center motion-safe:transition-all motion-safe:duration-300 motion-safe:group-active:w-5" 
                   [ngClass]="rememberMe() ? 'translate-x-5 motion-safe:group-active:translate-x-4' : 'translate-x-0'"
                   style="transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);">
                
                <!-- Icono -->
                @if (rememberMe()) {
                  <svg class="w-3 h-3 text-primary-600" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2.5 6L5 8.5L9.5 3.5" class="motion-safe:animate-[draw-check_0.3s_ease-out_forwards]" stroke-dasharray="12" stroke-dashoffset="12" />
                  </svg>
                } @else {
                  <div class="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                }
              </div>
            </div>
            <span class="ml-3 text-sm font-medium transition-colors duration-300 select-none motion-reduce:transition-none" [ngClass]="rememberMe() ? 'text-primary-700' : 'text-text-main'">
              Mantener la sesión iniciada
            </span>
          </label>
        </div>

        @if (forgotMessage()) {
          <div class="text-sm text-primary-700 bg-primary-50 border border-primary-100 p-3 rounded-md animate-slide-in-right" style="animation-delay: 0s;" role="alert" aria-live="polite">
            {{ forgotMessage() }}
          </div>
        }

        <!-- Submit -->
        <button 
          type="submit" 
          [disabled]="isLoading() || isSuccess()"
          [attr.aria-busy]="isLoading() ? 'true' : null"
          [ngClass]="{'is-loading': isLoading(), 'is-success': isSuccess()}"
          class="btn btn-primary btn-block"
        >
          @if (isLoading()) {
            <span class="sr-only">Cargando...</span>
          }
          @if (isSuccess()) {
            <svg class="btn__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>¡Listo!</span>
          } @else {
            <span>Iniciar sesión</span>
          }
        </button>
      </form>

      <!-- Bloque de Registro Compacto -->
      <div class="mt-6 text-center animate-slide-in-right" style="animation-delay: 0.5s">
        <span class="text-sm text-text-muted">¿Tu empresa aún no tiene cuenta?</span>
        <a routerLink="/admin/registro" class="group relative inline-flex items-center justify-center min-h-[44px] px-2 text-sm font-bold text-primary-600 hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm ml-1 transition-colors">
          Regístrala aquí
          <span class="ml-1 transition-transform duration-300 group-hover:translate-x-1 group-focus:translate-x-1 motion-reduce:transition-none">&rarr;</span>
          <!-- Subrayado animado -->
          <span class="absolute bottom-2 left-2 right-2 h-0.5 bg-primary-600 origin-left transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus:scale-x-100 motion-reduce:hidden"></span>
        </a>
      </div>

      <!-- Links debajo -->
      <div class="mt-8 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 animate-slide-in-right" style="animation-delay: 0.6s">
        <a routerLink="/" class="btn btn-ghost btn-sm" data-motion="back">
          <svg class="btn__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Volver al inicio</span>
        </a>
        <span class="hidden md:inline text-gray-300 select-none">&middot;</span>
        <a routerLink="/plazas" class="btn btn-ghost btn-sm text-primary-600" data-motion="forward">
          <span>¿Buscas empleo? Ver plazas</span>
          <svg class="btn__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>

    </div>
  `
})
export class LoginComponent implements AfterViewInit, OnDestroy {
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
  passwordLiveMessage = signal('');
  
  focusedField = signal<string | null>(null);
  rememberMe = signal(false);

  toggleRemember(event: Event) {
    const input = event.target as HTMLInputElement;
    this.rememberMe.set(input.checked);
  }

  // Animación de descifrado
  isAnimatingPassword = signal(false);
  animatingChars = signal<{char: string, delay: number}[]>([]);
  private autoHideTimer: any = null;

  ngAfterViewInit() {
    setTimeout(() => {
      this.emailInput?.nativeElement.focus();
    }, 600);
  }

  ngOnDestroy() {
    this.clearAutoHideTimer();
  }

  @HostListener('document:visibilitychange')
  onVisibilityChange() {
    if (document.hidden) {
      this.hidePasswordSilently();
    }
  }

  togglePassword() {
    const currentPwd = this.loginForm.get('password')?.value || '';
    const willShow = !this.showPassword();

    if (!currentPwd) {
      // Sin texto, solo animamos el candado
      this.updatePasswordState(willShow);
      return;
    }

    // Preparar caracteres para la animación escalonada
    const chars = currentPwd.split('').map((c, i) => {
      // Máximo desfase de 300ms (primeros 12 caracteres), el resto entra de golpe para evitar esperas largas
      const delay = Math.min(i * 25, 300);
      return { char: willShow ? c : '•', delay };
    });

    this.animatingChars.set(chars);
    this.isAnimatingPassword.set(true);
    
    // Cambiamos el estado (que cambia el icono e inicia timers)
    this.updatePasswordState(willShow);

    // Finalizar animación
    setTimeout(() => {
      this.isAnimatingPassword.set(false);
      this.animatingChars.set([]);
    }, 300 + 300); // delay máximo + duración de char-flip
  }

  private updatePasswordState(visible: boolean) {
    this.showPassword.set(visible);
    this.passwordLiveMessage.set(visible ? 'Contraseña visible' : 'Contraseña oculta');
    
    if (visible) {
      this.startAutoHideTimer();
    } else {
      this.clearAutoHideTimer();
    }
  }

  private hidePasswordSilently() {
    if (this.showPassword()) {
      this.updatePasswordState(false);
      this.isAnimatingPassword.set(false);
    }
  }

  private startAutoHideTimer() {
    this.clearAutoHideTimer();
    this.autoHideTimer = setTimeout(() => {
      if (this.showPassword()) {
        this.togglePassword(); // Ocultamos con animación si ocurre orgánicamente
      }
    }, 10000);
  }

  private clearAutoHideTimer() {
    if (this.autoHideTimer) {
      clearTimeout(this.autoHideTimer);
      this.autoHideTimer = null;
    }
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

  showFieldValid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!control && control.valid && (control.dirty || control.touched);
  }

  isSubmitted = signal(false);

  onSubmit() {
    this.loginForm.markAllAsTouched();
    this.showDemoError.set(false);

    // Ocultar contraseña automáticamente por seguridad
    this.hidePasswordSilently();

    if (this.loginForm.invalid) {
      this.isSubmitted.set(false);
      setTimeout(() => this.isSubmitted.set(true), 10);
      return;
    }

    this.isLoading.set(true);

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

