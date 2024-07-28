import { inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { ProductsService } from '@core/services/products.service';
import { map } from 'rxjs';

/**
 * Method type validator that permit validate if exist a product with id
 * @returns AsyncValidatorFn with possible errors
 */
export const productIdValidator = (): AsyncValidatorFn => {
  const productService = inject(ProductsService);
  return (control: AbstractControl) => {
    return productService
      .validateProduct(control.value)
      .pipe(map((result) => (result ? { productIdExists: true } : null)));
  };
};
