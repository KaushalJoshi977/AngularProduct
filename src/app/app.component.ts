import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  // CommonModule is essential for @if logic to work
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html', // Fixed to match your file: app.html
  styleUrl: './app.css'      // Fixed to match your file: app.css
})
export class AppComponent {
  // Use public so the app.html can access it
  public auth = inject(AuthService); 
}