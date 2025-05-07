import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  customerName: string = '';
  phoneNumber: string = '';

  constructor(private router: Router, private http: HttpClient) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { cartItems: any[]; totalPrice: number };
    this.cartItems = state?.cartItems || [];
    this.totalPrice = state?.totalPrice || 0;
  }

  ngOnInit(): void {}

  confirmOrder(): void {
    const orderDetails = {
      customerName: this.customerName,
      phoneNumber: this.phoneNumber,
      cartItems: this.cartItems,
      totalPrice: this.totalPrice
    };

    this.http.post('https://localhost:7194/api/Product', orderDetails).subscribe({
      next: () => {
        alert('Order placed successfully!');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Error placing order:', err);
        alert('Failed to place the order. Please try again.');
      }
    });
  }
}
