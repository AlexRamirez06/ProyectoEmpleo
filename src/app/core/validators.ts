import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class AppValidators {
  static url(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    try {
      new URL(control.value);
      return null;
    } catch {
      return { url: true };
    }
  }

  static requiredTrue(control: AbstractControl): ValidationErrors | null {
    return control.value === true ? null : { requiredTrue: true };
  }
}

export const ErrorMessages: Record<string, (params?: any) => string> = {
  required: () => 'Este campo es obligatorio.',
  email: () => 'Escribe un correo válido, como nombre@empresa.com',
  minlength: (p) => `Debe tener al menos ${p.requiredLength} caracteres.`,
  url: () => 'Escribe una dirección válida, como https://www.tuempresa.com',
  requiredTrue: () => 'Debes aceptar las normas y la política para continuar.',
  pattern: () => 'El formato es incorrecto.'
};
