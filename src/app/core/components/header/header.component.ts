import { Component } from '@angular/core';
import { LogoIconComponent } from '../../../common/icons/logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
