import { Pipe, PipeTransform } from '@angular/core';
import { Pasaje } from '../module/pasaje.module';

@Pipe({
  name: 'passageNameDniFilter'
})
export class PassageNameDniFilterPipe implements PipeTransform {

  transform(
    passages: Pasaje[],
    arg?: string
  ): Pasaje[] {

    if (!passages) return [];
    if (!arg) return passages;

    var args = arg.split(" ");

    args.forEach((word) => passages = [...passages.filter(
      passage => passage.Pasajero.dni.toString().includes(word)
        || passage.Pasajero.nombre.toLocaleLowerCase().includes(word.toLocaleLowerCase())
        || passage.Pasajero.apellido.toLocaleLowerCase().includes(word.toLocaleLowerCase())
    )]
    );

    return passages;
  }
}
