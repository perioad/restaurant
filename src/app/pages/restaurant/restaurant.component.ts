import { Component, Input, OnInit, inject } from '@angular/core';
import { RestaurantService } from '../../common/services/restaurant.service';
import { Observable, combineLatest, map, of, shareReplay } from 'rxjs';
import { Router } from '@angular/router';
import {
  ResponseRestaurant,
  Restaurant,
} from '../../common/models/restaurant.model';
import { RestaurantCardComponent } from '../restaurants/components/restaurant-card/restaurant-card.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { CatalogComponent } from '../../common/components/catalog/catalog.component';
import { Catalog } from '../../common/models/catalog.model';
import { NavigationService } from '../../core/services/navigation.service';
import { ChevronButtonComponent } from '../../common/components/chevron-button/chevron-button.component';
import { TotalComponent } from '../../common/components/total/total.component';
import { MagnifyingButtonComponent } from '../../common/components/magnifying-button/magnifying-button.component';
import { StarButtonComponent } from '../../common/components/star-button/star-button.component';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
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
    NgIf,
  ],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss',
})
export class RestaurantComponent implements OnInit {
  @Input() id!: string;

  private restaurantService = inject(RestaurantService);
  private router = inject(Router);
  private navigationService = inject(NavigationService);
  private restaurant$!: Observable<Restaurant>;

  catalog$!: Observable<Catalog>;
  isSearchOpen = false;
  data$!: Observable<{
    restaurant: Restaurant;
    catalog: Catalog;
  }>;

  constructor() {
    const restaurantFromState = this.router.getCurrentNavigation()?.extras
      .state as Restaurant;

    this.restaurant$ = restaurantFromState
      ? of(restaurantFromState)
      : this.restaurantService.getSortedRestaurants().pipe(
          map((restaurants) => {
            return restaurants.find(
              (restaurant) => restaurant.id === this.id,
            ) as Restaurant;
          }),
        );
  }

  ngOnInit(): void {
    this.catalog$ = this.restaurantService.getRestaurantCatalog(this.id);
    this.data$ = combineLatest([this.restaurant$, this.catalog$]).pipe(
      map(([restaurant, catalog]) => ({ restaurant, catalog })),
      shareReplay(1),
    );
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
