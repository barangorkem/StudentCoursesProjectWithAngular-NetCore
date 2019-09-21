import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentComponent } from './student/student.component';
import { CourseComponent } from './course/course.component';
import { StudentCreateComponent } from './student/student-create/student-create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'dashboard', component:DashboardComponent,
  children:[
    { path: '', component:StudentComponent,canActivate:[AuthGuard],data:{roles:['User','Admin']} },
    { path: 'student', component:StudentComponent,canActivate:[AuthGuard],data:{roles:['User','Admin']}  },
    { path: 'student/create', component:StudentCreateComponent,canActivate:[AuthGuard],data:{roles:['Admin']} },
    { path: 'student/edit/:id', component:StudentCreateComponent,canActivate:[AuthGuard],data:{roles:['Admin']} },
    { path: 'course', component:CourseComponent }
  ]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
