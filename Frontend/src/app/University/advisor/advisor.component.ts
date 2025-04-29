import { Component,inject } from '@angular/core';
import { NgForm ,FormsModule} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advisor',
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './advisor.component.html',
  styleUrl: './advisor.component.scss'
})


export class AdvisorComponent {
  private router = inject(Router);
     private http = inject(HttpClient);
     advisor: any[] = [];
     model = { s_ID: null, i_ID: null};
     
     ngOnInit() {
       this.fetchadvisor();
     }
    Navigate ()
    {
      this.router.navigate(['./form']);
    }
    fetchadvisor(): void {
      this.http.get<any[]>('http://localhost:3000/api/advisor').subscribe(
        (data) => {
          this.advisor = data;
        },
        (error) => {
          console.error('Error fetching classroom:', error);
        }
      );
    }

}
