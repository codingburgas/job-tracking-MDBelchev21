import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string | null = null;
  // New property to hold detailed validation errors
  validationErrors: { [key: string]: string[] } | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      role: ['User', Validators.required],
      address: ['']
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;
    this.validationErrors = null; // Clear previous validation errors

    if (this.registerForm.invalid) {
      this.errorMessage = 'Please correct the errors in the form.';
      // Optionally, mark all fields as touched to show Angular's built-in validation messages
      this.registerForm.markAllAsTouched();
      return;
    }

    const { confirmPassword, ...userData } = this.registerForm.value;

    this.authService.register(userData).subscribe({
      next: (response) => {
        this.successMessage = 'Registration successful! Redirecting to login...';
        console.log('Registration successful:', response);
        this.router.navigate(['/login'], { state: { registered: true } });
      },
      error: (errorResponse) => { // Renamed 'error' to 'errorResponse' for clarity
        console.error('Registration failed:', errorResponse);

        // Check if the error response has the 'errors' object from ModelState validation
        if (errorResponse.error && errorResponse.error.errors) {
          this.validationErrors = errorResponse.error.errors;
          // You can also concatenate all messages into a single string for a general error message
          this.errorMessage = 'Please correct the following issues:';
          for (const key in this.validationErrors) {
            if (this.validationErrors.hasOwnProperty(key)) {
              this.errorMessage += `\n- ${this.validationErrors[key].join(', ')}`;
            }
          }
        } else {
          // Fallback for other types of errors (e.g., 409 Conflict, 500 Internal Server Error)
          this.errorMessage = errorResponse.error || 'Registration failed. Please try again.';
        }
      }
    });
  }

  get f() { return this.registerForm.controls; }

  // Helper to get specific validation errors for a control
  getControlErrors(controlName: string): string[] | null {
    return this.validationErrors?.[controlName] || null;
  }
}