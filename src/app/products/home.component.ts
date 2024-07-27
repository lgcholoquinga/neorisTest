import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ProductsService } from '@core/services/products.service';
import { TableProductComponent } from './components/table-product/table-product.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, TableProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {
  private readonly productsService: ProductsService = inject(ProductsService);

  products$ = this.productsService.getAllProducts();
}
