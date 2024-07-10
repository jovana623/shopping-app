import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../cart.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartItem } from '../cart-item';
import { CustomvalidationService } from '../customvalidation.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(
    private form: FormBuilder,
    private cartService: CartService,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();

    this.checkoutForm = this.form.group({
      name: [
        '',
        [Validators.required, CustomvalidationService.nameValidator()],
      ],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telephone: [
        '',
        Validators.required,
        CustomvalidationService.telephoneValidator(),
      ],
    });
  }

  updateQuantity(itemId: number, quantity: number) {
    this.cartService.updateQuantity(itemId, quantity);
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  removeItem(itemId: number) {
    this.cartService.removeFromCart(itemId);
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      const payload = {
        ...this.checkoutForm.value,
        cartItems: this.cartItems,
        totalPrice: this.totalPrice,
      };
      this.httpClient.post('https://dummyjson.com/http/200', payload).subscribe(
        (response) => {
          console.log('Success');
          this.router.navigateByUrl('/success');
        },
        (error) => {
          console.log('Error');
        }
      );
    } else {
      console.log('Form invalid');
    }
  }
}
