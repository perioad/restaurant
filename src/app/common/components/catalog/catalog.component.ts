import { Component, Input, OnInit, inject } from '@angular/core';
import { Catalog } from '../../models/catalog.model';
import { TabComponent } from '../tab/tab.component';
import { ProductComponent } from '../product/product.component';
import { ProductGroup } from '../../models/product-group.model';
import { Product } from '../../models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [TabComponent, ProductComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit {
  @Input({ required: true }) restaurant!: Restaurant;
  @Input({ required: true }) catalog!: Catalog;

  private cartService = inject(CartService);

  selectedGroup: ProductGroup | null = null;

  ngOnInit(): void {
    if (this.catalog.length) {
      this.selectedGroup = this.catalog[0];
    }
  }

  selectTab(tab: string) {
    const nextSelectedGroup = this.catalog.find((group) => group.name === tab);

    if (
      !nextSelectedGroup ||
      nextSelectedGroup.name === this.selectedGroup?.name
    ) {
      return;
    }

    this.selectedGroup = nextSelectedGroup;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product, this.restaurant);
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product, this.restaurant);
  }

  getProductQuantity(product: Product): number {
    return this.cartService.getProductQuantity(product, this.restaurant);
  }
}
