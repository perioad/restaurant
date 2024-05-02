import { Component } from '@angular/core';

@Component({
  selector: 'app-star-icon',
  standalone: true,
  styles: `
    :host {
      display: block;
    }
  `,
  templateUrl: './star.component.html',
})
export class StarIconComponent {}
