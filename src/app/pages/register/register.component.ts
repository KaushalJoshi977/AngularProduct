import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      <h2>Create Account</h2>
      <form (ngSubmit)="onRegister()">
        <input [(ngModel)]="user.username" name="username" placeholder="Username" required>
        <input [(ngModel)]="user.password" name="password" type="password" placeholder="Password" required>
        <button type="submit">Register</button>
      </form>
    </div>
  `
})
export class RegisterComponent {
  user = { username: '', password: '' };
  private auth = inject(AuthService);
  private router = inject(Router);

  onRegister() {
    this.auth.register(this.user).subscribe({
      next: () => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => alert('Registration failed: ' + err.error)
    });
  }
}