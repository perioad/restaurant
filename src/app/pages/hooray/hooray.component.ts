import { Component, inject } from '@angular/core';
import { ConfettiService } from '../../core/services/confetti.service';
import { LoadingComponent } from '../../common/components/loading/loading.component';

@Component({
  selector: 'app-hooray',
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: './hooray.component.html',
  styleUrl: './hooray.component.scss',
})
export class HoorayComponent {
  private confettiService = inject(ConfettiService);

  isLoading = true;

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
      this.confettiService.celebrate();
    }, 1000);
  }
}
