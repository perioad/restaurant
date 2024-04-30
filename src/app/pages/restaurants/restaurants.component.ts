import { Component } from '@angular/core';
import { Restaurant } from '../../core/models/restaurant.model';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [RestaurantCardComponent],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.scss',
})
export class RestaurantsComponent {
  restaurants: Restaurant[] = [
    {
      id: '1',
      name: 'Burger King',
      image:
        'https://res.cloudinary.com/lastpos/image/upload/v1664961726/frontend-interview/cover-bk.png',
      logo: 'https://res.cloudinary.com/lastpos/image/upload/v1664961726/frontend-interview/logo-bk.png',
      ratings: {
        total: '456',
        average: '4.5',
      },
      coordinates: {
        latitude: 41.4046141,
        longitude: 2.1732208,
      },
    },
    {
      id: '2',
      name: "Mc Donald's",
      image:
        'https://res.cloudinary.com/lastpos/image/upload/v1664961726/frontend-interview/cover-md.png',
      logo: 'https://res.cloudinary.com/lastpos/image/upload/v1664961726/frontend-interview/logo-md.png',
      ratings: {
        total: '756',
        average: '4.7',
      },
      coordinates: {
        latitude: 41.3853652,
        longitude: 2.169554,
      },
    },
    {
      id: '3',
      name: 'KFC',
      image:
        'https://res.cloudinary.com/lastpos/image/upload/v1664961726/frontend-interview/cover-kfc.png',
      logo: 'https://res.cloudinary.com/lastpos/image/upload/v1664961726/frontend-interview/logo-kfc.png',
      ratings: {
        total: '223',
        average: '4.2',
      },
      coordinates: {
        latitude: 41.4270266,
        longitude: 2.1855545,
      },
    },
  ];
}
