import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@core/models/product.interface';
import { ProductsService } from '@core/services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent implements OnDestroy {
  private router = inject(Router);
  private productsService = inject(ProductsService);

  @Input({ required: true }) product!: Product;

  @ViewChild('modalConfirm')
  modalConfirmDeleteProduct!: ElementRef<HTMLDivElement>;

  public subscription$?: Subscription;

  /**
   * Method that redirect to edit product page
   */
  onEditProduct() {
    const product = btoa(JSON.stringify(this.product));
    this.router.navigate([`/products/edit/${this.product?.id}`], {
      queryParams: { product },
    });
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
    this.subscription$ = this.productsService
      .deleteProduct(this.product?.id)
      .subscribe((data) => {
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

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }
}
