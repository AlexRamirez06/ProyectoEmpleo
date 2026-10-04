import { Component, inject, signal, ViewChild, ElementRef, computed } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { PasswordInputComponent } from '../../core/components/password-input.component';
import { StepperComponent } from '../../core/components/stepper.component';
import { AppValidators, ErrorMessages } from '../../core/validators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass, PasswordInputComponent, StepperComponent],
  template: `
    <div class="w-full max-w-lg mx-auto relative">
      
      @if (!showSuccess()) {
        <div class="mb-8 animate-slide-in-left" style="animation-delay: 0.1s">
          <h2 class="text-2xl md:text-3xl font-bold text-text-main mb-2">Registra tu empresa</h2>
          <p class="text-text-muted">Crea la cuenta para tu equipo de reclutamiento. Te tomará menos de 3 minutos.</p>
        </div>

        <app-stepper [currentStep]="currentStep()" [steps]="steps" class="block mb-8 animate-slide-in-left" style="animation-delay: 0.2s"></app-stepper>

        <!-- Anunciador de pasos para accesibilidad -->
        <div aria-live="polite" class="sr-only">
          Paso {{ currentStep() }} de 3: {{ steps[currentStep() - 1].name }}
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="relative" [class.form-submitted]="isSubmitted()">
          <div class="relative overflow-hidden px-2 -mx-2 pt-2 -mt-2 pb-4 -mb-4 transition-all duration-300" [style.minHeight.px]="formHeight()">
            
            <!-- Paso 1 -->
            <div [ngClass]="getStepClass(1)" formGroupName="account" class="absolute top-2 left-2 right-2 transition-all duration-300 motion-reduce:transition-none" #step1Container>
              <h3 class="sr-only" tabindex="-1" #step1Title>Paso 1: Tu cuenta</h3>
              
              <div class="space-y-6">
                <!-- Correo -->
                <div class="field" [class.is-invalid]="showError('account.email')" [class.is-valid]="showValid('account.email')">
                  <div class="field__header">
                    <label for="email" class="field__label">Correo electrónico</label>
                  </div>
                  <div class="field__control">
                    <svg class="field__icon-left" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    <input id="email" type="email" formControlName="email" autocomplete="email" class="input has-icon-left" placeholder="nombre@empresa.com" aria-describedby="email-hint email-error" (keydown.enter)="nextStep($event)">
                    <svg class="field__valid-check" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                  <p id="email-hint" class="field__hint">Será tu usuario para iniciar sesión.</p>
                  <p id="email-error" class="field__error" role="alert">
                    <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {{ getErrorMessage('account.email') }}
                  </p>
                  @if (emailTakenError()) {
                    <p class="field__error" style="display: flex;" role="alert">
                      <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Este correo ya tiene una cuenta.&nbsp;<a routerLink="/admin/login" class="link-animated text-red-600 hover:text-red-700">Inicia sesión</a>&nbsp;o usa otro correo.
                    </p>
                  }
                </div>

                <!-- Contraseña -->
                <div class="field" [class.is-invalid]="showError('account.password')" [class.is-valid]="showValid('account.password')">
                  <div class="field__header">
                    <label for="password" class="field__label">Contraseña</label>
                  </div>
                  <div class="field__control">
                    <app-password-input id="password" formControlName="password" inputId="password" autocomplete="new-password" ariaDescribedBy="pwd-hint pwd-error">
                    </app-password-input>
                    <svg class="field__valid-check !right-12" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                  <p id="pwd-error" class="field__error" role="alert">
                    <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {{ getErrorMessage('account.password') }}
                  </p>

                  <!-- Medidor de contraseña -->
                  <div class="mt-3">
                    <div class="flex gap-1 mb-1">
                      <div class="h-1.5 flex-1 rounded-full transition-colors duration-300" [ngClass]="pwdStrength() >= 1 ? pwdColor() : 'bg-gray-200'"></div>
                      <div class="h-1.5 flex-1 rounded-full transition-colors duration-300" [ngClass]="pwdStrength() >= 2 ? pwdColor() : 'bg-gray-200'"></div>
                      <div class="h-1.5 flex-1 rounded-full transition-colors duration-300" [ngClass]="pwdStrength() >= 3 ? pwdColor() : 'bg-gray-200'"></div>
                      <div class="h-1.5 flex-1 rounded-full transition-colors duration-300" [ngClass]="pwdStrength() >= 4 ? pwdColor() : 'bg-gray-200'"></div>
                    </div>
                    <div class="flex justify-between items-center text-xs">
                      <span class="font-medium transition-colors duration-300" [style.color]="pwdStrength() > 0 ? pwdColorRaw() : '#9ca3af'">{{ pwdLabel() }}</span>
                    </div>
                  </div>
                  <ul class="mt-2 text-xs text-text-muted space-y-1">
                    <li class="flex items-center gap-1.5 transition-colors duration-300" [ngClass]="{'text-green-600': pwdHasLength()}">
                      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        @if (pwdHasLength()) {
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        } @else {
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        }
                      </svg>
                      Al menos 8 caracteres
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Paso 2 -->
            <div [ngClass]="getStepClass(2)" formGroupName="company" class="absolute top-2 left-2 right-2 transition-all duration-300 motion-reduce:transition-none" #step2Container>
              <h3 class="sr-only" tabindex="-1" #step2Title>Paso 2: Tu empresa</h3>
              
              <div class="space-y-6">
                <div class="field" [class.is-invalid]="showError('company.name')" [class.is-valid]="showValid('company.name')">
                  <div class="field__header"><label for="c-name" class="field__label">Nombre de la empresa</label></div>
                  <div class="field__control">
                    <svg class="field__icon-left" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1v1H9V7zm5 0h1v1h-1V7zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1zm-3 4H2v4h15v-4z" /></svg>
                    <input id="c-name" type="text" formControlName="name" autocomplete="organization" class="input has-icon-left" placeholder="Ej.: Distribuidora Ejemplo S. de R.L." (keydown.enter)="nextStep($event)">
                    <svg class="field__valid-check" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                  <p class="field__error" role="alert"><svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{{ getErrorMessage('company.name') }}</p>
                </div>

                <div class="field" [class.is-invalid]="showError('company.industry')" [class.is-valid]="showValid('company.industry')">
                  <div class="field__header"><label for="c-industry" class="field__label">Giro de la empresa</label></div>
                  <div class="field__control">
                    <svg class="field__icon-left" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <select id="c-industry" formControlName="industry" class="select has-icon-left">
                      <option value="" disabled selected>Selecciona el rubro principal</option>
                      @for (ind of industries; track ind) {
                        <option [value]="ind">{{ ind }}</option>
                      }
                    </select>
                    <svg class="select__chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                  <p class="field__error" role="alert"><svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{{ getErrorMessage('company.industry') }}</p>
                </div>

                @if (registerForm.get('company.industry')?.value === 'Otro') {
                  <div class="field animate-slide-in-right" [class.is-invalid]="showError('company.customIndustry')" [class.is-valid]="showValid('company.customIndustry')">
                    <div class="field__header"><label for="c-custom-industry" class="field__label">¿Cuál?</label></div>
                    <div class="field__control">
                      <input id="c-custom-industry" type="text" formControlName="customIndustry" class="input" placeholder="Especifica el rubro" (keydown.enter)="nextStep($event)">
                      <svg class="field__valid-check" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                    <p class="field__error" role="alert"><svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{{ getErrorMessage('company.customIndustry') }}</p>
                  </div>
                }

                <div class="field" [class.is-invalid]="showError('company.description')" [class.is-valid]="showValid('company.description')">
                  <div class="field__header">
                    <label for="c-desc" class="field__label">Descripción de la empresa</label>
                    <span class="text-xs transition-colors duration-300" [ngClass]="descLength() > 480 ? 'text-red-500 font-bold' : 'text-text-muted'">{{ descLength() }}/500</span>
                  </div>
                  <div class="field__control">
                    <textarea id="c-desc" formControlName="description" class="textarea" placeholder="Cuéntanos a qué se dedica tu empresa y qué tipo de talento busca..."></textarea>
                  </div>
                  <p class="field__error" role="alert"><svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{{ getErrorMessage('company.description') }}</p>
                </div>

                <div class="field" [class.is-invalid]="showError('company.website')" [class.is-valid]="showValid('company.website')">
                  <div class="field__header"><label for="c-web" class="field__label">Sitio web o página de Facebook <span class="field__optional">(opcional)</span></label></div>
                  <div class="field__control">
                    <svg class="field__icon-left" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                    <input id="c-web" type="url" formControlName="website" class="input has-icon-left" placeholder="Ej.: https://www.tuempresa.com" (keydown.enter)="nextStep($event)">
                    <svg class="field__valid-check" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                  <p class="field__error" role="alert"><svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{{ getErrorMessage('company.website') }}</p>
                </div>
              </div>
            </div>

            <!-- Paso 3 -->
            <div [ngClass]="getStepClass(3)" formGroupName="contact" class="absolute top-2 left-2 right-2 transition-all duration-300 motion-reduce:transition-none" #step3Container>
              <h3 class="sr-only" tabindex="-1" #step3Title>Paso 3: Contacto y ubicación</h3>
              
              <div class="space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div class="field" [class.is-invalid]="showError('contact.name')" [class.is-valid]="showValid('contact.name')">
                    <div class="field__header"><label for="contact-name" class="field__label">Persona de contacto</label></div>
                    <div class="field__control">
                      <svg class="field__icon-left" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      <input id="contact-name" type="text" formControlName="name" autocomplete="name" class="input has-icon-left" placeholder="Ej.: María López">
                      <svg class="field__valid-check" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                    <p class="field__error" role="alert"><svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{{ getErrorMessage('contact.name') }}</p>
                  </div>

                  <div class="field" [class.is-invalid]="showError('contact.phone')" [class.is-valid]="showValid('contact.phone')">
                    <div class="field__header"><label for="contact-phone" class="field__label">Teléfono de contacto</label></div>
                    <div class="field__control">
                      <svg class="field__icon-left" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      <input id="contact-phone" type="tel" inputmode="tel" formControlName="phone" autocomplete="tel" class="input has-icon-left" placeholder="Ej.: 9999-9999" (blur)="formatPhone()">
                      <svg class="field__valid-check" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                    <p class="field__hint">Puede ser celular o WhatsApp. Lo usaremos solo para contactarte.</p>
                    <p class="field__error" role="alert"><svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{{ getErrorMessage('contact.phone') }}</p>
                  </div>
                </div>

                <div class="field" [class.is-invalid]="showError('contact.department')" [class.is-valid]="showValid('contact.department')">
                  <div class="field__header"><label for="contact-dep" class="field__label">Departamento</label></div>
                  <div class="field__control">
                    <svg class="field__icon-left" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <select id="contact-dep" formControlName="department" class="select has-icon-left">
                      <option value="" disabled selected>Selecciona tu ubicación</option>
                      @for (dep of departments; track dep) {
                        <option [value]="dep">{{ dep }}</option>
                      }
                    </select>
                    <svg class="select__chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                  <p class="field__error" role="alert"><svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{{ getErrorMessage('contact.department') }}</p>
                </div>

                <div class="field" [class.is-invalid]="showError('contact.address')" [class.is-valid]="showValid('contact.address')">
                  <div class="field__header"><label for="contact-addr" class="field__label">Dirección exacta</label></div>
                  <div class="field__control">
                    <input id="contact-addr" type="text" formControlName="address" class="input" placeholder="Colonia, calle, edificio...">
                    <svg class="field__valid-check" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                  <p class="field__hint">Incluye colonia, calle o avenida, número y ciudad.</p>
                  <p class="field__error" role="alert"><svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{{ getErrorMessage('contact.address') }}</p>
                </div>

                <div class="field mt-4" [class.is-invalid]="showError('contact.terms')">
                  <label class="check-radio items-start mt-2">
                    <input type="checkbox" formControlName="terms" class="check-radio__input mt-0.5">
                    <span class="check-radio__label">Acepto las <a routerLink="/normas" target="_blank" rel="noopener" class="link-animated text-primary-600">Normas de publicación</a> y la <a routerLink="/privacidad" target="_blank" rel="noopener" class="link-animated text-primary-600">Política de privacidad</a>.</span>
                  </label>
                  <p class="field__error" role="alert"><svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{{ getErrorMessage('contact.terms') }}</p>
                </div>

              </div>
            </div>

          </div>

          <!-- Acciones flotantes abajo -->
          <div class="mt-8 flex flex-col sm:flex-row-reverse justify-between gap-4">
            @if (currentStep() < 3) {
              <button type="button" class="btn btn-primary btn-block sm:w-auto" data-motion="forward" (click)="nextStep()">
                <span>Continuar</span>
                <svg class="btn__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            } @else {
              <button 
                type="submit" 
                class="btn btn-primary btn-lg btn-block sm:w-auto" 
                [disabled]="isLoading() || isSuccess()"
                [attr.aria-busy]="isLoading() ? 'true' : null"
                [ngClass]="{'is-loading': isLoading(), 'is-success': isSuccess()}"
              >
                @if (isLoading()) {
                  <span class="sr-only">Registrando...</span>
                }
                @if (isSuccess()) {
                  <svg class="btn__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>¡Listo!</span>
                } @else {
                  <span>Registrar empresa</span>
                }
              </button>
            }

            @if (currentStep() > 1) {
              <button type="button" class="btn btn-ghost btn-block sm:w-auto text-text-muted" data-motion="back" (click)="prevStep()">
                <svg class="btn__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Atrás</span>
              </button>
            }
          </div>
          
          <div class="mt-8 pt-6 border-t border-gray-200 text-center transition-opacity duration-300">
            <a routerLink="/admin/login" class="link-animated text-sm">
              ¿Ya tienes cuenta? Inicia sesión
              <span class="link-animated__arrow">&rarr;</span>
            </a>
          </div>
        </form>
      } @else {
        <!-- Pantalla de Éxito -->
        <div class="text-center py-12 px-6 bg-white border border-gray-200 rounded-2xl shadow-sm animate-slide-in-right" #successTitle tabindex="-1">
          <div class="relative w-24 h-24 mx-auto mb-6">
            <div class="absolute inset-0 bg-green-100 rounded-full animate-[ping_1s_cubic-bezier(0,0,0.2,1)_forwards]"></div>
            <div class="absolute inset-0 bg-green-500 rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-white animate-[draw-check_0.5s_ease-out_0.2s_forwards]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-dasharray="24" stroke-dashoffset="24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 class="text-3xl font-extrabold text-text-main mb-4">¡Registro enviado!</h2>
          <p class="text-lg text-text-muted mb-8 max-w-sm mx-auto">
            Registramos los datos de <strong class="text-text-main">{{ registerForm.get('company.name')?.value }}</strong>. Usa <strong class="text-text-main">{{ registerForm.get('account.email')?.value }}</strong> para iniciar sesión.
          </p>
          <div class="flex flex-col gap-3 max-w-xs mx-auto">
            <a routerLink="/admin/login" class="btn btn-primary btn-block">Ir a iniciar sesión</a>
            <a routerLink="/" class="btn btn-ghost btn-block text-text-muted">Volver al inicio</a>
          </div>
        </div>
      }
    </div>
  `
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  @ViewChild('step1Container') step1Container!: ElementRef;
  @ViewChild('step2Container') step2Container!: ElementRef;
  @ViewChild('step3Container') step3Container!: ElementRef;
  
  @ViewChild('step1Title') step1Title!: ElementRef;
  @ViewChild('step2Title') step2Title!: ElementRef;
  @ViewChild('step3Title') step3Title!: ElementRef;
  @ViewChild('successTitle') successTitle!: ElementRef;

  currentStep = signal(1);
  steps = [
    { num: 1, name: 'Tu cuenta' },
    { num: 2, name: 'Tu empresa' },
    { num: 3, name: 'Contacto' }
  ];

  industries = [
    'Comercio y ventas', 'Industria y manufactura', 'Logística y transporte', 
    'Servicios profesionales', 'Tecnología', 'Salud', 'Educación', 
    'Construcción', 'Restaurantes y hospitalidad', 'Agroindustria', 
    'Finanzas', 'Otro'
  ];

  departments = [
    'Atlántida', 'Choluteca', 'Colón', 'Comayagua', 'Copán', 'Cortés', 
    'El Paraíso', 'Francisco Morazán', 'Gracias a Dios', 'Intibucá', 
    'Islas de la Bahía', 'La Paz', 'Lempira', 'Ocotepeque', 'Olancho', 
    'Santa Bárbara', 'Valle', 'Yoro'
  ];

  registerForm = this.fb.group({
    account: this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    }),
    company: this.fb.group({
      name: ['', Validators.required],
      industry: ['', Validators.required],
      customIndustry: [''],
      description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]],
      website: ['', [AppValidators.url]]
    }),
    contact: this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^(?:\+?504)?[-\s]*[2389]\d{3}[-\s]*\d{4}$/)]],
      department: ['', Validators.required],
      address: ['', Validators.required],
      terms: [false, AppValidators.requiredTrue]
    })
  });

  isSubmitted = signal(false);
  isLoading = signal(false);
  isSuccess = signal(false);
  showSuccess = signal(false);
  emailTakenError = signal(false);

  // Dynamic height
  formHeight = signal<number>(400);

  constructor() {
    this.registerForm.get('company.industry')?.valueChanges.subscribe(val => {
      const customCtrl = this.registerForm.get('company.customIndustry');
      if (val === 'Otro') {
        customCtrl?.setValidators(Validators.required);
      } else {
        customCtrl?.clearValidators();
        customCtrl?.setValue('');
      }
      customCtrl?.updateValueAndValidity();
      setTimeout(() => this.updateHeight(), 50);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateHeight();
      this.step1Title?.nativeElement.focus();
    }, 100);
  }

  updateHeight() {
    let container: ElementRef | undefined;
    if (this.currentStep() === 1) container = this.step1Container;
    else if (this.currentStep() === 2) container = this.step2Container;
    else if (this.currentStep() === 3) container = this.step3Container;

    if (container && container.nativeElement) {
      this.formHeight.set(container.nativeElement.offsetHeight + 24);
    }
  }

  getStepClass(step: number) {
    if (this.currentStep() === step) {
      return 'opacity-100 translate-x-0 pointer-events-auto z-10';
    } else if (this.currentStep() > step) {
      return 'opacity-0 -translate-x-8 pointer-events-none z-0';
    } else {
      return 'opacity-0 translate-x-8 pointer-events-none z-0';
    }
  }

  // Errores
  showError(path: string): boolean {
    const control = this.registerForm.get(path);
    return !!control && control.invalid && (control.dirty || control.touched || this.isSubmitted());
  }

  showValid(path: string): boolean {
    const control = this.registerForm.get(path);
    return !!control && control.valid && (control.dirty || control.touched);
  }

  getErrorMessage(path: string): string {
    const control = this.registerForm.get(path);
    if (!control || !control.errors) return '';
    const errKey = Object.keys(control.errors)[0];
    if (ErrorMessages[errKey]) {
      return ErrorMessages[errKey](control.errors[errKey]);
    }
    return 'Dato inválido';
  }

  // Contraseña medidor
  pwdValue() { return this.registerForm.get('account.password')?.value || ''; }
  pwdHasLength() { return this.pwdValue().length >= 8; }
  
  pwdStrength(): number {
    const v = this.pwdValue();
    if (!v) return 0;
    let s = 0;
    if (v.length >= 8) s += 1;
    if (/[A-Z]/.test(v) && /[a-z]/.test(v)) s += 1;
    if (/\d/.test(v)) s += 1;
    if (/[^A-Za-z0-9]/.test(v)) s += 1;
    return s;
  }

  pwdLabel(): string {
    const s = this.pwdStrength();
    if (s === 0) return '';
    if (s === 1) return 'Débil';
    if (s === 2) return 'Aceptable';
    if (s === 3) return 'Buena';
    return 'Fuerte';
  }

  pwdColorRaw(): string {
    const s = this.pwdStrength();
    if (s === 1) return '#ef4444'; // red-500
    if (s === 2) return '#f59e0b'; // amber-500
    if (s === 3) return '#10b981'; // green-500
    if (s === 4) return '#059669'; // green-600
    return '';
  }

  pwdColor(): string {
    const s = this.pwdStrength();
    if (s === 1) return 'bg-red-500';
    if (s === 2) return 'bg-amber-500';
    if (s === 3) return 'bg-green-500';
    if (s === 4) return 'bg-green-600';
    return '';
  }

  descLength() { return this.registerForm.get('company.description')?.value?.length || 0; }

  formatPhone() {
    const ctrl = this.registerForm.get('contact.phone');
    if (!ctrl || !ctrl.value) return;
    let v = ctrl.value.replace(/\D/g, '');
    if (v.length === 11 && v.startsWith('504')) v = v.substring(3);
    if (v.length === 8) {
      ctrl.setValue(`${v.substring(0, 4)}-${v.substring(4)}`);
    }
  }

  nextStep(e?: Event) {
    if (e) {
      e.preventDefault();
      // Only advance on enter if the field is not textarea. It's handled by (keydown.enter)
    }

    let groupName = '';
    if (this.currentStep() === 1) groupName = 'account';
    else if (this.currentStep() === 2) groupName = 'company';

    const group = this.registerForm.get(groupName);
    
    if (group && group.invalid) {
      group.markAllAsTouched();
      this.isSubmitted.set(false);
      setTimeout(() => {
        this.isSubmitted.set(true);
        this.updateHeight();
        // Scroll y enfocar el primer error
        const firstInvalid = document.querySelector('.is-invalid .input, .is-invalid .select');
        if (firstInvalid) {
          (firstInvalid as HTMLElement).focus();
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 10);
      return;
    }

    this.isSubmitted.set(false);
    this.emailTakenError.set(false);
    this.currentStep.update(s => s + 1);
    
    setTimeout(() => {
      this.updateHeight();
      if (this.currentStep() === 2) this.step2Title?.nativeElement.focus();
      if (this.currentStep() === 3) this.step3Title?.nativeElement.focus();
    }, 50);
  }

  prevStep() {
    this.isSubmitted.set(false);
    this.currentStep.update(s => s - 1);
    setTimeout(() => {
      this.updateHeight();
      if (this.currentStep() === 1) this.step1Title?.nativeElement.focus();
      if (this.currentStep() === 2) this.step2Title?.nativeElement.focus();
    }, 50);
  }

  onSubmit() {
    this.registerForm.markAllAsTouched();
    this.emailTakenError.set(false);

    if (this.registerForm.invalid) {
      this.isSubmitted.set(false);
      setTimeout(() => {
        this.isSubmitted.set(true);
        this.updateHeight();
        const firstInvalid = document.querySelector('.is-invalid .input, .is-invalid .select');
        if (firstInvalid) {
          (firstInvalid as HTMLElement).focus();
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 10);
      return;
    }

    const email = this.registerForm.get('account.email')?.value;
    if (email === 'existe@demo.com') {
      this.currentStep.set(1);
      setTimeout(() => {
        this.updateHeight();
        this.emailTakenError.set(true);
        this.isSubmitted.set(true);
        this.step1Container.nativeElement.querySelector('#email').focus();
      }, 50);
      return;
    }

    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.isSuccess.set(true);
      setTimeout(() => {
        this.showSuccess.set(true);
        setTimeout(() => this.successTitle?.nativeElement.focus(), 50);
      }, 500);
    }, 1500);
  }
}
