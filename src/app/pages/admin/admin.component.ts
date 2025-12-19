import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="container">
      <h2>Admin Dashboard</h2>
      <div class="card">
        <h3>Add New Product</h3>
        <form (ngSubmit)="createProduct()">
          <input [(ngModel)]="product.name" name="name" placeholder="Product Name" required>
          <input [(ngModel)]="product.price" name="price" type="number" placeholder="Price" required>
          <input [(ngModel)]="product.image" name="image" placeholder="Image URL (e.g. https://...)">
          <button type="submit">Create Product</button>
        </form>
        
        @if (message()) { <p class="message success">{{message()}}</p> }
        @if (error()) { <p class="message error">{{error()}}</p> }
      </div>
    </div>
  `
})
export class AdminComponent {
  private http = inject(HttpClient);
  product = { name: '', price: 0, image: '' };
  
  message = signal('');
  error = signal('');

  createProduct() {
    this.message.set('');
    this.error.set('');

    this.http.post('http://localhost:8080/api/products/secure', this.product)
      .subscribe({
        next: (res: any) => {
          this.message.set(`Success: ${res.name} added!`);
          this.product = { name: '', price: 0, image: '' };
        },
        error: (err) => {
          if (err.status === 403) {
            this.error.set('Access Denied: You do not have Admin privileges.');
          } else {
            this.error.set('An error occurred while creating the product.');
          }
        }
      });
  }
}