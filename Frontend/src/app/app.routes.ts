import { Routes } from '@angular/router';
import { FormComponent } from './MyComponent/form/form.component';
import { NavbarComponent } from './MyComponent/navbar/navbar.component';
import { AboutComponent } from './MyComponent/about/about.component';
import { NewpageComponent } from './University/newpage/newpage.component';
import { StudentComponent } from './University/student/student.component';
import { ClassroomComponent } from './University/classroom/classroom.component';
import { CourseComponent } from './University/course/course.component';
import { TimeslotComponent } from './University/timeslot/timeslot.component';
import { DepartmentComponent } from './University/department/department.component';
import { InstructorComponent } from './University/instructor/instructor.component';
import { AdvisorComponent } from './University/advisor/advisor.component';
import { SectionComponent } from './University/section/section.component';
import { TakesComponent } from './University/takes/takes.component';
import { TeachesComponent } from './University/teaches/teaches.component';


export const routes: Routes = [
   {path: '' , component: NavbarComponent} ,
   {path: 'form' , component: FormComponent} ,
   {path: 'about' , component: AboutComponent} ,
   { path: 'form/student', component: StudentComponent },
   { path: 'form/department', component: DepartmentComponent },
   { path: 'form/classroom', component: ClassroomComponent },
   { path: 'form/time', component: TimeslotComponent },
   { path: 'form/course', component: CourseComponent },
   { path: 'form/instructor', component: InstructorComponent },
   { path: 'form/section', component: SectionComponent },
   { path: 'form/advisor', component: AdvisorComponent },
   { path: 'form/takes', component: TakesComponent },
   { path: 'form/teaches', component: TeachesComponent }
   
   
];
