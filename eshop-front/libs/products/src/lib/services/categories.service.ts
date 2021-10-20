import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category } from '../models/category';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  apiURLCategory = environment.apiURL + 'categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    // return this.http.get<Category[]>('http://localhost:3000/api/v1/categories');
    return this.http.get<Category[]>(this.apiURLCategory);
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(
      // `http://localhost:3000/api/v1/categories/${categoryId}`
      `${this.apiURLCategory}/${categoryId}`
    );
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiURLCategory, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(this.apiURLCategory + '/' + category.id, category);
  }

  deleteCategory(categoryId: string): Observable<Category> {
    return this.http.delete<Category>(`${this.apiURLCategory}/${categoryId}`);
  }
}
