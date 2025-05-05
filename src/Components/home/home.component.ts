import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

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
export class HomeComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router
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
    target.src = 'assets/images/default-product-image.jpg';
  }

  onAddToCart(productId: number) {
    const token = localStorage.getItem('user_token');
    if (!token) {
      alert('Please login to add items to cart');
      this.router.navigate(['/login']);
      return;
    }
    
    console.log('Product added to cart, ID:', productId);
  }
}