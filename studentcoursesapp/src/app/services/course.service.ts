import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BASE_URL} from '../../path/path';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getAllCourses()
    {
    return  this.http.get(BASE_URL+"course");
    }
}
