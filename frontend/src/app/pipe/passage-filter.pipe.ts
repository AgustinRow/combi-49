import { Pipe, PipeTransform } from '@angular/core';
import { Pasaje } from '../module/pasaje.module';

@Pipe({
  name: 'passageFilter'
})
export class PassageFilterPipe implements PipeTransform {

  transform(
    passages: Pasaje[],
    estado?: string
  ): Pasaje[] {

    if (!passages) return [];
    if (!estado) return passages;
    passages = [...passages.filter(passage => passage.Estado.estado.match(estado))];

    return passages;
  }
}