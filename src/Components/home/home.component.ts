import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { CartService } from 'c:/Angular/angularconcepts/src/Services/cart.service'; // Adjusted the path to match the project structure

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  description: string;
  imageUrl: string;
  quantity: number;
  categoryId: number;
  subCategoryId: number;
  soldCount: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: Product[] = [];
  loading: boolean = false;
  error: string | null = null;
  constructor(
    private http: HttpClient,
    private router: Router,
    private cartService: CartService // Assuming you have a CartService to handle cart operations
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('user_token');
    if (!token) {
      this.router.navigate(['/login']);
      return new HttpHeaders();
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.status === 401) {
      errorMessage = 'Session expired. Please login again';
      localStorage.removeItem('user_token');
      this.router.navigate(['/login']);
    }
    return throwError(() => errorMessage);
  }

  loadProducts() {
    this.loading = true;
    const headers = this.getHeaders();

    this.http.get<Product[]>('https://localhost:7194/api/Product', { headers })
      .pipe(
        catchError(this.handleError.bind(this))
      )
      .subscribe({
        next: (data) => {
          this.products = data;
          this.loading = false;
        },
        error: (errorMessage) => {
          console.error('Error loading products:', errorMessage);
          this.error = errorMessage;
          this.loading = false;
        }
      });
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/default-product-image.jpg'; // Correct path to the fallback image
    target.onerror = null; // Prevent infinite loop if the fallback image also fails
  }
  onAddToCart(productId: number): void {
    const product = this.products.find(p => p.id === productId);
    if (!product) {
      alert('Product not found!');
      return;
    }
  
    this.cartService.addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
      subtotal: product.price
    });
  
    alert(`${product.name} has been added to your cart!`);
  } 
  increaseQuantity(product: Product): void {
    product.quantity = (product.quantity || 1) + 1;
  }
  
  decreaseQuantity(product: Product): void {
    if (product.quantity && product.quantity > 1) {
      product.quantity -= 1;
    }
  } 
  
}