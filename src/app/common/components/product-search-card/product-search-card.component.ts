import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { CurrencyPipe } from '../../../core/pipes/currency.pipe';
import { ChevronButtonComponent } from '../chevron-button/chevron-button.component';

@Component({
  selector: 'app-product-search-card',
  standalone: true,
  imports: [CurrencyPipe, ChevronButtonComponent],
  templateUrl: './product-search-card.component.html',
  styleUrl: './product-search-card.component.scss',
})
export class ProductSearchCardComponent {
  @Input() product!: Product;
}
