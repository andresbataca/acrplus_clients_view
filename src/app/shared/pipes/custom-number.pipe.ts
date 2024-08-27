import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'customNumber',
  standalone: true,
})
export class CustomNumberPipe implements PipeTransform {

  transform(value: number): string {
    const integerValue = Math.floor(value).toString();

    const parts = integerValue.split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    if (parts[1]) {
      return `${integerPart}.${parts[1]}`;
    }

    return integerPart;
  }

}
