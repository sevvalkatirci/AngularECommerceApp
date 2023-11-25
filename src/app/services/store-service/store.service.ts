import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private baseUrl:string="https://fakestoreapi.com";

  constructor(private httpClient:HttpClient) { }

  getProducts():Observable<Product[]>{
   return this.httpClient
    .get<Product[]>(`${this.baseUrl}/products`);
  }

  getCategories():Observable<string[]>{
    return this.httpClient
    .get<string[]>(`${this.baseUrl}/products/categories`);
  }

  getCategoryProducts(category:string):Observable<Product[]>{
    return this.httpClient
    .get<Product[]>(`${this.baseUrl}/products/category/${category}`);
  }
}
