import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { ProductComponent } from "../product/product.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  imports: [CommonModule, NgFor, NgIf, ProductComponent]
})
export class ProductListComponent {

  @Input()
  productList?: Product[];
}
