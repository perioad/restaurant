import { Product } from './product.model';

type CartItem = {
  product: Product;
  quantity: number;
  priceTotal: number;
};

type RestaurantCart = {
  id: string;
  name: string;
  items: CartItem[];
};

export type Cart = {
  priceTotal: number;
  restaurants: RestaurantCart[];
};
