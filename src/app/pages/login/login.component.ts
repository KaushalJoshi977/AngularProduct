import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      <h2>Login</h2>
      <form (ngSubmit)="onLogin()">
        <input [(ngModel)]="creds.username" name="username" placeholder="Username" required>
        <input [(ngModel)]="creds.password" name="password" type="password" placeholder="Password" required>
        <button type="submit">Sign In</button>
      </form>
    </div>
  `
})
export class LoginComponent {
  creds = { username: '', password: '' };
  private auth = inject(AuthService);
  private router = inject(Router);

  onLogin() {
    this.auth.login(this.creds).subscribe({
      next: () => this.router.navigate(['/products']),
      error: () => alert('Invalid Credentials')
    });
  }
}