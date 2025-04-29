import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { Component ,inject} from '@angular/core';
import { NgForm ,FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `<div class="container"></div>
  <div class="MYFORM">

    
    
      <div class="nav justify-content-center" style="color: rgb(0, 0, 0);">
        <h2>COURSE FORM </h2>
      </div>
    <div class="container-fluid  "> 
      <form #course="ngForm" (ngSubmit)="onSubmit(course)">
        <div class="mb-3">
          <label for="course_id" class="form-label">COURSE_ID</label>
          <input type="text" class="form-control" id="course_id" name="course_id" #course_id="ngModel" [(ngModel)]="model.course_id">
        </div>

        <div class="mb-3">
          <label for="title" class="form-label">COURSE_TITLE</label>
          <input type="text" class="form-control" id="title" name="title" #title="ngModel" [(ngModel)]="model.title">
        </div>

        <div class="mb-3">
          <label for="dept_name" class="form-label">DEPARTMENT NAME</label>
          <input type="text" class="form-control" id="dept_name" name="dept_name" #dept_name="ngModel" [(ngModel)]="model.dept_name">
        </div>

        <div class="mb-3">
          <label for="credits" class="form-label">TOTAL CREDIT</label>
          <input type="number" class="form-control" id="credits" name="Credits" #credits="ngModel" [(ngModel)]="model.credits">
        </div>

        

        <button type="submit" class="btn btn-primary"
        >Submit</button>
        <br><br>
        <button type="button" class="btn btn-danger w-45" (click)="Navigate()">
          Go Back
        </button>
      </form>

      <div class="mt-5">
          <h3>Student List</h3>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>COURSE_ID</th>
                <th>COURSE_TITLE</th>
                <th>Department Name</th>
                <th>Total Credit</th>
                <th>Actions</th>
              </tr> 
            </thead>
            <tbody>
              <tr *ngFor="let student of Courses">
                <td>{{ student.course_id }}</td>
                <td>{{ student.title }}</td>
                <td>{{ student.dept_name }}</td>
                <td>{{ student.credits }}</td>
                <td>
                  <button class="btn btn-danger" (click)="deleteCourse(student.course_id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>

  </div>

`
  ,

})
export class CourseComponent {
   private router = inject(Router);
    private http = inject(HttpClient);
    
    Courses: any[] = [];
    model = { course_id: '', title: '', dept_name: '', credits: null };
    
    ngOnInit() {
      this.fetchcourse();
    }
  
   
    onSubmit(form:NgForm)
    {
  console.log(form.value);
  this.createcourse();
  
    }
  
  
  
    Navigate ()
    {
      this.router.navigate(['./form']);
    }

    fetchcourse(): void {
      this.http.get<any[]>('http://localhost:3000/api/courses').subscribe(
        (data) => {
          this.Courses = data;
        },
        (error) => {
          console.error('Error fetching students:', error);
        }
      );
    }
  
    createcourse(): void {
      this.http.post('http://localhost:3000/api/courses', this.model).subscribe(
        () => {
          this.fetchcourse();
          this.model = {course_id: '', title: '', dept_name: '', credits: null };
        },
        (error) => {
          console.error('Error adding student:', error);
        }
      );
    }
  
    deleteCourse(course_id: string): void {
      this.http.delete(`http://localhost:3000/api/courses/${course_id}`).subscribe(
        () => {
          this.fetchcourse();
        },
        (error) => {
          console.error('Error deleting student:', error);
        }
      );
    }
    
}
