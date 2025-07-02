import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { LoginResponseDto } from '../../models/auth.models';
import { JobResponseDto } from '../../models/job.models';
import { ApplicationResponseDto } from '../../models/application.models';
import { FormsModule } from '@angular/forms'; // <--- Import FormsModule for ngModel

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule], // <--- Add FormsModule here
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {
  currentUser: LoginResponseDto | null = null;
  allJobPostings: JobResponseDto[] = []; // Store all fetched jobs
  jobPostings: JobResponseDto[] = []; // Displayed (filtered) jobs
  applications: ApplicationResponseDto[] = [];
  errorMessage: string | null = null;
  searchTerm: string = ''; // <--- New property for search bar input

  private apiUrl = 'http://localhost:5230/api';

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.loadDashboardData();
    } else {
      this.errorMessage = 'User not logged in. Please log in to view the dashboard.';
    }
  }

  loadDashboardData(): void {
    this.errorMessage = null;
    if (this.currentUser?.role === 'Admin' || this.currentUser?.role === 'Employer') {
      this.fetchJobPostings();
    } else if (this.currentUser?.role === 'User') {
      this.fetchApplications();
    } else {
      this.errorMessage = 'Unknown user role. Cannot display dashboard content.';
    }
  }

  fetchJobPostings(): void {
    this.http.get<JobResponseDto[]>(`${this.apiUrl}/Job`).subscribe({
      next: (data) => {
        this.allJobPostings = data; // Store all fetched jobs
        this.applyFilter(); // Apply initial filter (empty search term)
      },
      error: (err) => {
        console.error('Error fetching job postings:', err);
        this.errorMessage = 'Failed to load job postings. Please try again.';
      }
    });
  }

  fetchApplications(): void {
    this.http.get<ApplicationResponseDto[]>(`${this.apiUrl}/Application`).subscribe({
      next: (data) => {
        this.applications = data;
      },
      error: (err) => {
        console.error('Error fetching applications:', err);
        this.errorMessage = 'Failed to load applications. Please try again.';
      }
    });
  }

  // <--- New method to apply filter based on search term
  applyFilter(): void {
    if (!this.searchTerm) {
      this.jobPostings = [...this.allJobPostings]; // If search term is empty, show all
      return;
    }

    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    this.jobPostings = this.allJobPostings.filter(job =>
      job.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      job.companyName.toLowerCase().includes(lowerCaseSearchTerm) ||
      job.description.toLowerCase().includes(lowerCaseSearchTerm) ||
      job.status.toLowerCase().includes(lowerCaseSearchTerm)
      // Add more fields to search as needed, e.g., job.location.toLowerCase().includes(...)
    );
  }
}