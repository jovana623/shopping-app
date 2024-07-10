import { Component, inject, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { CartItem } from '../cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(
    private modalService: NgbModal,
    private cartService: CartService,
    private router: Router
  ) {}

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  updateQuantity(itemId: number, quantity: number) {
    this.cartService.updateQuantity(itemId, quantity);
    this.loadCart();
  }

  removeFromCart(itemId: number) {
    this.cartService.removeFromCart(itemId);
    this.loadCart();
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
  }

  navigateToCheckout() {
    this.modalService.dismissAll();
    this.router.navigate(['/checkout']);
  }
}
