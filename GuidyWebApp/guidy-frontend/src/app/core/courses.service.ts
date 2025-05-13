import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private _HttpClient:HttpClient) { }

  getAllCourses():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/courses`)
  }

  getCourseDetails(c_id:string | null):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/courses/${c_id}`)
  }
}
