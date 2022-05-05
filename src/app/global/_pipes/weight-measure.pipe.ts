import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weightMeasure'
})
export class WeightMeasurePipe implements PipeTransform {

  transform(weight: number): string {
    if (weight) {
      var auxvar: number = 0;
      auxvar = weight * 0.2204622622;
      const measure = auxvar.toFixed(1);
      return measure;
    }
  }
}
