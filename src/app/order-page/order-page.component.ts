import { Component } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { BasketProductComponent } from "../basket-product/basket-product.component";
import { BasketProduct } from '../models/basketProduct';
import { BasketService } from '../services/basket/basket.service';
import { User } from '../models/user';
import { StoreService } from '../services/store-service/store.service';
import { catchError, map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Order } from '../models/order';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-order-page',
  standalone: true,
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css',
  imports: [CommonModule, BasketProductComponent, FormsModule]
})
export class OrderPageComponent {

  productList?: BasketProduct[];
  users?: User[];
  selectedUser?: User;

  constructor(private basketService: BasketService, private storeService: StoreService, private router: Router) {
    this.productList = basketService.products;
    this.storeService.getAllUsers().subscribe((response) => {
      this.users = response;
    });
  }

  get OrderHistory() {
    let orderHistory = localStorage.getItem("OrderHistory");
    let orders: Order[] = [];
    if (orderHistory) {
      orders = <Order[]>JSON.parse(orderHistory);
    }
    return orders;
  }
  set OrderHistory(orders: Order[]) {
    localStorage.setItem('OrderHistory', JSON.stringify(orders));
  }

  completeOrder() {
    if (this.selectedUser) {

      const newOrder: Order = {
        basketProduces: this.productList!,
        date: new Date(),
        user: this.selectedUser!
      };
      const orderHistory = this.OrderHistory;
      orderHistory.push(newOrder);
      this.OrderHistory = orderHistory;
      this.basketService.clear();
      this.router.navigate(['']);
    } else {
      alert("Please Select a User");
    }

  }
}
