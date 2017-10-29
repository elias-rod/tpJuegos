import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'victoria'
})
export class VictoriaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == 1) {
      return 'Si';
    }
    else {
      return 'No';
    }
  }

}
