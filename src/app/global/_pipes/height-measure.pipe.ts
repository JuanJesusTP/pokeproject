import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heightMeasure'
})
export class HeightMeasurePipe implements PipeTransform {

  transform(height: number): string {
    if (height) {
      var measure = 0;
      var auxvar = 0;
      var parsedHeight = '';

      measure = height * 0.3281;
      auxvar = Math.trunc(measure);
      parsedHeight = auxvar + '\'';

      measure = measure - auxvar;
      auxvar = measure * 12;
      auxvar = Math.round(auxvar);

      if (auxvar < 10) {
        parsedHeight += '0'+auxvar+'\'\'';
      } else {
        parsedHeight += auxvar+'\'\'';
      }
      
      return parsedHeight;
    }
  }
}
