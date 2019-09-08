import { Course } from './course.model';

export class Student {

    studentId:number;
    studentName:string;
    isActive:boolean;
    recordDate:string;
    course:Course[];


    constructor(studentName='',isActive=false,recordDate='',courses=[])
    {
        this.studentName=studentName;
        this.isActive=isActive;
        this.recordDate=recordDate;
        this.course=courses;
    }
}
