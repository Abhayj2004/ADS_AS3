import { Component, inject } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-section',
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
  <div class="container">
   <div class="MYFORM">
      <div class="nav justify-content-center" style="color: rgb(0, 0, 0);">
        <h2>SECTION FORM </h2>
      </div>
    <div class="container-fluid  "> 
      <form #section="ngForm" (ngSubmit)="onSubmit(section)">
        <div class="mb-3">
          <label for="course_id" class="form-label">COURSE ID</label>
          <input type="text" class="form-control" id="course_id" name="course_id" #course_id="ngModel" [(ngModel)]="model.course_id">
        </div>

        <div class="mb-3">
            <label for="sec_id" class="form-label">SECTION ID</label>
            <input type="text" class="form-control" id="sec_id" name="sec_id" #sec_id="ngModel" [(ngModel)]="model.sec_id">
          </div>
          <div class="mb-3">
            <label for="semester" class="form-label">SEMESTER</label>
            <input type="text" class="form-control" id="semester" name="semester"  #semester="ngModel" [(ngModel)]="model.semester">
          </div>
          <div class="mb-3">
            <label for="year" class="form-label">YEAR</label>
            <input type="number" class="form-control" id="year" name="year" #year="ngModel" [(ngModel)]="model.year">
          </div>

        <div class="mb-3">
          <label for="building" class="form-label">BUILDING</label>
          <input type="text" class="form-control" id="building" name="building" #building="ngModel" [(ngModel)]="model.building">
        </div>
        <div class="mb-3">
            <label for="room_number" class="form-label">ROOM NUMBER</label>
            <input type="text" class="form-control" id="room_number" name="room_number" #room_number="ngModel" [(ngModel)]="model.room_number">
          </div>

        <div class="mb-3">
          <label for="time_slot_id" class="form-label">TIME SLOT ID</label>
          <input type="text" class="form-control" id="time_slot_id" name="time_slot_id" #time_slot_id="ngModel" [(ngModel)]="model.time_slot_id">
        </div>

       

        

        <button type="submit" class="btn btn-primary">Submit</button>
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
              <th>COURSE ID</th>
              <th>SECTION ID</th>
              <th>SEMESTER</th> 
              <th>YEAR</th>
              <th>building</th>
              <th>ROOM-NUMBER</th>
              <th>TIME SLOT ID</th>
              <th>ACTION</th>
              
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let student of Sections">
              <td>{{ student.course_id }}</td>
              <td>{{ student.sec_id }}</td>
              <td>{{ student.semester }}</td>
              <td>{{ student.year }}</td>
              <td>{{ student.building }}</td>
              <td>{{ student.room_number }}</td>
              <td>{{ student.time_slot_id }}</td>
              <td>
                <button class="btn btn-danger" (click)="deletSection(student.course_id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

  </div>
  


  `,

})
export class SectionComponent {
  private router = inject(Router);
  private http = inject(HttpClient);

  Sections: any[] = [];
  model = { course_id: '', sec_id: '', semester: '', year: null, building: '', room_number: '', time_slot_id: '' };

  ngOnInit() {
    this.fetchsections();
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.createSection()

  }




  Navigate() {
    this.router.navigate(['./form']);
  }
  fetchsections(): void {
    this.http.get<any[]>('http://localhost:3000/api/sections').subscribe(
      (data) => {
        this.Sections = data;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }


  createSection(): void {
    this.http.post('http://localhost:3000/api/sections', this.model).subscribe(
      () => {
        this.fetchsections();
        this.model = { course_id: '', sec_id: '', semester: '', year: null, building: '', room_number: '', time_slot_id: '' };
      },
      (error) => {
        console.error('Error adding student:', error);
      }
    );
  }

  deletSection(course_id: string): void {
    this.http.delete(`http://localhost:3000/api/sections/${course_id}`).subscribe(
      () => {
        this.fetchsections();
      },
      (error) => {
        console.error('Error deleting student:', error);
      }
    );
  }

}
