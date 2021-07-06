import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../module/usuario.module';

@Pipe({
  name: 'userType'
})
export class UserTypePipe implements PipeTransform {

  transform(
    users: Usuario[],
    typeSearch?: number
  ): Usuario[] {

    if (!users) return [];
    if (!typeSearch || (typeSearch < 0)) return users;
    users = [...users.filter(user => user.tipo == typeSearch)];
    return users;
  }

}
