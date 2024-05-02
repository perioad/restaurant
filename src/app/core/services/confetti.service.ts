import { Injectable } from '@angular/core';
import confetti from 'canvas-confetti';

@Injectable({
  providedIn: 'root',
})
export class ConfettiService {
  private duration = 10000;

  celebrate() {
    confetti({
      particleCount: 300,
      spread: 180,
      angle: 270,
      startVelocity: 50,
      ticks: 400,
      origin: { y: -0.3 },
    });

    setTimeout(() => confetti.reset(), this.duration);
  }
}
