import { DatePipe } from '@angular/common';
import { Component, OnInit, input, signal } from '@angular/core';
import { Product } from '@core/models/product.interface';
import { TableFootComponent } from '../table-foot/table-foot.component';

@Component({
  selector: 'app-table-product',
  standalone: true,
  imports: [DatePipe, TableFootComponent],
  templateUrl: './table-product.component.html',
  styleUrl: './table-product.component.scss',
})
export class TableProductComponent implements OnInit {
  public products = input.required<Product[]>();
  public selectedProducts = signal<Product[]>([]);
  public showQuantityProduct = 5;

  ngOnInit(): void {
    this.selectedProducts.set(this.getFilterProducts(this.showQuantityProduct));
  }

  /**
   * Method the permite show items products by filter [5-10-15]
   * @param value - New Value to filter
   */
  onFilterItems(value: number) {
    this.showQuantityProduct = value;
    this.selectedProducts.set(this.getFilterProducts(this.showQuantityProduct));
  }

  /**
   * Method that permit get products by quantity specified.
   *
   * @param quantity Value by take the products
   * @returns List of the products
   */
  getFilterProducts(quantity: number) {
    return this.products().slice(0, quantity - 1);
  }
}
