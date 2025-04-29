import { Component,inject } from '@angular/core';
import { RouterLink ,Router } from '@angular/router';
import { FormComponent } from "../../MyComponent/form/form.component";
import { NgForm ,FormsModule} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-classroom',
  imports: [ FormComponent,CommonModule,FormsModule,HttpClientModule],
  template: `
  <app-form></app-form>
<div class="container">
    
    <div class="MYFORM">
      <div class="nav justify-content-center">
        <h2>CLASS-ROOM FORM </h2>
      </div>
      <div class="container-fluid"> 
        <form #classroom="ngForm" (ngSubmit)="onSubmit(classroom)">
  
          <div class="mb-3">
            <label for="building" class="form-label">BUILDING</label>
            <input type="text" class="form-control" id="building" name="building" #building="ngModel" [(ngModel)]="model.building">
          </div>
  
          <div class="mb-3">
            <label for="room_number" class="form-label">ROOM-NUMBER</label>
            <input type="text" class="form-control" id="room_number" name="room_number" #room_number="ngModel" [(ngModel)]="model.room_number">
          </div>

          <div class="mb-3">
            <label for="capacity" class="form-label">CAPACITY</label>
            <input type="number" class="form-control" id="capacity" name="capacity" #capacity="ngModel" [(ngModel)]="model.capacity">
          </div>
  
          <!-- CREATE TABLE Classroom (
    building VARCHAR(50),
    room_number VARCHAR(10),
    capacity INT,
    PRIMARY KEY (building, room_number)
); -->
  
          <button type="submit" class="btn btn-primary"
           >Submit</button>
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
                <th>BUILDING</th>
                <th>ROOM-NUMBER</th>
                <th>CAPACITY</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let student of ClassRoom">
                <td>{{ student.building }}</td>
                <td>{{ student.room_number }}</td>
                <td>{{ student.capacity }}</td>
                <td>
                  <button class="btn btn-danger" (click)="deleteclassroom(student.building)">Delete</button>
                  
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  
  
  </div>`,
})
export class ClassroomComponent {

  
  private router = inject(Router);
  private http = inject(HttpClient);

  ClassRoom: any[] = [];
  model = { building: '', room_number: '', capacity: null};

  ngOnInit() {
    this.fetchclassrooms();
  }

 
  onSubmit(form:NgForm)
  {
console.log(form.value);
this.addclassroom();

  }
    Navigate ()
    {
      this.router.navigate(['./form']);
    }
    addclassroom(): void {
      this.http.post('http://localhost:3000/api/classroom', this.model).subscribe(
        () => {
          this.fetchclassrooms();
          this.model = {  building: '', room_number: '', capacity: null};
        },
        (error) => {
          console.error('Error adding classroom:', error);
        }
      );
    }
    
    fetchclassrooms(): void {
      this.http.get<any[]>('http://localhost:3000/api/classroom').subscribe(
        (data) => {
          this.ClassRoom = data;
        },
        (error) => {
          console.error('Error fetching classroom:', error);
        }
      );
    }
    
    deleteclassroom(building: string): void {
      this.http.delete(`http://localhost:3000/api/classroom/${building}`).subscribe(
        () => {
          this.fetchclassrooms();
        },
        (error) => {
          console.error('Error deleting classroom:', error);
        }
      );
    }

  

}
