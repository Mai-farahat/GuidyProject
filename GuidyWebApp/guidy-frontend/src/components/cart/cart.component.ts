import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
interface CartItem {
  image: string;
  title: string;
  price: number;
}
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent {
  cartItems = [
    { image: 'assets/webdev.jpg', title: 'Web Development course', price: 85 },
    { image: 'assets/java.jpg', title: 'Javascript web course', price: 80 },
    { image: 'assets/python.jpg', title: 'Python course', price: 50 }
  ];

  getTotalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  removeItem(itemToRemove: { image: string; title: string; price: number }): void {
    this.cartItems = this.cartItems.filter(item => item !== itemToRemove);
  }
}
