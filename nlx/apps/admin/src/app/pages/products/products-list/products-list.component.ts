import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@nlx/products';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this._getProducts();
  }

  deleteProduct(a: any) {
    null;
  }

  updateProduct(a: any) {
    return a;
  }

  private _getProducts() {
    this.productsService.getProducts().subscribe((prods) => {
      this.products = prods;
    });
  }
}
