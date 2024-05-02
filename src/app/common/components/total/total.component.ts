import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AsyncPipe } from '@angular/common';
import { CurrencyPipe } from '../../../core/pipes/currency.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-total',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, RouterModule],
  templateUrl: './total.component.html',
  styleUrl: './total.component.scss',
})
export class TotalComponent {
  private cartService = inject(CartService);

  total$ = this.cartService.total$;
}
