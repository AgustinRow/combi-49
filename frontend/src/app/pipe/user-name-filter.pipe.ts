import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../module/usuario.module';

@Pipe({
  name: 'userNameFilter'
})
export class UserNameFilterPipe implements PipeTransform {

  transform(value: Usuario[], args: string): Usuario[] {
    const returnList:Usuario[] = [];

    for(const user of value ){
      if ((user.nombre.toUpperCase().indexOf(args.toUpperCase()) > -1) || (user.apellido.toUpperCase().indexOf(args.toUpperCase()) > -1))
        returnList.push(user);
    }
    return returnList;
  }

}
