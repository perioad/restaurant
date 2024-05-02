import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StarIconComponent } from '../../icons/star/star.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'app-star-button',
  standalone: true,
  imports: [StarIconComponent, IconButtonComponent],
  templateUrl: './star-button.component.html',
  styleUrl: './star-button.component.scss',
})
export class StarButtonComponent {
  @Input({ required: true }) title!: string;
}
