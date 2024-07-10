import { Injectable } from '@angular/core';
import { CartItem } from './cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];

  constructor() {}

  addToCart(item: CartItem) {
    const existingItem = this.cartItems.find((i) => i.id === item.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }
  }

  removeFromCart(itemId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
  }

  updateQuantity(itemId: number, quantity: number) {
    const item = this.cartItems.find((i) => i.id === itemId);
    if (item) {
      item.quantity = quantity;
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  clearCart() {
    this.cartItems = [];
  }
}
