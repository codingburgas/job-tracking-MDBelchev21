import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Job {
  id: number;
  title: string;
  companyName: string;
  description: string;
  datePosted: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = '/api/job'; // proxy or full URL

  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}?page=1&pageSize=10`);
  }
}