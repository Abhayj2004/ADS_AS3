import { Component ,inject } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeslot',
   imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './timeslot.component.html',
  styleUrl: './timeslot.component.scss'
})
export class TimeslotComponent {
  private router = inject(Router);
  private http = inject(HttpClient);

  instructors: any[] = [];
  model = { time_slot_id: '', day: '', start_time: null, end_time:null};



  ngOnInit() {
    this.fetchtimeslot();
  }
 
  onSubmit(form:NgForm)
  {
console.log(form.value);
this.addtimeslot()
  }
      Navigate ()
      {
        this.router.navigate(['./form']);
      }

      addtimeslot(): void {
        this.http.post('http://localhost:3000/api/timeslot', this.model).subscribe(
          () => {
            this.fetchtimeslot();
            this.model = { time_slot_id: '', day: '', start_time: null, end_time:null};
          },
          (error) => {
            console.error('Error adding department:', error);
          }
        );
      }
      
      fetchtimeslot(): void {
        this.http.get<any[]>('http://localhost:3000/api/timeslot').subscribe(
          (data) => {
            this.instructors = data;
          },
          (error) => {
            console.error('Error fetching department:', error);
          }
        );
      }
      
      deletetimeslot(Id: string): void {
        this.http.delete(`http://localhost:3000/api/timeslot/${Id}`).subscribe(
          () => {
            this.fetchtimeslot();
          },
          (error) => {
            console.error('Error deleting department:', error);
          }
        );
      }

}
