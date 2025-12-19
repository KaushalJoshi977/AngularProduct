import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Our Products</h2>
      <div class="product-list">
        @for (p of products(); track p.id) {
          <div class="product-card">
            <img [src]="p.image || 'https://images.pexels.com/photos/8217425/pexels-photo-8217425.jpeg'" [alt]="p.name">
            <h3>{{ p.name }}</h3>
            <p>{{ p.price | currency }}</p>
          </div>
        }
      </div>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  private http = inject(HttpClient);
  products = signal<any[]>([]);

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8080/api/products')
      .subscribe(data => this.products.set(data));
  }
}