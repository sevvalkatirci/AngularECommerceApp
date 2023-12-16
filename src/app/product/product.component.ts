import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product';
import { FormsModule } from '@angular/forms';
import { BasketService } from '../services/basket/basket.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  count: number = 0;
  @Input()
  product?: Product;

  constructor(private basketService: BasketService) { }

  countChange() {
    this.basketService.setProduct(this.product!, this.count);
  }

  addToBasket(count: number) {
    if (this.count + count >= 0) {
      this.count += count;
      this.basketService.addProduct(this.product!, count);
    }
  }
}
