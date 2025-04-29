import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:5000/api/students'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  createStudent(student: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, student);
  }

  deleteStudent(ID: number | null): Observable<any> {
    if (!ID) {
      console.error('Error: Student ID is null.');
      return new Observable();
    }
    return this.http.delete<any>(`${this.apiUrl}/${ID}`);
  }
}
