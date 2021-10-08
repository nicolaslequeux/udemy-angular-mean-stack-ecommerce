import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { OrdersService } from '@nlx/orders';
import { ProductsService } from '@nlx/products';
import { UsersService } from '@nlx/users';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  statistics: number[] = [];

  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.ordersService.getTotalSales(),
    ]).subscribe((values) => {
      this.statistics = values;
    });
  }
}
