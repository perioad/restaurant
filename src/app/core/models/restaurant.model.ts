import { Coordinates } from './coordinates.model';

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
