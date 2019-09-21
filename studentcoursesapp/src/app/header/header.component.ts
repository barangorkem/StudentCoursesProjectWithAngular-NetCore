import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  UserName:string;
  constructor(private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem("user")!=null)
      {
        let user:User=<User>JSON.parse(localStorage.getItem("user"));
        console.log("user",user['username']);
        this.UserName=user['username'];
      }
  }
  LogOut()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    this.router.navigate(['']);
  }
}
