import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-buttons-demo',
  standalone: true,
  template: `
    <div class="min-h-screen pb-20">
      <div class="bg-primary-900 text-white p-8 text-center shadow-md">
        <h1 class="text-3xl font-bold mb-2">Sistema de Botones - Dev Preview</h1>
        <p class="text-primary-200">Esta ruta es solo para desarrollo y QA visual. No enlazar desde producción.</p>
      </div>

      <div class="max-w-6xl mx-auto p-8 grid gap-16">
        
        <!-- Tamaños y Formas -->
        <section>
          <h2 class="text-xl font-bold mb-4 border-b pb-2 text-text-main">Tamaños y Formas (btn-primary)</h2>
          <div class="flex flex-wrap items-end gap-6 bg-white p-6 rounded-xl border border-gray-200">
            
            <div class="flex flex-col gap-2 items-center">
              <button class="btn btn-primary btn-sm"><span>btn-sm (36px)</span></button>
              <code class="text-xs text-text-muted">.btn-sm</code>
            </div>

            <div class="flex flex-col gap-2 items-center">
              <button class="btn btn-primary"><span>Normal (44px)</span></button>
              <code class="text-xs text-text-muted">.btn</code>
            </div>

            <div class="flex flex-col gap-2 items-center">
              <button class="btn btn-primary btn-lg"><span>btn-lg (52px)</span></button>
              <code class="text-xs text-text-muted">.btn-lg</code>
            </div>

            <div class="flex flex-col gap-2 items-center">
              <button class="btn btn-primary btn-icon" aria-label="Añadir">
                <svg class="btn__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <code class="text-xs text-text-muted">.btn-icon</code>
            </div>
            
            <div class="w-full mt-4">
              <button class="btn btn-primary btn-block"><span>Botón ancho completo</span></button>
              <code class="text-xs text-text-muted block text-center mt-2">.btn-block</code>
            </div>
            
          </div>
        </section>

        <!-- Variantes Fondo Claro -->
        <section>
          <h2 class="text-xl font-bold mb-4 border-b pb-2 text-text-main">Variantes sobre Fondo Claro</h2>
          <div class="flex flex-wrap gap-8 bg-white p-8 rounded-xl border border-gray-200">
            
            <!-- Primary -->
            <div class="flex flex-col gap-4">
              <button class="btn btn-primary"><span>btn-primary</span></button>
              <button class="btn btn-primary" disabled><span>Disabled</span></button>
            </div>

            <!-- Secondary -->
            <div class="flex flex-col gap-4">
              <button class="btn btn-secondary"><span>btn-secondary</span></button>
              <button class="btn btn-secondary" disabled><span>Disabled</span></button>
            </div>

            <!-- Ghost -->
            <div class="flex flex-col gap-4">
              <button class="btn btn-ghost"><span>btn-ghost</span></button>
              <button class="btn btn-ghost" disabled><span>Disabled</span></button>
            </div>

            <!-- Danger -->
            <div class="flex flex-col gap-4">
              <button class="btn btn-danger"><span>btn-danger</span></button>
              <button class="btn btn-danger" disabled><span>Disabled</span></button>
            </div>
            
            <!-- Link -->
            <div class="flex flex-col gap-4 justify-center">
              <a href="#" class="link-animated" (click)="$event.preventDefault()">
                Enlace animado
                <span class="link-animated__arrow">&rarr;</span>
              </a>
            </div>

          </div>
        </section>

        <!-- Variantes Fondo Oscuro -->
        <section>
          <h2 class="text-xl font-bold mb-4 border-b pb-2 text-text-main">Variantes sobre Fondo Oscuro</h2>
          <div class="flex flex-wrap gap-8 bg-text-main p-8 rounded-xl border border-gray-800 shadow-inner">
            
            <!-- Inverse -->
            <div class="flex flex-col gap-4">
              <button class="btn btn-inverse"><span>btn-inverse</span></button>
              <button class="btn btn-inverse" disabled><span>Disabled</span></button>
            </div>

            <!-- Inverse Outline -->
            <div class="flex flex-col gap-4">
              <button class="btn btn-inverse-outline"><span>inverse-outline</span></button>
              <button class="btn btn-inverse-outline" disabled><span>Disabled</span></button>
            </div>

            <!-- Focus preview oscuros -->
            <div class="flex flex-col gap-4">
              <button class="btn btn-inverse shadow-[var(--ring-focus)] outline-none"><span>Fake Focus</span></button>
            </div>

          </div>
        </section>

        <!-- Movimiento de Iconos -->
        <section>
          <h2 class="text-xl font-bold mb-4 border-b pb-2 text-text-main">Movimiento de Iconos (data-motion)</h2>
          <div class="flex flex-wrap gap-4 bg-white p-6 rounded-xl border border-gray-200">
            
            <button class="btn btn-primary" data-motion="forward">
              <span>Forward</span>
              <svg class="btn__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <button class="btn btn-secondary" data-motion="back">
              <svg class="btn__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back</span>
            </button>

            <button class="btn btn-ghost" data-motion="add">
              <svg class="btn__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>Add</span>
            </button>

            <button class="btn btn-inverse-outline bg-primary-800" data-motion="download">
              <svg class="btn__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download</span>
            </button>

            <button class="btn btn-danger" data-motion="delete">
              <svg class="btn__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Delete</span>
            </button>
            
            <button class="btn btn-secondary" data-motion="refresh">
              <svg class="btn__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
            
            <button class="btn btn-primary" data-motion="check">
              <svg class="btn__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Check</span>
            </button>

          </div>
        </section>

        <!-- Ciclo de Carga y Éxito -->
        <section>
          <h2 class="text-xl font-bold mb-4 border-b pb-2 text-text-main">Estado Interactable (Carga -> Éxito)</h2>
          <div class="flex flex-wrap gap-4 bg-white p-6 rounded-xl border border-gray-200 items-center">
            
            <button 
              class="btn btn-primary" 
              [class.is-loading]="isLoading()" 
              [class.is-success]="isSuccess()"
              [attr.aria-busy]="isLoading() ? 'true' : null"
              (click)="startCycle()"
            >
              @if (isLoading()) {
                <span class="sr-only">Cargando...</span>
              }
              @if (isSuccess()) {
                <svg class="btn__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>¡Guardado!</span>
              } @else {
                <svg class="btn__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                <span>Guardar cambios</span>
              }
            </button>
            
            <span class="text-sm text-text-muted">Haz clic para ver la animación (2 segundos)</span>

          </div>
        </section>

      </div>
    </div>
  `
})
export class ButtonsDemoComponent {
  isLoading = signal(false);
  isSuccess = signal(false);

  startCycle() {
    if (this.isLoading() || this.isSuccess()) return;
    
    this.isLoading.set(true);
    
    setTimeout(() => {
      this.isLoading.set(false);
      this.isSuccess.set(true);
      
      setTimeout(() => {
        this.isSuccess.set(false);
      }, 2000);
    }, 2000);
  }
}
