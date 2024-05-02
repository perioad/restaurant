import { Component, Input, OnInit, inject } from '@angular/core';
import { RestaurantService } from '../../common/services/restaurant.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Restaurant } from '../../common/models/restaurant.model';
import { RestaurantCardComponent } from '../restaurants/components/restaurant-card/restaurant-card.component';
import { AsyncPipe } from '@angular/common';
import { CatalogComponent } from '../../common/components/catalog/catalog.component';
import { Catalog } from '../../common/models/catalog.model';
import { NavigationService } from '../../core/services/navigation.service';
import { ChevronButtonComponent } from '../../common/components/chevron-button/chevron-button.component';
import { TotalComponent } from '../../common/components/total/total.component';
import { MagnifyingButtonComponent } from '../../common/components/magnifying-button/magnifying-button.component';
import { StarButtonComponent } from '../../common/components/star-button/star-button.component';
import { ProductsSearchComponent } from '../components/products-search/products-search.component';
import { LoadingComponent } from '../../common/components/loading/loading.component';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [
    RestaurantCardComponent,
    AsyncPipe,
    CatalogComponent,
    ChevronButtonComponent,
    TotalComponent,
    MagnifyingButtonComponent,
    StarButtonComponent,
    ProductsSearchComponent,
    LoadingComponent,
  ],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss',
})
export class RestaurantComponent implements OnInit {
  @Input() id!: string;

  private resturantService = inject(RestaurantService);
  private router = inject(Router);
  private navigationService = inject(NavigationService);

  restaurant!: Restaurant;
  catalog$!: Observable<Catalog>;
  isSearchOpen = false;

  constructor() {
    const state = this.router.getCurrentNavigation()?.extras
      .state as Restaurant;

    if (state) {
      this.restaurant = state;
    }
  }

  ngOnInit(): void {
    this.catalog$ = this.resturantService.getRestaurantCatalog(this.id);
  }

  navigateBack(): void {
    this.navigationService.navigateBack();
  }

  showSearch(): void {
    this.isSearchOpen = true;
  }

  closeSearch(): void {
    this.isSearchOpen = false;
  }
}
