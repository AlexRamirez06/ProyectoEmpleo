import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-legal-temp',
  standalone: true,
  template: `
    <div class="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div class="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full text-center">
        <h1 class="text-2xl font-bold text-text-main mb-4">Información Legal</h1>
        <p class="text-text-muted mb-8">Contenido pendiente de definir.</p>
        <button type="button" class="btn btn-primary" (click)="close()">
          <span>Cerrar</span>
        </button>
      </div>
    </div>
  `
})
export class LegalTempComponent {
  constructor(private location: Location) {}
  
  close() {
    window.close(); // Intenta cerrar la pestaña
    this.location.back(); // Fallback si no está en pestaña nueva
  }
}
