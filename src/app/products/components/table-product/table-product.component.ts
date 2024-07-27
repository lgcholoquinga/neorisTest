import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Product } from '@core/models/product.interface';
import { TableFootComponent } from '../table-foot/table-foot.component';
import { LogoProductDirective } from '@core/directives/logo-product.directive';

@Component({
  selector: 'app-table-product',
  standalone: true,
  imports: [DatePipe, TableFootComponent, LogoProductDirective],
  templateUrl: './table-product.component.html',
  styleUrl: './table-product.component.scss',
})
export class TableProductComponent {
  products = input.required<Product[]>();
}
