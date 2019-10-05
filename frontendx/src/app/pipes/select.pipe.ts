import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'select'
})
export class SelectPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    args.forEach(
      (arg: string) => {
        value = value.pipe(map(data => data[arg]));
    });
    return value;
  }

}
