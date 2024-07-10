import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartItem } from '../cart-item';

@Component({
  selector: 'app-single-product-view',
  templateUrl: './single-product-view.component.html',
  styleUrl: './single-product-view.component.css',
})
export class SingleProductViewComponent implements OnInit {
  @Input() productId!: number;
  product: any;
  loading = true;
  inCart = true;
  cartItems: CartItem[] = [];

  constructor(
    private modal: NgbModal,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.fetchProductDetails();
    this.loadCart();
  }

  fetchProductDetails(): void {
    this.productService.getProductsById(this.productId).subscribe(
      (data: any) => {
        this.product = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching product details:', error);
        this.loading = false;
      }
    );
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
    this.inCart = this.cartItems.some(
      (item: CartItem) => item.id === this.productId
    );
  }

  removeFromCart(itemId: number) {
    this.cartService.removeFromCart(itemId);
    this.loadCart();
  }

  addToCart(): void {
    if (this.inCart) {
      this.removeFromCart(this.product.id);
    } else {
      this.cartService.addToCart(this.product);
    }
    this.loadCart();
  }
}
