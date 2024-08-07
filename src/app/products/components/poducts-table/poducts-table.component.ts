import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Product } from '@core/models/product.interface';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { CustomDateFormatPipe } from '@core/pipes/custom-date-format.pipe';

@Component({
  selector: 'app-poducts-table',
  standalone: true,
  imports: [CommonModule, DropdownComponent, CustomDateFormatPipe],
  templateUrl: './poducts-table.component.html',
  styleUrl: './poducts-table.component.scss',
})
export class PoductsTableComponent {
  @Input({ required: true }) products: Product[] = [];
  @Input({ required: true }) totalProducts = 0;
  @Output() onShowProductsChange = new EventEmitter<number>();

  /**
   * Method the permite show items products by filter [5-10-20]
   * @param value - New Value to filter
   */
  onShowProductsByQuantity(value: string) {
    this.onShowProductsChange.emit(Number(value));
  }
}
