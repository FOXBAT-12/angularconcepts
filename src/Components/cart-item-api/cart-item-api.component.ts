import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

// Define interfaces for API responses and data structures
export interface CartItem {
  cartItemID: number;  
  productId: number;   
  userId: number;      
  quantity: number;    
  isActive: boolean;   
  createdAt: string;  
  updatedAt: string;   
}

export interface ApiResponse {
  status: number;
  message: string;
  data?: CartItem[];
}

@Component({
  selector: 'app-cart-item-api',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item-api.component.html',
  styleUrl: './cart-item-api.component.css'
})
export class CartItemAPIComponent implements OnInit {
  cartlist: CartItem[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    
    if (error.status === 401) {
      errorMessage = 'Session expired. Please login again';
      localStorage.removeItem('admin_token');
      this.router.navigate(['/loginadmin']);
    } else if (error.status === 403) {
      errorMessage = 'You do not have permission to access this resource';
      this.router.navigate(['/loginadmin']);
    } else if (error.status === 404) {
      errorMessage = 'Cart items not found';
    } else if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => errorMessage);
  }

  getCartItems(): void {
    this.loading = true;
    this.error = null;
    
    const token = localStorage.getItem('admin_token');
    
    if (!token) {
      alert('Please login as admin to view cart items');
      this.router.navigate(['/loginadmin']);
      return;
    }

    // Check if token is expired
    if (this.isTokenExpired(token)) {
      alert('Session expired. Please login again');
      localStorage.removeItem('admin_token');
      this.router.navigate(['/loginadmin']);
      return;
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    const apiUrl = 'https://localhost:7194/api/Cart';

    this.http.get<CartItem[]>(apiUrl, { headers })
      .pipe(
        catchError(this.handleError.bind(this))
      )
      .subscribe({
        next: (response) => {
          this.cartlist = response;
          this.loading = false;
          console.log('Cart items retrieved successfully:', this.cartlist);
        },
        error: (errorMessage) => {
          this.error = errorMessage;
          this.loading = false;
          console.error('Error retrieving cart items:', errorMessage);
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
      return Date.now() >= expirationTime;
    } catch (error) {
      console.error('Error parsing token:', error);
      return true;
    }
  }

  // Method to refresh cart items
  refreshCart(): void {
    this.getCartItems();
  }

  // Method to handle logout
  logout(): void {
    localStorage.removeItem('admin_token');
    this.router.navigate(['/loginadmin']);
  }
}