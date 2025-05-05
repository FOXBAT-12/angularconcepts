import { Component, Input } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// Define the CartItems class
// class CartItems {
//   cartItemID: number;
//   productID: number;
//   userID: number;
//   quantity: number;
//   isActive: boolean;
//   createdAt: Date;
//   updatedAt: Date;

//   constructor(
//     cartItemID: number,
//     productID: number,
//     userID: number,
//     quantity: number,
//     isActive: boolean,
//     createdAt: Date,
//     updatedAt: Date
//   ) {
//     this.cartItemID = cartItemID;
//     this.productID = productID;
//     this.userID = userID;
//     this.quantity = quantity;
//     this.isActive = isActive;
//     this.createdAt = createdAt;
//     this.updatedAt = updatedAt;
//   }
// }

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],  
  imports: [CommonModule]
}) 

export class CartItemComponent {   
  @Input() product: any;
  cartItem: any[] = [];
    // Inject HttpClient for API calls
    constructor(private http: HttpClient) {}
    // Add to Cart method
    addToCart(product: any) {
      const cartItem = {
        ProductId: product.productId, // Map productId to the API model
        UserId: 1, // Replace with the actual user ID (e.g., from authentication)
        Quantity: 1, // Default quantity
        IsActive: true,
        CreatedAt: new Date(),
        UpdatedAt: new Date()
      };
  
      // API POST request
      this.http.post('https://localhost:7194/api/Cart', cartItem).subscribe(
        (response) => {
          console.log('Product added to cart successfully:', response);
        },
        (error) => {
          console.error('Error adding product to cart:', error);
        }
      );
    }
 
}