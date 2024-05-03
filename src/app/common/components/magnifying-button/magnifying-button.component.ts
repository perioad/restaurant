import { Component, Input } from '@angular/core';
import { MagnifyingIconComponent } from '../../icons/magnifying/magnifying.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'app-magnifying-button',
  standalone: true,
  imports: [MagnifyingIconComponent, IconButtonComponent],
  templateUrl: './magnifying-button.component.html',
  styleUrl: './magnifying-button.component.scss',
})
export class MagnifyingButtonComponent {
  @Input({ required: true }) title!: string;
}
