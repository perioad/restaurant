import { Component } from '@angular/core';

@Component({
  selector: 'app-plus-icon',
  standalone: true,
  styles: `
    :host {
      display: block;
    }
  `,
  templateUrl: './plus.component.html',
})
export class PlusIconComponent {}
