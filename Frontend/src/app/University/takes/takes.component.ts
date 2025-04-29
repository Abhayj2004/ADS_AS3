import { Component ,inject} from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-takes',
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
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
                <th>GRADE</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let student of Takes">
                <td>{{ student.ID }}</td>
                <td>{{ student.course_id }}</td>
                <td>{{ student.sec_id }}</td>
                <td>{{ student.semester }}</td>
                <td>{{ student.year }}</td>
                <td>{{ student.grade }}</td>
              </tr>
            </tbody>
          </table>
        </div>

  </div>

  <button type="button" class="btn btn-danger w-45" (click)="Navigate()">
          Go Back
        </button>
</div>
  
  `,
})
export class TakesComponent {
 
  private http = inject(HttpClient);
  private router = inject(Router);
  Navigate() {
    this.router.navigate(['./form']);
  }

  Takes: any[] = [];
  model = { ID: '', building: '', budget: '' };

  ngOnInit() {
    this.fetchTakes();
  }
  fetchTakes(): void {
    this.http.get<any[]>('http://localhost:3000/api/takes').subscribe(
      (data) => {
        this.Takes = data;
      },
      (error) => {
        console.error('Error fetching department:', error);
      }
    );
  }
}


