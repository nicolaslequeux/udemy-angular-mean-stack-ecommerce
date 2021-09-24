import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiURLCategory = environment.apiURL + 'products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURLCategory);
  }

  // getCategory(categoryId: string): Observable<Category> {
  //   return this.http.get<Category>(
  //     // `http://localhost:3000/api/v1/categories/${categoryId}`
  //     `${this.apiURLCategory}/${categoryId}`
  //   );
  // }

  // createCategory(category: Category): Observable<Category> {
  //   return this.http.post<Category>(this.apiURLCategory, category);
  // }

  // updateCategory(category: Category): Observable<Category> {
  //   return this.http.put<Category>(this.apiURLCategory + '/' + category.id, category);
  // }

  // deleteCategory(categoryId: string): Observable<Category> {
  //   return this.http.delete<Category>(`${this.apiURLCategory}/${categoryId}`);
  // }
}
