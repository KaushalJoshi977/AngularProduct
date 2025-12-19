import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="home-page">
      <section class="hero-section">
        <div class="hero-content">
          <h1>The Future of E-Commerce, <span class="highlight">Secured.</span></h1>
          <p>Explore high-quality products or manage your enterprise inventory with ease.</p>
          
          <div class="cta-group">
            <a routerLink="/products" class="btn btn-primary">Shop Now</a>
            <a routerLink="/admin" class="btn btn-outline">Admin Dashboard</a>
          </div>
        </div>
      </section>

      <div class="container">
        <div class="auth-card">
          @if (auth.isAuthenticated()) {
            <div class="status-content">
              <div class="icon-circle success">✓</div>
              <div class="text-content">
                <h3>Welcome Back!</h3>
                <p>Your session is active. Ready to find something new?</p>
                <a routerLink="/products" class="btn btn-link">Continue Shopping →</a>
              </div>
            </div>
          } @else {
            <div class="status-content">
              <div class="icon-circle info">🔑</div>
              <div class="text-content">
                <h3>Secure Access Required</h3>
                <p>Unlock personalized features by signing into your account.</p>
                <div class="auth-actions">
                  <button routerLink="/login" class="btn btn-primary">Login</button>
                  <button routerLink="/register" class="btn btn-secondary">Create Account</button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      --primary: #4f46e5;
      --primary-hover: #4338ca;
      --secondary: #64748b;
      --bg-gradient: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      --text-main: #1e293b;
      --white: #ffffff;
      font-family: 'Inter', system-ui, sans-serif;
    }

    .home-page {
      min-height: 100vh;
      background: var(--bg-gradient);
      color: var(--text-main);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* Hero Section */
    .hero-section {
      padding: 80px 20px;
      text-align: center;
      max-width: 800px;
    }

    h1 {
      font-size: 3.5rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 1.5rem;
      line-height: 1.1;
    }

    .highlight {
      color: var(--primary);
      background: linear-gradient(to bottom, transparent 60%, #e0e7ff 60%);
    }

    p {
      font-size: 1.25rem;
      color: #475569;
      margin-bottom: 2.5rem;
    }

    /* Button System */
    .cta-group {
      display: flex;
      gap: 16px;
      justify-content: center;
    }

    .btn {
      padding: 12px 28px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      border: none;
    }

    .btn-primary {
      background: var(--primary);
      color: white;
      box-shadow: 0 4px 14px 0 rgba(79, 70, 229, 0.39);
    }

    .btn-primary:hover {
      background: var(--primary-hover);
      transform: translateY(-2px);
    }

    .btn-outline {
      background: transparent;
      border: 2px solid #cbd5e1;
      color: var(--text-main);
    }

    .btn-outline:hover {
      border-color: var(--primary);
      color: var(--primary);
    }

    /* Auth Card Styles */
    .container {
      width: 100%;
      max-width: 600px;
      padding: 0 20px 60px;
    }

    .auth-card {
      background: var(--white);
      padding: 32px;
      border-radius: 24px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }

    .status-content {
      display: flex;
      gap: 20px;
      align-items: flex-start;
    }

    .icon-circle {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .success { background: #dcfce7; color: #166534; }
    .info { background: #e0f2fe; color: #075985; }

    .text-content h3 { margin: 0 0 8px 0; font-size: 1.25rem; }
    .text-content p { font-size: 1rem; margin-bottom: 16px; color: #64748b; }

    .auth-actions {
      display: flex;
      gap: 12px;
    }

    .btn-secondary { background: #f1f5f9; color: #475569; }
    .btn-secondary:hover { background: #e2e8f0; }

    .btn-link { color: var(--primary); padding-left: 0; font-weight: 700; }
  `]
})
export class HomeComponent {
  auth = inject(AuthService);
}