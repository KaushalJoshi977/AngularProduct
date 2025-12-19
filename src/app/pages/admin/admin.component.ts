import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container" style="max-width:900px;margin:auto">
      <h2>Admin Management</h2>

      <!-- CREATE FORM -->
      <form (ngSubmit)="createProduct()" style="margin-bottom:40px;padding:20px;border:1px solid #ddd">
        <h3>Create New Product</h3>

        <input placeholder="Name" [(ngModel)]="product.name" name="name" required />
        <input type="number" placeholder="Price" [(ngModel)]="product.price" name="price" required />
        <input placeholder="Image URL" [(ngModel)]="product.image" name="image" />

        <button type="submit">Create Product</button>
      </form>

      @if(message()) { <p style="color:green">{{ message() }}</p> }
      @if(error()) { <p style="color:red">{{ error() }}</p> }

      <!-- INVENTORY TABLE -->
      <h3>Inventory Table</h3>

      <table border="1" width="100%" style="border-collapse:collapse">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          @for(p of products(); track p.id) {
            <tr>
              <td>{{ p.id }}</td>

              <!-- NAME -->
              <td>
                @if(editingId() === p.id) {
                  <input [(ngModel)]="editFormData.name" />
                } @else {
                  {{ p.name }}
                }
              </td>

              <!-- PRICE -->
              <td>
                @if(editingId() === p.id) {
                  <input type="number" [(ngModel)]="editFormData.price" />
                } @else {
                  {{ p.price | currency }}
                }
              </td>

              <!-- IMAGE -->
              <td>
                @if(editingId() === p.id) {
                  <input [(ngModel)]="editFormData.image" />
                } @else {
                  {{ p.image }}
                }
              </td>

              <!-- ACTIONS -->
              <td>
                @if(editingId() === p.id) {
                  <button (click)="updateProduct(p.id)">Save</button>
                  <button (click)="cancelEdit()">Cancel</button>
                } @else {
                  <button (click)="startEdit(p)">Edit</button>
                  <button (click)="deleteProduct(p.id)" style="margin-left:10px">
                    Delete
                  </button>
                }
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `
})
export class AdminComponent implements OnInit {

  private http = inject(HttpClient);

  // STATES
  products = signal<any[]>([]);
  message = signal('');
  error = signal('');

  product = { name: '', price: 0, image: '' };

  editingId = signal<number | null>(null);
  editFormData = { name: '', price: 0, image: '' };

  ngOnInit() {
    this.fetchProducts();
  }

  // FETCH
  fetchProducts() {
    this.http.get<any[]>('http://localhost:8080/api/products')
      .subscribe(data => this.products.set(data));
  }

  // CREATE
  createProduct() {
    this.message.set('');
    this.error.set('');

    this.http.post('http://localhost:8080/api/products/secure', this.product)
      .subscribe({
        next: (res: any) => {
          this.message.set(`Created: ${res.name}`);
          this.product = { name: '', price: 0, image: '' };
          this.fetchProducts();
        },
        error: (err) => {
          this.error.set(
            err.status === 403
              ? 'ACCESS DENIED: Admin Role Required'
              : 'Failed to create product'
          );
        }
      });
  }

  // DELETE
  deleteProduct(id: number) {
    if (!confirm('Delete this product?')) return;

    this.http.delete(`http://localhost:8080/api/products/secure/${id}`)
      .subscribe({
        next: () =>
          this.products.set(this.products().filter(p => p.id !== id)),
        error: () => this.error.set('Failed to delete product')
      });
  }

  // EDIT
  startEdit(p: any) {
    this.editingId.set(p.id);
    this.editFormData = { ...p };
  }

  cancelEdit() {
    this.editingId.set(null);
  }

  // UPDATE
  updateProduct(id: number) {
    this.http.put(
      `http://localhost:8080/api/products/secure/${id}`,
      this.editFormData
    ).subscribe({
      next: (res: any) => {
        this.products.set(
          this.products().map(p => p.id === id ? res : p)
        );
        this.editingId.set(null);
      },
      error: () => this.error.set('Update failed')
    });
  }
}
