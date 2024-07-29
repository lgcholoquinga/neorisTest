import { Component, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ProductsService } from '@core/services/products.service';
import { PoductFormComponent } from '../poduct-form/poduct-form.component';
import { Product } from '@core/models/product.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [PoductFormComponent],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export default class CreateProductComponent implements OnDestroy {
  private productService = inject(ProductsService);
  private navigate = inject(Router);

  public subscription$?: Subscription;

  /**
   * Method that permit register a product
   * @returns Object con the new product registered
   */
  onSaveProduct(product: Product) {
    this.subscription$ = this.productService
      .createProduct(product)
      .subscribe(() => {
        alert('Product registered succesfully.');
        this.navigate.navigateByUrl('/products');
      });
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }
}
