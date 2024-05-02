import { Component } from '@angular/core';

@Component({
  selector: 'app-photo-icon',
  standalone: true,
  styles: `
    :host {
      display: block;
    }
  `,
  templateUrl: './photo.component.html',
})
export class PhotoIconComponent {}
