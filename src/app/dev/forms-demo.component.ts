import { Component, signal, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms-demo',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="min-h-screen pb-20 bg-background">
      <div class="bg-primary-900 text-white p-8 text-center shadow-md">
        <h1 class="text-3xl font-bold mb-2">Sistema de Formularios - Dev Preview</h1>
        <p class="text-primary-200">Esta ruta es solo para desarrollo y QA visual. No enlazar desde producción.</p>
      </div>

      <div class="max-w-4xl mx-auto p-4 md:p-8 grid gap-12">
        
        <!-- Tipos de campo -->
        <section>
          <h2 class="text-xl font-bold mb-4 border-b border-gray-200 pb-2 text-text-main">Tipos de Campo Básico</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <!-- Texto simple -->
            <div class="field">
              <div class="field__header">
                <label for="f-text" class="field__label">Nombre completo</label>
              </div>
              <div class="field__control">
                <input id="f-text" type="text" class="input" placeholder="Ej. Ana Pérez">
              </div>
              <p class="field__hint">.input (sin icono)</p>
            </div>

            <!-- Correo con icono -->
            <div class="field">
              <div class="field__header">
                <label for="f-email" class="field__label">Correo electrónico</label>
              </div>
              <div class="field__control">
                <svg class="field__icon-left" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <input id="f-email" type="email" class="input has-icon-left" placeholder="nombre@empresa.com">
              </div>
              <p class="field__hint">.has-icon-left</p>
            </div>

            <!-- Teléfono -->
            <div class="field">
              <div class="field__header">
                <label for="f-tel" class="field__label">Teléfono móvil</label>
              </div>
              <div class="field__control">
                <svg class="field__icon-left" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <input id="f-tel" type="tel" inputmode="tel" class="input has-icon-left" placeholder="Ej. 12345678">
              </div>
            </div>

            <!-- Búsqueda -->
            <div class="field">
              <div class="field__header">
                <label for="f-search" class="field__label">Buscar vacante <span class="field__optional">(opcional)</span></label>
              </div>
              <div class="field__control">
                <svg class="field__icon-left" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input id="f-search" type="search" class="input has-icon-left has-icon-right" placeholder="Palabra clave">
                <button type="button" class="field__icon-right hover:text-gray-700 cursor-pointer focus:outline-none focus:text-primary-600" aria-label="Limpiar búsqueda">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <p class="field__hint">.has-icon-left y .has-icon-right</p>
            </div>

            <!-- Select -->
            <div class="field">
              <div class="field__header">
                <label for="f-select" class="field__label">País</label>
              </div>
              <div class="field__control">
                <select id="f-select" class="select">
                  <option value="" disabled selected>Selecciona tu país</option>
                  <option value="1">El Salvador</option>
                  <option value="2">Guatemala</option>
                  <option value="3">Honduras</option>
                </select>
                <svg class="select__chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <p class="field__hint">.select</p>
            </div>

            <!-- Textarea -->
            <div class="field sm:col-span-2">
              <div class="field__header">
                <label for="f-textarea" class="field__label">Descripción breve</label>
                <span class="text-xs text-text-muted">0/500</span>
              </div>
              <div class="field__control">
                <textarea id="f-textarea" class="textarea" placeholder="Cuéntanos un poco sobre tu experiencia..."></textarea>
              </div>
            </div>

          </div>
        </section>

        <!-- Zona de Archivos -->
        <section>
          <h2 class="text-xl font-bold mb-4 border-b border-gray-200 pb-2 text-text-main">Subida de Archivos (.file-drop)</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Reposo -->
            <label class="file-drop">
              <input type="file" class="file-drop__input" aria-label="Sube tu CV">
              <svg class="file-drop__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span class="file-drop__text">Sube tu CV</span>
              <span class="file-drop__subtext">PDF o DOCX hasta 5MB</span>
            </label>

            <!-- Drag over simulado -->
            <label class="file-drop is-dragover">
              <input type="file" class="file-drop__input" aria-label="Sube tu CV">
              <svg class="file-drop__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span class="file-drop__text text-primary-700">¡Suelta el archivo aquí!</span>
              <span class="file-drop__subtext text-primary-600">Procesando...</span>
            </label>
          </div>

          <!-- Archivo seleccionado -->
          <div class="mt-4 file-drop-selected">
            <div class="file-drop-selected__info">
              <svg class="file-drop-selected__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <p class="file-drop-selected__name">curriculum_juan_perez.pdf</p>
                <p class="file-drop-selected__size">1.2 MB</p>
              </div>
            </div>
            <button type="button" class="btn btn-ghost btn-icon btn-sm text-red-500 hover:text-red-600 hover:bg-red-50" aria-label="Eliminar archivo">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </section>

        <!-- Radio y Checkbox -->
        <section>
          <h2 class="text-xl font-bold mb-4 border-b border-gray-200 pb-2 text-text-main">Check y Radio (.check-radio)</h2>
          <div class="flex flex-wrap gap-8">
            <label class="check-radio">
              <input type="checkbox" class="check-radio__input">
              <span class="check-radio__label">Acepto los términos</span>
            </label>
            <label class="check-radio">
              <input type="checkbox" class="check-radio__input" checked>
              <span class="check-radio__label">Recibir ofertas</span>
            </label>
            <div class="w-px bg-gray-200 mx-2"></div>
            <label class="check-radio">
              <input type="radio" name="r1" class="check-radio__input" checked>
              <span class="check-radio__label">Opción 1</span>
            </label>
            <label class="check-radio">
              <input type="radio" name="r1" class="check-radio__input">
              <span class="check-radio__label">Opción 2</span>
            </label>
          </div>
        </section>

        <!-- Estados Interfaz Real -->
        <section>
          <h2 class="text-xl font-bold mb-4 border-b border-gray-200 pb-2 text-text-main">Estados de un Campo (Solo Visual)</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div class="field">
              <label class="field__label">Deshabilitado</label>
              <input type="text" class="input" disabled value="No se puede cambiar">
            </div>

            <div class="field">
              <label class="field__label">Solo Lectura</label>
              <input type="text" class="input" readonly value="Texto fijo sin borde">
            </div>

            <div class="field is-valid">
              <label class="field__label">Válido (is-valid)</label>
              <div class="field__control">
                <input type="text" class="input" value="Correcto">
                <svg class="field__valid-check" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
            </div>

          </div>
        </section>

        <!-- Formulario Real Interactivo (Animación error) -->
        <section>
          <h2 class="text-xl font-bold mb-4 border-b border-gray-200 pb-2 text-text-main">Prueba de Error Animado (Con ReactiveForms)</h2>
          
          <form [formGroup]="demoForm" (ngSubmit)="onSubmit()" class="bg-white p-6 rounded-xl border border-gray-200 max-w-md shadow-sm" [class.form-submitted]="isSubmitted()">
            
            <div class="field mb-6" [class.is-invalid]="showError('username')" [class.is-valid]="showValid('username')">
              <div class="field__header">
                <label for="username" class="field__label">Nombre de usuario</label>
              </div>
              <div class="field__control">
                <input id="username" type="text" formControlName="username" class="input">
                <svg class="field__valid-check" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <p class="field__error" role="alert">
                <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Este campo es obligatorio.
              </p>
            </div>

            <button type="submit" class="btn btn-primary btn-block">
              <span>Intentar Enviar</span>
            </button>
            <p class="text-sm text-text-muted text-center mt-4">Al enviar vacío, se aplica .form-submitted y tiembla.</p>

          </form>
        </section>

      </div>
    </div>
  `
})
export class FormsDemoComponent {
  private fb = inject(FormBuilder);
  
  demoForm = this.fb.group({
    username: ['', Validators.required]
  });

  isSubmitted = signal(false);

  showError(field: string): boolean {
    const control = this.demoForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched || this.isSubmitted());
  }

  showValid(field: string): boolean {
    const control = this.demoForm.get(field);
    return !!control && control.valid && (control.dirty || control.touched);
  }

  onSubmit() {
    if (this.demoForm.invalid) {
      this.isSubmitted.set(false);
      setTimeout(() => this.isSubmitted.set(true), 10);
      return;
    }
    // Success...
  }
}
