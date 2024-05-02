import { Component } from '@angular/core';

@Component({
  selector: 'app-magnifying-icon',
  standalone: true,
  styles: `
    :host {
      display: block;
    }
  `,
  templateUrl: './magnifying.component.html',
})
export class MagnifyingIconComponent {}
