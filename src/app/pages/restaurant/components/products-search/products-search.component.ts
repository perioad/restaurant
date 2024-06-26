import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Catalog } from '../../../../common/models/catalog.model';
import { InputComponent } from '../../../../common/components/input/input.component';
import { MagnifyingIconComponent } from '../../../../common/icons/magnifying/magnifying.component';
import { Product } from '../../../../common/models/product.model';
import { findProducts } from '../../../../common/utils/products.utils';
import { ChevronButtonComponent } from '../../../../common/components/chevron-button/chevron-button.component';
import { ProductSearchCardComponent } from '../../../../common/components/product-search-card/product-search-card.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-products-search',
  standalone: true,
  imports: [
    InputComponent,
    MagnifyingIconComponent,
    ChevronButtonComponent,
    ProductSearchCardComponent,
  ],
  templateUrl: './products-search.component.html',
  styleUrl: './products-search.component.scss',
  animations: [
    trigger('enterTrigger', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50%)' }),
        animate('100ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class ProductsSearchComponent {
  @Input({ required: true }) catalog!: Catalog;

  @Output() closeSearch = new EventEmitter<void>();

  foundProducts: Product[] = [];

  handleSearchChange(value: string): void {
    if (!value) {
      this.foundProducts = [];

      return;
    }

    this.foundProducts = findProducts(value, this.catalog);
  }

  handleCloseSearch(): void {
    this.closeSearch.emit();
  }
}
