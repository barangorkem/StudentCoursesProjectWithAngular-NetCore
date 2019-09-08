import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course.model';
import { Student } from 'src/app/models/student.model';
import { NgForm } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  courses:Course[];  
  studentId:string;
  studentEditModel=new Student('',false,'',[]);
  constructor(private _courseService:CourseService,private _userService:StudentService,private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.params.subscribe(data=>{
      this.studentId=data.id;
    });

    if(this.studentId!=null)
    {
      this._userService.getStudent(this.studentId).subscribe((data:Student)=>{
        this.studentEditModel=data;
        console.log(data);
      })
    }
    else
    {
      this.studentEditModel=new Student('',false,'',[]);
    }
    this._courseService.getAllCourses().subscribe((data:Course[])=>{
      this.courses=data;
    })
  }
  isCheckCourse(courseId)
    {
      let student=this.studentEditModel.course.find(x=>x.courseId==courseId);
     if(student!=null){
      return true;
     }
     else
     {
       return false;
     }
    }
  checkboxChange(course:Course,e:any)
    {
     let isChecked:Boolean=e.target.checked;
     console.log(isChecked);
      if(isChecked)
        {
          console.log(course);
          this.studentEditModel.course.push(course);
        }
        else
        {
           let index = this.studentEditModel.course.indexOf(course);
           this.studentEditModel.course.splice(index,1);
        }
      console.log(this.studentEditModel);
    }
    onSubmit(f:NgForm)
      {
        console.log(f.value);
        if(this.studentId!=null)
        {
          this._userService.updateStudent(this.studentId,f.value).subscribe(data=>{
            console.log(data);
          })
        }
        else
        {
          this._userService.postStudent(f.value).subscribe(data=>{
            console.log(data);
          })
        }     
      }

}
