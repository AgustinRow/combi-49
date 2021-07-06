import { Pipe, PipeTransform } from '@angular/core';
import { Pasaje } from '../module/pasaje.module';

@Pipe({
  name: 'passageFilter'
})
export class PassageFilterPipe implements PipeTransform {

  transform(
    passages: Pasaje[],
    estados?: string[]
  ): Pasaje[] {

    if (!passages) return [];
    if (!estados) return passages;
    passages = [...passages.filter(passage => estados.includes(passage.Estado.estado))];

    return passages;
  }
}