import { Component, inject } from '@angular/core';
import { ConfettiService } from '../../core/services/confetti.service';

@Component({
  selector: 'app-hooray',
  standalone: true,
  imports: [],
  templateUrl: './hooray.component.html',
  styleUrl: './hooray.component.scss',
})
export class HoorayComponent {
  private confettiService = inject(ConfettiService);

  ngOnInit() {
    this.confettiService.celebrate();
  }
}
