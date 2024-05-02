import { Component, Input } from '@angular/core';
import { SpinnerComponent } from '../../../core/components/spinner/spinner.component';

@Component({
  selector: 'app-icon-text',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './icon-text.component.html',
  styleUrl: './icon-text.component.scss',
})
export class IconTextComponent {
  @Input({ required: true }) text!: string | null;
}
