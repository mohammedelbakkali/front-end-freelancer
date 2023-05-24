import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'collapseText'
})
export class CollapseTextPipe implements PipeTransform {

  transform(value: string, maxWords: number): string {
    const words = value.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    } else {
      return value;
    }
  }
}
