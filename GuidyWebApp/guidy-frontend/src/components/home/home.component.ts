import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CoursesService } from '../../app/core/courses.service';
import { ICourse } from '../../app/core/Interfaces/icourse';
import { response } from 'express';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private readonly _CoursesService = inject(CoursesService)
  productSub!:Subscription
  coursesData!:ICourse[]

  ngOnInit(): void{
    this.productSub=this._CoursesService.getAllCourses().subscribe({
      next:(res)=>{console.log(res)
      this.coursesData=res
      },
      error:(err)=>{console.log(err)}
    })
  }

  ngOnDestroy():void{
    this.productSub?.unsubscribe();
  }

  
  // TO BE DELETED....
  highRecommendCourses = [
  {
    image: 'assets/python.jpg',
    title: 'The Complete Python Bootcamp: Technology...',
    instructor: 'John Doe',
    instructorImage: 'assets/instructor1.jpg',
    duration: '12h 30m',
    students: 1200,
    level: 'Advanced',
    rating: 4.8
  },
  // ...more courses
];


  
}


