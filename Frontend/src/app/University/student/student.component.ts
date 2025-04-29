// import { Component, inject, OnInit } from '@angular/core';
// import { NgForm, FormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-student',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   template: `
//     <div class="container">
//       <div class="MYFORM">
//         <div class="nav justify-content-center" style="color: black;">
//           <h2>STUDENT FORM</h2>
//         </div>
        
//         <div class="container-fluid"> 
//           <form #studentForm="ngForm" (ngSubmit)="onSubmit(studentForm)">
//             <div class="mb-3">
//               <label for="Id" class="form-label">ID</label>
//               <input type="text" class="form-control" id="Id" name="Id" [(ngModel)]="model.Id" required>
//             </div>
    
//             <div class="mb-3">
//               <label for="Name" class="form-label">FULL NAME</label>
//               <input type="text" class="form-control" id="Name" name="Name" [(ngModel)]="model.Name" required>
//             </div>
    
//             <div class="mb-3">
//               <label for="DName" class="form-label">DEPARTMENT NAME</label>
//               <input type="text" class="form-control" id="DName" name="DName" [(ngModel)]="model.DName" required>
//             </div>
    
//             <div class="mb-3">
//               <label for="Credit" class="form-label">TOTAL CREDIT</label>
//               <input type="number" class="form-control" id="Credit" name="Credit" [(ngModel)]="model.Credit" required>
//             </div>
    
//             <button type="submit" class="btn btn-primary">Submit</button>
//             <br><br>
//             <button type="button" class="btn btn-danger w-45" (click)="navigate()">Go Back</button>
//           </form>
//         </div>
    
//         <div class="mt-5">
//           <h3>Student List</h3>
//           <table class="table table-bordered">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Full Name</th>
//                 <th>Department</th>
//                 <th>Credit</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr *ngFor="let student of students">
//                 <td>{{ student.Id }}</td>
//                 <td>{{ student.Name }}</td>
//                 <td>{{ student.DName }}</td>
//                 <td>{{ student.Credit }}</td>
//                 <td>
//                   <button class="btn btn-danger" (click)="deleteStudent(student.Id)">Delete</button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   `
// })
// export class StudentComponent implements OnInit {
//   private router = inject(Router);
//   private http = inject(HttpClient);
  
//   students: any[] = [];
//   model = { Id: '', Name: '', DName: '', Credit: null };
  
//   ngOnInit() {
//     this.fetchStudents();
//   }

//   onSubmit(form: NgForm) {
//     if (form.valid) {
//       this.createStudent();
//     }
//   }

//   navigate() {
//     this.router.navigate(['./form']);
//   }

//   fetchStudents(): void {
//     this.http.get<any[]>('http://localhost:3000/api/students').subscribe(
//       (data) => {
//         this.students = data;
//       },
//       (error) => {
//         console.error('Error fetching students:', error);
//       }
//     );
//   }

//   createStudent(): void {
//     this.http.post('http://localhost:3000/api/students', this.model).subscribe(
//       () => {
//         this.fetchStudents();
//         this.model = { Id: '', Name: '', DName: '', Credit: null };
//       },
//       (error) => {
//         console.error('Error adding student:', error);
//       }
//     );
//   }

//   deleteStudent(studentId: string): void {
//     this.http.delete(`http://localhost:3000/api/students/${studentId}`).subscribe(
//       () => {
//         this.fetchStudents();
//       },
//       (error) => {
//         console.error('Error deleting student:', error);
//       }
//     );
//   }
// }


import { Component, inject } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // Added HttpClientModule
  template: `
    <div class="container">
      <div class="MYFORM">
        <div class="nav justify-content-center" style="color: black;">
          <h2>STUDENT FORM</h2>
        </div>
        
        <div class="container-fluid"> 
          <form #studentForm="ngForm" (ngSubmit)="onSubmit(studentForm)">
            <!-- <div class="mb-3">
              <label for="ID" class="form-label">Id</label>
              <input type="text" class="form-control" id="ID" name="ID" #ID="ngModel" [(ngModel)]="model.ID" required>
            </div> -->
    
            <div class="mb-3">
              <label for="name" class="form-label">FULL NAME</label>
              <input type="text" class="form-control" id="name" name="name" [(ngModel)]="model.name" required>
            </div>
    
            <div class="mb-3">
              <label for="dept_name" class="form-label">DEPARTMENT NAME</label>
              <input type="text" class="form-control" id="dept_name" name="dept_name" [(ngModel)]="model.dept_name" required>
            </div>
    
            <div class="mb-3">
              <label for="tot_cred" class="form-label">TOTAL CREDIT</label>
              <input type="number" class="form-control" id="tot_cred" name="tot_cred" [(ngModel)]="model.tot_cred" required>
            </div>
    
            <button type="submit" class="btn btn-primary">Submit</button>
            <br><br>
            <button type="button" class="btn btn-danger w-45" (click)="navigate()">Go Back</button>
          </form>
        </div>
    
        <div class="mt-5">
          <h3>Student List</h3>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Full Name</th>
                <th>Department</th>
                <th>Credit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let student of students">
                <td>{{ student.ID}}</td>
                <td>{{ student.name }}</td>
                <td>{{ student.dept_name }}</td>
                <td>{{ student.tot_cred }}</td>
                <td>
                  <button class="btn btn-danger" (click)="deleteStudent(student.ID)">Delete</button>
                  <button  class="btn btn-success" (click)="updateStudent(student.ID)">Update</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class StudentComponent {
  private router = inject(Router);
  private http = inject(HttpClient);
  
  students: any[] = [];
  model = {name: '', dept_name: '', tot_cred: null };
  
  ngOnInit() {
    this.fetchStudents();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.createStudent();
    }
  }

  navigate() {
    this.router.navigate(['./form']);
  }

  fetchStudents(): void {
    this.http.get<any[]>('http://localhost:3000/api/students').subscribe(
      (data) => {
        this.students = data;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  createStudent(): void {
    this.http.post('http://localhost:3000/api/students', this.model).subscribe(
      () => {
        this.fetchStudents();
        this.model = {name: '', dept_name: '', tot_cred: null };
      },
      (error) => {
        console.error('Error adding student:', error);
      }
    );
  }



  deleteStudent(studentId: string): void {
    this.http.delete(`http://localhost:3000/api/students/${studentId}`).subscribe(
      () => {
        this.fetchStudents();
      },
      (error) => {
        console.error('Error deleting student:', error);
      }
    );
  }

  updateStudent(studentId: string): void {
    this.http.put(`http://localhost:3000/api/students/${studentId}`, this.model).subscribe(
      () => {
        this.fetchStudents();
        this.model = {name: '', dept_name: '', tot_cred: null };
      },
      (error) => {
        console.error('Error adding student:', error);
      }
    );
  }


}
