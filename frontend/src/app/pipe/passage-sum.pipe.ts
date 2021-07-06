import { Pipe, PipeTransform } from '@angular/core';
import { Pasaje } from '../module/pasaje.module';

@Pipe({
  name: 'passageSum'
})
export class PassageSumPipe implements PipeTransform {

  transform(
    passages: Pasaje[]
  ): number {

    if (!passages) return 0;
    return passages.reduce((a, b) => a + b.precio, 0);;
  }
}
