import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SingleProductViewComponent } from '../single-product-view/single-product-view.component';
import { Product } from '../product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private modalService: NgbModal) {}

  openModal() {
    const modalRef = this.modalService.open(SingleProductViewComponent);
    modalRef.componentInstance.productId = this.product.id;
  }
}
