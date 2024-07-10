import { Component } from '@angular/core';
import { CartItem } from '../cart-item';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.css',
})
export class SuccessComponent {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  clearCartAndNavigate(): void {
    this.cartService.clearCart();
    this.router.navigateByUrl('/products');
  }
}
