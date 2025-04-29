import { Component, inject } from '@angular/core';
import { FormComponent } from "../../MyComponent/form/form.component";
import { NavbarComponent } from "../../MyComponent/navbar/navbar.component";
import { RouterLink, Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-department',
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
<div class="container">
  <div class="MYFORM">
    <div class="nav justify-content-center">
      <h2>DEPARTMENT FORM </h2>
    </div>
    <div class="container-fluid"> 
      <form #department="ngForm" (ngSubmit)="onSubmit(department)">

        <div class="mb-3">
          <label for="dept_name" class="form-label">DEPARTMENT NAME</label>
          <input type="text" class="form-control" id="dept_name" name="dept_name" #dept_name="ngModel" [(ngModel)]="model.dept_name">
        </div>

        <div class="mb-3">
          <label for="building" class="form-label">BUILDING</label>
          <input type="text" class="form-control" id="building" name="building" #building="ngModel" [(ngModel)]="model.building">
        </div>

        <div class="mb-3">
          <label for="budget" class="form-label">budget</label>
          <input type="number" class="form-control" id="budget" name="budget" #budget="ngModel" [(ngModel)]="model.budget">
        </div>

        

        <button type="submit" class="btn btn-primary"
        >Add</button>
        <br><br>

        <button type="button" class="btn btn-danger w-45" (click)="Navigate()">
          Go Back
        </button>
      </form>
    </div>

    <div class="mt-5">
          <h3>Student List</h3>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Department Name</th>
                <th>Building</th>
                <th>budget</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let student of Departments">
                <td>{{ student.dept_name }}</td>
                <td>{{ student.building }}</td>
                <td>{{ student.budget }}</td>
                <td>
                  <button class="btn btn-danger" (click)="deleteDepartment(student.dept_name)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

  </div>


</div>
`

})
export class DepartmentComponent {

  private router = inject(Router);
  private http = inject(HttpClient);

  Departments: any[] = [];
  model = { dept_name: '', building: '', budget: '' };

  ngOnInit() {
    this.fetchDepartment();
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    this.addDepartment();

  }
  Navigate() {
    this.router.navigate(['./form']);
  }

  addDepartment(): void {
    this.http.post('http://localhost:3000/api/departments', this.model).subscribe(
      () => {
        this.fetchDepartment();
        this.model = { dept_name: '', building: '', budget: '' };
      },
      (error) => {
        console.error('Error adding department:', error);
      }
    );
  }

  fetchDepartment(): void {
    this.http.get<any[]>('http://localhost:3000/api/departments').subscribe(
      (data) => {
        this.Departments = data;
      },
      (error) => {
        console.error('Error fetching department:', error);
      }
    );
  }

  deleteDepartment(dept_name: string): void {
    this.http.delete(`http://localhost:3000/api/departments/${dept_name}`).subscribe(
      () => {
        this.fetchDepartment();
      },
      (error) => {
        console.error('Error deleting department:', error);
      }
    );
  }
}
