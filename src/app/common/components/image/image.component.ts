import { Component, Input } from '@angular/core';
import { ImagePlaceholderComponent } from '../image-placeholder/image-placeholder.component';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [ImagePlaceholderComponent],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  @Input({ required: true }) src!: string;
  @Input() alt: string = '';
  @Input() objectFit: 'cover' | 'contain' = 'contain';

  isLoading: boolean = true;
  isError: boolean = false;

  onLoad() {
    this.isLoading = false;
  }

  onError() {
    this.isLoading = false;
    this.isError = true;
  }
}
