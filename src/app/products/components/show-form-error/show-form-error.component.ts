import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-form-error',
  standalone: true,
  imports: [],
  templateUrl: './show-form-error.component.html',
  styleUrl: './show-form-error.component.scss',
})
export class ShowFormErrorComponent {
  @Input() message: string | null = '';
}
