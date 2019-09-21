import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import {BASE_URL} from '../../path/path';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { 

  }
  onLogin(student:Student)
  {
   return this.http.post(BASE_URL+"user/authenticate",student);
  }

  roleMatch(requiredRoles:Array<string>)
  {
    debugger
    let isMatch:boolean=false;
    var userRoles:string[]=JSON.parse(localStorage.getItem("role"));
    userRoles.forEach(role => {
     if(requiredRoles.indexOf(role)>-1)
     {
      isMatch=true;
      return false;
     }
    });
return isMatch;
  }
}
