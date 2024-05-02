import { Component } from '@angular/core';
import { SpinnerComponent } from '../../../core/components/spinner/spinner.component';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {}
