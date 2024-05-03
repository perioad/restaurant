import { Component, Input } from '@angular/core';
import { Restaurant } from '../../models/restaurant.model';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { IconTextComponent } from '../icon-text/icon-text.component';
import { StarIconComponent } from '../../icons/star/star.component';
import { MapPinIconComponent } from '../../icons/map-pin/map-pin.component';
import { DetailsComponent } from '../details/details.component';
import { DistancePipe } from '../../pipes/distance.pipe';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [
    AsyncPipe,
    UpperCasePipe,
    IconTextComponent,
    StarIconComponent,
    MapPinIconComponent,
    DetailsComponent,
    DistancePipe,
    ImageComponent,
  ],
  templateUrl: './restaurant-card.component.html',
  styleUrl: './restaurant-card.component.scss',
})
export class RestaurantCardComponent {
  @Input({ required: true }) restaurant!: Restaurant;
  @Input({ required: true }) logoSize!: number;

  isImgError = false;
  isLogoError = false;

  rating(): string {
    return `${this.restaurant.ratings.average} (${this.restaurant.ratings.total})`;
  }
}
