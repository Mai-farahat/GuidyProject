import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../app/core/courses.service';
import { Subscription } from 'rxjs';
import { ICourseDetails } from '../../app/core/Interfaces/icourse-details';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _CoursesService = inject(CoursesService)
  courseSub!:Subscription
  coursesData!:ICourseDetails
  courseId!:string |null
  ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next: (CInfo) => {
      this.courseId = CInfo.get('c_id');
      if (this.courseId) {
        this.courseSub = this._CoursesService.getCourseDetails(this.courseId).subscribe({
          next: (res) => {
            this.coursesData = res;
          },
          error: (err) => { console.log(err); }
        });
      }
    }
  });
}

  ngOnDestroy():void{
    this.courseSub?.unsubscribe();
  }
}
