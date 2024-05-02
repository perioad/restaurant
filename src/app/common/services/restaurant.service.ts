import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Restaurant, ResponseRestaurant } from '../models/restaurant.model';
import { Catalog } from '../models/catalog.model';
import { Observable, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { GeolocationService } from '../../core/services/geolocation.service';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private http = inject(HttpClient);
  private geolocationService = inject(GeolocationService);
  private restaurants: Restaurant[] | null = null;

  getSortedRestaurants(): Observable<Restaurant[]> {
    if (this.restaurants) {
      return of(this.restaurants);
    }

    return this.getRestaurants().pipe(
      switchMap((restaurants) => {
        const distanceObservables = restaurants.map((restaurant) =>
          this.geolocationService
            .getDistanceFromCurrentPosition$(restaurant.coordinates)
            .pipe(
              map((distance) => ({
                ...restaurant,
                distance,
              })),
            ),
        );

        return forkJoin(distanceObservables);
      }),
      map((restaurantsWithDistance) => {
        return restaurantsWithDistance.sort((a, b) => a.distance - b.distance);
      }),
      tap((restaurants) => {
        this.restaurants = restaurants;
      }),
    );
  }

  getRestaurantCatalog(id: string) {
    return this.http.get<Catalog>(
      `https://api.last.app/frontend-interview/restaurants/${id}/catalog`,
    );
  }

  private getRestaurants(): Observable<ResponseRestaurant[]> {
    return this.http.get<ResponseRestaurant[]>(
      'https://api.last.app/frontend-interview/restaurants',
    );
  }
}
