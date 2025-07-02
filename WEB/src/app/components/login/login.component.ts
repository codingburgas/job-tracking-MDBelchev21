import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginResponseDto } from '../../models/auth.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required]
    });

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['registered']) {
      this.successMessage = 'Registration successful! Please log in.';
    }
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (response: LoginResponseDto) => {
        this.authService.saveUserSession(response);
        this.successMessage = `Welcome, ${response.username}! You are logged in.`;
        console.log('Login successful:', response);
        this.router.navigate(['/dashboard']); // <--- Navigate to dashboard after successful login
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = error.error || 'Login failed. Please check your credentials.';
      }
    });
  }

  get f() { return this.loginForm.controls; }
}