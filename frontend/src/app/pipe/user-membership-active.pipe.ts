import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../module/usuario.module';

@Pipe({
  name: 'userMembershipActive'
})
export class UserMembershipActivePipe implements PipeTransform {

  transform(
    users: Usuario[],
    acttiveMembershipSearch?: boolean
  ): Usuario[] {

    if (!users) return [];
    if (acttiveMembershipSearch == null) return users;
    if(acttiveMembershipSearch){
      users = [...users.filter(user => (user.Membresia&&(user.Membresia.activo)) )];
    }else{
      users = [...users.filter(user => (user.Membresia&&(!user.Membresia.activo)) )];
    }
    return users;
  }

}
