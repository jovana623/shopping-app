import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = ' https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getProducts(limit: number = 5, skip: number = 0): Observable<Product[]> {
    const url = `${this.productsUrl}?limit=${limit}&skip=${skip}`;
    return this.http.get<Product[]>(url);
  }

  getProductsById(id: number): Observable<Product[]> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product[]>(url);
  }

  searchProducts(query: string): Observable<Product[]> {
    const url = `${this.productsUrl}/search?q=${query}`;
    return this.http.get<Product[]>(url);
  }
}
