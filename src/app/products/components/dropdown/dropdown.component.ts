import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@core/services/products.service';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  private router = inject(Router);
  private productsService = inject(ProductsService);

  @ViewChild('modalConfirm')
  modalConfirmDeleteProduct!: ElementRef<HTMLDivElement>;

  @Input({ required: true }) idProduct = '';

  /**
   * Method that redirect to edit product page
   */
  onEditProduct() {
    this.router.navigateByUrl(`/products/edit/${this.idProduct}`);
  }

  /**
   * Show modal confirmation for delete a product
   */
  onConfirmDeleteProduct(): void {
    this.modalConfirmDeleteProduct.nativeElement.style.display = 'block';
  }

  /**
   * Method that permite delete a product by id
   */
  onRemoveProduct(): void {
    this.onCloseModal();
    this.productsService.deleteProduct(this.idProduct).subscribe((data) => {
      if (data.deletedProduct) {
        alert('Product deleted.');
        window.location.reload();
      } else {
        alert('Error when deleting the product');
      }
    });
  }

  /**
   *
   * @param event Event listener for close modal window
   */
  @HostListener('click', ['$event']) onClick(event: PointerEvent): void {
    if (event.target === this.modalConfirmDeleteProduct.nativeElement) {
      this.onCloseModal();
    }
  }

  /**
   * Method that close modal window
   */
  onCloseModal(): void {
    this.modalConfirmDeleteProduct.nativeElement.style.display = 'none';
  }
}
