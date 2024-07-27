import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-foot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table-foot.component.html',
  styleUrl: './table-foot.component.scss',
})
export class TableFootComponent {
  public totalProducts = input.required<number>();
  public onShowItems = output<number>();
  public currentPage = 5;

  /**
   * Method that emit el new filter for show the items in the table.
   */
  onChangePagination() {
    this.onShowItems.emit(this.currentPage);
  }
}
