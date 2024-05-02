import { Coordinates } from '../../core/models/coordinates.model';

export type ResponseRestaurant = {
  id: string;
  name: string;
  image: string;
  logo: string;
  ratings: {
    total: string;
    average: string;
  };
  coordinates: Coordinates;
};

export type Restaurant = ResponseRestaurant & {
  distance: number;
};
