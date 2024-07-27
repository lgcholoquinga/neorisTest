import { Component, input } from '@angular/core';

@Component({
  selector: 'app-table-foot',
  standalone: true,
  imports: [],
  templateUrl: './table-foot.component.html',
  styleUrl: './table-foot.component.scss',
})
export class TableFootComponent {
  totalProducts = input.required<number>();
}
