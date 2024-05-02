import { Component, Input } from '@angular/core';
import { PlusIconComponent } from '../../icons/plus/plus.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'app-cross-button',
  standalone: true,
  imports: [PlusIconComponent, IconButtonComponent],
  templateUrl: './cross-button.component.html',
  styleUrl: './cross-button.component.scss',
})
export class CrossButtonComponent {
  @Input({ required: true }) title!: string;
}
