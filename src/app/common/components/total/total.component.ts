import { Component, inject } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';
import { AsyncPipe } from '@angular/common';
import { CurrencyPipe } from '../../../core/pipes/currency.pipe';

@Component({
  selector: 'app-total',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './total.component.html',
  styleUrl: './total.component.scss',
})
export class TotalComponent {
  private checkoutService = inject(CheckoutService);

  total$ = this.checkoutService.total$;
}
