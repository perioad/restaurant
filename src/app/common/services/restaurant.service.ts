import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';
import { Catalog } from '../models/catalog.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private http = inject(HttpClient);

  getRestaurants() {
    return this.http.get<Restaurant[]>(
      'https://api.last.app/frontend-interview/restaurants',
    );
  }

  getRestaurantCatalog(id: string) {
    return this.http.get<Catalog>(
      `https://api.last.app/frontend-interview/restaurants/${id}/catalog`,
    );
  }
}
