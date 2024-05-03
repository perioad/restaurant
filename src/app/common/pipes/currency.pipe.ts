import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
  standalone: true,
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number, isSpace: boolean = true): string {
    const currency = isSpace ? ' €' : '€';

    return value.toFixed(2).replace('.', ',') + currency;
  }
}
