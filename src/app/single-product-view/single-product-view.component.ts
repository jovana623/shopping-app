import { Component, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-single-product-view',
  templateUrl: './single-product-view.component.html',
  styleUrl: './single-product-view.component.css',
})
export class SingleProductViewComponent {
  @Input() productId!: number;
  product: any;
  loading = true;

  constructor(
    private modal: NgbModal,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.fetchProductDetails();
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
  addToCart(): void {
    this.cartService.addToCart(this.product);
    this.modal.dismissAll();
  }
}
