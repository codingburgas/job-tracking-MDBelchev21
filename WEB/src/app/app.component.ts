import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service'; // Import AuthService
import { RouterLink } from '@angular/router'; // Import RouterLink

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink], // Add RouterLink here
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  title = 'JobTrackingWebApp';

  constructor(public authService: AuthService) {} // Inject AuthService
}