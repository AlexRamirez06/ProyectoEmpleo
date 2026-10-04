import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [NgClass],
  template: `
    <nav aria-label="Progreso del registro" class="w-full">
      <!-- Versión Escritorio -->
      <div class="hidden sm:flex items-center justify-between relative">
        <!-- Líneas conectoras de fondo -->
        <div class="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-200 z-0"></div>
        
        <!-- Línea conectora de progreso (animada) -->
        <div class="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-primary-600 z-0 transition-all duration-500 ease-out motion-reduce:transition-none"
             [style.width.%]="(currentStep - 1) / (steps.length - 1) * 100"></div>

        @for (step of steps; track step.num) {
          <div class="relative z-10 flex flex-col items-center">
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-colors duration-300 shadow-sm border-2"
              [ngClass]="{
                'bg-primary-600 border-primary-600 text-white': currentStep >= step.num,
                'bg-white border-gray-300 text-gray-500': currentStep < step.num
              }"
              [attr.aria-current]="currentStep === step.num ? 'step' : null"
            >
              @if (currentStep > step.num) {
                <svg class="w-4 h-4 motion-safe:animate-[draw-check_0.3s_ease-out_forwards]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" stroke-dasharray="24" stroke-dashoffset="24" />
                </svg>
              } @else {
                {{ step.num }}
              }
            </div>
            <span class="absolute top-10 whitespace-nowrap text-xs font-medium transition-colors duration-300"
                  [ngClass]="currentStep >= step.num ? 'text-primary-800' : 'text-gray-400'">
              {{ step.name }}
            </span>
          </div>
        }
      </div>

      <!-- Versión Celular -->
      <div class="sm:hidden flex flex-col gap-2">
        <div class="flex justify-between text-sm font-medium">
          <span class="text-text-main">Paso {{ currentStep }} de {{ steps.length }}</span>
          <span class="text-primary-700">{{ steps[currentStep - 1].name }}</span>
        </div>
        <div class="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
          <div class="bg-primary-600 h-full transition-all duration-500 ease-out motion-reduce:transition-none"
               [style.width.%]="(currentStep / steps.length) * 100"></div>
        </div>
      </div>
    </nav>
  `
})
export class StepperComponent {
  @Input() currentStep = 1;
  @Input() steps: {num: number, name: string}[] = [];
}
