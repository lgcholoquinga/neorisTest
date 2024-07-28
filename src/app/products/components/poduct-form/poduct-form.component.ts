import { ActivatedRoute } from '@angular/router';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ShowFormErrorComponent } from '../show-form-error/show-form-error.component';
import { ValidatorsService } from '@core/services/validators.service';
import { productIdValidator } from '@shared/validators/productIdValidator';
import { fechaMayorIgualHoyValidator } from '@shared/validators/validators.functions';
import { Product } from '@core/models/product.interface';

@Component({
  selector: 'app-poduct-form',
  standalone: true,
  imports: [ShowFormErrorComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './poduct-form.component.html',
  styleUrl: './poduct-form.component.scss',
})
export class PoductFormComponent implements OnInit {
  @Input() isEdition = false;
  @Input() titleForm = 'Formulario de Registro';
  @Output() onProductChange = new EventEmitter<Product>();

  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private route = inject(ActivatedRoute);

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

  ngOnInit(): void {
    if (this.isEdition) {
      this.loadDataEditProduct();
    }
  }

  /**
   * Method that load data product for edit form
   */
  public loadDataEditProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    const productBase64 = this.route.snapshot.queryParams['product'];
    const productDecode = atob(productBase64);
    const editProduct: Product = JSON.parse(productDecode);

    this.productForm.controls['id'].setValue(id);
    this.productForm.controls['id'].clearAsyncValidators();

    this.productForm.controls['name'].setValue(editProduct.name);
    this.productForm.controls['description'].setValue(editProduct.description);
    this.productForm.controls['logo'].setValue(editProduct.logo);
    this.productForm.controls['dateRelease'].setValue(
      this.convertDateToString(editProduct.date_release)
    );
    this.productForm.controls['dateRevision'].setValue(
      this.convertDateToString(editProduct.date_revision)
    );
  }

  /**
   * Method that reorder date string to correct format
   * @param dateStr Date in format string
   * @returns Date with correct format
   */
  public convertDateToString(dateStr: string) {
    const dateString = new Date(dateStr).toLocaleDateString('en-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    const splitDate = dateString.split('/');
    return `${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`;
  }

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

    this.onProductChange.emit(product);
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
