import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  /**
   * Method that permite if exist error in a input of the form
   *
   * @param form Form group the form
   * @param field Name of the input
   * @returns Boolean or null
   */
  public isValidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  /**
   * Method that permit get a message error of the form
   *
   * @param form Form Group
   * @param field Field of the input
   * @returns Message of the error or null
   */
  public getFieldError(form: FormGroup, field: string): string | null {
    if (!form.controls[field] && !form.controls[field].errors) return null;

    const errors = form.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido.';
        case 'minlength':
          return `Este campo requiere ${errors['minlength'].requiredLength} caracteres.`;
        case 'maxlength':
          return `Este campo requiere ${errors['maxlength'].requiredLength} caracteres.`;
        case 'fechaMayorIgualHoy':
          return 'La fecha debe ser igual o mayor a la fecha actual';
      }
    }

    return null;
  }
}
