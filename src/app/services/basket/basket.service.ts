import { Injectable } from '@angular/core';
import { BasketProduct } from '../../models/basketProduct';
import { Product } from '../../models/product';
import { count } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  public products: BasketProduct[] = [];
  constructor() {
    const basketProducts = localStorage.getItem("basketProducts");
    if (basketProducts) {
      this.products = <BasketProduct[]>JSON.parse(basketProducts);
    }
  }

  addProduct(product: Product, count: number) {
    var matchedProducts = this.products.filter(p => p.product.id == product.id);
    if (matchedProducts.length > 0) {
      if (matchedProducts[0].count + count == 0) {
        this.removeProduct(product);
      }
      matchedProducts[0].count += count;
    } else {
      this.products.push({ product: product, count: count });
    }
    this.refreshStorage();
  }

  public refreshStorage() {
    localStorage.setItem("basketProducts", JSON.stringify(this.products));
  }

  setProduct(product: Product, count: number) {
    var matchedProducts = this.products.filter(p => p.product.id == product.id);
    if (matchedProducts.length > 0) {
      if (count == 0) {
        this.removeProduct(product);
      }
      matchedProducts[0].count += count;
    } else {
      this.products.push({ product: product, count: count });
    }
    this.refreshStorage();
  }

  removeProduct(product: Product) {
    var matchedProductIndex = this.products.findIndex((p) => p.product.id == product.id);
    if (matchedProductIndex > -1) {
      this.products = this.products.splice(matchedProductIndex, 1);
    }
    this.refreshStorage();
  }
  public clear() {
    localStorage.removeItem('basketProducts');
  }
}
