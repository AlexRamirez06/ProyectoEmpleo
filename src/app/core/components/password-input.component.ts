import { Component, forwardRef, signal, HostListener, OnDestroy, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [NgClass],
  host: {
    class: 'block w-full'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true
    }
  ],
  template: `
    <!-- Estilos de animación si no están globalmente -->
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

    <!-- Mensajes de estado invisibles para lectores de pantalla -->
    <div aria-live="polite" class="sr-only">
      {{ passwordLiveMessage() }}
    </div>

    <div class="relative flex items-center w-full">
      <svg class="field__icon-left" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
      </svg>
      <input 
        [id]="inputId"
        [type]="showPassword() ? 'text' : 'password'" 
        [autocomplete]="autocomplete"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onTouchedCallback()"
        [disabled]="disabled"
        [ngClass]="{'opacity-0': isAnimatingPassword()}"
        class="input has-icon-left has-icon-right w-full"
        [placeholder]="placeholder"
        [attr.aria-describedby]="ariaDescribedBy"
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
        [attr.aria-controls]="inputId"
        [disabled]="disabled"
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
      
      <ng-content></ng-content>
    </div>
  `
})
export class PasswordInputComponent implements ControlValueAccessor, OnDestroy {
  // Entradas personalizables
  @Input() inputId = 'password';
  @Input() autocomplete = 'current-password';
  @Input() placeholder = 'Mínimo 6 caracteres';
  @Input() ariaDescribedBy: string | null = null;

  value = '';
  disabled = false;
  
  showPassword = signal(false);
  passwordLiveMessage = signal('');
  isAnimatingPassword = signal(false);
  animatingChars = signal<{char: string, delay: number}[]>([]);
  private autoHideTimer: any = null;

  onChangeCallback: (_: any) => void = () => {};
  onTouchedCallback: () => void = () => {};

  writeValue(val: any): void {
    this.value = val || '';
  }
  
  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }
  
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChangeCallback(this.value);
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
    if (this.disabled) return;
    
    const willShow = !this.showPassword();

    if (!this.value) {
      this.updatePasswordState(willShow);
      return;
    }

    const chars = this.value.split('').map((c, i) => {
      const delay = Math.min(i * 25, 300);
      return { char: willShow ? c : '•', delay };
    });

    this.animatingChars.set(chars);
    this.isAnimatingPassword.set(true);
    this.updatePasswordState(willShow);

    setTimeout(() => {
      this.isAnimatingPassword.set(false);
      this.animatingChars.set([]);
    }, 600);
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
        this.togglePassword();
      }
    }, 10000);
  }

  private clearAutoHideTimer() {
    if (this.autoHideTimer) {
      clearTimeout(this.autoHideTimer);
      this.autoHideTimer = null;
    }
  }
}
