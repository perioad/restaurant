import { Coordinates } from '../../core/models/coordinates.model';

export type Restaurant = {
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
