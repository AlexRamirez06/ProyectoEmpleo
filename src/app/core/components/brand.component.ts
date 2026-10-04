import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="flex items-center gap-2">
      <div 
        class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xl transition-colors"
        [ngClass]="lightText ? 'bg-white text-text-main' : 'bg-primary-600 text-white'"
      >
        E
      </div>
      <span 
        class="font-bold text-xl tracking-tight transition-colors"
        [ngClass]="lightText ? 'text-white' : 'text-text-main'"
      >
        EmpleosPro
      </span>
    </div>
  `
})
export class BrandComponent {
  @Input() lightText = false;
}
