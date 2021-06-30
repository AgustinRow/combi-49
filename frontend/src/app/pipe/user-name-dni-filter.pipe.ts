import { Pipe, PipeTransform } from '@angular/core';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Usuario } from '../module/usuario.module';

@Pipe({
  name: 'userNameDniFilter'
})
export class UserNameDniFilterPipe implements PipeTransform {

  transform(
    users: Usuario[],
    arg?: string
  ): Usuario[] {

    if (!users) return [];
    if (!arg) return users;

    var args = arg.split(" ");

    args.forEach((word) => {
      users = [...users.filter(user => user.dni.toString().includes(word.toLocaleLowerCase())
        || user.nombre.toLocaleLowerCase().includes(word.toLocaleLowerCase())
        || user.apellido.toLocaleLowerCase().includes(word.toLocaleLowerCase())
      )]
    }
    );

    return users;
  }

}
