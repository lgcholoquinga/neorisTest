import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ShowFormErrorComponent } from '../show-form-error/show-form-error.component';
import { fechaMayorIgualHoyValidator } from '@shared/validators/validators.functions';
import { ValidatorsService } from '@core/services/validators.service';

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

  public productForm: FormGroup = this.fb.group({
    id: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
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
    console.log(this.productForm.value);
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
}
