import { CommonModule } from '@angular/common';
import { Component, OnInit, computed } from '@angular/core';
import { CartService, CartItem } from 'c:/Angular/angularconcepts/src/Services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
  imports: [CommonModule]
})
export class CartItemComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  // Signal to track the total number of items in the cart
  totalItems = computed(() => this.cartService.totalItems());

  constructor(private cartService: CartService) {}

  clearCart(): void {
    this.cartService.clearCart();
  }

  removeFromCart(itemId: number): void {
    this.cartService.removeFromCart(itemId);
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      item.subtotal = item.quantity * item.price;
      this.updateTotalPrice();
      this.cartService.updateTotalItems(this.cartItems); // Update total items
    }
  }

  private updateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.subtotal, 0);
  }

  increaseQuantity(item: any): void {
    item.quantity++;
    item.subtotal = item.quantity * item.price;
    this.updateTotalPrice();
    this.cartService.updateTotalItems(this.cartItems); // Update total items
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();

    // Subscribe to cart changes
    this.cartService.cart$.subscribe(cart => {
      this.cartItems = cart;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }
}