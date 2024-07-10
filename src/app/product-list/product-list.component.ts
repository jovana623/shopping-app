import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CartService } from '../cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from '../cart/cart.component';
import { Product } from '../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  pageSize: number = 5;
  currentPage: number = 1;
  cartItemCount: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'] || '';
      this.pageSize = +params['limit'] || 5;
      this.currentPage = +params['page'] || 1;
      const skip = (this.currentPage - 1) * this.pageSize;
      this.fetchProducts(this.pageSize, skip);
    });
  }

  fetchProducts(limit: number, skip: number): void {
    if (this.searchQuery) {
      this.searchProducts(this.searchQuery);
    } else {
      this.productService
        .getProducts(limit, skip)
        .subscribe((data: Product[]) => {
          this.processProducts(data);
        });
    }
  }

  processProducts(data: any): void {
    if (Array.isArray(data)) {
      this.products = data;
      this.filteredProducts = [...this.products];
    } else if (data && data.products && Array.isArray(data.products)) {
      this.products = data.products;
      this.filteredProducts = [...this.products];
    } else {
      console.error('Received data is not an array:', data);
      this.products = [];
      this.filteredProducts = [];
    }
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    const skip = (this.currentPage - 1) * this.pageSize;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentPage, limit: this.pageSize },
      queryParamsHandling: 'merge',
    });
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    const skip = (this.currentPage - 1) * this.pageSize;
    this.fetchProducts(this.pageSize, skip);
  }

  searchProducts(query: string): void {
    this.productService.searchProducts(query).subscribe((data: Product[]) => {
      this.processProducts(data);
    });
  }

  performSearch(): void {
    const queryParams = {
      q: this.searchQuery,
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  updateCartItemCount() {
    this.cartItemCount = this.cartService.getCartItems().length;
  }

  openCart() {
    const modalRef = this.modalService.open(CartComponent);
    modalRef.componentInstance.cartItems = this.cartService.getCartItems();
    modalRef.componentInstance.totalPrice = this.cartService.getTotalPrice();
    modalRef.result.then(
      () => {
        this.updateCartItemCount();
      },
      () => {
        this.updateCartItemCount();
      }
    );
  }
}
