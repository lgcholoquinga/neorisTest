import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ShowFormErrorComponent } from '../show-form-error/show-form-error.component';
import { fechaMayorIgualHoyValidator } from '@shared/validators/validators.functions';
import { ValidatorsService } from '@core/services/validators.service';
import { productIdValidator } from '@shared/validators/productIdValidator';
import { Product } from '@core/models/product.interface';
import { ProductsService } from '@core/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ShowFormErrorComponent],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export default class CreateProductComponent {
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private productService = inject(ProductsService);
  private navigate = inject(Router);

  public productForm: FormGroup = this.fb.group({
    id: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
      [productIdValidator()],
    ],
    name: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
    ],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ],
    ],
    logo: ['', [Validators.required]],
    dateRelease: ['', [Validators.required, fechaMayorIgualHoyValidator]],
    dateRevision: ['', [Validators.required]],
  });

  /**
   * Method that permit register a product
   * @returns Object con the new product registered
   */
  onSaveProduct() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const { id, name, description, logo, dateRelease, dateRevision } =
      this.productForm.value;

    const product: Product = {
      id,
      name,
      description,
      logo,
      date_release: dateRelease,
      date_revision: dateRevision,
    };

    this.productService.createProduct(product).subscribe(() => {
      alert('Product registered succesfully.');
      this.navigate.navigateByUrl('/products');
    });
  }

  /**
   * Method that permit reset form
   */
  onResetForm() {
    this.productForm.reset();
  }

  /**
   * Method that permit validate if the inout of the form is valid
   * @param field Name of the input
   * @returns Boolean or null
   */
  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.productForm, field);
  }

  /**
   * Method that permite a message error if exists in the form
   * @param field Input of the form
   * @returns Message of the error or null
   */
  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.productForm, field);
  }

  /**
   * Method that permit add date revision automatically
   */
  onChangeDateRelease() {
    const dateRelease = this.productForm.controls['dateRelease'].value;
    let date = new Date(dateRelease);
    date.setDate(date.getDate() + 2);
    this.productForm.controls['dateRevision'].setValue(
      this.convertDateFormat(date.toLocaleDateString())
    );
  }

  /**
   * Method that permit format a date
   * @param dateString Value in string
   * @returns Format date YYYY/MM/DD
   */
  convertDateFormat(dateString: string) {
    const parts = dateString.split('/');
    const year = parts[2];
    const month = parts[1].padStart(2, '0');
    const day = parts[0].padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
