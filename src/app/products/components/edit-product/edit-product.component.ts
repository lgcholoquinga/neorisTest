import { Component } from '@angular/core';

import { PoductFormComponent } from '../poduct-form/poduct-form.component';
import { Product } from '@core/models/product.interface';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [PoductFormComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
})
export default class EditProductComponent {
  public title = 'Formulario de Edicion';

  /**
   * Method that permit register a product
   * @returns Object con the new product registered
   */
  onSaveProduct(product: Product) {
    console.log(product);
    // this.productService.createProduct(product).subscribe(() => {
    //   alert('Product registered succesfully.');
    //   this.navigate.navigateByUrl('/products');
    // });
  }
}
