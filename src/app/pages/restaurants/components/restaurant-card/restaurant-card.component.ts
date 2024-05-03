import { Component, Input } from '@angular/core';
import { Restaurant } from '../../../../common/models/restaurant.model';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { IconTextComponent } from '../../../../common/components/icon-text/icon-text.component';
import { StarIconComponent } from '../../../../common/icons/star/star.component';
import { MapPinIconComponent } from '../../../../common/icons/map-pin/map-pin.component';
import { DetailsComponent } from '../../../../common/components/details/details.component';
import { ImagePlaceholderComponent } from '../../../../common/components/image-placeholder/image-placeholder.component';
import { DistancePipe } from '../../../../common/pipes/distance.pipe';
import { ImageComponent } from '../../../../common/components/image/image.component';

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
