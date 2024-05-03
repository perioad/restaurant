import { Component, inject } from '@angular/core';
import { ConfettiService } from '../../core/services/confetti.service';
import { LoadingComponent } from '../../common/components/loading/loading.component';
import { Cart } from '../../common/models/cart.model';
import { ImageComponent } from '../../common/components/image/image.component';
import { CartService } from '../../core/services/cart.service';
import { Observable, combineLatest, map, tap, timer } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-hooray',
  standalone: true,
  imports: [LoadingComponent, ImageComponent, AsyncPipe, NgIf],
  templateUrl: './hooray.component.html',
  styleUrl: './hooray.component.scss',
})
export class HoorayComponent {
  private confettiService = inject(ConfettiService);
  private cartService = inject(CartService);

  cart$: Observable<Cart> = combineLatest([
    this.cartService.cart$,
    timer(500),
  ]).pipe(
    tap(() => {
      this.confettiService.celebrate();
    }),
    map(([cart]) => cart),
  );
}
