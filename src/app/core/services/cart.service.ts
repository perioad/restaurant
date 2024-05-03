import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { produce } from 'immer';
import { Cart } from '../../common/models/cart.model';
import { Product } from '../../common/models/product.model';
import { Restaurant } from '../../common/models/restaurant.model';
import { add, subtract } from '../../common/utils/math.utils';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cart$ = new BehaviorSubject<Cart>({
    priceTotal: 0,
    restaurants: [],
  });

  cart$ = this._cart$.asObservable();
  total$ = this.cart$.pipe(map((cart) => cart.priceTotal));

  addToCart(product: Product, chosenRestaurant: Restaurant): void {
    const cart = this._cart$.getValue();

    const nextCart = produce(cart, (draftCart) => {
      let restaurant = draftCart.restaurants.find(
        (r) => r.id === chosenRestaurant.id,
      );

      if (!restaurant) {
        restaurant = {
          id: chosenRestaurant.id,
          name: chosenRestaurant.name,
          items: [],
        };

        draftCart.restaurants.push(restaurant);
      }

      const item = restaurant.items.find(
        (item) => item.product.name === product.name,
      );

      if (item) {
        item.quantity += 1;
        item.priceTotal = add(item.priceTotal, product.price);
      } else {
        restaurant.items.push({
          product,
          quantity: 1,
          priceTotal: product.price,
        });
      }

      draftCart.priceTotal = this.updateCartTotal(draftCart);
    });

    this._cart$.next(nextCart);
    console.log('nextCart: ', nextCart);
  }

  removeFromCart(product: Product, chosenRestaurant: Restaurant): void {
    const cart = this._cart$.getValue();

    const nextCart = produce(cart, (draftCart) => {
      const restaurantIndex = draftCart.restaurants.findIndex(
        (restaurant) => restaurant.id === chosenRestaurant.id,
      );

      if (restaurantIndex !== -1) {
        const items = draftCart.restaurants[restaurantIndex].items;
        const itemIndex = items.findIndex(
          (item) => item.product.name === product.name,
        );

        if (itemIndex !== -1) {
          const item = items[itemIndex];

          if (item.quantity > 1) {
            item.quantity -= 1;
            item.priceTotal = subtract(item.priceTotal, item.product.price);
          } else {
            items.splice(itemIndex, 1);

            if (items.length === 0) {
              draftCart.restaurants.splice(restaurantIndex, 1);
            }
          }
        }
      }

      draftCart.priceTotal = this.updateCartTotal(draftCart);
    });

    this._cart$.next(nextCart);
  }

  getProductQuantity(product: Product, chosenRestaurant: Restaurant): number {
    const cart = this._cart$.getValue();

    const restaurant = cart.restaurants.find(
      (restaurant) => restaurant.id === chosenRestaurant.id,
    );

    if (restaurant) {
      const item = restaurant.items.find(
        (item) => item.product.name === product.name,
      );

      if (item) {
        return item.quantity;
      }
    }

    return 0;
  }

  private updateCartTotal(cart: Cart): number {
    let totalCartPrice = 0;

    for (const restaurant of cart.restaurants) {
      for (const item of restaurant.items) {
        totalCartPrice = add(totalCartPrice, item.priceTotal);
      }
    }

    return totalCartPrice;
  }
}
