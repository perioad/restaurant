import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance',
  standalone: true,
})
export class DistancePipe implements PipeTransform {
  transform(distance: number): string {
    return distance > -1 ? `${distance} km` : 'N/A';
  }
}
