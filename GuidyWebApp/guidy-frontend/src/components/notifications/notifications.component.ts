import { Component } from '@angular/core';
import { AboutComponent } from "../about/about.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [AboutComponent , CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  notifications = [
  { title: 'Note 1', details: 'note details' },
  { title: 'Note 2', details: 'note details' },
  { title: 'Note 3', details: 'note details' }
];
}
