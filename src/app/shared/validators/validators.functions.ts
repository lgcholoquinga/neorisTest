import { FormControl } from '@angular/forms';

/**
 * Metodo que permite validar que la fecha ingresada mediante un formulario
 * sea mayor a igual a la fecha actual
 *
 * @param control Formulario de control
 * @returns Objeto en el caso que exista un error o un valor null
 */
export const fechaMayorIgualHoyValidator = (control: FormControl) => {
  if (control.value === null) return;
  let date = new Date(control.value);
  date.setDate(date.getDate() + 1);
  const currentDate = new Date();

  return date.getTime() < currentDate.getTime()
    ? { fechaMayorIgualHoy: true }
    : null;
};
