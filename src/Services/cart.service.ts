import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  subtotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();

  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartSubject.next(JSON.parse(storedCart));
    }
  }

  getCartItems(): CartItem[] {
    return this.cartSubject.value;
  }

  addToCart(product: CartItem): void {
    const currentCart = this.cartSubject.value;
    const existingItem = currentCart.find(item => item.id === product.id);

    let updatedCart: CartItem[];

    if (existingItem) {
      updatedCart = currentCart.map(item =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: (item.quantity + 1) * item.price
            }
          : item
      );
    } else {
      updatedCart = [...currentCart, { ...product, quantity: 1, subtotal: product.price }];
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    this.cartSubject.next(updatedCart);
  }

  getTotalPrice(): number {
    return this.cartSubject.value.reduce((total, item) => total + item.subtotal, 0);
  }  
  clearCart(): void {
    // Logic to clear the cart
  // Clear the cart by resetting the cartSubject to an empty array
  this.cartSubject.next([]);

  // Remove the cart data from localStorage
  localStorage.removeItem('cart');

  // Log a message to confirm the cart has been cleared
  console.log('Cart has been cleared.');
  } 
  removeFromCart(productId: number): void {
    const currentCart = this.cartSubject.value;
  
    // Filter out the product with the given ID
    const updatedCart = currentCart.filter(item => item.id !== productId);
  
    // Update the cartSubject and localStorage
    this.cartSubject.next(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  
    console.log(`Product with ID ${productId} has been removed from the cart.`);
  }
  
}