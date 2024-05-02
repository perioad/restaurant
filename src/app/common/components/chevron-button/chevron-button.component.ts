import { Component, Input } from '@angular/core';
import { ChevronIconComponent } from '../../icons/chevron/chevron.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'app-chevron-button',
  standalone: true,
  imports: [ChevronIconComponent, IconButtonComponent],
  templateUrl: './chevron-button.component.html',
  styleUrl: './chevron-button.component.scss',
})
export class ChevronButtonComponent {
  @Input({ required: true }) direction!: 'up' | 'down' | 'right' | 'left';
  @Input({ required: true }) title!: string;
}
