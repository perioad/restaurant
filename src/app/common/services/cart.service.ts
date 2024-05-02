import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';
import { Restaurant } from '../models/restaurant.model';

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

    const restaurant = cart.restaurants.find(
      (restaurant) => restaurant.id === chosenRestaurant.id,
    );

    if (restaurant) {
      const item = restaurant.items.find(
        (item) => item.product.name === product.name,
      );

      if (item) {
        item.quantity += 1;
        item.priceTotal = item.quantity * product.price;
      } else {
        restaurant.items.push({
          product,
          quantity: 1,
          priceTotal: product.price,
        });
      }
    } else {
      cart.restaurants.push({
        id: chosenRestaurant.id,
        name: chosenRestaurant.name,
        items: [
          {
            product,
            quantity: 1,
            priceTotal: product.price,
          },
        ],
      });
    }

    cart.priceTotal = this.updateCartTotal(cart);

    this._cart$.next(cart);
  }

  removeFromCart(product: Product, chosenRestaurant: Restaurant): void {
    const cart = this._cart$.getValue();

    const restaurantIndex = cart.restaurants.findIndex(
      (restaurant) => restaurant.id === chosenRestaurant.id,
    );

    if (restaurantIndex !== -1) {
      const itemIndex = cart.restaurants[restaurantIndex].items.findIndex(
        (item) => item.product.name === product.name,
      );

      if (itemIndex !== -1) {
        const item = cart.restaurants[restaurantIndex].items[itemIndex];

        if (item.quantity > 1) {
          item.quantity -= 1;
          item.priceTotal = item.quantity * item.product.price;
        } else {
          cart.restaurants[restaurantIndex].items.splice(itemIndex, 1);

          if (cart.restaurants[restaurantIndex].items.length === 0) {
            cart.restaurants.splice(restaurantIndex, 1);
          }
        }

        cart.priceTotal = this.updateCartTotal(cart);

        this._cart$.next(cart);
      }
    }
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
    return cart.restaurants.reduce((total, restaurant) => {
      return (
        total +
        restaurant.items.reduce((subTotal, item) => {
          return subTotal + item.priceTotal;
        }, 0)
      );
    }, 0);
  }
}
