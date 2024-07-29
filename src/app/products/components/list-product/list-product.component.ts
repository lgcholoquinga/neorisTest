import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { RouterModule } from '@angular/router';

import { Product } from '@core/models/product.interface';
import { ProductsService } from '@core/services/products.service';
import { PoductsTableComponent } from '../poducts-table/poducts-table.component';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [PoductsTableComponent, RouterModule],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss',
})
export default class ListProductComponent implements OnInit, OnDestroy {
  private readonly initialQuantity = 5;
  private readonly productsService: ProductsService = inject(ProductsService);

  public products: Product[] = [];
  public selectedProducts: Product[] = [];

  public debouncer: Subject<string> = new Subject<string>();
  public debouncerSubs$?: Subscription;
  public subscription$?: Subscription;

  public currentQuantity = 5;

  ngOnInit(): void {
    this.subscription$ = this.productsService
      .getAllProducts()
      .subscribe((data) => {
        this.products = data;
        this.onGetProductsByQuantity(this.initialQuantity);
      });

    this.debouncerSubs$ = this.debouncer
      .pipe(debounceTime(300))
      .subscribe((value) => {
        if (value.length === 0) {
          this.onGetProductsByQuantity(this.currentQuantity);
          return;
        }
        this.selectedProducts = this.selectedProducts.filter((product) =>
          product.name.toLowerCase().includes(value.toLowerCase())
        );
      });
  }

  /**
   * Method that emit value  of the input search
   * @param value Value of the input search
   */
  onKeyPress(value: string) {
    this.debouncer.next(value);
  }

  /**
   * Method that permit get products by quantity
   * @param quantity Values [5-10-20]
   */
  onGetProductsByQuantity(quantity: number) {
    this.currentQuantity = quantity;
    this.selectedProducts = this.products.slice(0, quantity);
  }

  ngOnDestroy(): void {
    this.debouncerSubs$?.unsubscribe();
    this.subscription$?.unsubscribe();
  }
}
