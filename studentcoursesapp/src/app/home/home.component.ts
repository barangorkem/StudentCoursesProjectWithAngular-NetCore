import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userForm=new User();
  constructor(private _userService:UserService,private _toastrService:ToastrService,private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem("token")!=null)
    {
      this.router.navigate(['/dashboard'])
    }
  }

  onLogin(form:NgForm)
  {
    console.log(form.value);
    this._userService.onLogin(form.value).subscribe((data:HttpResponse<Response>)=>{
      localStorage.setItem("user",JSON.stringify(data['user']));
      localStorage.setItem("token",data['token']);
      this.router.navigate(['dashboard/student'])
    },(err:HttpErrorResponse)=>{
      this._toastrService.error('Error',err.error.message);
    })
  }

}
