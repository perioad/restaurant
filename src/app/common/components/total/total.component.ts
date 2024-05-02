import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AsyncPipe } from '@angular/common';
import { CurrencyPipe } from '../../../core/pipes/currency.pipe';
import { RouterModule } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-total',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, RouterModule],
  templateUrl: './total.component.html',
  styleUrl: './total.component.scss',
  animations: [
    trigger('enterLeaveTrigger', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50%)' }),
        animate('100ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class TotalComponent {
  private cartService = inject(CartService);

  total$ = this.cartService.total$;
}
