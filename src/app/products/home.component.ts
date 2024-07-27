import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ProductsService } from '@core/services/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {
  private readonly productsService: ProductsService = inject(ProductsService);

  products$ = this.productsService.getAllProducts();
}
