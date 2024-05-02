import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { PlusIconComponent } from '../../icons/plus/plus.component';
import { ImagePlaceholderComponent } from '../image-placeholder/image-placeholder.component';
import { CurrencyPipe } from '../../../core/pipes/currency.pipe';
import { MinusIconComponent } from '../../icons/minus/minus.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    PlusIconComponent,
    ImagePlaceholderComponent,
    CurrencyPipe,
    MinusIconComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input({ required: true }) product!: Product;
  @Input({ required: true }) productQuantity!: number;

  @Output() productAdded = new EventEmitter<Product>();
  @Output() productRemoved = new EventEmitter<Product>();

  isImgError = false;

  handleImgError() {
    this.isImgError = true;
  }

  selectProduct() {
    this.productAdded.emit(this.product);
  }

  removeProduct() {
    this.productRemoved.emit(this.product);
  }
}
