import { Component,inject } from '@angular/core';
import { NgForm ,FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-instructor',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.scss'
})
export class InstructorComponent {
 
  private router = inject(Router);
  private http = inject(HttpClient);

  instructors: any[] = [];
  model = { ID: '', name: '', dept_name: '',salary:null } ;

  ngOnInit() {
    this.fetchinstructor();
  }
      onSubmit(form:NgForm)
      {
    console.log(form.value);
    this.addInstructor()
      }
  
    Navigate ()
    {
      this.router.navigate(['./form']);
    }
    
    addInstructor(): void {
      this.http.post('http://localhost:3000/api/instructors', this.model).subscribe(
        () => {
          this.fetchinstructor();
          this.model = { ID: '', name: '', dept_name: '',salary:null };
        },
        (error) => {
          console.error('Error adding department:', error);
        }
      );
    }
    
    fetchinstructor(): void {
      this.http.get<any[]>('http://localhost:3000/api/instructors').subscribe(
        (data) => {
          this.instructors = data;
        },
        (error) => {
          console.error('Error fetching department:', error);
        }
      );
    }
    
    deleteinstructor(ID: string): void {
      this.http.delete(`http://localhost:3000/api/instructors/${ID}`).subscribe(
        () => {
          this.fetchinstructor();
        },
        (error) => {
          console.error('Error deleting department:', error);
        }
      );
    }

    updateinstructor(ID: string): void {
      this.http.put(`http://localhost:3000/api/instructors/${ID}`, this.model).subscribe(
        () => {
          this.fetchinstructor();
          this.model = {ID: '', name: '', dept_name: '',salary:null};
        },
        (error) => {
          console.error('Error adding student:', error);
        }
      );
    }
}
