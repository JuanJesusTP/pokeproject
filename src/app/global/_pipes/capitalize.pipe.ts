import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})

export class CapitalizePipe implements PipeTransform {

  transform(txt: string): string {
    if (txt) {
      return txt.charAt(0).toUpperCase() + txt.slice(1);
    }
    return txt;
  }

}
