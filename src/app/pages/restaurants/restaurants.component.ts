import { Component, inject } from '@angular/core';
import { Restaurant } from '../../common/models/restaurant.model';
import { RestaurantCardComponent } from '../../common/components/restaurant-card/restaurant-card.component';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { RestaurantService } from '../../core/services/restaurant.service';
import { AsyncPipe } from '@angular/common';
import { LoadingComponent } from '../../common/components/loading/loading.component';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [RestaurantCardComponent, AsyncPipe, RouterLink, LoadingComponent],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.scss',
})
export class RestaurantsComponent {
  restaurants$: Observable<Restaurant[]> =
    inject(RestaurantService).getSortedRestaurants();
}
