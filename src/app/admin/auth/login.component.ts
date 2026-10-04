import { Component, inject, signal, AfterViewInit, ElementRef, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PasswordInputComponent } from '../../core/components/password-input.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass, PasswordInputComponent],
  template: `
    <div class="w-full max-w-md mx-auto relative">
      
      <div class="mb-8 animate-slide-in-right" style="animation-delay: 0.1s">
        <h2 class="text-2xl md:text-3xl font-bold text-text-main mb-2">Inicia sesión</h2>
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
            <app-password-input id="password" formControlName="password" inputId="password" autocomplete="current-password" ariaDescribedBy="password-error"></app-password-input>
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
export class LoginComponent implements AfterViewInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  isLoading = signal(false);
  isSuccess = signal(false);
  showDemoError = signal(false);
  forgotMessage = signal('');
  
  focusedField = signal<string | null>(null);
  rememberMe = signal(false);

  toggleRemember(event: Event) {
    const input = event.target as HTMLInputElement;
    this.rememberMe.set(input.checked);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.emailInput?.nativeElement.focus();
    }, 600);
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

