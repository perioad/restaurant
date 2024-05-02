import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';
import { add, subtract } from '../../core/utils/math.utils';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private _cart$ = new BehaviorSubject<Cart>({
    priceTotal: 0,
    restaurants: [],
  });

  cart$ = this._cart$.asObservable();
  total$ = this.cart$.pipe(map((cart) => cart.priceTotal));

  addToCart(product: Product, restaurantId: string): void {
    const cart = this._cart$.getValue();

    const restaurant = cart.restaurants.find(
      (r) => r.restaurantId === restaurantId,
    );

    if (restaurant) {
      const item = restaurant.items.find(
        (i) => i.product.name === product.name,
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
        restaurantId,
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

  removeFromCart(product: Product, restaurantId: string): void {
    const cart = this._cart$.getValue();

    const restaurantIndex = cart.restaurants.findIndex(
      (r) => r.restaurantId === restaurantId,
    );

    if (restaurantIndex !== -1) {
      const itemIndex = cart.restaurants[restaurantIndex].items.findIndex(
        (i) => i.product.name === product.name,
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

  getProductQuantity(product: Product, restaurantId: string): number {
    const cart = this._cart$.getValue();

    const restaurant = cart.restaurants.find(
      (r) => r.restaurantId === restaurantId,
    );

    if (restaurant) {
      const item = restaurant.items.find(
        (i) => i.product.name === product.name,
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
