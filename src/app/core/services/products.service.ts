import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '@core/models/product.interface';

import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsUrl = `${environment.URL_API}/bp/products`;
  private authorId = environment.AUTHOR_ID;

  private http: HttpClient = inject(HttpClient);

  /**
   * Get all products
   *
   * @returns List of products
   */
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }
}
