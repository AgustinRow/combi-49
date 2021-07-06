import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../module/usuario.module';

@Pipe({
  name: 'userActive'
})
export class UserActivePipe implements PipeTransform {

  transform(
    users: Usuario[],
    acttiveSearch?: boolean
  ): Usuario[] {

    if (!users) return [];
    if (acttiveSearch == null) return users;
    users = [...users.filter(user => user.habilitado === acttiveSearch)];
    return users;
  }

}
