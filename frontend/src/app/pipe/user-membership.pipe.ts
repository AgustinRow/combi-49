import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../module/usuario.module';

@Pipe({
  name: 'userMembership'
})
export class UserMembershipPipe implements PipeTransform {

  transform(
    users: Usuario[],
    acttiveMembershipSearch?: boolean
  ): Usuario[] {

    if (!users) return [];
    if (acttiveMembershipSearch == null) return users;
    if(acttiveMembershipSearch){
      users = [...users.filter(user => !(user.Membresia === null) )];
    }else{
      users = [...users.filter(user => (user.Membresia === null) )];
    }
    return users;
  }

}
