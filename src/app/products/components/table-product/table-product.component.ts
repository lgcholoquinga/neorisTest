import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Product } from '@core/models/product.interface';

@Component({
  selector: 'app-table-product',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './table-product.component.html',
  styleUrl: './table-product.component.scss',
})
export class TableProductComponent {
  products = input.required<Product[]>();
}
