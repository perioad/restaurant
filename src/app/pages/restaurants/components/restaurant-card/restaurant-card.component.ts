import { Component, Input, OnInit, inject, input } from '@angular/core';
import { Restaurant } from '../../../../core/models/restaurant.model';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { IconTextComponent } from '../../../../common/components/icon-text/icon-text.component';
import { StarIconComponent } from '../../../../common/icons/star/star.component';
import { MapPinIconComponent } from '../../../../common/icons/map-pin/map-pin.component';
import { Observable, catchError, from, map, of, tap } from 'rxjs';
import { GeolocationService } from '../../../../core/services/geolocation.service';

@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [
    AsyncPipe,
    UpperCasePipe,
    IconTextComponent,
    StarIconComponent,
    MapPinIconComponent,
  ],
  templateUrl: './restaurant-card.component.html',
  styleUrl: './restaurant-card.component.scss',
})
export class RestaurantCardComponent implements OnInit {
  @Input({ required: true }) restaurant!: Restaurant;

  distanceKm!: Observable<string>;

  private geolocationService = inject(GeolocationService);

  ngOnInit(): void {
    this.distanceKm = this.geolocationService.getDistanceFromCurrentPosition$(
      this.restaurant.coordinates
    );
  }

  rating(): string {
    return `${this.restaurant.ratings.average} (${this.restaurant.ratings.total})`;
  }
}
