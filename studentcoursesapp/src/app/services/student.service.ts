import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BASE_URL} from '../../path/path';
import { Student } from '../models/student.model';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }


  getStudents()
  {
   return this.http.get(BASE_URL+"students",{headers:new HttpHeaders({
    "Authorization":"Bearer "+localStorage.getItem("token")
   })});
  }
  getStudent(userId)
  {
   return this.http.get(BASE_URL+"students/"+userId);
  }
  postStudent(studentData:Student)
    {  
      return this.http.post(BASE_URL+"students",studentData);
    }
  deleteStudent(studentId)
    {
      return this.http.delete(BASE_URL+"students/"+studentId,{observe: 'response'});
    }
  updateStudent(studentId,studentData)
  {
    return this.http.put(BASE_URL+"students/"+studentId,studentData);

  }
  activeChange(studentId,activeStatus)
  {
    console.log(activeStatus);
     return this.http.put(BASE_URL+"students/activeChange/"+studentId+"/"+activeStatus,'',{observe: 'response'});
  }
}

