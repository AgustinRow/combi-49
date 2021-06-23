import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../module/usuario.module';

@Pipe({
  name: 'userNameFilter'
})
export class UserNameFilterPipe implements PipeTransform {

  transform(
    users: Usuario[],
    nameSearch?: string,
    lastNameSearch?: string
  ): Usuario[] {

    if (!users) return [];
    if (!nameSearch) 
      if(!lastNameSearch) return users;
    nameSearch = nameSearch.toLocaleLowerCase();
    users = [...users.filter(user => user.nombre.toLocaleLowerCase().includes(nameSearch))];

    if (!lastNameSearch) return users;
    lastNameSearch = lastNameSearch.toLocaleLowerCase();
    users = [...users.filter(user => user.apellido.toLocaleLowerCase().includes(lastNameSearch))];

    return users;
  }

}
