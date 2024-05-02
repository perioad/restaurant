import {
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { CrossButtonComponent } from '../cross-button/cross-button.component';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CrossButtonComponent, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() isWithReset: boolean = false;
  @Input() focusOnInit: boolean = false;
  @Input() debounceTime: number = 0;

  @Output() valueChange = new EventEmitter<string>();

  @ViewChild('input', { static: true })
  input!: ElementRef<HTMLInputElement>;

  value = '';
  isFocused: boolean = false;

  private destroyRef = inject(DestroyRef);

  private readonly debounceSubject = new Subject<string>();

  ngOnInit(): void {
    if (this.focusOnInit) {
      this.input.nativeElement.focus();
    }

    this.debounceSubject
      .asObservable()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(this.debounceTime),
      )
      .subscribe((value) => this.valueChange.emit(value));
  }

  handleFocus(): void {
    this.isFocused = true;
  }

  handleBlur(): void {
    this.isFocused = false;
  }

  reset(): void {
    this.value = '';
    this.valueChange.emit('');
    this.input.nativeElement.focus();
  }

  handleValueChange(value: string): void {
    const trimmedValue = value.trim();

    this.debounceSubject.next(trimmedValue);
  }
}
