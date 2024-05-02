import { Component } from '@angular/core';
import { PhotoIconComponent } from '../../icons/photo/photo.component';

@Component({
  selector: 'app-image-placeholder',
  standalone: true,
  imports: [PhotoIconComponent],
  templateUrl: './image-placeholder.component.html',
  styleUrl: './image-placeholder.component.scss',
})
export class ImagePlaceholderComponent {}
