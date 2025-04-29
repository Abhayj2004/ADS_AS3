import { Component ,inject} from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teaches',
  imports: [CommonModule, FormsModule, HttpClientModule],
  template : `
  <div class="container">
  <div class="MYFORM">
    <div class="nav justify-content-center">
      <h2>TAKES </h2>
    </div>
    <div class="mt-5">
          <h3>Takes List</h3>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>COURSE ID</th>
                <th>SECTION ID</th>
                <th>SEMESTER</th>
                <th>YEAR</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let student of Teaches">
                <td>{{ student.ID }}</td>
                <td>{{ student.course_id }}</td>
                <td>{{ student.sec_id }}</td>
                <td>{{ student.semester }}</td>
                <td>{{ student.year }}</td>
              </tr>
            </tbody>
          </table>
        </div>

  </div>

  <button type="button" class="btn btn-danger w-45" (click)="Navigate()">
          Go Back
        </button>
</div>
  `
})
export class TeachesComponent {

  private http = inject(HttpClient);
  private router = inject(Router);
  Navigate() {
    this.router.navigate(['./form']);
  }

  Teaches: any[] = [];

  ngOnInit() {
    this.fetchTakes();
  }
  fetchTakes(): void {
    this.http.get<any[]>('http://localhost:3000/api/teachess').subscribe(
      (data) => {
        this.Teaches = data;
      },
      (error) => {
        console.error('Error fetching department:', error);
      }
    );
  }
}
