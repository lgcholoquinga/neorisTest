import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ProductsService } from '@core/services/products.service';
import { PoductFormComponent } from '../poduct-form/poduct-form.component';
import { Product } from '@core/models/product.interface';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [PoductFormComponent],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export default class CreateProductComponent {
  private productService = inject(ProductsService);
  private navigate = inject(Router);

  /**
   * Method that permit register a product
   * @returns Object con the new product registered
   */
  onSaveProduct(product: Product) {
    this.productService.createProduct(product).subscribe(() => {
      alert('Product registered succesfully.');
      this.navigate.navigateByUrl('/products');
    });
  }
}
