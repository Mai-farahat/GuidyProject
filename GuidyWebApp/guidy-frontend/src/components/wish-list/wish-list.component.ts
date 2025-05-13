import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {
  wishlistItems = [
  { image: 'assets/webdev.jpg', title: 'Web Development course', price: 85 },
  { image: 'assets/java.jpg', title: 'Javascript web course', price: 80 },
  { image: 'assets/cyber.jpg', title: 'CyberSecurity course', price: 108 }
];
}
