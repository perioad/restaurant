import { Injectable } from '@angular/core';
import { Coordinates } from '../models/coordinates.model';
import { Observable, from, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  private currentPosition: GeolocationCoordinates | null = null;

  getDistanceFromCurrentPosition$(
    coordinates: Coordinates,
  ): Observable<string> {
    return from(this.getDistanceFromCurrentPosition(coordinates)).pipe(
      map((distance) => `${distance} km`),
      catchError(() => of('Unknown')),
    );
  }

  private async getDistanceFromCurrentPosition(
    coordinates: Coordinates,
  ): Promise<number> {
    if (!this.currentPosition) {
      this.currentPosition = await this.getCurrentPosition();
    }

    return this.calculateDistance(
      this.currentPosition.latitude,
      this.currentPosition.longitude,
      coordinates.latitude,
      coordinates.longitude,
    );
  }

  private getCurrentPosition(): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            resolve(position.coords);
          },
          (error: GeolocationPositionError) => {
            reject(error);
          },
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c);
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
