import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/restaurants/restaurants.component').then(
        (m) => m.RestaurantsComponent
      ),
  },
  {
    path: 'restaurant/:id',
    loadComponent: () =>
      import('./pages/restaurant/restaurant.component').then(
        (m) => m.RestaurantComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
