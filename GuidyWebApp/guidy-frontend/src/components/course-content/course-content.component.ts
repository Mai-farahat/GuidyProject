import { Component } from '@angular/core';
import { ChangeColorDirective } from '../../app/core/Directives/change-color.directive';

@Component({
  selector: 'app-course-content',
  standalone: true,
  imports: [ChangeColorDirective],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.css'
})
export class CourseContentComponent {

}
