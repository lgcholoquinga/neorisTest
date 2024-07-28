import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '@core/models/product.interface';

import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http: HttpClient = inject(HttpClient);
  private productsUrl = `${environment.URL_API}/bp/products`;

  /**
   * Method that permite get all products
   *
   * @returns List of products
   */
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  /**
   * Method that permit validate if exist a product by id
   * @param idProduct Identifier unique of the product
   * @returns Boolean value
   */
  validateProduct(idProduct: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.productsUrl}/verification`, {
      params: { id: idProduct },
    });
  }

  /**
   * Method that permit create a new product
   * @param product Object with data product
   * @returns Object with product registered
   */
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product);
  }
}
