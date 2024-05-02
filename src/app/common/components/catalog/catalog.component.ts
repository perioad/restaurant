import { Component, Input, OnInit, inject } from '@angular/core';
import { Catalog } from '../../models/catalog.model';
import { TabComponent } from '../tab/tab.component';
import { ProductComponent } from '../product/product.component';
import { ProductGroup } from '../../models/product-group.model';
import { Product } from '../../models/product.model';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [TabComponent, ProductComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit {
  @Input({ required: true }) restaurantId!: string;
  @Input({ required: true }) catalog!: Catalog;

  private checkoutService = inject(CheckoutService);

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
      nextSelectedGroup?.name === this.selectedGroup?.name
    ) {
      return;
    }

    this.selectedGroup = nextSelectedGroup;
  }

  addToCart(product: Product) {
    this.checkoutService.addToCart(product, this.restaurantId);
  }

  removeFromCart(product: Product) {
    this.checkoutService.removeFromCart(product, this.restaurantId);
  }

  getProductQuantity(product: Product): number {
    return this.checkoutService.getProductQuantity(product, this.restaurantId);
  }
}
