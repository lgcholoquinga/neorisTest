import { Component, inject } from '@angular/core';

import { PoductFormComponent } from '../poduct-form/poduct-form.component';
import { Product } from '@core/models/product.interface';
import { ProductsService } from '../../../core/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [PoductFormComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
})
export default class EditProductComponent {
  public title = 'Formulario de Edicion';

  private productService = inject(ProductsService);
  private navigate = inject(Router);

  /**
   * Method that permit update a product
   * @returns Object con the new product updated
   */
  onUpdateProduct(product: Product) {
    this.productService.updateProduct(product).subscribe((data) => {
      console.log(data);
      alert('Product updated succesfully.');
      this.navigate.navigateByUrl('/products');
    });
  }
}
