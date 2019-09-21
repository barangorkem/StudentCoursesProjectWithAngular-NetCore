import { Component, OnInit,Directive,Input,Output,EventEmitter,QueryList, ViewChildren } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student.model';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})


export class StudentComponent implements OnInit {

  constructor(private _studentService:StudentService,private router:Router,private _userService:UserService,private _toastrService:ToastrService) { }
  students:Student[];
  ngOnInit() {
    this._studentService.getStudents().subscribe((data:Student[])=>{
        this.students=data;
    })
  }
    @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '') {
      this.students = this.students;
    } else {
      this.students = [...this.students].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  //Navigate New Students Create Page

  navigateStudentsAdd()
    {
      this.router.navigate(['/dashboard/student/create'])
    }  
  navigateStudentDetails(studentId)
    {
      console.log(studentId);
    }
  // onDelete(studentId)
  //   {
  //     this._studentService.deleteStudent(studentId).subscribe((response:HttpResponse<Response>)=>{
  //       console.log(response);
  //       if(response.status==200)
  //         {
  //           this.students=this.students.filter(x=>x.studentId!=studentId);
  //           this._toastrService.success('Success!', response.body.toString());
  //         }
  //       else
  //         {
  //           this._toastrService.error('Error',response.body.toString());
  //         }
  //     },(err:Error)=>{
  //       console.log(err);
  //       this._toastrService.error('Error',"Hata");
  //     })
  //   }

  activeChange(event,studentId)
  {
    this._studentService.activeChange(studentId,event.target.checked).subscribe((response:HttpResponse<Response>)=>{
      if(response.status==200)
      {
         this._toastrService.success('Success!', response.body.toString());
      }
      else
      {
        this._toastrService.error('Error',response.body.toString());
      }
    },(err:Error)=>{
      this._toastrService.error('Error','Hata');
    });
  }
  }

