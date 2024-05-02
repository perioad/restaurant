import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss',
})
export class TabComponent {
  @Input({ required: true }) tab!: string;
  @Input({ required: true }) isSelected!: boolean;
}
